import tba from 'TBAInstance.js';
import inc from 'INCInstances.js';
import pools from 'incPools.js';

const moocher = tba.createItem({
  key: 'moocher',
  accessor: /creature|moocher/,
  description: 'A creature is watching you.',
  detail(){ 
    var details = [
      "It's a small creature with large eyes and a fox-like face",
      "It looks hungry",
      "It looks inteligent"
    ];
    return details[Math.floor(Math.random()*details.length)];
  },
  init(){
    inc.on('poolModified', moocherTick);
    if (inc.island.getPoolAmount('moochers') === 0) inc.island.modifyPoolAmount('moochers', 1);
  },
  cleanup(){
    inc.off('poolModified', moocherTick);
    if (inc.island.getPoolAmount('moochers') > 0) inc.island.modifyPoolAmount('moochers', -1);
  },
  hitWithRock: moocherFlee,
  wander () {
    if (Math.random() <= 0.2) {
      let i = Math.floor(Math.random()*this.room.exitList.length);
      let exit = this.room.exits[this.room.exitList[i]];
      let exitKey = exit.room ? exit.room.key : /.*\/(.*)\.js/.exec(exit.file)[1];

      if (this.game.rooms[exitKey]) {

        if (this.room === this.game.currentRoom) tba.trigger('log', `The creature scurries ${exit.description}`);
        else if (exitKey === this.game.currentRoom.key) tba.trigger('log', "A creature enters the area");

        this.room.moveItem(this, this.game.rooms[exitKey]);
      }
    }
  },
  actions: [
    {command: /feed/, method(){
      if(inc.island.getPoolAmount('food') <= 0) return 'You have no food.';
      inc.island.modifyPoolAmount('food', -1);
      if (inc.island.getPoolAmount('moochers') === null || inc.island.getPoolAmount('moochers') === 0){
        inc.island.modifyPoolAmount('moochers', 1, pools['moochers']);
        tba.trigger('updateLocationAction');
      }
      return 'You feed the creature, It looks ready to work';
    }},
    {command: /speak|talk|tell/, method(){
      var responses = [
        "You're very tall.",
        "That is a nice looking rock you've got.",
        "Sometimes I like to look up at the sky and dream.",
        "We won't stay long if there isn't a place to sleep.",
        "We fear the beast.",
        "The beast will eat us."
      ];
      return `<i>"${responses[Math.floor(Math.random()*responses.length)]}"</i>`;
    }},
    {command: /yell|shout/, method(){
      var responses = [
        "Tears well up in the creature's eyes.",
        "The creature scowls angrily at you.",
        "The creature ignores you"
      ];
      return responses[Math.floor(Math.random()*responses.length)];
    }},
    {command: /hit|kick|slap/, method: moocherFlee}
  ]
});

var moocherTick = function () {
  if(moocher.room) { 
    if(inc.island.getPoolAmount('moochers') !== 0){
      if(Math.random() > 0.2) moocher.wander();
    }
    else moocher.room.removeItem(moocher);
  }
};

function moocherFlee () {
  moocher.room.removeItem(moocher);
  var responses = [
    "Tears well up in the creature's eyes and it runs away.",
    "The creature screaches at you and flees. ",
    "You quickly loose sight of the creature as it flees."
  ];
  return responses[Math.floor(Math.random()*responses.length)];
}

window.whereMooch = function(){
  return moocher.room.key;
}

export default moocher;
