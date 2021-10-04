import React from "react";
import { useSelector } from "react-redux";

import {
  TableCell,
  TableRow,
  TableSortLabel,
  Box,
  TableHead,
} from "@material-ui/core";
import { visuallyHidden } from "@mui/utils";

// const labels = [
//   { id: "fullName", label: "Nombre", style: {} },
//   { id: "email", label: "Email", style: {} },
//   { id: "dni", label: "Dni", style: {} },
//   { id: "acciones", label: "Acciones", style: {} },

// ];

const labels = {
  ecommerce : [
    { id: "name", label: "Nombre", style: {} },
    { id: "address", label: "Dirección", style: {} },
    { id: "manager", label: "Responsable", style: {} },
    { id: "phone", label: "Teléfono", style: {} },
  ],
  courier: [
    { id: "fullName", label: "Nombre", style: {} },
    { id: "email", label: "Email", style: {} },
    { id: "dni", label: "Dni", style: {} },
    { id: "acciones", label: "Acciones", style: {} },
  ]
};


const TablesHead = ({ order, orderBy, onRequestSort }) => {
  const { loggedUser } = useSelector((state) => state.user);

  console.log ("Logged User", loggedUser)
  return (
    <TableHead>
      <TableRow>
      {/* (labels || []).map((head) */}
        {labels[loggedUser.role].map((head) => (
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
