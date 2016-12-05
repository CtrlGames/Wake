import tba from 'TBAInstance.js';
import * as storage from 'storage.js';
import * as inc from 'INCInstances.js';

const downBeach = tba.addRoom({
  key: 'downBeach',
  name: 'Down Beach',
  description: function(){
    return 'You\'re on a beach.' ;
  },
  actions: [
    {
      command: /help/,
      method: function(){
        this.game.trigger('hint', 'there is no help for you', 3000);
      }
    },
    {
      command: /please/,
      method: function(){
        this.game.trigger('hint', 'no, you\'re done, dude.', 3000);
      }
    },
    {
      command: /gather dirt/,
      locationButton: true,
      text: 'Gather dirt',
      method: function(){
        return 'you fail to do anything, you suck.';
      }
    },
    {
      command: /gather rocks/,
      locationButton: true,
      text: 'Gather rocks',
      method: function(){
        return 'you fail to do anything, you suck.';
      }
    },
    {
      command: /gather fish/,
      locationButton: true,
      text: 'Gather fish',
      method: function(){
        return 'you fail to do anything, you suck.';
      }
    },
    {
      command: /gather sticks/,
      locationButton: true,
      text: 'Gather Sticks',
      method: function(){
        inc.queues.island.pools.wood.modifyPoolAmount(1);
        this.game.trigger('poolInc');
        return 'you pick up a stick, big whoop, wanna fight about it?';
      }
    }
  ]
});

const upBeach = tba.addRoom({
  key: 'upBeach',
  name: 'Up Beach',
  description: 'The beach is clear.',
  enterInit: function(){
    if (!~storage.get('activeCards').indexOf('location-actions')) this.trigger('cardActivate', 'location-actions');
  },
  actions: [
    {
      command: /gather fish/,
      locationButton: true,
      text: 'Gather fish',
      method: function(){
        this.game.trigger('cardActivate', 'increment-pools');
        return 'you get a fish, but have no way to carry it, you suck.';
      }
    },
    {
      command: /gather sticks/,
      locationButton: true,
      text: 'Gather sticks',
      method: function(){
        this.game.trigger('cardActivate', 'game-controls');
        return 'you fail to do anything, you suck.';
      }
    },
    {
      command: /gather rocks/,
      locationButton: true,
      text: 'Gather rocks',
      method: function(){
        return 'you fail to do anything, you suck.';
      }
    },
    {
      command: /gather dirt/,
      locationButton: true,
      text: 'Gather Dirt',
      method: function(){
        return 'you fail to do anything, you suck.';
      }
    },
    {
      command: /gather water/,
      locationButton: true,
      text: 'Gather water',
      method: function(){
        return 'you fail to do anything, you suck.';
      }
    }
  ]
});

const forest = tba.addRoom({
  key: 'forest',
  name: 'Forest Path',
  description: 'The brush is too thick to continue',
  enterInit: function(){
    this.trigger('cardActivate', 'location-actions');
  },
  actions: [
    {
      command: /clear path/,
      locationButton: true,
      text: 'Clear Path',
      method: function() {
        return 'No... I will not clear the path.';
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
  accessor: /forest|inland/,
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
