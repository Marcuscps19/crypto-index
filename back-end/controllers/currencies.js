const { getActualCurrenciesFromFile } = require('../services/currencies');
const { successResponses, serverErrors } = require('../utils/httpStatusCodes');

const getActualCurrencies = async (_req, res, next) => {
  const response = await getActualCurrenciesFromFile();
  if (response.message) {
    return next({ message: response.message, statusCode: serverErrors.internalServerError });
  }
  return res.status(successResponses.ok).json(JSON.parse(response));
};

module.exports = { getActualCurrencies };
