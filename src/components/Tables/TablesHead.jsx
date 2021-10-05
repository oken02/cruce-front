import React from "react";
import { useLocation } from "react-router-dom";

import {
  TableCell,
  TableRow,
  TableSortLabel,
  Box,
  TableHead,
} from "@material-ui/core";
import { visuallyHidden } from "@mui/utils";

const labels = {
  couriers: [
    { id: "name", label: "Nombre", style: {} },
    { id: "address", label: "Dirección", style: {} },
    { id: "manager", label: "Responsable", style: {} },
    { id: "phone", label: "Teléfono", style: {} },
  ],
  messengers: [
    { id: "fullName", label: "Nombre", style: {} },
    { id: "email", label: "Email", style: {} },
    { id: "dni", label: "Dni", style: {} },
    { id: "acciones", label: "Acciones", style: {} },
  ],
  orders: [
    { id: "orderId", label: "ID Pedido", style: {} },
    { id: "date1", label: "Fecha Ingreso", style: {} },
    { id: "date 2", label: "Fecha Entrega", style: {} },
    { id: "state", label: "Estado", style: {} },
    { id: "courier", label: "Mensajería", style: {} },
    { id: "branch", label: "Sucursal", style: {} },
    { id: "acciones", label: "Acciones", style: {} },

  ],
};

const TablesHead = ({ order, orderBy, onRequestSort }) => {
  const location = useLocation();
  const pathName = location.pathname.slice(11);

  return (
    <TableHead>
      <TableRow>
        {/* (labels || []).map((head) */}
        {labels[pathName].map((head) => (
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
