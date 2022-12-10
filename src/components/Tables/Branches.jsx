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
import AlertDeleteBranch from "./Alerts/AlertDeleteBranch";

//Hooks
import useTables from "../../hooks/useTables";
import { blue } from "@material-ui/core/colors";

const Branches = () => {
  const history = useHistory();
  const token = localStorage.getItem("token");
  const {
    records,
    setRecords,
    order,
    orderBy,
    handleSortRequest,
  } = useTables({});

  const [branch, setBranch] = useState([]);

  useEffect(() => {
    axios
      .get("/api/branch/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => setBranch(res.data));
  }, []);

// console.log('BRANCH -> ', branch)

  return (
    <Box p="4">
      <Box display="flex" justifyContent="space-between" mb="4">
        <h1>Lista de Sucursales</h1>
        <Button
          colorScheme="teal"
          size="sm"
          onClick={() => history.push("/dashboard/branch")}
        >
          Crear Sucursal
        </Button>
      </Box>

      <Card>
        <TableContainer>
          <Box p="3">
           
          </Box>
          <Table size="small">
            <TablesHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleSortRequest}
            />
            <TableBody>
              {branch.map((row, index) => {
                // console.log(row._id)
                return (
                  <TableRow hover key={index.toString()} tabIndex={-1}>
                    <TableCell>
                      <Link
                        to={`/dashboard/branch/${row._id}`}
                        style={{ color: blue }}
                      >
                        {row.name.replace(/\b\w/g, l => l.toUpperCase())}{" "}
                      </Link>
                    </TableCell>
                    <TableCell>{row.address}</TableCell>
                    <TableCell>{row.manager}</TableCell>
                    <TableCell>
                      <AlertDeleteBranch
                        branchID={row._id}
                        name={row.name}
                      />

                      <Link to={`/dashboard/branch/${row._id}`}>
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

export default Branches;
