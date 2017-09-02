const pools = {
// basic
  'food': {
    maximum: 5
  },
// tools
  'fishing pole': {
    requirements: { wood: 1, string: 1 },
    details: { group: 'tools' },
  },
// buildings
  'hut': {
    requirements: { wood: 2 },
    details: { group: 'buildings' },
  },
// workers
  'moochers': {
    increments: { food: -1 },
    details: { group: 'workers' },
  },
  'fisher': {
    requirements: { moochers: 1, "fishing pole": 1 },
    increments: { food: 2 },
    details: { 
      group: 'workers',
      defaultArea: 'downBeach',
      purchasable: true,
      refundable: true
    }
  },
  'gatherer': {
    requirements: {moochers: 1},
    increments: {food: -1, wood: 1},
    details: {
      group: 'workers',
      defaultArea: 'inland',
      purchasable: true,
      refundable: true
    },
  },
  'searcher': {
    requirements: {moochers: 1},
    increments: {food: -1, string: 1},
    details: { 
      group: 'workers',
      defaultArea: 'upBeach',
      purchasable: true,
      refundable: true
    }
  }
};

export default pools;
