const cryptoSchema = require('../schemas/crypto');
const { clientErrors } = require('../utils/httpStatusCodes');

const validatePayload = (req, _res, next) => {
  const { currency, value } = req.body;
  const { error } = cryptoSchema.validate({ currency, value });
  if (error) {
    return next({ message: error.message, statusCode: clientErrors.badRequest });
  }
  return next();
};

module.exports = { validatePayload };
