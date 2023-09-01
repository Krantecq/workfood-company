import { Box, Button, Paper } from "@mui/material";
import React, { useState } from "react";
import { AddCircle } from "@mui/icons-material";
import { ItemListing } from "./ItemListing";
import { useFireStore, useToaster } from "../../hooks";
import { collections } from "../../firebase/collections";
import { listTableHeaders } from "../../constants/metaData";
import AddNewCategory from "./AddNewCategory";
import { deleteDocument } from "../../firebase/services/deleteServices";
import { toastMessages, toastTypes } from "../../constants/keywords";
import { getDocument } from "../../firebase/services/getServices";
import { firebaseQueryOperators } from "../../firebase/queryBuilder";
import { updateDocument } from "../../firebase/services/updateServices";

const Listing = () => {
  // States
  const [selectedItems, setSelectedItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Hooks
  const { data, isFetching } = useFireStore(collections.orders);

  const { toaster } = useToaster();

  const onSelectItems = (checked, isAll = false, id) => {
    if (isAll) {
      checked
        ? setSelectedItems(data.map(({ id }) => id))
        : setSelectedItems([]);
    } else {
      checked
        ? setSelectedItems((prev) => [...prev, id])
        : setSelectedItems((prev) => prev.filter((item) => item !== id));
    }
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onDelete = () => {
    if (!selectedItems.length) return;
    selectedItems.forEach(async (item) => {
      try {
        await deleteDocument(item, collections.listing);
        if (item.userId) {
          const res = await getDocument(collections.users, [
            {
              property: "id",
              operator: firebaseQueryOperators.EQUAL_TO,
              value: item.userId,
            },
          ]);
          if (res.status && res?.data[0]?.listing > 0) {
            const updatedListing = res?.data[0]?.listing?.map((list) =>
              list.marketProductId === item.marketProductId
                ? { ...item, status: "p" }
                : item
            );
            await updateDocument(
              { listing: updatedListing, id: item.userId },
              collections.users
            );
          }
        }
        setSelectedItems([]);
        toaster(toastTypes.SUCCESS, toastMessages.DELETE_LISTING_SUCCESS);
      } catch (error) {
        toaster(toastTypes.ERROR, toastMessages.GENERAL_ERROR);
      }
    });
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
        <Box>Orders({data?.length || 0})</Box>
        {/* <Button style={{ marginRight: -496 }} onClick={() => setIsOpen(true)}>
          Add New Category <AddCircle />
        </Button> */}
        <AddNewCategory isOpen={isOpen} onClose={onClose} />
        <Button
          onClick={onDelete}
          variant="contained"
          disabled={!selectedItems.length}
        >
          Delete
        </Button>
      </Paper>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <ItemListing
          data={data && data.length > 0 ? data : []}
          headingItems={listTableHeaders}
          isLoading={isFetching}
          selectedItems={selectedItems}
          onSelectItems={onSelectItems}
        />
      </Paper>
    </Box>
  );
};

export default Listing;
