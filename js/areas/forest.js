import tba from 'TBAInstance.js';

const forest = tba.addRoom({
  key: 'forest',
  name: 'Forest',
  accessor: /forest/,
  exitDescription: 'into the forest',
  description: 'The trees make it seem dark.',
});

forest.addExit({ 
  file: 'areas/inland.js',
  description: 'back',
  accessor: /back/i
});

export default forest;
