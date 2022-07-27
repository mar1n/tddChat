module.exports = (err, req, res, next) => {
    res.status(500);
    res.json({ error: 'An unknow error ocurred.'})
};
