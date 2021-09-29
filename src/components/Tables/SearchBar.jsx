import React from "react";
import {SearchIcon} from "@chakra-ui/icons";

import { Box, TextField, InputAdornment, Tooltip } from "@material-ui/core";

const SearchBar = ({ searchText, onSearchText }) => {
  return (
    <Box>
      <TextField
        style={{ margin: "2px" }}
        value={searchText}
        size="small"
        onChange={onSearchText}
        placeholder="Buscar..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Tooltip title="Buscar">
                <SearchIcon />
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;
