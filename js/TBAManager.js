import tba from 'TBAInstance.js';
import crafts from 'crafts.js';
import { get as storageGet } from 'storage.js';

var directionMap = {
  'n': 'north',
  's': 'south',
  'w': 'west',
  'e': 'east'
};

var visitedRooms = [];

tba.addGlobalCommand( { command: /help/, method: function(){
  this.game.trigger('hint', 'there is no help for you', 3000);
}});

tba.addGlobalCommand({command: /^look\s?(.*)/, method(){
  var query = this.regExpMatchs.command[1];
  var target;

  if(query.length) target = this.findTargets(query);
  else target = [this.currentRoom];

  if(!target.length) return 'Nothing interesting';
  else return target.map(t => t.detail || t.getDescription()).join(' ');
}});

tba.addGlobalCommand({command: /^(go|g)\s(.*)/, method(){
  var direction = this.regExpMatchs.command[2];
  if(/^[nesw]$/.test(direction)) direction = directionMap[direction];

  for (var key in this.currentRoom.exits) {
    if(this.currentRoom.exits.hasOwnProperty(key)) {
      if(this.currentRoom.exits[key].accessor.test(direction)) {
        var room = this.currentRoom.exits[key].room;
        this.enterRoom(room).then(e => {
          var command = this.regExpMatchs.command[0];
          if (~visitedRooms.indexOf(room.key)) return tba.trigger('log', {output: this.currentRoom.name, command});
          visitedRooms.push(this.currentRoom.key);
          tba.trigger('log', {output: e, command});
        });
        return null;
      }
    }
  }

  return this.invalidExit;
}});

tba.addGlobalCommand({command: /(take|pick up|get)\s?(.*)/, method(){
  var target = this.findTarget(this.regExpMatchs.command[2]);
  if(!target || !target.getCommand('take')) return 'Cannot take that.';
  else if(!target.room) return target.key+' already taken';
}});

tba.addGlobalCommand({command: /^drop\s?(.*)/, method(){
  var query = this.regExpMatchs.command[1];
  var target = this.findTarget(query);
  if(!target) {
    if(!query.length) return 'Drop what?';
    else return 'You\'re not carrying that.';
  }
  if(!target.getCommand('drop')) {
    if(!this.inventory[target.key]) return 'You\'re not carrying that.';
    else {
      target.drop();
      return target.key + ' dropped.';
    }
  }
}});

tba.addGlobalCommand({command: /^make\s(.*)/, method(){
  var query = this.regExpMatchs.command[1];
  var craft = findCraftInName(query);
  return craft.method();
}});

tba.addGlobalCommand({command: /^i$|inventory/, method(){
  return this.inventoryList.length? 
    this.inventoryList.map(e=>this.inventory[e].name).join('\n')
    : this.emptyInventory;
}});

var currentRoom = storageGet('currentLocation') || 'downBeach';
System.import(`areas/${currentRoom}.js`).then(d => {
  tba.enterRoom(d.default);
  visitedRooms.push(d.default.key);
});

function findCraftInName (name){
  for (let key in crafts) {
    if (!crafts.hasOwnProperty) continue;
    for (let i = 0; i < crafts[key].length; i++){
      if (!!~name.indexOf(crafts[key][i].name)) return crafts[key][i]
    }
  }
}

export default tba;
