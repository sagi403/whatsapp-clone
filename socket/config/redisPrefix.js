const lastVisit = value => {
  return `lastVisit:${value}`;
};

const userConnected = value => {
  return `userConnected:${value}`;
};

module.exports = { lastVisit, userConnected };
