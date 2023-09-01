import {
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Avatar,
  ListItemText,
  IconButton,
  List,
  ListItem,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useMemo } from "react";
import { FormProvider, RHFTextField } from "../../components/hook-form";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { addDocument } from "../../firebase/services/addServices";
import { updateDocument } from "../../firebase/services/updateServices";
import { collections } from "../../firebase/collections";
import { useToaster } from "../../hooks";
import { toastMessages, toastTypes } from "../../constants/keywords";
import { getUniqueId } from "../../utils/helper";
import RHFUpload from "../../components/hook-form/RHFUpload";
import { uploadFile, updateFile } from "../../firebase/services/storage";
import { Delete } from "@mui/icons-material";
import { BLOG_CATEGORIES } from "../../constants/metaData";

const AddNewBlog = ({ isOpen, onClose, isEdit = false, editBlog = "" }) => {
  const initialValues = useMemo(
    () => ({
      title: editBlog?.title || "",
      description: editBlog?.description || "",
      ImageUrl: editBlog?.ImageUrl || "",
      adminName: editBlog?.adminName || "",
      categories: editBlog?.categories || [],
    }),
    [editBlog]
  );

  const formSchema = yup
    .object({
      title: yup
        .string("Enter valid title")
        .trim("Enter valid title")
        .required("Title is required")
        .min(3, "Title must be at least 3 character long")
        .max(300, "Title name must be at most 300 characters long"),
      description: yup
        .string("Enter valid content")
        .trim("Enter valid content")
        .required("Content is required")
        .min(10, "Content must be at least 10 character long")
        .max(50000, "Content must be at most 50000 characters long"),
      ImageUrl: yup.mixed().nullable(),
      adminName: yup.string().required("Admin name is required"),
      categories: yup
        .array(yup.string().required())
        .min(1, "At least one category is required"),
    })
    .strict(true);

  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(formSchema),
  });

  const { toaster } = useToaster();

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
    watch,
  } = methods;

  const selectedImage = watch("ImageUrl");

  const onCloseDialog = () => {
    reset();
    onClose();
  };

  const onSubmitBlog = async (formData) => {
    const { ImageUrl, ...restData } = formData;
    try {
      if (isEdit) {
        let updatedImage = ImageUrl;
        if (typeof ImageUrl !== "string") {
          const updateRes = await updateFile(ImageUrl, editBlog.identifier);
          if (updateRes.status) {
            updatedImage = updateRes.url;
          }
        }
        const res = await updateDocument(
          {
            id: editBlog.id,
            ...restData,
            ...(updatedImage
              ? {
                  identifier: editBlog.identifier,
                  ImageUrl: updatedImage,
                }
              : {}),
          },
          collections.blogs
        );
        if (!res.status) {
          return toaster(
            toastTypes.ERROR,
            res.error?.message || toastMessages.GENERAL_ERROR
          );
        }
        if (res.status) {
          toaster(toastTypes.SUCCESS, toastMessages.UPDATE_BLOG_SUCCESS);
          onCloseDialog();
        }
      } else {
        const uuid = getUniqueId();
        const imgRes = await uploadFile(ImageUrl, uuid);
        if (imgRes?.status) {
          const res = await addDocument(
            {
              ...restData,
              createdAt: new Date(),
              ImageUrl: imgRes.url,
              identifier: imgRes.identifier,
              comments: [],
            },
            collections.blogs
          );
          if (!res.status) {
            return toaster(
              toastTypes.ERROR,
              res.error.message || toastMessages.GENERAL_ERROR
            );
          }
          if (res.status) {
            toaster(toastTypes.SUCCESS, toastMessages.CREATE_BLOG_SUCCESS);
            onCloseDialog();
          }
        } else {
          toaster(toastTypes.ERROR, toastMessages.GENERAL_ERROR);
        }
      }
    } catch (error) {
      toaster(toastTypes.ERROR, toastMessages.GENERAL_ERROR);
    }
  };

  const onDeleteComment = async (currIndex) => {
    try {
      const updatedComments = editBlog.comments.filter(
        (_, index) => index !== currIndex
      );
      const res = await updateDocument(
        {
          id: editBlog.id,
          comments: updatedComments,
        },
        collections.blogs
      );
      if (!res.status) {
        return toaster(
          toastTypes.ERROR,
          res.error?.message || toastMessages.GENERAL_ERROR
        );
      }
      if (res.status) {
        toaster(toastTypes.SUCCESS, toastMessages.COMMENT_DELETED_SUCCESS);
        onCloseDialog();
      }
    } catch (error) {
      toaster(toastTypes.ERROR, toastMessages.GENERAL_ERROR);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onCloseDialog} maxWidth="md" fullWidth>
      <DialogTitle>{isEdit ? "Update" : "Add"} Blog Details</DialogTitle>
      <DialogContent>
        <FormProvider onSubmit={handleSubmit(onSubmitBlog)} methods={methods}>
          <RHFTextField
            name="title"
            label="Title"
            placeholder="Title"
            margin="normal"
            fullWidth
          />
          <RHFTextField
            name="adminName"
            label="Admin Name"
            placeholder="Admin Name"
            margin="normal"
            fullWidth
          />
          <Controller
            name="categories"
            control={methods.control}
            render={({ field }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel>Categories</InputLabel>
                <Select
                  {...field}
                  multiple
                  value={field.value}
                  onChange={(event) => field.onChange(event.target.value)}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {BLOG_CATEGORIES.map((item) => (
                    <MenuItem value={item} key={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          <div style={{ marginTop: "14px" }}>
            <Stack direction="row" gap={1}>
              {isEdit && editBlog.imgUrl && !selectedImage && (
                <Avatar src={editBlog.imgUrl} alt="blog-image" size="large" />
              )}
              <label>Image</label>
              <RHFUpload
                name="ImageUrl"
                label="Image"
                placeholder="Image"
                margin="normal"
                fullWidth
                type="file"
                btnText={isEdit ? "Update Image" : "Upload"}
              />
            </Stack>
          </div>
          <RHFTextField
            name="description"
            label="Blog Content"
            placeholder="Blog Content"
            margin="normal"
            fullWidth
            multiline
            rows={10}
          />
          <Stack gap={1}>
            <Typography variant="subtitle1">Comments</Typography>
            {isEdit &&
              editBlog?.comments &&
              editBlog?.comments.length > 0 &&
              editBlog?.comments.map((item, index) => (
                <List dense key={index}>
                  <ListItem
                    secondaryAction={
                      <Stack direction="row" gap={1}>
                        <Typography variant="subtitle1">{item.time}</Typography>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => onDeleteComment(index)}
                        >
                          <Delete />
                        </IconButton>
                      </Stack>
                    }
                  >
                    <ListItemText primary={item.text} secondary={item.userId} />
                  </ListItem>
                </List>
              ))}
          </Stack>

          <div style={{ marginTop: "14px" }}>
            <Button onClick={onCloseDialog}>Cancel</Button>
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              loading={isSubmitting}
            >
              Submit
            </LoadingButton>
          </div>
        </FormProvider>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default AddNewBlog;
