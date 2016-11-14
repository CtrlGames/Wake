let posts = [
  {text: 'this is the alphabet'},
  {text: 'One time I stubbed my toe.'},
  {text: 'I hate spending money.'},
  {text: 'Irate Irish Intend Itense Iritants'},
  {text: 'No, I won\'t get you a popsicle right now.'}
];


export function getPost(){
  var index = Math.floor(Math.random()*posts.length);
  return posts[index];
}
