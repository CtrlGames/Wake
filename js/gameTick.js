import tba from 'TBAManager.js';
import inc from 'INCInstances.js';

function gameTick(){
  addMoocher();
};

function poolModified(pool){
  if(pool && pool.details.group === 'workers' && pool.key !== 'moochers') manageWorkerInstances(pool);
} 

function addMoocher() {
  // we will want to reduce the respawn chance, or have a timeoutout
  // ideally chance will be calculated based on current population/housing 
  if (Math.random() < 0.1 && inc.island.getPoolAmount('food') > 0 && !tba.findItem('moocher')) {
    Promise.all([
      System.import('items/moocher.js'),
      System.import('areas/forest.js')
    ])
    .then( e => {
      console.log('adding moocher');
      tba.rooms.forest.loadItem(e[0].default);
    });
  }
}

function manageWorkerInstances (pool) {
  if(pool.amount > 0 && !tba.findItem(pool.key)){
    System.import(`items/${pool.key}.js`).then(e => tba.createItem(e.default, pool.details.defaultArea))
  }
  else if(pool.amount === 0 && tba.findItem(pool.key)){
    tba.removeItem(pool);
  }
}

export function start () {
  inc.on('tick', gameTick);
  inc.on('poolModified', poolModified);
}

export function stop () {
  inc.off('tick', gameTick);
  inc.off('poolModified', poolModified);
}
