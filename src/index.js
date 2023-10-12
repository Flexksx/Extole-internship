import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Dashboard, App, CRperSource} from "./pages";
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Route,Routes, Switch } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <ChakraProvider>
    <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/crpersource" element={<CRperSource />} />
          <Route path="/" element={<App />} />
        </Routes>
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);
