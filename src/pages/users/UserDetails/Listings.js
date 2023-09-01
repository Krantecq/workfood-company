import React from "react";
import { Box, Paper } from "@mui/material";
import { listTableHeaders } from "../../../constants/metaData";
import { useToaster, useUserSelected } from "../../../hooks";
import { ListingTable } from "./UserTables/ListingTable";
import { updateDocument } from "../../../firebase/services/updateServices";
import { collections } from "../../../firebase/collections";
import { toastMessages, toastTypes } from "../../../constants/keywords";
import { getDocument } from "../../../firebase/services/getServices";
import { firebaseQueryOperators } from "../../../firebase/queryBuilder";
import { addDocument } from "../../../firebase/services/addServices";
import { deleteDocument } from "../../../firebase/services/deleteServices";

const Listings = () => {
  // Hooks
  const { selectedUser, fetchUser } = useUserSelected();
  const { toaster } = useToaster();

  const onChangeStatus = async (listingId, status) => {
    try {
      const updatedListing = selectedUser?.marketProduct.map((item) =>
        item.marketProductId === listingId
          ? { ...item, status: ["p"].includes(status) ? "a" : "p" }
          : item
      );
      const updatedRes = await updateDocument(
        {
          id: selectedUser.id,
          marketProduct: updatedListing,
        },
        collections.users
      );
      if (!updatedRes.status) {
        return toaster(
          toastTypes.ERROR,
          updatedRes.error?.message || toastMessages.GENERAL_ERROR
        );
      }
      if (updatedRes.status) {
        const res = await getDocument(collections.listing, [
          {
            property: "marketProductId",
            operator: firebaseQueryOperators.EQUAL_TO,
            value: listingId,
          },
        ]);
        if (res.status) {
          let selected = selectedUser?.marketProduct.find(
            (item) => item.marketProductId === listingId
          );
          selected = {
            ...selected,
            status: ["p"].includes(status) ? "a" : "p",
          };
          ["p"].includes(status)
            ? await addDocument(
                { ...selected, userId: selectedUser.id },
                collections.listing
              )
            : res.data.at(0)?.id &&
              (await deleteDocument(res.data.at(0)?.id, collections.listing));
          fetchUser(selectedUser.id);
          toaster(
            toastTypes.SUCCESS,
            toastMessages.UPDATE_STATUS_LISTING_SUCCESS
          );
        }
      }
    } catch (error) {
      toaster(toastTypes.ERROR, toastMessages.GENERAL_ERROR);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        sx={{
          p: 2,
          color: "primary",
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>Listing</Box>
      </Paper>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <ListingTable
          data={
            selectedUser?.marketProduct &&
            selectedUser?.marketProduct?.length > 0
              ? selectedUser.marketProduct
              : []
          }
          headingItems={listTableHeaders}
          isLoading={false}
          selectedItems={""}
          onSelectItems={""}
          onChangeStatus={onChangeStatus}
        />
      </Paper>
    </Box>
  );
};

export default Listings;
