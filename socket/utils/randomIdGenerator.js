function randomIdGenerator() {
  var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return randLetter + Date.now();
}

module.exports = randomIdGenerator;
