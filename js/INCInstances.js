import INC from 'lib/INCEngine.js';

export const queues = {
	island: new INC()
};

export function addQueue(name){
	if(!queues[name]) queues[name] = new INC();
}


