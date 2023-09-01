import React, { lazy, Suspense, useState } from "react";
import {
  Autocomplete,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { FormProvider, RHFTextField } from "../../components/hook-form";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFireStore, useToaster } from "../../hooks";
import { addDocument } from "../../firebase/services/addServices";
import { updateDocument } from "../../firebase/services/updateServices";
import { deleteDocument } from "../../firebase/services/deleteServices";
import { collections } from "../../firebase/collections";
import { getUniqueId } from "../../utils/helper";
import { Loader } from "../../components";
import { toastMessages, toastTypes } from "../../constants/keywords";

function AddNewCategory({ isOpen, onClose }) {
  // Init
  const initialValues = {
    categoryName: "",
    subCategories: [],
  };

  const formSchema = yup
    .object({
      categoryName: yup
        .string("Enter valid name")
        .trim("Enter valid name")
        .required("Product name is required")
        .min(3, "Product name must be at least 3 character long")
        .max(100, "Product name must be at most 100 characters long"),
      subCategories: yup.array().min(1, "Variety is required"),
    })
    .strict()
    .required();

  // States
  const [isEdit, setIsEdit] = useState(false);

  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(formSchema),
  });
  const { toaster } = useToaster();
  const { data, isFetching } = useFireStore(collections.productCategories);

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
    control,
    setValue,
  } = methods;

  const onCloseDialog = () => {
    reset();
    onClose();
  };

  const onCreateCategory = async (formData) => {
    const { subCategories } = formData;
    try {
      const updatedCategories =
        subCategories && subCategories.length > 0
          ? subCategories.map((item) => ({
              id: getUniqueId(),
              name: item,
            }))
          : [];
      const res = await addDocument(
        { ...formData, subCategories: updatedCategories },
        collections.productCategories
      );
      if (!res.status) {
        return toaster(
          toastTypes.ERROR,
          res.error?.message || toastMessages.GENERAL_ERROR
        );
      }
      if (res.status) {
        toaster(
          toastTypes.SUCCESS,
          toastMessages.CREATE_PRODUCT_CATEGORY_SUCCESS
        );
        onCloseDialog();
      }
    } catch (error) {
      toaster(toastTypes.ERROR, toastMessages.GENERAL_ERROR);
    }
  };

  const onUpdateCategory = async (formData) => {
    const { subCategories } = formData;
    try {
      let finalCategories = [];
      const selected = data.find(({ id }) => id === isEdit);
      subCategories.forEach((item) => {
        if (selected.subCategories.some(({ name }) => name === item)) {
          const selectedCat = selected.subCategories.find(
            ({ name }) => name === item
          );
          finalCategories.push({ name: item, id: selectedCat.id });
        } else {
          finalCategories.push({ name: item, id: getUniqueId() });
        }
      });

      const res = await updateDocument(
        { ...formData, id: isEdit, subCategories: finalCategories },
        collections.productCategories
      );
      if (!res.status) {
        return toaster(
          toastTypes.ERROR,
          res.error?.message || toastMessages.GENERAL_ERROR
        );
      }
      if (res.status) {
        toaster(
          toastTypes.SUCCESS,
          toastMessages.UPDATE_PRODUCT_CATEGORY_SUCCESS
        );
        setIsEdit(false);
        onCloseDialog();
      }
    } catch (error) {
      toaster(toastTypes.ERROR, toastMessages.GENERAL_ERROR);
    }
  };

  const onSubmitCategory = async (formData) => {
    if (isEdit) {
      await onUpdateCategory(formData);
    } else {
      await onCreateCategory(formData);
    }
  };

  const onEdit = (catId) => {
    if (!catId) return;
    const selected = data.find(({ id }) => id === catId);
    if (selected) {
      setIsEdit(catId);
      setValue("categoryName", selected?.categoryName);
      setValue(
        "subCategories",
        selected?.subCategories?.map(({ name }) => name)
      );
    }
  };
  const onDelete = async (catId) => {
    if (!catId) return;
    try {
      const res = await deleteDocument(catId, collections.productCategories);
      if (!res.status) {
        return toaster(
          toastTypes.ERROR,
          res.error?.message || toastMessages.GENERAL_ERROR
        );
      }
      if (res.status) {
        toaster(
          toastTypes.SUCCESS,
          toastMessages.DELETE_PRODUCT_CATEGORY_SUCCESS
        );
      }
    } catch (error) {
      toaster(toastTypes.ERROR, toastMessages.GENERAL_ERROR);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onCloseDialog} maxWidth="md" fullWidth>
      <DialogTitle>Add Category Details</DialogTitle>
      <DialogContent>
        <FormProvider
          onSubmit={handleSubmit(onSubmitCategory)}
          methods={methods}
        >
          <Stack direction="row" gap={1} alignItems="center">
            <RHFTextField
              name="categoryName"
              label="Product Name"
              placeholder="Product Name"
              fullWidth
              margin="normal"
            />
            <Controller
              name="subCategories"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Autocomplete
                  {...field}
                  multiple
                  fullWidth
                  freeSolo
                  onChange={(event, newValue) => field.onChange(newValue)}
                  options={[]}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        {...getTagProps({ index })}
                        key={option}
                        size="small"
                        label={option}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      label="Variety"
                      fullWidth
                      {...params}
                      margin="normal"
                      error={error}
                      helperText={error?.message}
                    />
                  )}
                />
              )}
            />
            <br></br>
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              loading={isSubmitting}
            >
              {isEdit ? "Update" : "Add"}
            </LoadingButton>
          </Stack>
        </FormProvider>
        <Suspense fallback={<Loader />}>
          <ProductCategories
            data={data}
            isFetching={isFetching}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Suspense>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}

export default AddNewCategory;

const ProductCategories = lazy(() => import("./ProductCategories"));
