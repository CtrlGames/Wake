
import { multiply } from 'math.js';

riot.mixin('myMixin', {
  greet(name){ return `hello ${name}`; },
  multiply: multiply,
  lazyLoad(){
    return System.import('lazy.js');
  }
});

riot.mount('*');
