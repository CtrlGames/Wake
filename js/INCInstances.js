import INC from 'lib/INCEngine.js';

class ModInc extends INC {
  constructor(){
    super();
  }
  addPool(arg){
    super.addPool(arg);
    addTrigger(this.pools[arg.key], 'modifyPoolAmount', 'poolModified');
  }
}

function addTrigger (obj, meth, event) {
  var original = obj[meth];
  obj[meth] = function(...args){
    original.call(obj, ...args);
    queues.trigger(event);
  };
}

export const queues = {
  island: new ModInc()
};

riot.observable(queues);

export function addQueue(name){
  if(!queues[name]) queues[name] = new ModInc();
}
