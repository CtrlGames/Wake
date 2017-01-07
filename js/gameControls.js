import inc from 'INCInstances.js';
import tba from 'TBAInstance.js';
import pools from 'incPools.js';

const config = {
  tools: [
    {
      name: 'fishing pole',
      method(){
        inc.island.modifyPoolAmount('fishing pole', 1, pools['fishing pole']);
        tba.log("You are able to create a makeshift fishing pole.");
      }
    }
  ],
  buildings: [
    {
      name: 'hut',
      method(){
        inc.island.modifyPoolAmount('hut', 1, pools.hut);
        tba.log("You construct a small hut. Note that in the future this will take some time, and you will be able to add workers to speed it up.");
      }
    }
  ]
};

export default config;
