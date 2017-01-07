import INC from 'lib/INCEngine.js';

class ModInc extends INC {
  constructor(){
    super();
  }
  modifyPoolAmount(pool, amount, details, override=false) {
    details = Object.assign({name:pool, key: pool, minimum:0}, details);
    if (!this.pools[pool]) this.addPool(details);
    this.pools[pool].modifyPoolAmount(amount, override);
    queues.trigger('poolModified');
  }
  getPoolAmount(pool) {
    if (!this.pools[pool]) return null;
    return this.pools[pool].amount;
  }
}

const queues = Object.create({
  addQueue(name){
    if(!queues[name]) queues[name] = new ModInc();
  }
});

queues.addQueue('island');

riot.observable(queues);

queues.island.begin(2000);

export default queues;
