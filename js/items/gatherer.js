import tba from 'TBAManager.js'; // setup the TBA

const gatherer = tba.createItem({
  key: 'gatherer',
  accessor: /gatherer/,
  description: 'The gatherers(s) are gathering bamboo.',
  detail: 'They are doing a good job.',
  actions: [
    {command: /speak|talk|tell/, method(){
      var responses = [
        "'wood' you leave me alone?",
        "'stick' around!?!",
        "Mandatum?... Gatherer.",
        "five, six, pick up sticks",
        "Sometimes I look up at the sky and dream"
      ];
      return `<i>"${responses[Math.floor(Math.random()*responses.length)]}"</i>`;
    }}
  ]
});

export default gatherer;
