import React, { createContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const initialState = () => ({
  currencies: null,
  btc: 1,
  errorMessage: null,
});

export const CurrenciesContext = createContext();

export function CurrenciesProvider({ children }) {
  const [values, setValues] = useState(initialState);
  const memoizedValues = useMemo(() => ({ values, setValues }), [values]);

  useEffect(() => {
    getCurrencies();
  }, [values.errorMessage]);

  const formatCurrencies = ((currencies) => { 
    const values = Object.values(currencies);
    return values.map((value) => ({...value, 'calculated_rate': value['rate_float']}))
});

  const fetchCurrencies = async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const headers = { headers: {
        'Authorization': token,
    }}
    return await axios.get('http://localhost:3001/api/crypto/btc', headers);
}
  
  const getCurrencies = async () => {
    try {
        const { data: { bpi } } = await fetchCurrencies()  
        setValues({
            ...values,
            currencies: formatCurrencies(bpi),
        });
    } catch({response}) {
        setValues({
            ...values,
            errorMessage: response.data.message,
        })
    }
  }

  return (
    <CurrenciesContext.Provider value={memoizedValues}>
      { children }
    </CurrenciesContext.Provider>
  );
}

CurrenciesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
