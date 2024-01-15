import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ChakraProvider } from '@chakra-ui/react'
import { TasksContextProvider } from './context/TaskContext'
import { AuthContextProvider } from './context/AuthContext'

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthContextProvider>
        <TasksContextProvider>
          <App />
        </TasksContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
