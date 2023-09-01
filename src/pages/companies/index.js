import { Box, Button, Paper } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import React, { useState } from "react";
import { CompaniesListing } from "./CompanyListing";
import { useFireStore, useToaster } from "../../hooks";
import { collections } from "../../firebase/collections";
import { companiesTableHeaders } from "../../constants/metaData";
import { deleteDocument } from "../../firebase/services/deleteServices";
import {
  confirmationMessages,
  toastMessages,
  toastTypes,
} from "../../constants/keywords";
import AddNewCompany from "./AddCompanyDetails";
import { Confirmation } from "../../components";

const Companies = () => {
  // States
  const [selectedItems, setSelectedItems] = useState([]);
  const [isAddNewCompanyOpen, setAddNewCompanyOpen] = useState(false);
  const [editCompany, setEditCompany] = useState(null);
  const [deleteCompany, setDeleteCompany] = useState(null);

  // Hooks
  const { data, isFetching } = useFireStore(collections.companies);

  const { toaster } = useToaster();

  // Handlers
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

  const openAddNewCompany = () => {
    setAddNewCompanyOpen(true);
  };

  const closeAddNewCompany = () => {
    setAddNewCompanyOpen(false);
    setEditCompany(null);
  };

  const onDelete = () => {
    if (!selectedItems.length) return;
    selectedItems.forEach(async (item) => {
      try {
        await deleteDocument(item, collections.companies);
        await deleteDocument(item, collections.DomainName);
        setSelectedItems([]);
        toaster(toastTypes.SUCCESS, toastMessages.DELETED_COMPANY_SUCCESS);
      } catch (error) {
        toaster(toastTypes.ERROR, toastMessages.GENERAL_ERROR);
      }
    });
  };

  const onEdit = (id) => {
    if (!id) return;
    const selected = data.find((item) => item.id === id);
    if (selected) {
      setEditCompany(selected);
      openAddNewCompany();
    }
  };
  const onDeleteCompany = (id) => {
    if (!id) return;
    setDeleteCompany(id);
  };

  const onDeleteConfirmed = async (result) => {
    try {
      if (result) {
        const res = await deleteDocument(deleteCompany, collections.companies);
        await deleteDocument(deleteCompany, collections.DomainName);
        if (!res.status) {
          return toaster(
            toastTypes.ERROR,
            res.status?.message || toastMessages.GENERAL_ERROR
          );
        }
        if (res.status) {
          toaster(toastTypes.SUCCESS, toastMessages.DELETED_COMPANY_SUCCESS);
          setDeleteCompany(null);
        }
      } else {
        setDeleteCompany(null);
      }
    } catch (error) {}
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
        <Box>Companies ({data?.length || 0})</Box>
        <Button style={{ marginRight: -496 }} onClick={openAddNewCompany}>
          Add New Company <AddCircle />
        </Button>
        <AddNewCompany
          Open={isAddNewCompanyOpen}
          Close={closeAddNewCompany}
          isEdit={!!editCompany}
          company={editCompany}
        />
        <Button
          variant="contained"
          disabled={!selectedItems.length}
          onClick={onDelete}
        >
          Delete
        </Button>
      </Paper>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <CompaniesListing
          data={data && data.length > 0 ? data : []}
          selectedItems={selectedItems}
          onSelectItems={onSelectItems}
          headingItems={companiesTableHeaders}
          isLoading={isFetching}
          onEdit={onEdit}
          onDelete={onDeleteCompany}
        />
        <Confirmation
          isOpen={deleteCompany}
          onClose={() => setDeleteCompany(null)}
          actionMessage={confirmationMessages.COMPANY}
          onClickAction={onDeleteConfirmed}
        />
      </Paper>
    </Box>
  );
};

export default Companies;
