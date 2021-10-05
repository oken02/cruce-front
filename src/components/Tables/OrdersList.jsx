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
import { useHistory } from "react-router-dom";
import axios from "axios";
import { EditIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

//Components
import TablesHead from "./TablesHead";
import SearchBar from "./SearchBar";
import AlertDeleteMessenger from "./AlertDeleteMessenger";

//Hooks
import useTables from "../../hooks/useTables";

const OrderList = () => {
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
      .get("http://localhost:3001/api/order", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => setOrders(res.data));
  }, []);

  console.log("PEDIDOOOOOSSS", orders)

  return (
    <Box p="4">
      <Box display="flex" justifyContent="space-between" mb="4">
        <h1>Todos los Pedidos</h1>
        {/* <Button
          colorScheme="teal"
          size="sm"
          onClick={() => history.push("/dashboard/messenger")}
        >
          Crear Cadete
        </Button> */}
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
                    <TableCell>{row.dniCuil}</TableCell>
                    <TableCell>{row.actualState}</TableCell>
                    <TableCell>{row.dniCuil}</TableCell>

                    <TableCell>
                      <AlertDeleteMessenger
                        messID={row._id}
                        name={row.fullName}
                      />

                      <Link to={`/dashboard/messenger/${row._id}`}>
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

export default OrderList;
