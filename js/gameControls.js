import inc from 'INCInstances.js';

function getButton(group, name) {
  return config[group].filter(e => e.name === name)[0];
}

const config = {
  tools: [
    {
      name: 'fishing pole', key: 'fishing pole',
      requirements: { wood: 1, string: 1 },
      method(){
        inc.island.modifyPoolAmount('fishing pole', 1, getButton('tools', 'fishing pole'));
      }
    }
  ],
  buildings: [
    {
      name: 'hut', key: 'hut',
      requirements: { wood: 2 },
      method(){
        inc.island.modifyPoolAmount('hut', 1, getButton('buildings', 'hut'));
      }
    }
  ]
};

export default config;
