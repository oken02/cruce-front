import React, { useState, useEffect } from "react";

import {
  TableContainer,
  Table,
  TableCell,
  TableRow,
  TableBody,
  Card,
} from "@material-ui/core";
import { Box } from "@chakra-ui/layout";
import { Button, IconButton } from "@chakra-ui/button";
import axios from "axios";
import { SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

//Components
import TablesHead from "./TablesHead";
import SearchBar from "./SearchBar";

//Hooks
import useTables from "../../hooks/useTables";

const OrdersCourier = () => {
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


  useEffect(() => {
    axios
      .post(
        "/api/order/",
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => setOrders(res.data));
  }, []);


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
        <h1>Todos los Pedidos</h1>
      </Box>

      <Card>
        <TableContainer>
              
              <Box>
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
                    <TableCell>{row.actualState == "Entregado"
                        ? row.stateHistory[
                            row.stateHistory.length - 1
                          ].date.slice(0, 10)
                        : " "}</TableCell>
                    <TableCell>{row.actualState}</TableCell>
                    <TableCell>
                      {row.userId ? row.userId.fullName : ""}
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
                    <TableCell>{row.actualState == "Entregado"
                        ? row.stateHistory[
                            row.stateHistory.length - 1
                          ].date.slice(0, 10)
                        : " "}</TableCell>
                    <TableCell>{row.actualState}</TableCell>
                    <TableCell>
                      {row.userId ? row.userId.fullName : ""}
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

export default OrdersCourier;
