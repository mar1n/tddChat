exports.errFiveHundred = (err, req, res, next) => {
  res.status(500);
  res.json({ error: "An unknow error ocurred." });
};

exports.errNotFound = (req, res, next) => {
  res.status(404);
  res.json({ error: "Page not found." });
};
