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
    details: {group: 'workers'},
    increments: {food: -1},
  },
  'fisher': {
    requirements: {moochers: 1, "fishing pole": 1},
    details: {group: 'workers'},
    increments: {food: 2},
  },
  'gatherer': {
    requirements: {moochers: 1},
    details: {group: 'workers'},
    increments: {food: -1, wood: 1},
  },
  'searcher': {
    requirements: {moochers: 1},
    details: {group: 'workers'},
    increments: {food: -1, string: 1},
  }
};

export default pools;
