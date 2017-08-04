import * as storage from 'storage.js';
import { default as TBA, Room, Item } from 'lib/TBAEngine.js';

var tbaStorage = storage.get('tbaStorage') || {};
var itemLocationMap = tbaStorage.items || [];
var objectStates = tbaStorage.state || {};

// load inventory items
itemLocationMap
  .filter(e => e.location === 'inventory')
  .forEach(e => System.import(e.file)
  .then(e => tba.inventory[e.default.key] = e.default));

class modTba extends TBA {
  constructor(){
    super();
  }
  addRoom(descriptor){
    this.rooms[descriptor.key] = new modRoom(descriptor, this);
    if(descriptor.state) loadState(this.rooms[descriptor.key]);
    return this.rooms[descriptor.key];
  }
  createItem(descriptor){
    if(descriptor.state) loadState(descriptor);
    return new modItem(descriptor, null, this);
  }
  log(output, className){
    tba.trigger('log', {output, className});
  }
  enterRoom(room){
    this.currentRoom = room;
    return room.loadExits().then( () => {
      storage.set('currentLocation', room.key);
      return super.enterRoom(room);
    });
  }
  findItem(itemKey){
    for (var i = 0; i < itemLocationMap.length; i++) {
      if (itemLocationMap[i].key === itemKey ) return  itemLocationMap[i];
    }
  }
  wakeUp(){
    this.log('You wake up on a rough sand beach. Calm waves rush up beside you.');
  }
}

class modRoom extends Room {
  constructor(...args){
    super(...args);
    itemLocationMap.filter(e => e.location === this.key).forEach(e => {
      System.import(e.file).then(e => this.addItem(e.default));
    });
  }
  addItem(descriptor){
    var item = descriptor instanceof Item? descriptor:new modItem(descriptor, this, this.game);
    super.addItem(item);
    if(item.state) loadState(item);
    return item;
  }
  loadItem(descriptor){
    if(!itemLocationMap.find(e => e.key === descriptor.key)) saveItem(this.addItem(descriptor), this.key);
  }
  takeItem(item){
    super.takeItem(item);
    saveItem(item, 'inventory');
  }
  removeItem(item){
    super.removeItem(item);
    saveRemoveItem(item);
  }
  moveItem(item, toRoom){
    super.moveItem(item, toRoom);
    saveItem(item, toRoom.key);
  }
  loadExits(){
    var promises = Object.keys(this.exits).map(file => System.import(file).then(mapExit.bind(this, this.exits[file])));
    return Promise.all(promises);
  }
}

class modItem extends Item {
  constructor(...args){
    super(...args);
  }
  drop(){
    super.drop();
    saveItem(this, this.game.currentRoom.key);
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

function saveItem(item, location){
  var locationDescriptor = itemLocationMap.find(e => e.key === item.key) || itemLocationMap[itemLocationMap.push({}) - 1];
  locationDescriptor.file = `items/${item.key}.js`;
  locationDescriptor.location = location;
  locationDescriptor.key = item.key;
  tbaStorage.items = itemLocationMap;
  storage.set('tbaStorage', tbaStorage);
}

function saveRemoveItem (item) {
  tbaStorage.items.splice(tbaStorage.items.findIndex(e => e.key === item.key), 1);
  storage.set('tbaStorage', tbaStorage);
  itemLocationMap = tbaStorage.items;
}

function loadState(ob){
  var state = objectStates[ob.key];
  if (state) ob.state = state;
  ob.setState = setState;
}

function setState(key, val){
  this.state[key] = val;
  objectStates[this.key] = this.state;
  tbaStorage.state = objectStates;
  storage.set('tbaStorage', tbaStorage);
}

function mapExit(exit, data){
  data = data.default;
  exit.room = data;
  exit.accessor = exit.accessor || data.accessor || new RegExp(data.key, 'i');
  exit.description = exit.description || data.exitDescription;
  exit.__loaded = true;
  return exit;
}

export default tba;
