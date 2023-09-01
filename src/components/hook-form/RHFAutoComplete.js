import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const RHFAutoComplete = ({
  options = [],
  getOptionLabel,
  defaultValue = null,
  name,
  label,
  multiple = false,
  isLoading = false,
  isOptionEqualToValue = () => {},
  renderOption,
  ...rest
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      render={({
        field: { onChange, value, ref, ...props },
        fieldState: { error },
      }) => (
        <>
          <Autocomplete
            options={options}
            autoComplete
            autoHighlight
            getOptionLabel={getOptionLabel}
            renderInput={(params) => (
              <TextField
                {...params}
                {...rest}
                label={label}
                error={!!error}
                helperText={error?.message}
                disabled={isLoading}
                inputRef={ref}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {isLoading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
            isOptionEqualToValue={isOptionEqualToValue}
            renderOption={renderOption}
            onChange={(e, data) => onChange(data)}
            multiple={multiple}
            value={value}
            {...props}
          />
        </>
      )}
      onChange={([, data]) => data}
      defaultValue={defaultValue}
      name={name}
    />
  );
};

export default RHFAutoComplete;
