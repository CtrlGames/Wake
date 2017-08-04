import tba from 'TBAManager.js';
import inc from 'INCInstances.js';

function gameTick(){
  addMoocher();
};

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

export function start () {
  inc.on('tick', gameTick);
}

export function stop () {
  inc.off('tick', gameTick);
}
