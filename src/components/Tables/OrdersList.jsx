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
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { SearchIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

//Components
import TablesHead from './TablesHead';
import SearchBar from './SearchBar';
import AlertDeleteMessenger from './Alerts/AlertDeleteMessenger';

//Hooks
import useTables from '../../hooks/useTables';
import getToken from '../../utils/getToken';


const OrderList = () => {
  const history = useHistory();
  const token = localStorage.getItem('token');
  const user = useSelector((state) => state.user);

  const {
    records,
    setRecords,
    order,
    orderBy,
    handleSortRequest,
    searchText,
    handleSearchText,
  } = useTables({});

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/order', getToken())
      .then((res) => setOrders(res.data));
  }, []);

  return (
    <Box p="4">
      <Box display="flex" justifyContent="space-between" mb="4">
        <h1>Todos los Pedidos</h1>

        {user.loggedUser.role === 'ecommerce' ? (
          <Button
            colorScheme="teal"
            size="sm"
            onClick={() => history.push('/dashboard/order')}
          >
            Subir Pedidos
          </Button>
        ) : null}
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
              {orders.map((row, index) => {
                return (
                  <TableRow hover key={index.toString()} tabIndex={-1}>
                    <TableCell>
                      <Link to={`/dashboard/order/${row._id}`}>
                        {row.orderId}{' '}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {row.stateHistory[0].date.slice(0, 10)}
                    </TableCell>
                    <TableCell>{row.dniCuil}</TableCell>
                    <TableCell>{row.actualState}</TableCell>
                    <TableCell>
                      {row.courierId ? row.courierId.name : ''}
                    </TableCell>

                    <TableCell>
                      <AlertDeleteMessenger
                      // messID={row._id}
                      // name={row.fullName}
                      />

                      <Link to={`/dashboard/order/${row._id}`}>
                      <IconButton
                          variant="ghost"
                          colorScheme="teal"
                          fontSize="20 px"
                          size="xs"
                          icon={<SearchIcon />}
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

export default OrderList;
