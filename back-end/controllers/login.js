const jwt = require('jsonwebtoken');
const { successResponses } = require('../utils/httpStatusCodes');

const secret = '93879Ioijioja09';
const passwordLength = 16;
const jwtConfig = { expiresIn: '12h', algorithm: 'HS256' };

const login = async (req, res) => {
  const { email } = req.body;
  const token = jwt.sign({ email }, secret, jwtConfig).slice(0, passwordLength);
  return res.status(successResponses.ok).json({ token });
};

module.exports = { login };
