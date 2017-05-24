import tba from 'TBAInstance.js';
import inc from 'INCInstances.js';

const downBeach = tba.addRoom({
  key: 'downBeach',
  name: 'Down Beach',
  accessor: /down.*beach|down/,
  exitDescription: 'down the beach',
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

          if (!this.items['tide pool'].state.hasRock && Math.random() > 0.5) {
            var fishSize = Math.floor(Math.random()*3);
            var fishSizeChart = ['small ', '', 'big '];
            inc.island.modifyPoolAmount('food', fishSize);
            return `You Catch a ${fishSizeChart[fishSize]}fish.`;
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
  state: {
    hasRock: false,
  },
  description: 'The water is calm in a large tide pool.',
  detail(){
    if (this.state.hasRock) return 'The rock probably scared the fish away.';
    else return 'There are probably fish in there.';
  },
  hitWithRock(){
    var rock = this.game.currentRoom.items.rock;
    this.setState('hasRock', true);
    rock.setState('wet', true);
    rock.setState('location', this.key);
    return "It splashes into the pool.";
  }
});

tba.loadItem('downBeach', {
  key: 'rock',
  description(){
    if (this.game.currentRoom.key === 'downBeach' && this.game.currentRoom.items['tide pool'].state.hasRock) return 'There is a rock in the pool.';
    return 'There is a rock.';
  },
  detail(){
    if(this.state.wet) return "The rock is wet";
    return "It's pretty cool, I guess.";
  },
  state: {
    wet: false,
    location: null
  },
  actions: [
    {command: /take|get|pick up/, method(){
      if(this.room){
        this.room.takeItem(this);
        if (this.state.location === 'tide pool') {
          setTimeout(()=>this.setState('wet', false), 9000);
          this.game.currentRoom.items[this.state.location].setState('hasRock', false);
          this.setState('location', null);
          return 'you pick up the wet rock.';
        }
        return 'rock taken.';
      }
    }},
    {command: /throw(.*)/, method(){
      if (this.room) return 'You are not holding the rock.';
      var targetText = this.regExpMatchs.command[1];
      var target = this.game.findTarget(targetText);
      this.drop();
      if (target && target.hitWithRock) return 'You throw the rock. '+target.hitWithRock();
      else return 'You throw the rock.';
    }},
    {command: /dry/, method(){
      if(!this.state.wet) return 'the rock is already dry.';
      this.setState('wet', false);
      return 'you dry the rock off';
    }}
  ]
});

// Exits
downBeach.addExit({ file: 'areas/upBeach.js' });
downBeach.addExit({ file: 'areas/inland.js' });

export default downBeach;