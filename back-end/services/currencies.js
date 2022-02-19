const fs = require('fs');

const getActualCurrenciesFromFile = async () => {
  try {
    const currencies = fs.promises.readFile('./utils/currencies.json', 'utf8');
    return currencies;
  } catch (error) {
    return ({ message: 'Falha em ler o arquivo,' });
  }
};

module.exports = { getActualCurrenciesFromFile };
