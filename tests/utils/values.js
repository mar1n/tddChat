const date = new Date().toISOString();

const userName = (firstName) => ({ firstName });
const message = (text, firstName) => ({ text: text, firstName });

module.exports = { date, userName, message };
