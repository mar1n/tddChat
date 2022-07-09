const date = new Date().toISOString();

const userName = (name) => ({ name: name});
const message = (text, name, timeStamp) => ({text: text, name:name, timeStamp:timeStamp});

module.exports = { date, userName, message };
