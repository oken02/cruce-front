import React, { useState, useEffect } from 'react';

import {
  TableContainer,
  Table,
  TableCell,
  TableRow,
  TableBody,
  Card,
} from '@material-ui/core';
import { Box } from '@chakra-ui/layout';
import { Button, IconButton } from '@chakra-ui/button';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { EditIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';

//Components
import TablesHead from './TablesHead';
import SearchBar from './SearchBar';
import AlertDeleteCourier from './Alerts/AlertDeleteCourier';

//Hooks
import useTables from '../../hooks/useTables';
import getToken from '../../utils/getToken';

const Couriers = () => {
  const history = useHistory();
  const token = localStorage.getItem('token');
  const { loggedUser } = useSelector((state) => state.user);


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
      .get('http://localhost:3001/api/courier/', getToken())
      .then((res) => setCouriers(res.data));
  }, []);


  useEffect(() => {
    if (couriers) {
      setRecords(couriers);
    }
  }, [couriers]);

  return (
    <Box p="4">
      <Box display="flex" justifyContent="space-between" mb="4">
        <h1>Lista de Cadeterías</h1>
        <Box display="flex" mb="4">
        <Button
          colorScheme="teal"
            size="sm"
            mr="1"
          onClick={() => history.push('/dashboard/courier')}
        >
          Crear Mensajeria
        </Button>
        
        {loggedUser.role === 'courier' ? (
          <Button
          colorScheme="teal"
            size="sm"
            ml="1"
          onClick={() => history.push('/dashboard/messenger')}
        >
          Crear Cadete
        </Button>
        ) : (
          <Button
          colorScheme="teal"
            size="sm"
            ml="1"
          onClick={() => history.push('/dashboard/messenger')}
        >
          Crear Usuario Mensajeria
        </Button>
        )}
        </Box>
        
      </Box>

      <Card>
        <TableContainer>
          <Box p="3">
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
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.address}</TableCell>
                    <TableCell>{row.manager}</TableCell>
                    <TableCell>{row.phone}</TableCell>

                    <TableCell>
                      <AlertDeleteCourier couID={row._id} name={row.name} />
                      <Link to={`/dashboard/courier/${row._id}`}>
                        <IconButton
                          variant="ghost"
                          colorScheme="teal"
                          fontSize="20 px"
                          size="xs"
                          icon={<EditIcon />}
                        />
                      </Link>
                    </TableCell>
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
