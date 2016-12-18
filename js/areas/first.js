import tba from 'TBAInstance.js';
import * as storage from 'storage.js';
import * as inc from 'INCInstances.js';

const downBeach = tba.addRoom({
  key: 'downBeach',
  name: 'Down Beach',
  description(){
    return 'You\'re on a beach.' ;
  },
  actions: [
    {
      command: /catch fish/,
      locationButton: true,
      text: 'catch fish',
      method(){
        return 'You have no fishing pole.';
      }
    }
  ]
});

downBeach.addItem({
  name: 'rock',
  description: 'There is a rock.',
  actions: [
    {command: /take/, method(){
      if(this.room){
        this.room.takeItem(this);
        return 'rock taken';
      }
    }},
    {command: /throw rock(.*)/, method(){
      //var targetText = this.regExpMatchs.command[1];
      //var target = this.game.findTarget(targetText);
      this.drop();
      return 'You throw the rock';
    }}
  ]
});

const upBeach = tba.addRoom({
  key: 'upBeach',
  name: 'Up Beach',
  enterInit(){
    this.trigger('cardActivate', 'location-actions');
  },
  actions: [
    {
      locationButton: true,
      text: 'search shipwreck',
    },
  ]
});

upBeach.addItem({
  name: 'shipwreck',
  accessor: /(ship)?wreck/,
  description: 'There is a shipwreck.',
  actions: [
    {
      command: /search/,
      locationButton: true,
      text: 'search shipwreck',
      method(){
        var find = Math.random();
        if(find < 0.3) {
          this.game.trigger('cardActivate', 'increment-pools');
          if (!inc.queues.island.pools.string) inc.queues.island.addPool({name:'String', key: 'string', minimum:0});
          inc.queues.island.pools.string.modifyPoolAmount(1);
          this.game.trigger('poolInc');
          return 'You find some string.';
        }
        return "you don't find anything.";
      }
    },
  ]
});

const forest = tba.addRoom({
  key: 'forest',
  name: 'Forest Path',
  description: 'There are small trees all around, the brush is too thick to continue',
  enterInit(){
    this.trigger('cardActivate', 'location-actions');
  },
  actions: [
    {
      command: /clear path/,
      locationButton: true,
      text: 'Clear Path',
      method(){
        this.game.trigger('cardActivate', 'increment-pools');
        if (!inc.queues.island.pools.wood) inc.queues.island.addPool({name:'Wood', key: 'wood', minimum:0});
        inc.queues.island.pools.wood.modifyPoolAmount(1);
        this.game.trigger('poolInc');
        return 'you pick up a stick, big whoop, wanna fight about it?';
      }
    }
  ]
});

downBeach.addExit({
  key: 'up beach',
  accessor: /up.*beach|up/,
  room: upBeach,
  description: 'You can go up the beach'
});

downBeach.addExit({
  key: 'forest',
  accessor: /forest|inland|in/,
  room: forest,
  description: 'you can go inland.'
});

upBeach.addExit({
  key: 'down beach',
  accessor: /down.*beach|down/,
  room: downBeach,
  description: 'You can go down the beach.'
});

upBeach.addExit({
  key: 'forest',
  accessor: /forest|inland/, 
  room: forest,
  description: 'you can go inland.'
});


forest.addExit({
  key: 'down beach',
  accessor: /down.*beach|down/,
  room: downBeach,
  description: 'You can go down the beach.'
});

forest.addExit({
  key: 'up beach',
  accessor: /up.*beach|up/,
  room: upBeach,
  description: 'You can go up the beach.'
});
