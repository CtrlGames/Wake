import incPools from 'incPools.js';

// DEBOUNCE
// accepts a callback and an int
//
// returns a function that will call the call back 
// after being called i times
//
// use case: call callback every i ticks
export function debounce (cb, i){
  var count = 0;
  return (...args) => {
    if (count < i) return count++;
    count = 0;
    cb(...args);
  }
}


/// TAG Utils

export function getRequirementsList (name) {
  var ret = '';
  var reqs = incPools[name].requirements;
  for (let key in reqs) {
    ret += `${ret.length? '<br>':''}${key}: ${reqs[key]}`;
  }
  return ret;
};

