import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Dashboard, App, CRperSource } from "./pages";
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Route, Routes, Link, Outlet } from 'react-router-dom'; // Import Link and Outlet

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/crpersource" element={<CRperSource />} />
          <Route path="/" element={<App />} /> {/* Route for the homepage */}
          <Route path="/dashboard/:clientId" element={<Dashboard />} />
        </Routes>
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);
