import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ChakraProvider } from '@chakra-ui/react'
import { ContactsContextProvider } from './context/ContactContext'

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <ContactsContextProvider>
        <App />
      </ContactsContextProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
