import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const initialState = () => ({
  currencies: null,
  btc: 1,
  errorMessage: null,
});

export const CurrenciesContext = createContext();

export function CurrenciesProvider({ children }) {
  const [values, setValues] = useState(initialState);
  const memoizedValues = useMemo(() => ({ values, setValues }), [values]);

  return (
    <CurrenciesContext.Provider value={memoizedValues}>
      { children }
    </CurrenciesContext.Provider>
  );
}

CurrenciesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
