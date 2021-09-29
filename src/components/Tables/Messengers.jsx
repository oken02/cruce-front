import React from "react";
import { useEffect } from "react";

import {
  TableContainer,
  Table,
  TableCell,
  TableRow,
  TableBody,
  Card,
} from "@material-ui/core";

//Components
import TablesHead from "./TablesHead";
import SearchBar from "./SearchBar";

//Hooks
import useTables from "../../hooks/useTables";
import { Box } from "@chakra-ui/layout";

const cadetes = [
  { id: 1, fullName: "Juan Perez", email: "jperez@gmail.com", dni: 30301031 },
  { id: 2, fullName: "Miguel Perez", email: "mperez@gmail.com", dni: 30301031 },
  {id: 3, fullName: "Roberto Rodriguez", email: "rr@gmail.com", dni: 25452887},
  {id: 4, fullName: "Jorge García", email: "jgarcia@gmail.com", dni: 30301031},
];

const Messengers = () => {
  const {
    records,
    setRecords,
    order,
    orderBy,
    handleSortRequest,
    searchText,
    handleSearchText,
  } = useTables({});

  useEffect(() => {
    if (cadetes) {
      setRecords(cadetes);
    }
  }, [cadetes]);

  // useEffect(() => {
  //   if (searchText) {
  //     const Searched = 
  //   }

  // }, [])

  return (
    <Box>
      <h1>Lista de cadetes</h1>
      <Card style={{ margin: "50px" }}>
        <TableContainer>
          <SearchBar searchText={searchText} onSearchText={handleSearchText}/>
          <Table size="small">
            <TablesHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleSortRequest}
            />
            <TableBody>
              {records.map((row, index) => {
                return (
                  <TableRow hover key={index.toString()} tabIndex={-1}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.fullName}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.dni}</TableCell>
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
