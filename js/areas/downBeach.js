import tba from 'TBAInstance.js';
import inc from 'INCInstances.js';

import rock from 'items/rock.js';

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
            inc.island.modifyPoolAmount('food', fishSize + 1);
            addFirstMoocher(this.game);
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

downBeach.loadItem(rock);

// Exits
downBeach.addExit({ file: 'areas/upBeach.js' });
downBeach.addExit({ file: 'areas/inland.js' });

function addFirstMoocher (game) {
  Promise.all([
    System.import('items/moocher.js'),
    System.import('areas/forest.js')
  ])
  .then( e => {
    game.rooms.forest.loadItem(e[0].default);
  });
}

export default downBeach;
