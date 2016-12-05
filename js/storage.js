export function get(key){
  var val = window.localStorage.getItem(key);
  return JSON.parse(val);
}

export function set(key, val){
  if(typeof val !== 'string') val = JSON.stringify(val);
  window.localStorage.setItem(key, JSON.stringify(val));
}

export function clear(){
  window.localStorage.clear();
  location.reload();
}
