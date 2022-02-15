const error = (err, _req, res) => res.status(err.statusCode).json({ message: err.message });

module.exports = error;
