import tba from 'TBAInstance.js';
import inc from 'INCInstances.js';

const upBeach = tba.addRoom({
  key: 'upBeach',
  name: 'Up Beach',
  accessor: /up.*beach|up/,
  exitDescription: 'up the beach',
  description: 'The shipwreck is here.',
  enterInit(){
    this.trigger('cardActivate', 'location-actions');
  },
  actions: [
    {
      inc: 'searcher',
      locationButton: true,
      text: 'Search shipwreck',
    },
  ]
});

upBeach.addItem({
  key: 'shipwreck',
  accessor: /ship|wreck/,
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
      if (find < 0.6) {
        this.game.trigger('cardActivate', 'increment-pools');
        inc.island.modifyPoolAmount('string', 1);
        return 'You find some string.';
      }
      return "you don't find anything.";
    }},
  ]
});

upBeach.addExit({ file: 'areas/downBeach.js' });
upBeach.addExit({ file: 'areas/inland.js' });

export default upBeach;
