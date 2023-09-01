import {
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, RHFTextField } from "../../../components/hook-form";
import { LoadingButton } from "@mui/lab";
import {
  Confirmation,
  MuiTable,
  NoDataFound,
  TableLoader,
} from "../../../components";
import {
  MEAL_TIME,
  companiesLocationTableHeaders,
} from "../../../constants/metaData";
import { updateDocument } from "../../../firebase/services/updateServices";
import { addDocument } from "../../../firebase/services/addServices";
import { collections } from "../../../firebase/collections";
import { useToaster } from "../../../hooks";
import {
  confirmationMessages,
  toastMessages,
  toastTypes,
} from "../../../constants/keywords";
import { deleteDocument } from "../../../firebase/services/deleteServices";

const AddLocation = ({
  open,
  onClose,
  data = [],
  companyId,
  fetchLocations,
}) => {
  const [editLocation, setEditLocation] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const initialValues = useMemo(
    () => ({
      location: "",
      mealtime: [],
    }),
    []
  );
  const { toaster } = useToaster();

  const formSchema = yup
    .object({
      location: yup
        .string("Enter valid location")
        .trim("Enter valid location")
        .required("Location is required")
        .min(3, "Location must be at least 3 character long")
        .max(300, "Location name must be at most 300 characters long"),
      mealtime: yup
        .array(yup.string().required())
        .min(1, "Choose at least one meal time"),
    })
    .strict(true);

  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(formSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
    setValue,
  } = methods;

  const onCloseDialog = () => {
    reset();
    onClose();
    setEditLocation(null);
  };

  const onSubmit = async ({ location, mealtime }) => {
    try {
      const payLoad = {
        address: [location],
        mealtime,
        ...(editLocation ? { id: editLocation.id } : {}),
      };

      const res = editLocation
        ? await updateDocument(
            payLoad,
            `${collections.CompanyName}/${companyId}/OfficeAddress`
          )
        : await addDocument(
            payLoad,
            `${collections.CompanyName}/${companyId}/OfficeAddress`
          );
      if (!res.status) {
        return toaster(
          toastTypes.ERROR,
          res.error.message || toastMessages.GENERAL_ERROR
        );
      }
      if (res.status) {
        toaster(
          toastTypes.SUCCESS,
          editLocation
            ? toastMessages.UPDATE_LOCATION_MEALTIME_SUCCESS
            : toastMessages.CREATE_LOCATION_MEALTIME_SUCCESS
        );
        setEditLocation(null);
        reset();
        fetchLocations();
      }
    } catch (error) {}
  };

  const onEditLocation = (id) => {
    if (!id) return;
    const selected = data?.find((item) => item.id === id);
    setEditLocation(selected);
    if (selected) {
      setValue("location", selected.address.at(0));
      setValue("mealtime", selected.mealtime);
    }
  };

  const onDeleteLocation = (id) => {
    if (!id) return;
    setIsConfirmationOpen(id);
  };

  const onDeleteConfirmed = async (isConfirmed) => {
    if (!isConfirmed) return setIsConfirmationOpen(false);
    try {
      const res = await deleteDocument(
        isConfirmationOpen,
        `${collections.CompanyName}/${companyId}/OfficeAddress`
      );
      if (!res.status) {
        return toaster(
          toastTypes.ERROR,
          res.error.message || toastMessages.GENERAL_ERROR
        );
      }
      if (res.status) {
        toaster(
          toastTypes.SUCCESS,
          toastMessages.DELETE_LOCATION_MEALTIME_SUCCESS
        );
        setIsConfirmationOpen(false);
        fetchLocations();
      }
    } catch (error) {
      toaster(toastTypes.ERROR, toastMessages.GENERAL_ERROR);
    }
  };

  return (
    <Dialog open={open} onClose={onCloseDialog} maxWidth="md" fullWidth>
      <DialogTitle>
        Add Location & Meal Types (e.g. Breakfast, Lunch, etc)
      </DialogTitle>
      <DialogContent>
        <FormProvider onSubmit={handleSubmit(onSubmit)} methods={methods}>
          <Stack direction="row" alignItems="center" gap={4}>
            <RHFTextField
              name="location"
              label="Location"
              placeholder="Location"
              margin="normal"
              fullWidth
            />
            <Controller
              name="mealtime"
              control={methods.control}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  margin="normal"
                  error={!!errors?.mealtime}
                >
                  <InputLabel>Mealtime</InputLabel>
                  <Select
                    {...field}
                    multiple
                    value={field.value}
                    onChange={(event) => field.onChange(event.target.value)}
                    renderValue={(selected) =>
                      selected
                        ?.map(
                          (item) =>
                            MEAL_TIME.find(({ value }) => value === item)?.label
                        )
                        .join(", ")
                    }
                    error={!!errors?.mealtime}
                  >
                    {MEAL_TIME.map((item) => (
                      <MenuItem value={item.value} key={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              loading={isSubmitting}
            >
              {editLocation ? "Update" : "Add"}
            </LoadingButton>
          </Stack>
        </FormProvider>
        <Stack>
          <MuiTable
            headingItems={companiesLocationTableHeaders}
            isCheckBox={false}
          >
            <TableBody>
              {false ? (
                <TableLoader colSpan={companiesLocationTableHeaders.length} />
              ) : data && data.length > 0 ? (
                data?.map(({ id, address, mealtime }, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{address ? address.at(0) : ""}</TableCell>
                      <TableCell>
                        <Stack direction="row" gap={2}>
                          {mealtime && mealtime?.length > 0
                            ? mealtime.map((item) => (
                                <Chip
                                  variant="outlined"
                                  key={item}
                                  label={
                                    MEAL_TIME.find(
                                      ({ value }) => value === item
                                    )?.label
                                  }
                                  color="success"
                                />
                              ))
                            : ""}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack direction={"row"} gap={1}>
                          <IconButton onClick={() => onEditLocation(id)}>
                            <i className="bx bx-edit"></i>
                          </IconButton>
                          <IconButton
                            onClick={() => onDeleteLocation(id)}
                            color="error"
                          >
                            <i className="bx bx-trash"></i>
                          </IconButton>
                          <Confirmation
                            isOpen={isConfirmationOpen}
                            onClose={() => setIsConfirmationOpen(false)}
                            onClickAction={onDeleteConfirmed}
                            actionMessage={confirmationMessages.LOCATION}
                          />
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <NoDataFound colSpan={companiesLocationTableHeaders.length} />
              )}
            </TableBody>
          </MuiTable>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default AddLocation;
