import * as storage from 'storage.js';
import { default as TBA, Room, Item } from 'lib/TBAEngine.js';

var tbaStorage = storage.get('tbaStorage') || {};
var itemsForRoom = {};

class modTba extends TBA {
  constructor(){
    super();
  }
  addRoom(descriptor){
    this.rooms[descriptor.key] = new modRoom(descriptor, this);
    if(descriptor.state) loadState(this.rooms[descriptor.key]);
    return this.rooms[descriptor.key];
  }
  log(output, className){
    tba.trigger('log', {output, className});
  }
  createItem(descriptor){
    if(descriptor.state) loadState(descriptor);
    return new modItem(descriptor, null, this);
  }
  loadItem(location, descriptor){
    var store = tbaStorage[descriptor.key];
    if (store) {
      location = store.location;
      if (store.location === 'inventory') {
        tba.inventory[descriptor.key] = tba.createItem(descriptor);
      }
    }

    if (this.rooms[location]) this.rooms[location].addItem(descriptor);
    else {
      if(!itemsForRoom[location]) itemsForRoom[location] = [];
      itemsForRoom[location].push(tba.createItem(descriptor));
    }
  }
  wakeUp(){
    this.log('You wake up on a rough sand beach. Calm waves rush up beside you.');
  }
  enterRoom(room){
    storage.set('currentLocation', room.key);
    return super.enterRoom(room);
  }
}

class modRoom extends Room {
  constructor(...args){
    super(...args);
    if (itemsForRoom[this.key]) {
      for (var i = 0, l = itemsForRoom[this.key].length; i < l; i++) {
        this.addItem(itemsForRoom[this.key][i]);
      }
    }
  }
  addItem(descriptor){
    var item = descriptor instanceof Item? descriptor:new modItem(descriptor, this, this.game);
    super.addItem(item);
    if(item.state) loadState(item);
  }
  takeItem(item){
    super.takeItem(item);
    saveItem(item.key, {location: 'inventory'});
  }
}

class modItem extends Item {
  constructor(...args){
    super(...args);
  }
  drop(){
    super.drop();
    saveItem(this.key, {location: this.game.currentRoom.key});
  }
}

const tba = new modTba();
riot.observable(tba);

addTrigger('enterRoom', 'roomChange');
addTrigger('input', 'output');

// handy shortcut to add observable triggers to the tba methods
function addTrigger(method, eventName){
  tba[method] = function (...args) {
    var ret = tba.__proto__[method].apply(tba, args);
    tba.trigger(eventName, ret, ...args);
    return ret;
  };
}

function saveItem(key, details){
  var target = tbaStorage[key] || {};
  tbaStorage[key] = Object.assign(target, details);
  storage.set('tbaStorage', tbaStorage);
}

function loadState(ob){
  var state = tbaStorage['state-'+ob.key];
  if (state) ob.state = state;
  ob.setState = setState;
}

function setState(key, val){
  this.state[key] = val;
  saveItem('state-'+this.key, this.state);
}

export default tba;
