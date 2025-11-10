import React, { createContext, useState } from 'react';

const MessageContext = createContext();

const MessageProvider = ({ children }) => {
  const [soundcheck, setSoundCheck] = useState(null);

  return (
    <MessageContext.Provider value={{ soundcheck, setSoundCheck }}>
      {children}
    </MessageContext.Provider>
  );
};

export { MessageContext, MessageProvider };
