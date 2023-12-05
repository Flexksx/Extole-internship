import React from 'react';
import { Link } from 'react-router-dom';
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { CustomTable } from '../components';

export function MainTable() {
    return (
      <div className="center-container">
        <CustomTable></CustomTable>
      </div>
    );
  }
  
  export default MainTable;