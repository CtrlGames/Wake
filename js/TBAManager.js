import tba from 'TBAInstance.js';
import 'areas/first.js'; // load the first area

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
        var roomDescription = this.enterRoom(this.currentRoom.exits[key].room);
        if (~visitedRooms.indexOf(key)) return this.currentRoom.name;
        visitedRooms.push(this.currentRoom.key);
        return roomDescription;
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

tba.addGlobalCommand({command: /inventory/, method(){
  return this.inventoryList.length? 
    this.inventoryList.map(e=>this.inventory[e].name).join('\n')
    : this.emptyInventory;
}});

tba.currentRoom = tba.rooms.downBeach;
visitedRooms.push(tba.rooms.downBeach.key);

// custom methods
tba.wakeUp = function (){
  this.log('You wake up on a rough sand beach. Calm waves rush up beside you.');
};

export default tba;
