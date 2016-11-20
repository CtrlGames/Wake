var validGetters = ['detail', 'description', 'accessor', 'name'];

function TBAEngine(){

  this.actions = [];
  this.conditions = [];
  this.currentRoom = null;
  this.emptyInventory = "Empy inventory";
  this.invalidCommand = "Invalid Command";
  this.invalidExit = "Cannot go there";
  this.inventory = {};
  this.rooms = {};

};

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

    // call commands on targets
    for (let i = 0, il = targets.length; i < il; i++) {
      let target = targets[i];
      if(!target.actions) continue;
      for (let j = 0, jl = target.actions.length; j < jl; j++) {
        let action = target.actions[j];
        if (action.command.test(input)) {
          target.regExpMatchs = {
            target: target.accessor? target.accessor.exec(input):null,
            command: action.command.exec(input)
          };
          ret.push(action.method.call(target));
        }
      }
    }

    output = ret.filter(function(n){ return !!n; }).join(' ');
    return output.length? output:this.invalidCommand;
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
    return this.findTargets(input)[0]
  },

  enterRoom(room) {
    this.currentRoom = room;
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

Object.defineProperty(TBAEngine.prototype, "inventoryList", {
  get(){return Object.keys(this.inventory)}
});

Object.defineProperty(TBAEngine.prototype, "roomList", {
  get(){return Object.keys(this.rooms)}
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
    discriptor.accessor = discriptor.accessor || new RegExp(discriptor.key, "i");
    this.exits[discriptor.key] = discriptor;
  },

  takeItem(item) {
    this.game.inventory[item.key] = item;
    delete item.room;
    this.removeItem(item.key);
  },

  removeItem(key) {
    delete this.items[key];
  },

  getDescription(){
    var ret = [this.description];
    ret = ret.concat(this.itemList.map(x=>this.items[x].description));
    ret = ret.concat(this.exitList.map(x=>this.exits[x].description));
    return ret.join(" ");
  }

};

Object.defineProperty(Room.prototype, 'itemList', {
  get(){ return Object.keys(this.items); }
});

Object.defineProperty(Room.prototype, 'exitList', {
  get(){ return Object.keys(this.exits); }
});

// Object construction --------------

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

export default TBAEngine;
