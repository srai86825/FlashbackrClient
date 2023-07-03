import React from "react";
import { Grid, TextField, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const Input = ({
  half,
  name,
  handleChange,
  value,
  label,
  type,
  autoFocus,
}) => {
  return (
    <Grid item xs={12} md={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        value={value}
        label={label}
        autoFocus={autoFocus}
        type={type}
      />
    </Grid>
  );
};

export default Input;
