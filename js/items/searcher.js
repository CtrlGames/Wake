import tba from 'TBAManager.js'; // setup the TBA

const searcher = tba.createItem({
  key: 'searcher',
  accessor: /searcher/,
  description: 'The searchers are searching the ship.',
  detail: 'They are doing a good job.',
  actions: [
    {command: /speak|talk|tell/, method(){
      var responses = [
        "Search the ship.... Search the ship...",
        ":(",
        "What do you want?",
        "if at first I don't succeed, then I'm probably worthless"
      ];
      return `<i>"${responses[Math.floor(Math.random()*responses.length)]}"</i>`;
    }}
  ]
});

export default searcher;
