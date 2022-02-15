const md5 = require('md5');
const { successResponses } = require('../utils/httpStatusCodes');

const login = async (req, res) => {
  const { email } = req.body;
  const token = md5(email).slice(0, 16);
  return res.status(successResponses.ok).json({ token });
};

module.exports = { login };
