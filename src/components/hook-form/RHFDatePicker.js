import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const RHFDatePicker = ({
  name,
  maxDate = "",
  minDate = "",
  inputFormat = "dd/MM/yyyy",
  ...other
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          {...field}
          value={field.value}
          inputFormat={inputFormat}
          onChange={(newDate) => field.onChange(newDate)}
          maxDate={maxDate}
          minDate={minDate}
          renderInput={(params) => (
            <TextField
              {...params}
              error={!!error}
              helperText={error?.message}
              fullWidth
              {...other}
            />
          )}
          {...other}
        />
      )}
    />
  );
};

export default RHFDatePicker;
