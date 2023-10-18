import React, { useEffect, useState } from 'react';
import { CustomTable } from '../components';
import { DashboardMiddle } from '../components';
import { DashboardLeft } from '../components';
import { useDisclosure } from '@chakra-ui/react';

export function App() {
  return (
    <div className="center-container">
      <CustomTable></CustomTable>
    </div>
  );
}

export default App;
