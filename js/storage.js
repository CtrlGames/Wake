var storage = window.localStorage.getItem('cache');
if (!storage) storage = {};
else {
  storage = JSON.parse(atob(storage));
}

export function get(key){
  return storage[key];
}

export function set(key, val){
  storage[key] = val;
  save();
}

export function save() {
  window.localStorage.setItem('cache', btoa(JSON.stringify(storage)));
}

export function clear(){
  window.localStorage.clear();
  location.reload();
}
