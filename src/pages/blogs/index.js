import { Box, Button, Paper } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import React, { useState } from "react";
import { BlogListing } from "./BlogListing";
import { useFireStore, useToaster } from "../../hooks";
import { collections } from "../../firebase/collections";
import { blogTableHeaders } from "../../constants/metaData";
import AddNewBlog from "./AddNewBlog";
import { deleteDocument } from "../../firebase/services/deleteServices";
import { toastMessages, toastTypes } from "../../constants/keywords";
import { deleteFile } from "../../firebase/services/storage";

const Blog = () => {
  // States
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [editBlog, setEditBlog] = useState(null);

  // Hooks
  const { data, isFetching } = useFireStore(collections.blogs);

  const { toaster } = useToaster();

  // Handlers
  const handleEditBlog = (id) => {
    if (!id) return;
    const selected = data.find((item) => item.id === id);
    if (selected) {
      setEditBlog(selected);
      setIsOpen(true);
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!id) return;
    try {
      const res = await deleteDocument(id, collections.blogs);
      if (!res.status) {
        return toaster(
          toastTypes.ERROR,
          res.error?.message || toastMessages.GENERAL_ERROR
        );
      }
      if (res.status) {
        const selected = data.find((item) => item.id === id);
        await deleteFile(selected.identifier);
        toaster(toastTypes.SUCCESS, toastMessages.DELETED_BLOG_SUCCESS);
      }
    } catch (error) {
      toaster(toastTypes.ERROR, toastMessages.GENERAL_ERROR);
    }
  };

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

  const onDelete = () => {
    if (!selectedItems.length) return;
    selectedItems.forEach(async (item) => {
      try {
        await deleteDocument(item, collections.blogs);
        setSelectedItems([]);
        const selected = data.find(({ id }) => id === item);
        await deleteFile(selected.identifier);
        toaster(toastTypes.SUCCESS, toastMessages.DELETED_BLOG_SUCCESS);
      } catch (error) {
        toaster(toastTypes.ERROR, toastMessages.GENERAL_ERROR);
      }
    });
  };

  const onClose = () => {
    setIsOpen(false);
    setEditBlog(null);
  };

  return (
    <Box sx={{ width: "100%" }} pr={5}>
      <Paper
        sx={{
          p: 2,
          color: "primary",
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>Blogs({data?.length || 0})</Box>
        <Button style={{ marginRight: -496 }} onClick={() => setIsOpen(true)}>
          Add New Blogs <AddCircle />
        </Button>
        {isOpen ? (
          <AddNewBlog
            isOpen={isOpen}
            onClose={onClose}
            isEdit={!!editBlog}
            editBlog={editBlog}
          />
        ) : (
          ""
        )}
        <Button
          onClick={onDelete}
          variant="contained"
          disabled={!selectedItems.length}
        >
          Delete
        </Button>
      </Paper>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <BlogListing
          data={data && data.length > 0 ? data : []}
          handleEdit={handleEditBlog}
          handleDelete={handleDeleteBlog}
          headingItems={blogTableHeaders}
          isLoading={isFetching}
          selectedItems={selectedItems}
          onSelectItems={onSelectItems}
        />
      </Paper>
    </Box>
  );
};

export default Blog;
