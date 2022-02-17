import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const initialState = () => ({
  currencies: null,
  btc: 1,
  errorMessage: null,
});

export const HomeContext = createContext();

export function HomeProvider({ children }) {
  const [values, setValues] = useState(initialState);
  const memoizedValues = useMemo(() => ({ values, setValues }), [values]);

  return (
    <HomeContext.Provider value={memoizedValues}>
      { children }
    </HomeContext.Provider>
  );
}

HomeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
