import { IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";

import RHFTextField from "./RHFTextField";
import Iconify from "../Iconify";
// @mui

export default function RHFPasswordField({ ...other }) {
  // States
  const [showPassword, setShowPassword] = useState(false);

  return (
    <RHFTextField
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
            >
              <Iconify
                icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
              />
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...other}
    />
  );
}
