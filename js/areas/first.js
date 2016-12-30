import tba from 'TBAInstance.js';
import inc from 'INCInstances.js';

const downBeach = tba.addRoom({
  key: 'downBeach',
  name: 'Down Beach',
  actions: [
    {
      command: /catch fish/,
      locationButton: true,
      text: 'Catch fish',
      method(){
        if (inc.island.getPoolAmount('fishing pole') > 0) {
          const duration = 3000;
          if (this.fishingTimeout) return "You're too tired to fish.";
          this.fishingTimeout = setTimeout(() => delete this.fishingTimeout, duration);
          this.game.trigger('btnTimer-catchfish', duration);

          if (Math.random() > 0.5) {
            var fishSize = Math.ceil(Math.random()*3);
            var fishSizeChart = ['small ', '', 'big '];
            inc.island.modifyPoolAmount('food', fishSize);
            return `You Catch a ${fishSizeChart[--fishSize]}fish.`;
          }
          else return 'You don\'t catch anything';
        }
        return 'You have no fishing pole.';
      }
    }
  ]
});

downBeach.addItem({
  key: 'tide pool',
  accessor: /tide pool|pool/,
  description: 'The water is calm in a large tide pool.',
  detail: 'There are probably fish in there.',
});

downBeach.addItem({
  key: 'rock',
  description: 'There is a rock.',
  detail: "It's pretty cool, I guess.",
  actions: [
    {command: /take|get|pick up/, method(){
      if(this.room){
        this.room.takeItem(this);
        return 'rock taken';
      }
    }},
    {command: /throw(.*)/, method(){
      if (this.room) return 'You are not holding the rock.';
      var targetText = this.regExpMatchs.command[1];
      var target = this.game.findTarget(targetText);
      this.drop();
      if (target && target.hitWithRock) return 'You throw the rock. '+target.hitWithRock();
      else return 'You throw the rock.';
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
      text: 'Search shipwreck',
    },
  ]
});

upBeach.addItem({
  key: 'shipwreck',
  accessor: /ship|wreck/,
  description: 'The shipwreck is here.',
  detail: 'You can probably find some things in here if you <b>search</b> it.',
  hitWithRock(){
    return 'There is a satisfying clang.';
  },
  actions: [
    {command: /search/, method(){
      const duration = 1000;
      if (this.searchTimer) return "You can't do it...";
      this.searchTimer = setTimeout(()=> delete this.searchTimer, duration);
      this.game.trigger('btnTimer-searchshipwreck', duration);
      var find = Math.random();
      if (find < 0.3) {
        this.game.trigger('cardActivate', 'increment-pools');
        inc.island.modifyPoolAmount('string', 1);
        return 'You find some string.';
      }
      return "you don't find anything.";
    }},
  ]
});

const forest = tba.addRoom({
  key: 'forest',
  name: 'Forest Path',
  description: 'There are small trees all around, the brush is too thick to continue.',
  enterInit(){
    this.trigger('cardActivate', 'location-actions');
  },
  actions: [
    {
      command: /clear (path|brush)/,
      locationButton: true,
      text: 'Clear path',
      method(){
        const duration = 5000;
        if (this.clearTimeout) return 'You fail.';
        this.clearTimeout = setTimeout(() => delete this.clearTimeout, duration);
        this.game.trigger('btnTimer-clearpath', duration);
        this.game.trigger('cardActivate', 'increment-pools');
        inc.island.modifyPoolAmount('wood', 1);
        return 'you pick up a stick, big whoop, wanna fight about it?';
      }
    }
  ]
});

forest.addItem({
  key: 'brush',
  detail: "This will need to be cleared if you want to continue."
});

// Exits

downBeach.addExit({
  key: upBeach.key,
  accessor: /up.*beach|up/,
  room: upBeach,
  description: 'You can go up the beach.'
});

downBeach.addExit({
  key: forest.key,
  accessor: /forest|inland|in/,
  room: forest,
  description: 'you can go inland.'
});

upBeach.addExit({
  key: downBeach.key,
  accessor: /down.*beach|down/,
  room: downBeach,
  description: 'You can go down the beach.'
});

upBeach.addExit({
  key: forest.key,
  accessor: /forest|inland|in/, 
  room: forest,
  description: 'you can go inland.'
});


forest.addExit({
  key: downBeach.key,
  accessor: /down.*beach|down/,
  room: downBeach,
  description: 'You can go down the beach.'
});

forest.addExit({
  key: upBeach.key,
  accessor: /up.*beach|up/,
  room: upBeach,
  description: 'You can go up the beach.'
});
