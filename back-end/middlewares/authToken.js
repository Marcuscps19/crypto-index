const authSchema = require('../schemas/authToken');
const { clientErrors } = require('../utils/httpStatusCodes');

const validateToken = (req, _res, next) => {
  const token = req.headers.authorization;
  const { error } = authSchema.validate({ token });
  if (error) {
    return next({ message: error.message, statusCode: clientErrors.unauthorized });
  }
  return next();
};

module.exports = validateToken;
