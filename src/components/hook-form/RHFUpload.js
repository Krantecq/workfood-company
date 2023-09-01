import { Avatar, Button, FormHelperText } from "@mui/material";
import PropTypes from "prop-types";
// form
import { Controller, useFormContext } from "react-hook-form";
import { UploadMultiFile } from "../upload";
// @

RHFUpload.propTypes = {
  name: PropTypes.string,
};

export default function RHFUpload({
  name,
  fullWidth = false,
  btnText = "Upload",
  ...other
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Button variant="contained" component="label">
            {btnText}
            <input
              hidden
              accept="image/*"
              type="file"
              multiple={false}
              onChange={(e) => field.onChange(e.target.files[0])}
            />
          </Button>
          {field?.value ? (
            <Avatar
              src={
                typeof field?.value === "string"
                  ? field.value
                  : URL.createObjectURL(field.value)
              }
              alt="blog image"
            />
          ) : (
            ""
          )}
          {error && error?.message ? (
            <FormHelperText error>{error.message}</FormHelperText>
          ) : (
            ""
          )}
        </>
      )}
    />
  );
}

export const RHFUploadMultiFile = ({ name, ...other }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error || field.value?.length === 0;
        return (
          <UploadMultiFile
            files={field.value}
            error={checkError}
            helperText={
              checkError && (
                <FormHelperText error sx={{ px: 2 }}>
                  {error?.message}
                </FormHelperText>
              )
            }
            {...other}
          />
        );
      }}
    />
  );
};
