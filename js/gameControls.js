import inc from 'INCInstances.js';
import tba from 'TBAInstance.js';

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
        tba.log("You are able to create a makeshift fishing pole.");
      }
    }
  ],
  buildings: [
    {
      name: 'hut', key: 'hut',
      requirements: { wood: 2 },
      method(){
        inc.island.modifyPoolAmount('hut', 1, getButton('buildings', 'hut'));
        tba.log("You construct a small hut. Note that in the future this will take some time, and you will be able to add workers to speed it up.");
      }
    }
  ]
};

export default config;
