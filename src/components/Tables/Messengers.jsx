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

const Messengers = () => {
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

  const [messengers, setMessengers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/user/messenger/', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => setMessengers(res.data));
  }, []);

  // console.log(messengers)

  useEffect(() => {
    if (messengers) {
      setRecords(messengers);
    }
  }, [messengers]);

  // useEffect(() => {
  //   if (searchText) {
  //     const Searched =
  //   }

  // }, [])

  return (
    <Box p="4">
      <Box display="flex" justifyContent="space-between" mb="4">
        <h1>Lista de Cadetes</h1>
        <Button
          colorScheme="teal"
          size="sm"
          onClick={() => history.push('/dashboard/messenger')}
        >
          Crear Cadete
        </Button>
        {/* Para probar editar cadete: */}
        <Button
          colorScheme="teal"
          size="sm"
          onClick={() => history.push('/dashboard/messenger/1')}
        >
          EDITAR Cadete
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
              {messengers.map((row, index) => {
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

export default Messengers;
