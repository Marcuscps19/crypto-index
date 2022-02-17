const { successResponses, serverErrors } = require('../utils/httpStatusCodes');
const { fetchCurrencies, addNewCurrencies, updateCurrencyFromFile } = require('../services/crypto');

const getCurrencies = async (_req, res, next) => {
  const response = await fetchCurrencies();
  if (response.message) {
    return next({ message: response.message, statusCode: response.statusCode });
  }
  return res.status(successResponses.ok).json(addNewCurrencies(response.data));
};

const updateCurrency = async (req, res) => {
  const { currency, value } = req.body;
  try {
    await updateCurrencyFromFile(currency, value);
    return res.status(successResponses.ok).json({
      message: 'Valor alterado com sucesso!',
    });
  } catch (error) {
    return res.status(serverErrors.internalSeverError)
      .json({ message: `Erro ao salvar arquivo + ${error}` });
  }
};

module.exports = { getCurrencies, updateCurrency };
