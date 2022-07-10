const date = new Date().toISOString();

const userName = (name) => ({ name: name});
const message = (text, name) => ({text: text, name:name});

module.exports = { date, userName, message };
