import tba from 'TBAManager.js'; // setup the TBA

const fisher = tba.createItem({
  key: 'fisher',
  accessor: /fisher/,
  description: 'The fisher(s) are catching fish.',
  detail: 'They are doing a good job.',
  actions: [
    {command: /speak|talk|tell/, method(){
      var responses = [
        "Fish are fish are fish...",
        "Nothing makes a fish bigger than almost being caught.",
        "No good fish goes anywhere without a porpoise.",
        "The best way to observe a fish is to become a fish.",
        "Fish are slippery when wet."
      ];
      return `<i>"${responses[Math.floor(Math.random()*responses.length)]}"</i>`;
    }}
  ]
});

export default fisher;
