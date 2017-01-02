export function get(key){
  var val = window.localStorage.getItem(key);
  //val = atob(val);
  try {
    val = JSON.parse(val);
  } catch(e){/*swallow*/}
  return val;
}

export function set(key, val){
  if(typeof val !== 'string') val = JSON.stringify(val);
  //window.localStorage.setItem(key, btoa(val));
  window.localStorage.setItem(key, val);
}

export function clear(){
  window.localStorage.clear();
  location.reload();
}
