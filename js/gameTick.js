import tba from 'TBAManager.js';
import inc from 'INCInstances.js';

function gameTick(){
  addMoocher();
  managePopulation();
}

function poolModified(pool){
  if(pool && pool.details.group === 'workers' && pool.key !== 'moochers') manageWorkerInstances(pool);
} 

function addMoocher() {
  // we will want to reduce the respawn chance, or have a timeoutout
  // ideally chance will be calculated based on current population/housing and food availibility
  var chance = Math.random() < 0.1;
  var mooch = tba.findItem('moocher');
  if (!mooch && inc.island.getPoolAmount('food') > 0 && chance) {
    Promise.all([
      System.import('items/moocher.js'),
      System.import('areas/forest.js')
    ])
    .then( e => {
      tba.rooms.forest.loadItem(e[0].default);
    });
  }
}

function managePopulation(){
  var workers = inc.island.getGroup('workers');
  var popCap = inc.island.pools.hut? inc.island.pools.hut.amount*2:0;
  var curPop = workers.getTotal();
  var chance = Math.random() < 0.1; // we don't want them to leave every tick just randomly
  if (curPop > popCap && chance) tba.log('Some of your workers have left because they have no place to stay.');
  while (curPop > popCap && chance) {
    if (workers.pools.moochers.amount) inc.island.modifyPoolAmount('moochers', -1);
    else {
      let i = 0;
      let list = workers.list();
      while (!workers.pools[list[i]].amount) i++
      inc.island.modifyPoolAmount(workers.pools[list[i]].key, -1);
    }
    curPop = workers.getTotal();
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
