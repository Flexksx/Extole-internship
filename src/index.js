import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Dashboard, App, CRperSource, Records, QuarterOverQuarter } from "./pages";
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Route, Routes, Link, Outlet } from 'react-router-dom'; // Import Link and Outlet

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/crpersource/:clientId" element={<CRperSource />} />
          <Route path="/records/:clientId" element={<Records />} />
          <Route path="/dashboard/:clientId" element={<Dashboard />} />
          <Route path="/quarteroverquarter/:clientId" element={<QuarterOverQuarter />} />
          <Route path="/" element={<App />} />
        </Routes>
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);
