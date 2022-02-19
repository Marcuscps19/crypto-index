const { default: axios } = require('axios');
const fs = require('fs');
const currenciesJson = require('../utils/currencies.json');

const fetchCurrencies = async () => {
  try {
    const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice/BTC.json');
    return response;
  } catch ({ response }) {
    return ({ message: response.data, statusCode: response.status });
  }
};

const getCurrencyDescription = (currencyCode) => {
  switch (currencyCode) {
    case 'BRL': return 'Brazilian Real';
    case 'EUR': return 'Euro';
    default: return 'Canadian Dollar';
  }
};

const formatWithLocaleString = (calculatedCurrency) => calculatedCurrency.toLocaleString('en-US', {
  style: 'decimal',
  currency: 'USD',
});

// Source toLocaleString:
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
const updateCurrencies = (data, currencies, rate) => {
  const dataCurrencies = data;

  currencies.forEach((currency) => {
    const currencyCode = currency[0];
    const dollarExchangeRate = currency[1];
    const calculatedCurrency = dollarExchangeRate * rate;

    dataCurrencies.bpi[currencyCode] = {
      code: currencyCode,
      rate: formatWithLocaleString(calculatedCurrency),
      description: getCurrencyDescription(currencyCode),
      rate_float: calculatedCurrency,
    };
  });
  return dataCurrencies;
};

const addNewCurrencies = (data) => {
  const dataCurrencies = data;
  const currencies = Object.entries(currenciesJson);
  const { bpi: { USD: { rate_float: rate } } } = dataCurrencies;

  const dataUpdatedWithNewCurrencies = updateCurrencies(data, currencies, rate);

  return dataUpdatedWithNewCurrencies;
};

const updateCurrencyFromFile = async (currency, value) => {
  currenciesJson[currency] = formatWithLocaleString(value);
  await fs.promises
    .writeFile(
      './utils/currencies.json',
      JSON.stringify(currenciesJson),
    );
};

module.exports = { fetchCurrencies, addNewCurrencies, updateCurrencyFromFile };
