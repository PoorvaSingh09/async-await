const axios = require('axios');

const getExchangeRate = async (from, to) => {
  try {
    const response = await axios.get(`https://api.fixer.io/latest?base=${from}`);
    const rate = response.data.rates[to];
    if (!rate) {
     throw new Error();
   } else {
     return rate;
   }
  } catch (e) {
    throw new Error(`Unable to get exchange rate for ${from} and ${to}`);
  }
};

const getCountries = async (currencyCode) => {
  try {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
    return response.data.map((country) => country.name);
  } catch (e) {
    throw new Error(`Unable to get countries that use ${currencyCode}`);
  }
};

const convertCurrency = (from, to, amount) => {
  let countries;
  return getCountries(to).then((tempCountries) => {
    countries = tempCountries;
    return getExchangeRate(from, to);
  }).then((rate) => {
    const exchangeAmount = rate * amount;
    return `${amount} ${from} is worth ${exchangeAmount} ${to}. You can spend these in following countries: ${countries.join(', ')}`
  });
};

const convertCurrencyAlt = async (from, to, amount) => {
  var countries = await getCountries(to);
  var rate = await getExchangeRate(from, to);
  const exchangeAmount = rate * amount;
  return `${amount} ${from} is worth ${exchangeAmount} ${to}. You can spend these in following countries: ${countries.join(', ')}`
};

convertCurrencyAlt('CAD', 'USD', 100).then((result) => {
  console.log(result);
}).catch((e) => {
  console.log(e.message);
});

// getExchangeRate('USD', 'CAD').then((rate) => {
//   console.log(rate);
// }).catch((e) => {
//   console.log(e.message);
// });

// getCountries('EUR').then((list) => {
//   console.log(list);
// });
