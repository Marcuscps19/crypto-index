import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';


export const MessageContext = createContext();

export function MessageProvider({ children }) {

  const [message, setMessage] = useState('');

  return (
    <MessageContext.Provider value={{message, setMessage}}>
      { children }
    </MessageContext.Provider>
  );
}

MessageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
