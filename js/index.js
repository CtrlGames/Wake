import tba from 'TBAManager.js'; // setup the TBA
import inc from 'INCInstances.js';
import * as storage from 'storage.js';
import controls  from 'crafts.js';
import incPools from 'incPools.js';
import * as gameTick from 'gameTick.js';
import * as utils from 'utils.js';

import blah from 'items/fisher.js';

riot.mixin('tba', {tba:tba});
riot.mixin('inc', {inc:inc});
riot.mixin('utils', {utils:utils});
riot.mixin('storage', {storage:storage});
riot.mixin('controls', {controls:controls});
riot.mixin('incPools', {incPools:incPools});
riot.mixin('scrollinit', {
  scrollinit: {
    vertical(elm){
      window.Ps.initialize(elm, {
        suppressScrollX: true,
        maxScrollbarLength: 50 
      });
    }
  }
});

// game tick
gameTick.start();

riot.mount('*');
