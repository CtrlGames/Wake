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
  }
};

export default pools;
