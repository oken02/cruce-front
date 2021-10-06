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
import AlertDeleteMessenger from "./Alerts/AlertDeleteMessenger";

//Hooks
import useTables from "../../hooks/useTables";
import { blue } from "@material-ui/core/colors";

const Messengers = () => {
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

  const [messengers, setMessengers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/user/messenger/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => setMessengers(res.data));
  }, []);

  useEffect(() => {
    if (messengers) {
      setRecords(messengers);
    }
  }, [messengers]);

  return (
    <Box p="4">
      <Box display="flex" justifyContent="space-between" mb="4">
        <h1>Lista de Cadetes</h1>
        <Button
          colorScheme="teal"
          size="sm"
          onClick={() => history.push("/dashboard/messenger")}
        >
          Crear Cadete
        </Button>
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
              {messengers.map((row, index) => {
                return (
                  <TableRow hover key={index.toString()} tabIndex={-1}>
                    <TableCell>
                      <Link
                        to={`/dashboard/messenger/${row._id}`}
                        style={{ color: blue }}
                      >
                        {row.fullName.replace(/\b\w/g, l => l.toUpperCase())}{" "}
                      </Link>
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
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

export default Messengers;
