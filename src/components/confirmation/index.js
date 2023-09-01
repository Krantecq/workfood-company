import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import React from "react";

const Confirmation = ({
  isOpen,
  onClose,
  actionText = "Delete",
  onClickAction,
  title = "Confirmation",
  actionMessage = "",
  isLoading = false,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={!isLoading ? onClose : () => {}}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {actionMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          disabled={isLoading}
          onClick={() => onClickAction(false)}
        >
          Cancel
        </Button>
        <LoadingButton
          loading={isLoading}
          variant="contained"
          onClick={() => onClickAction(true)}
        >
          {actionText}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default Confirmation;
