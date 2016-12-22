import tba from 'TBAManager.js'; // setup the TBA
import inc from 'INCInstances.js';
import * as storage from 'storage.js';

riot.mixin('tba', {tba:tba});
riot.mixin('inc', {inc:inc});
riot.mixin('storage', {storage:storage});
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

riot.mount('*');
