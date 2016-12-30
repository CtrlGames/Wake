import INC from 'lib/INCEngine.js';

class ModInc extends INC {
  constructor(){
    super();
  }
  modifyPoolAmount(pool, amount, details) {
    if (!this.pools[pool]) this.addPool(details || {name:pool, key: pool, minimum:0});
    this.pools[pool].modifyPoolAmount(amount);
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

queues.island = new ModInc();

riot.observable(queues);

queues.island.begin(2000);

export default queues;
