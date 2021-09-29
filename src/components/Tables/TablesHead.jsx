import React from "react";
import {
  TableCell,
  TableRow,
  TableSortLabel,
  Box,
  TableHead,
} from "@material-ui/core";
import { visuallyHidden } from "@mui/utils";

const labels = [
  { id: "Id", label: "Id", style: {} },
  { id: "fullName", label: "Nombre", style: {} },
  { id: "email", label: "Email", style: {} },
  { id: "dni", label: "Dni", style: {} },
];

const TablesHead = ({ order, orderBy, onRequestSort }) => {
  return (
    <TableHead>
      <TableRow>
        {(labels || []).map((head) => (
          <TableCell
            key={head.id}
            sortDirection={orderBy === head.id ? order : false}
            style={head.style || {}}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === head.id}
              direction={orderBy === head.id ? order : "asc"}
              onClick={onRequestSort(head.id)}
            >
              {head.label}
              {orderBy === head.id ? (
                <Box sx={{ ...visuallyHidden }}>
                  {orderBy === "desc"
                    ? "sorted descending"
                    : " sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TablesHead;
