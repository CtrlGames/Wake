import tba from 'TBAInstance.js';

const rock = tba.createItem({
  key: 'rock',
  description(){
    if (this.game.currentRoom.key === 'downBeach' && this.game.currentRoom.items['tide pool'].state.hasRock) return 'There is a rock in the pool.';
    return 'There is a rock.';
  },
  detail(){
    if(this.state.wet) return "The rock is wet";
    if(this.state.chipped) return "The rock is chipped";
    return "It's pretty cool, I guess.";
  },
  state: {
    wet: false,
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

export default rock;
