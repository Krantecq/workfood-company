import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import CompanyForm from "./CompanyForm";

const AddNewCompany = ({ Open, Close, isEdit = false, company = "" }) => {
  return (
    <Dialog open={Open}>
      <DialogTitle>{isEdit ? "Update" : "Add"} Company details</DialogTitle>
      <DialogContent>
        <CompanyForm isEdit={isEdit} company={company} onClose={Close} />
      </DialogContent>
    </Dialog>
  );
};

export default AddNewCompany;
