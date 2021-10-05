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
import { IconButton } from "@chakra-ui/button";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { EditIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

//Components
import TablesHead from "./TablesHead";
import SearchBar from "./SearchBar";
import AlertAssignOrder from "./AlertAssignOrder";

//Hooks
import useTables from "../../hooks/useTables";

const OrdersNotAssigned = () => {
  const history = useHistory();
  const token = localStorage.getItem("token");
  

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
      .get("http://localhost:3001/api/order/noassigned", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => setOrders(res.data));
  }, []);

  console.log("Sin Asignar>>>", orders)

  return (
    <Box p="4">
      <Box display="flex" justifyContent="space-between" mb="4">
        <h1>Pedidos Sin Asignar</h1>
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
                      <Link
                        to={`/dashboard/order/${row._id}`}
                      >
                        {row.orderId}{" "}
                      </Link>
                    </TableCell>
                    <TableCell>{row.stateHistory[0].date.slice(0,10)}</TableCell>
                    <TableCell>{row.client.address.city}</TableCell>
                    <TableCell>{row.actualState}</TableCell>
                    <TableCell>{row.dniCuil}</TableCell>

                    <TableCell>
                      <AlertAssignOrder
                        messID={row._id}
                        name={row.fullName}
                      />

                     
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

export default OrdersNotAssigned;
