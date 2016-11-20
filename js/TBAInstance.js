import TBA from 'lib/TBAEngine.js';

const tba = new TBA();
riot.observable(tba);

// handy shortcut to add observable triggers to the tba methods
function addTrigger(method, eventName){
  tba[method] = function (...args) {
    var ret = tba.__proto__[method].apply(tba, args);
    tba.trigger(eventName, ret, ...args);
    return ret;
  };
}

// add observable triggers
addTrigger('enterRoom', 'roomChange');
addTrigger('input', 'output');

// log direct commands ( without evaluating them )
tba.log = function(output, className){
  tba.trigger('log', {output, className});
};

export default tba;
