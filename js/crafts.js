import inc from 'INCInstances.js';
import pools from 'incPools.js';

function checkReq(name, config) {
  if(!config.amount) config.amount = 1;
  if(!config.pass) config.pass = `You are able to create ${name}.`;

  if (!inc.island.pools[name]) inc.island.modifyPoolAmount(name, 0, pools[name]);
  var req = inc.island.pools[name].checkRequirements(config.amount);
  if (req.success) {
    if (typeof config.pass === 'function') return config.pass();
    inc.island.modifyPoolAmount(name, config.amount, pools[name]);
    return config.pass;
  } else {
    if (typeof config.fail === 'function') return config.fail();
    let ret = 'Not enough resources. You need more: ';
    Object.keys(req.unmetRequirements)
      .forEach((e) => ret += '<div class="indent item">' + e + ': ' + req.unmetRequirements[e] + '</div>');
    return ret;
  }
}

const config = {
  tools: [
    {
      name: 'fishing pole',
      method(){
        return checkReq(this.name, {
          pass: "You are able to create a makeshift fishing pole."
        });
      }
    }
  ],
  buildings: [
    {
      name: 'hut',
      method(){
        return checkReq(this.name, {
          pass: "You construct a small hut. Note that in the future this will take some time, and you will be able to add workers to speed it up."
        });
      }
    }
  ]
};

export default config;
