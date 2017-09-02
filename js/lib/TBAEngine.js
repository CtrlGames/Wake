var validGetters = ['detail', 'description', 'accessor', 'name'];

function TBAEngine(){

  this.actions = [];
  this.conditions = [];
  this.currentRoom = null;
  this.emptyInventory = 'Empy inventory';
  this.invalidCommand = 'Invalid Command';
  this.invalidExit = 'Cannot go there';
  this.inventory = {};
  this.rooms = {};

}

TBAEngine.prototype = {

  input(input) {
    var ret = [];
    var output;

    for (var i = 0, l = this.conditions.length; i < l; i++) {
      var condition = this.conditions[i];
      if(!condition.check.call(this)) ret.push(condition.failText);
    }
    if(ret.length) return ret.join(' ');

    input = input.toLocaleLowerCase();

    // get a list of targets including the game and current room
    var targets = this.findTargets(input, [this,this.currentRoom]);
    var gotCommand = false;

    // call commands on targets
    for (let i = 0, il = targets.length; i < il; i++) {
      let target = targets[i];
      if(!target.actions) continue;
      for (let j = 0, jl = target.actions.length; j < jl; j++) {
        let action = target.actions[j];
        if (action.command && action.command.test(input)) {
          target.regExpMatchs = {
            target: target.accessor? target.accessor.exec(input):null,
            command: action.command.exec(input)
          };
          ret.push(action.method.call(target));
          gotCommand = true;
        }
      }
    }

    output = ret.filter(function(n){ return !!n; }).join(' ');
    return gotCommand? output:this.invalidCommand;
  },

  addCondition(condition) {
    this.conditions.push(condition);
  },

  addRoom(descriptor) {
    this.rooms[descriptor.key] = new Room(descriptor, this);
    return this.rooms[descriptor.key];
  },

  createItem(descriptor) {
    return new Item(descriptor, null, this);
  },

  findTargets(input, targets) {
    return (targets || []).concat(
      this.currentRoom.itemList.filter(e=>this.currentRoom.items[e].accessor.test(input)).map(e=>this.currentRoom.items[e]),
      this.inventoryList.filter(e=>this.inventory[e].accessor.test(input)).map(e=>this.inventory[e])
    );
  },

  findTarget(input) {
    return this.findTargets(input)[0];
  },

  enterRoom(room) {
    this.currentRoom = room;
    if (this.currentRoom.enterInit) this.currentRoom.enterInit.call(this);
    return room.getDescription();
  },

  addGlobalCommand(descriptor) {
    this.actions.push(descriptor);
  },

  removeGlobalCommand(input) {
    var index = this.actions.findIndex(e => e.command.test(input));
    this.actions.splice(index, 1);
  }


};

Object.defineProperty(TBAEngine.prototype, 'inventoryList', {
  get(){return Object.keys(this.inventory);}
});

Object.defineProperty(TBAEngine.prototype, 'roomList', {
  get(){return Object.keys(this.rooms);}
});

// Room construction -------------

function Room(descriptor, game) {
  Object.assign(this, descriptor);
  this.exits = {};
  this.game = game || null;
  this.items = {};

  for (var i = 0, l = validGetters.length; i < l; i++) {
    var e = validGetters[i];
    if (typeof this[e] === 'function') Object.defineProperty(this, e, {get:this[e]});
  }
}

Room.prototype = {

  addItem(descriptor) {
    this.items[descriptor.key] = descriptor instanceof Item? descriptor:new Item(descriptor, this, this.game);
    this.items[descriptor.key].room = this;
    if(descriptor.init) descriptor.init.call(this.items[descriptor.key]);
  },

  addExit(discriptor) {
    this.exits[discriptor.key || discriptor.file] = discriptor;
  },

  takeItem(item) {
    this.game.inventory[item.key] = item;
    this.removeItem(item);
  },

  removeItem(item) {
    if(typeof item === 'string') item = this.items[item]
    if (item.cleanup) item.cleanup();
    delete item.room;
    delete this.items[item.key];
  },

  moveItem(item, toRoom){
    delete item.room.items[item.key];
    delete item.room;
    toRoom.items[item.key] = item;
    item.room = toRoom;
  },

  getDescription(){
    var ret = [this.description];
    var exitDescriptions = this.exitList.filter(e => !!this.exits[e].description).map(e => this.exits[e].description);
    ret = ret.concat(this.itemList.map(x=>this.items[x].description)).join(' ');
    if (exitDescriptions.length){
      ret += '<div class="exits">You can go: ';
      ret += exitDescriptions.join(', ');
      ret += '</div>';
    }
    return ret;
  }

};

Object.defineProperty(Room.prototype, 'itemList', {
  get(){ return Object.keys(this.items); }
});

Object.defineProperty(Room.prototype, 'exitList', {
  get(){ return Object.keys(this.exits); }
});

// Object construction

function Item(descriptor, room, game) {
  Object.assign(this, descriptor);

  this.accessor = this.accessor || new RegExp(this.key);
  this.actions = this.actions || [];
  this.game = game || null;
  this.name = this.name || this.key;
  this.room = room || null;


  for (var i = 0, l = validGetters.length; i < l; i++) {
    var e = validGetters[i];
    if (typeof this[e] === 'function') Object.defineProperty(this, e, {get:this[e].bind(this)});
  }
}

Item.prototype = {

  getDescription(){
    return this.description;
  },

  getCommand(input){
    return this.actions[this.actions.findIndex(e=>e.command.test(input))];
  },
  
  drop(){
    if(this.game.inventory[this.key]){
      this.game.currentRoom.addItem(this);
      delete this.game.inventory[this.key]; 
    }
  }

};

export { TBAEngine as default, Room , Item };
