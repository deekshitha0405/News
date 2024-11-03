import * as React from "react";

import {Paper,InputBase} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import { SearchboxProps } from "./type";

const Searchbox = ({ handleChange }: SearchboxProps) => {
  const [value, setValue] = React.useState("");
  const handleSearchChange = (e: any) => {
    if (e) {
      e.preventDefault();
      handleChange(value);
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchChange(e);
    }
  };
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search by Category, Author"
        inputProps={{ "aria-label": "search articles" }}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        onKeyPress={handleKeyPress} // Add key press handler
      />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={(e) => handleSearchChange(e)}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default Searchbox;
