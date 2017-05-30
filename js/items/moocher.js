import tba from 'TBAInstance.js';

const moocher = tba.createItem({
  key: 'moocher',
  accessor: /something|creature/,
  description: 'Something watches from the shadows',
  detail: "it's a small creature with large eyes and a fox-like face"
});

export default moocher;
