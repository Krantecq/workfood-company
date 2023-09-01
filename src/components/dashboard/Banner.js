import { LoadingButton } from "@mui/lab";
import { Avatar, Button, Stack } from "@mui/material";
import React, { useRef, useState } from "react";
import {
  confirmationMessages,
  toastMessages,
  toastTypes,
} from "../../constants/keywords";
import { bannerHeadings } from "../../constants/metaData";
import { collections } from "../../firebase/collections";
import { addDocument } from "../../firebase/services/addServices";
import { deleteDocument } from "../../firebase/services/deleteServices";
import { deleteFile, uploadFile } from "../../firebase/services/storage";
import { useFireStore, useToaster } from "../../hooks";
import { getUniqueId } from "../../utils/helper";
import Confirmation from "../confirmation";
import BannerListing from "./BannerListing";

const Banner = () => {
  const [bannerImage, setBannerImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const bannerImageRef = useRef(null);
  const { toaster } = useToaster();
  const { data, isFetching } = useFireStore(collections.BANNER);

  const onRemove = () => {
    bannerImageRef.current = null;
    setBannerImage(null);
  };

  const onUploadBanner = async () => {
    if (!bannerImage) return;
    try {
      setIsUploading(true);
      const uuid = getUniqueId();
      const res = await uploadFile(bannerImage, uuid);
      if (!res.status) {
        setIsUploading(false);
        return toaster(
          toastTypes.ERROR,
          res.error?.message || toastMessages.GENERAL_ERROR
        );
      }
      if (res.status) {
        const docRes = await addDocument(
          {
            image: res.url,
            identifier: res.identifier,
            uploadedAt: new Date(),
          },
          collections.BANNER
        );
        setIsUploading(false);

        if (!docRes.status) {
          return toaster(
            toastTypes.ERROR,
            res.error?.message || toastMessages.GENERAL_ERROR
          );
        }
        if (docRes.status) {
          toaster(toastTypes.SUCCESS, toastMessages.BANNER_UPLOADED_SUCCESS);
          onRemove();
        }
      }
    } catch (error) {
      setIsUploading(false);
      toaster(toastTypes.ERROR, toastMessages.GENERAL_ERROR);
      bannerImageRef.current.value = null;
      setBannerImage(null);
    }
  };

  const onChangeBannerImage = (e) => {
    const bannerImage = e.target.files[0];
    setBannerImage(bannerImage);
  };

  const onDeleteBanner = (id) => {
    if (!id) return;
    setIsConfirmOpen(id);
  };
  const onCloseConfirm = () => {
    setIsConfirmOpen(false);
  };

  const onDeleteConfirmed = async (isConfirmed) => {
    if (isConfirmed) {
      try {
        const selected = data.find(({ id }) => id === isConfirmOpen);
        const res = await deleteFile(selected.identifier);
        if (res.status) {
          const docRes = await deleteDocument(
            isConfirmOpen,
            collections.BANNER
          );
          if (!docRes.status) {
            return toaster(
              toastTypes.ERROR,
              res.error?.message || toastMessages.GENERAL_ERROR
            );
          }
          if (docRes.status) {
            toaster(toastTypes.SUCCESS, toastMessages.BANNER_DELETED_SUCCESS);
            onCloseConfirm();
          }
        }
      } catch (error) {
        toaster(toastTypes.ERROR, toastMessages.GENERAL_ERROR);
      }
    } else {
      onCloseConfirm();
    }
  };

  return (
    <Stack gap={2}>
      <Stack direction="row" gap={1}>
        {bannerImage ? (
          <Avatar
            src={URL.createObjectURL(bannerImage)}
            sx={{ h: 100, w: 100 }}
          />
        ) : (
          <Button variant="contained" component="label">
            Choose Banner
            <input
              hidden
              ref={bannerImageRef}
              accept="image/*"
              type="file"
              onChange={onChangeBannerImage}
            />
          </Button>
        )}
        <LoadingButton
          variant="contained"
          onClick={onUploadBanner}
          loading={isUploading}
          disabled={!bannerImage}
        >
          Upload Banner
        </LoadingButton>
        {bannerImage && (
          <Button variant="contained" onClick={onRemove}>
            Remove
          </Button>
        )}
      </Stack>
      <BannerListing
        isLoading={isFetching}
        headingItems={bannerHeadings}
        data={data}
        handleDelete={onDeleteBanner}
        isCheckBox={false}
      />
      <Confirmation
        isOpen={isConfirmOpen}
        onClose={onCloseConfirm}
        onClickAction={onDeleteConfirmed}
        actionMessage={confirmationMessages.BANNER}
      />
    </Stack>
  );
};

export default Banner;
