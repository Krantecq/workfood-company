import { Cancel } from "@mui/icons-material";
import { IconButton, Slide } from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";

const useToaster = () => {
  // Hooks
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // Raise Toaster
  const toaster = (variant, message) =>
    enqueueSnackbar(message, {
      variant: variant,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
      action: (key) => (
        <IconButton onClick={() => closeSnackbar(key)}>
          <Cancel fontSize="small" />
        </IconButton>
      ),
      autoHideDuration: 3000,
      TransitionComponent: Slide,
    });

  return { toaster };
};

export default useToaster;
