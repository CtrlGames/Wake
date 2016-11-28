import tba from 'TBAManager.js'; // setup the TBA
import * as inc from 'INCInstances.js';

riot.mixin('tba', {tba:tba});
riot.mixin('inc', {inc:inc});
riot.mixin('scrollinit', {
  scrollinit: {
    vertical(elm){
      Ps.initialize(elm, {
        suppressScrollX: true,
        maxScrollbarLength: 50 
      });
    }
  }
});

riot.mount('*');
