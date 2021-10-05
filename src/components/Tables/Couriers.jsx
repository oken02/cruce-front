import React, { useState, useEffect } from 'react';
import {
  TableContainer,
  Table,
  TableCell,
  TableRow,
  TableBody,
  Card,
} from '@material-ui/core';

//Components
import TablesHead from './TablesHead';
import SearchBar from './SearchBar';

//Hooks
import useTables from '../../hooks/useTables';
import { Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Couriers = () => {
  const history = useHistory();
  const token = localStorage.getItem('token');

  const {
    records,
    setRecords,
    order,
    orderBy,
    handleSortRequest,
    searchText,
    handleSearchText,
  } = useTables({});

  const [couriers, setCouriers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/user/courier/', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => setCouriers(res.data));
  }, []);

  // console.log(messengers)

  useEffect(() => {
    if (couriers) {
      setRecords(couriers);
    }
  }, [couriers]);

  return (
    <Box p="4">
      <Box display="flex" justifyContent="space-between" mb="4">
        <h1>Lista de Mensajerias</h1>
        <Button
          colorScheme="teal"
          size="sm"
          onClick={() => history.push('/dashboard/courier')}
        >
          Crear Mensajeria
        </Button>
      </Box>

      <Card>
        <TableContainer>
          <Box p="3">
            {/* <Input placeholder="Basic usage" /> */}
            <SearchBar
              searchText={searchText}
              onSearchText={handleSearchText}
            />
          </Box>
          <Table size="small">
            <TablesHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleSortRequest}
            />
            <TableBody>
              {couriers.map((row, index) => {
                return (
                  <TableRow hover key={index.toString()} tabIndex={-1}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.fullName}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.dniCuil}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default Couriers;
