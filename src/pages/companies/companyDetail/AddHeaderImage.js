import {
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider } from "../../../components/hook-form";
import { LoadingButton } from "@mui/lab";
import { MuiTable, NoDataFound, TableLoader } from "../../../components";
import { headerImageTableHeaders } from "../../../constants/metaData";
import { updateDocument } from "../../../firebase/services/updateServices";
import { addDocument } from "../../../firebase/services/addServices";
import { collections } from "../../../firebase/collections";
import { useFireStore, useToaster } from "../../../hooks";
import { toastMessages, toastTypes } from "../../../constants/keywords";
import RHFUpload from "../../../components/hook-form/RHFUpload";
import {
  deleteFile,
  updateFile,
  uploadFile,
} from "../../../firebase/services/storage";
import { getUniqueId } from "../../../utils/helper";
import { deleteDocument } from "../../../firebase/services/deleteServices";

const AddHeaderImage = ({ open, onClose, companyId }) => {
  const [editHeader, setEditHeader] = useState(null);

  const initialValues = useMemo(
    () => ({
      image: "",
    }),
    []
  );
  const { toaster } = useToaster();

  const { isFetching, data } = useFireStore(
    `${collections.CompanyName}/${companyId}/HeaderImage`
  );

  const formSchema = yup
    .object({
      image: yup.mixed().required("Image is required"),
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
    setValue,
    watch,
  } = methods;

  const selectedImage = watch("image");

  const onCloseDialog = () => {
    reset();
    onClose();
    setEditHeader(null);
  };

  const onSubmit = async ({ image }) => {
    try {
      if (editHeader) {
        let updatedImage = image;
        if (typeof image !== "string") {
          const updateRes = await updateFile(image, editHeader.identifier);
          if (updateRes.status) {
            updatedImage = updateRes.url;
          }
        }

        const res = await updateDocument(
          {
            id: editHeader.id,
            ...(updatedImage
              ? {
                  identifier: editHeader.identifier,
                  image: updatedImage,
                }
              : {}),
          },
          `${collections.CompanyName}/${companyId}/HeaderImage`
        );
        if (!res.status) {
          return toaster(
            toastTypes.ERROR,
            res.error?.message || toastMessages.GENERAL_ERROR
          );
        }
        if (res.status) {
          toaster(toastTypes.SUCCESS, toastMessages.HEADER_UPDATE_SUCCESS);
          reset();
        }
      } else {
        const uuid = getUniqueId();
        const imageRes = await uploadFile(image, uuid);
        if (imageRes.status) {
          const res = await addDocument(
            {
              identifier: imageRes.identifier,
              image: imageRes.url,
            },
            `${collections.CompanyName}/${companyId}/HeaderImage`
          );
          if (!res.status) {
            return toaster(
              toastTypes.ERROR,
              res.error.message || toastMessages.GENERAL_ERROR
            );
          }
          if (res.status) {
            toaster(toastTypes.SUCCESS, toastMessages.HEADER_ADDED_SUCCESS);
            reset();
          }
        }
      }
    } catch (error) {}
  };

  const onEdit = (id) => {
    if (!id) return;
    const selected = data?.find((item) => item.id === id);
    setEditHeader(selected);
    if (selected) {
      setValue("image", selected.image);
    }
  };

  const onDelete = async (id) => {
    if (!id) return;
    try {
      await deleteFile(data?.find((item) => item.id === id)?.identifier);
      const res = await deleteDocument(
        id,
        `${collections.CompanyName}/${companyId}/HeaderImage`
      );
      if (!res.status) {
        return toaster(
          toastTypes.ERROR,
          res.error.message || toastMessages.GENERAL_ERROR
        );
      }
      if (res.status) {
        toaster(toastTypes.SUCCESS, toastMessages.HEADER_DELETE_SUCCESS);
      }
    } catch (error) {
      toaster(toastTypes.ERROR, toastMessages.GENERAL_ERROR);
    }
  };

  return (
    <Dialog open={open} onClose={onCloseDialog} maxWidth="md" fullWidth>
      <DialogTitle>Add Header Image</DialogTitle>
      <DialogContent>
        <FormProvider onSubmit={handleSubmit(onSubmit)} methods={methods}>
          <Stack direction="row" alignItems="center" gap={4}>
            <Stack direction="row" gap={1}>
              <label>Image</label>
              <RHFUpload
                name="image"
                label="Image"
                placeholder="Image"
                margin="normal"
                fullWidth
                type="file"
                btnText={editHeader ? "Update Image" : "Upload"}
              />
            </Stack>
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              loading={isSubmitting}
              disabled={!selectedImage}
            >
              {editHeader ? "Update" : "Add"}
            </LoadingButton>
          </Stack>
        </FormProvider>
        <Stack>
          <MuiTable headingItems={headerImageTableHeaders} isCheckBox={false}>
            <TableBody>
              {isFetching ? (
                <TableLoader colSpan={headerImageTableHeaders.length} />
              ) : data && data.length > 0 ? (
                data?.map(({ id, image }, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Avatar src={image} />
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => onEdit(id)}>
                          <i className="bx bx-edit"></i>
                        </IconButton>
                        <IconButton onClick={() => onDelete(id)}>
                          <i className="bx bx-trash"></i>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <NoDataFound colSpan={headerImageTableHeaders.length} />
              )}
            </TableBody>
          </MuiTable>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default AddHeaderImage;
