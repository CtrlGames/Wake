import INC from 'lib/INCEngine.js';
import * as storage from 'storage.js';
import incPools from 'incPools.js';
import { addTrigger } from 'utils.js';

class ModInc extends INC {
  constructor(){
    super();
  }
  addPool(details){
    super.addPool(details);
    queues.trigger('poolAdded', details);
  }
  modifyPoolAmount(pool, amount, details, override=false, pay=true) {
    if (!details) details = incPools[pool];
    details = Object.assign({name:pool, key: pool, minimum:0}, details);
    if (!this.pools[pool]) this.addPool(details);
    this.pools[pool].modifyPoolAmount(amount, override, pay);
    queues.trigger('poolModified', this.pools[pool]);
    saveIncValues();
  }
  refundPoolAmount(pool, amount, override=true){
    this.pools[pool].refundPoolAmount(amount, override);
    queues.trigger('poolModified', this.pools[pool]);
  }
  getPoolAmount(pool) {
    if (!this.pools[pool]) return null;
    return this.pools[pool].amount;
  }
  checkPoolRequirements (pool, amount=1) {
    if(!pool) return false;
    if (this.pools[pool]) return this.pools[pool].checkRequirements(amount);
    return manualCheckRequirements(pool, amount);
  }
}

const queues = Object.create({
  addQueue(name){
    if(!queues[name]) queues[name] = new ModInc();
  }
});

riot.observable(queues);

// load inc from storage
var incStorage = storage.get('incStorage');
if (incStorage) {
  for (let areaK in incStorage) {
    if(!incStorage.hasOwnProperty(areaK)) continue;
    let area = incStorage[areaK];
    queues.addQueue(areaK);
    for (let poolK in area) {
      if (!area.hasOwnProperty(poolK)) continue;
      queues[areaK].modifyPoolAmount(poolK, area[poolK], incPools[poolK], true, false);
    }
  }
} else queues.addQueue('island');

function manualCheckRequirements (name, amount) {
  if (!name || !incPools[name]) return false;
  var ret = true;
  var reqs = incPools[name].requirements;
  for (let key in reqs) {
    if(queues.island.getPoolAmount(key) < (reqs[key] * amount)) {
      ret = false;
      break;
    }
  }
  return {success: ret};
}

function saveIncValues () {
  var storageOb = {};

  // save inc
  for (let areaK in queues) {
    if(!queues.hasOwnProperty(areaK)) continue;
    let area = queues[areaK];
    storageOb[areaK] = {};
    for (let poolK in area.pools) {
      if(!area.pools.hasOwnProperty(poolK)) continue;
      storageOb[areaK][poolK] = area.pools[poolK].amount;
    }
  }

  storage.set('incStorage', storageOb);
}

document.addEventListener('tick', (e, context) => {
  queues.trigger('poolModified');
  queues.trigger('tick', context);
  saveIncValues();
});

queues.island.begin(2000);

export default queues;
