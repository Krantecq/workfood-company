import { Dialog, DialogContent, DialogTitle, Stack } from "@mui/material";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, RHFTextField } from "../../../components/hook-form";
import { LoadingButton } from "@mui/lab";

import { updateDocument } from "../../../firebase/services/updateServices";
import { collections } from "../../../firebase/collections";
import { useToaster } from "../../../hooks";
import { toastMessages, toastTypes } from "../../../constants/keywords";
import { increment } from "firebase/firestore";

const AddBalance = ({ open, onClose, data = [], companyId }) => {
  // Hooks
  const initialValues = useMemo(
    () => ({
      amount: "",
    }),
    []
  );
  const { toaster } = useToaster();

  const formSchema = yup
    .object({
      amount: yup
        .string("Enter valid amount")
        .trim("Enter valid amount")
        .required("Amount is required"),
    })
    .strict(true);

  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(formSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onCloseDialog = () => {
    reset();
    onClose();
  };

  const onSubmit = async ({ amount }) => {
    try {
      if (typeof open !== "boolean") {
        await updateDocument(
          { id: open, Wallet: increment(+amount) },
          `${collections.CompanyName}/${companyId}/Employee`
        );
      } else {
        await Promise.all(
          data.map(async (item) => {
            await updateDocument(
              { id: item.id, Wallet: item?.Wallet + +amount },
              `${collections.CompanyName}/${companyId}/Employee`
            );
          })
        );
      }
      toaster(toastTypes.SUCCESS, toastMessages.BALANCE_UPDATE_SUCCESS);
      onCloseDialog();
    } catch (error) {}
  };

  return (
    <Dialog open={open} onClose={onCloseDialog} maxWidth="sm" fullWidth>
      <DialogTitle>Recharge Wallet</DialogTitle>
      <DialogContent>
        <FormProvider onSubmit={handleSubmit(onSubmit)} methods={methods}>
          <Stack direction="row" alignItems="center" gap={4}>
            <RHFTextField
              name="amount"
              label="Amount(in rs)"
              placeholder="Amount"
              margin="normal"
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 1, max: 999999 } }}
            />
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              loading={isSubmitting}
            >
              Add
            </LoadingButton>
          </Stack>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default AddBalance;
