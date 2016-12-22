import INC from 'lib/INCEngine.js';

class ModInc extends INC {
  constructor(){
    super();
  }
  modifyPoolAmount(pool, amount) {
    if (!this.pools[pool]) this.addPool({name:pool, key: pool, minimum:0});
    this.pools[pool].modifyPoolAmount(amount);
    queues.trigger('poolModified');
  }
}

const queues = Object.create({
  addQueue(name){
    if(!queues[name]) queues[name] = new ModInc();
  }
});

queues.island = new ModInc();

riot.observable(queues);

export default queues;
