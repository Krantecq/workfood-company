import {
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
} from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from "../../../components/hook-form";
import { LoadingButton } from "@mui/lab";

import { updateDocument } from "../../../firebase/services/updateServices";
import { addDocument } from "../../../firebase/services/addServices";
import { collections } from "../../../firebase/collections";
import { useToaster } from "../../../hooks";
import {
  WEEK_DAYS,
  toastMessages,
  toastTypes,
} from "../../../constants/keywords";
import RHFUpload from "../../../components/hook-form/RHFUpload";
import { MEAL_TIME } from "../../../constants/metaData";
import { getUniqueId } from "../../../utils/helper";
import { updateFile, uploadFile } from "../../../firebase/services/storage";

const AddMealItem = ({
  isOpen,
  onClose,
  companyId,
  locationId = "",
  editMeal = "",
  isEdit = false,
}) => {
  const initValues = useMemo(
    () => ({
      day: editMeal?.day || "",
      mealType: editMeal?.mealType || "",
      itemName: editMeal?.itemName || "",
      itemDescription: editMeal?.itemDescription || "",
      itemPrice: editMeal?.itemPrice || "",
      Fat: editMeal?.Nutrient?.Fat || "",
      Protein: editMeal?.Nutrient?.Protein || "",
      Calories: editMeal?.Nutrient?.Calories || "",
      items: editMeal?.items?.map((item) => ({ name: item })) || [{ name: "" }],
      itemImageUrl: editMeal?.itemImageUrl || "",
    }),
    [editMeal]
  );

  const formSchema = yup
    .object({
      day: yup.string().required("Select day"),
      mealType: yup.string().required("Select meal type"),
      itemName: yup
        .string("Enter valid itemName")
        .trim("Enter valid itemName")
        .required("item Name is required")
        .min(3, "item Name must be at least 3 character long")
        .max(100, "item Name must be at most 100 characters long"),
      itemDescription: yup
        .string("Enter valid Description")
        .trim("Enter valid Description")
        .required("Description is required")
        .min(3, "Description must be at least 3 character long")
        .max(10000, "Description must be at most 10000 characters long"),
      itemPrice: yup.string("Enter valid price").required("Price is required"),
      Fat: yup.string("Enter valid fat").required("Fat is required"),
      Protein: yup
        .string("Enter valid protein")
        .required("Protein is required"),
      Calories: yup
        .string("Enter valid calories")
        .required("Calories is required"),
      items: yup
        .array()
        .of(yup.object({ name: yup.string().required("Item is required") }))
        .min(1, "Items are required"),
      itemImageUrl: yup.mixed().required("Image is required"),
    })
    .strict(true);

  const { toaster } = useToaster();

  const methods = useForm({
    defaultValues: initValues,
    resolver: yupResolver(formSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
    watch,
    control,
  } = methods;

  useEffect(() => {
    if (isEdit && editMeal) {
      reset({
        ...editMeal,
        Fat: editMeal?.Nutrient?.Fat || "",
        Protein: editMeal?.Nutrient?.Protein || "",
        Calories: editMeal?.Nutrient?.Calories || "",
        items: editMeal?.items?.map((item) => ({ name: item })) || [
          { name: "" },
        ],
      });
    } else {
      reset(initValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, editMeal]);

  const { fields, append, remove } = useFieldArray({ control, name: "items" });

  const selectedImage = watch("itemImageUrl");

  // Handlers
  const onCloseDialog = () => {
    reset(initValues);
    onClose();
  };

  const onSubmit = async (formData) => {
    try {
      const {
        day,
        mealType,
        itemName,
        itemDescription,
        itemPrice,
        Fat,
        Protein,
        Calories,
        items,
        itemImageUrl,
      } = formData;

      const payLoad = {
        itemName,
        itemDescription,
        itemPrice,
        Nutrient: { Fat, Protein, Calories },
        items: items.map(({ name }) => name),
        day,
        mealType,
        locationId,
        like: 0,
        dislike: 0,
        reviews: [],
      };
      if (isEdit) {
        let updatedImage = itemImageUrl;
        if (typeof itemImageUrl !== "string") {
          const updateRes = await updateFile(itemImageUrl, editMeal.identifier);
          if (updateRes.status) {
            updatedImage = updateRes.url;
          }
        }
        const res = await updateDocument(
          {
            id: editMeal.id,
            ...payLoad,
            ...(updatedImage
              ? {
                  identifier: editMeal.identifier,
                  itemImageUrl: updatedImage,
                }
              : {}),
          },
          `${collections.CompanyName}/${companyId}/FoodItem`
        );
        if (!res.status) {
          return toaster(
            toastTypes.ERROR,
            res.error?.message || toastMessages.GENERAL_ERROR
          );
        }
        if (res.status) {
          toaster(toastTypes.SUCCESS, toastMessages.MEAL_UPDATE_SUCCESS);
          onCloseDialog();
        }
      } else {
        const uuid = getUniqueId();
        const imgRes = await uploadFile(itemImageUrl, uuid);

        if (imgRes.status) {
          const res = await addDocument(
            {
              ...payLoad,
              itemImageUrl: imgRes.url,
              identifier: imgRes.identifier,
            },
            `${collections.CompanyName}/${companyId}/FoodItem`
          );
          if (!res.status) {
            return toaster(
              toastTypes.ERROR,
              res.error.message || toastMessages.GENERAL_ERROR
            );
          }
          if (res.status) {
            toaster(toastTypes.SUCCESS, toastMessages.MEAL_ADDED_SUCCESS);
            onCloseDialog();
          }
        }
      }
    } catch (error) {
      toaster(toastTypes.ERROR, toastMessages.GENERAL_ERROR);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onCloseDialog} maxWidth="sm" fullWidth>
      <DialogTitle>{isEdit ? "Update" : "Add"} Food Item</DialogTitle>
      <DialogContent>
        <FormProvider onSubmit={handleSubmit(onSubmit)} methods={methods}>
          <Stack gap={1}>
            <RHFSelect name="day" label="Day" fullWidth margin="normal">
              {WEEK_DAYS.map((item, index) => (
                <MenuItem value={index.toString()} key={index}>
                  {item}
                </MenuItem>
              ))}
            </RHFSelect>
            <RHFSelect
              name="mealType"
              label="Meal Type"
              fullWidth
              margin="normal"
            >
              {MEAL_TIME.map(({ label, value }, index) => (
                <MenuItem value={value} key={index}>
                  {label}
                </MenuItem>
              ))}
            </RHFSelect>
            <RHFTextField
              name="itemName"
              label="Item Name"
              placeholder="Item name"
              margin="normal"
              fullWidth
            />
            <RHFTextField
              name="itemDescription"
              label="Item Description"
              placeholder="Item Description"
              margin="normal"
              fullWidth
              multiline
              rows={5}
            />
            <RHFTextField
              name="itemPrice"
              label="Price"
              placeholder="Item Description"
              margin="normal"
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
            />
            <Stack direction="row" gap={3}>
              <RHFTextField
                name="Fat"
                label="Fat"
                placeholder="Fat"
                margin="normal"
                fullWidth
                type="number"
                InputProps={{
                  inputProps: { min: 0 },
                  endAdornment: (
                    <InputAdornment position="end">gm</InputAdornment>
                  ),
                }}
              />
              <RHFTextField
                name="Protein"
                label="Protein"
                placeholder="Protein"
                margin="normal"
                fullWidth
                type="number"
                InputProps={{
                  inputProps: { min: 0 },
                  endAdornment: (
                    <InputAdornment position="end">gm</InputAdornment>
                  ),
                }}
              />
              <RHFTextField
                name="Calories"
                label="Calories"
                placeholder="Calories"
                margin="normal"
                fullWidth
                type="number"
                InputProps={{
                  inputProps: { min: 0 },
                  endAdornment: (
                    <InputAdornment position="end">Kcal</InputAdornment>
                  ),
                }}
              />
            </Stack>
            <Stack>
              {fields.map((field, index) => (
                <Stack direction="row" gap={2} key={field.id}>
                  <RHFTextField
                    name={`items[${index}].name`}
                    label="Item"
                    placeholder="Item"
                    margin="normal"
                    fullWidth
                  />
                  <IconButton
                    onClick={() =>
                      index === 0 ? append({ name: "" }) : remove(index)
                    }
                  >
                    <i
                      className={`bx ${index === 0 ? "bx-plus" : "bx-trash"}`}
                    ></i>
                  </IconButton>
                </Stack>
              ))}
            </Stack>

            <div style={{ marginTop: "14px" }}>
              <Stack direction="row" gap={1}>
                {isEdit && editMeal?.itemImageUrl && !selectedImage && (
                  <Avatar
                    src={editMeal?.itemImageUrl}
                    alt="blog-image"
                    size="large"
                  />
                )}
                <label>Image</label>
                <RHFUpload
                  name="itemImageUrl"
                  label="Image"
                  placeholder="Image"
                  margin="normal"
                  fullWidth
                  type="file"
                  btnText={isEdit ? "Update Image" : "Upload"}
                />
              </Stack>
            </div>
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
      </DialogContent>
    </Dialog>
  );
};

export default AddMealItem;
