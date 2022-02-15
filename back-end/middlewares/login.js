const loginSchema = require('../schemas/login');
const { clientErrors } = require('../utils/httpStatusCodes');

const validateLoginPayload = (req, _res, next) => {
  const { email, password } = req.body;
  const { error } = loginSchema.validate({ email, password });
  if (error) {
    return next({ message: error.message, statusCode: clientErrors.badRequest });
  }
  return next();
};

module.exports = { validateLoginPayload };