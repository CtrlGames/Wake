import tba from 'TBAManager.js'; // setup the TBA

riot.mixin('tba', {tba:tba});
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
