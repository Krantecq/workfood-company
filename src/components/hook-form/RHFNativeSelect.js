import { TextField } from "@mui/material";
import PropTypes from "prop-types";
// form
import { Controller, useFormContext } from "react-hook-form";
// @mui

// ----------------------------------------------------------------------

RHFNativeSelect.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
};

export default function RHFNativeSelect({ name, children, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          fullWidth
          SelectProps={{ native: true }}
          error={!!error}
          helperText={error?.message}
          {...other}
        >
          {children}
        </TextField>
      )}
    />
  );
}
