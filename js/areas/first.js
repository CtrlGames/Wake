import tba from 'TBAInstance.js';

const downBeach = tba.addRoom({
  key: 'downBeach',
  name: 'Down Beach',
  description: function(){
    return 'You\'re on a beach.' ;
  },
  actions: [
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
        return 'you fail to do anything, you suck.';
      }
    }
  ]
});

const upBeach = tba.addRoom({
  key: 'upBeach',
  name: 'Up Beach',
  description: 'The beach is clear.',
  actions: [
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
      text: 'Gather sticks',
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
  actions: []
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
});

upBeach.addExit({
  key: 'down beach',
  accessor: /down.*beach|down/,
  room: downBeach,
  description: 'You can go down the beach'
});