const { successResponses } = require('../utils/httpStatusCodes');
const { fetchCurrencies, addNewCurrencies, updateCurrencyFromFile } = require('../services/crypto');

const getCurrencies = async (_req, res, next) => {
  const response = await fetchCurrencies();
  if (response.message) {
    return next({ message: response.message, statusCode: response.statusCode });
  }
  return res.status(successResponses.ok).json(addNewCurrencies(response.data));
};

const updateCurrency = (req, res) => {
  const { currency, value } = req.body;
  updateCurrencyFromFile(currency, value);
  return res.status(successResponses.ok).json({
    message: 'Valor alterado com sucesso!',
  });
};

module.exports = { getCurrencies, updateCurrency };
