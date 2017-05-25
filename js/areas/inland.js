import tba from 'TBAInstance.js';
import inc from 'INCInstances.js';

const inland = tba.addRoom({
  key: 'inland',
  name: 'Forest Path',
  accessor: /forest|inland|in/,
  exitDescription: 'inland',
  description(){
    return this.state.blocked?
    'There are small trees all around, the brush is too thick to continue.':
    'There are small trees all around.';
  },
  enterInit(){
    this.trigger('cardActivate', 'location-actions');
  },
  state: {
    blocked: true
  },
  actions: [
    {
      command: /clear (area|brush)/,
      locationButton: true,
      text: 'Clear area',
      method(){
        const duration = 5000;
        if (this.clearTimeout) return 'You fail.';
        this.clearTimeout = setTimeout(() => delete this.clearTimeout, duration);
        this.game.trigger('btnTimer-cleararea', duration);
        this.game.trigger('cardActivate', 'increment-pools');
        inc.island.modifyPoolAmount('wood', 1);
        if (this.state.blocked && inc.island.getPoolAmount('wood') > 1){
          addForestExit();
          inland.loadExits();
          this.setState('blocked', false);
          return 'The path is much clearer now.';
        }
        return 'you pick up a stick, big whoop, wanna fight about it?';
      }
    }
  ]
});

inland.addItem({
  key: 'brush',
  detail(){
    return this.game.currentRoom.state.blocked? 
      "This will need to be cleared if you want to continue.":
      "This is a good source of wood.";
  } 
});

inland.addExit({ file: 'areas/downBeach.js' });
inland.addExit({ file: 'areas/upBeach.js' });

if (!inland.state.blocked) addForestExit();

function addForestExit() {
  inland.addExit({ file: 'areas/forest.js' });
}

export default inland;
