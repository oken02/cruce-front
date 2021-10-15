import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  TableContainer,
  Table,
  TableCell,
  TableRow,
  TableBody,
  Card,
} from "@material-ui/core";
import { Box } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { Select } from "@chakra-ui/react";

//Components
import TablesHead from "./TablesHead";
import SearchBar from "./SearchBar";

//Hooks
import useTables from "../../hooks/useTables";

const OrdersMessenger = () => {
  const token = localStorage.getItem("token");

  const {
    order,
    orderBy,
    handleSortRequest,
    searchText,
    handleSearchText,
  } = useTables({});

  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState([]);

  const { loggedUser } = useSelector((state) => state.user);

  const userId = loggedUser._id;

  useEffect(() => {
    axios
      .post(
        `http://localhost:3001/api/order/myorders/${userId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => setOrders(res.data));
  }, []);

  const onState = (orderID, state) => {
    axios
      .put(
        `http://localhost:3001/api/order/${orderID}`,
        { state: `${state}` },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((data) => {
        console.log("Cambio de estado", data);
      });
  };

  useEffect(() => {
    if (searchText) {
      // searching by order ID
      const Searched = orders.filter((ele) => ele.orderId.includes(searchText));
      setFilter(Searched);
    }
  }, [searchText]);

  return (
    <Box p="4">
      <Box display="flex" justifyContent="space-between" mb="4">
        <h1>Mis Pedidos</h1>
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
              {filter.length < 1
                  ? orders.map((row, index) => {
                console.log("Estado de Orden", row.actualState);
                return (
                  <TableRow hover key={index.toString()} tabIndex={-1}>
                    <TableCell>
                      <Link to={`/dashboard/order/${row._id}`}>
                        {row.orderId}{" "}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {row.stateHistory[0].date.slice(0, 10)}
                    </TableCell>
                    <TableCell>
                      {row.actualState == "Entregado"
                        ? row.stateHistory[
                            row.stateHistory.length - 1
                          ].date.slice(0, 10)
                        : " "}
                    </TableCell>

                    <TableCell
                      onChange={(e) => {
                        onState(row._id, e.target.value);
                      }}
                    >
                      <Select placeholder={row.actualState} size="sm">
                
                        {row.actualState ==
                        "Pendiente de Retiro en Sucursal" ? (
                          <option value="En Camino">En Camino</option>
                        ) : ( row.actualState == "En Camino" ? 
                          (<>
                            <option value="Entregado">Entregado</option>
                            <option value="Devuelto a Sucursal">
                              Devuelto a Sucursal
                            </option>
                          </>) : row.actualState)
                        }
                      </Select>
                    </TableCell>

                    <TableCell>
                      <Link to={`/dashboard/order/${row._id}`}>
                        <IconButton
                          variant="ghost"
                          colorScheme="teal"
                          fontSize="20 px"
                          size="xs"
                          ml={3}
                          icon={<SearchIcon />}
                        />
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              }):
              filter.map((row, index) => {
                return (
                  <TableRow hover key={index.toString()} tabIndex={-1}>
                    <TableCell>
                      <Link to={`/dashboard/order/${row._id}`}>
                        {row.orderId}{" "}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {row.stateHistory[0].date.slice(0, 10)}
                    </TableCell>
                    <TableCell>
                      {row.actualState == "Entregado"
                        ? row.stateHistory[
                            row.stateHistory.length - 1
                          ].date.slice(0, 10)
                        : " "}
                    </TableCell>

                    <TableCell
                      onChange={(e) => {
                        onState(row._id, e.target.value);
                      }}
                    >
                      <Select placeholder={row.actualState} size="sm">
                
                        {row.actualState ==
                        "Pendiente de Retiro en Sucursal" ? (
                          <option value="En Camino">En Camino</option>
                        ) : ( row.actualState == "En Camino" ? 
                          (<>
                            <option value="Entregado">Entregado</option>
                            <option value="Devuelto a Sucursal">
                              Devuelto a Sucursal
                            </option>
                          </>) : row.actualState)
                        }
                      </Select>
                    </TableCell>

                    <TableCell>
                      <Link to={`/dashboard/order/${row._id}`}>
                        <IconButton
                          variant="ghost"
                          colorScheme="teal"
                          fontSize="20 px"
                          size="xs"
                          ml={3}
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

export default OrdersMessenger;
