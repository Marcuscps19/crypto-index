import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const initialState = () => ({
  email: '',
  password: '',
  errorMessage: null,
});

export const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [values, setValues] = useState(initialState);
  const memoizedValues = useMemo(() => ({ values, setValues }), [values]);

  return (
    <LoginContext.Provider value={memoizedValues}>
      { children }
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
