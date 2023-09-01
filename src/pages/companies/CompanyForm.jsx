import { Button } from "@mui/material";
import React, { useMemo } from "react";
import { FormProvider, RHFTextField } from "../../components/hook-form";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { addDocument } from "../../firebase/services/addServices";
import { collections } from "../../firebase/collections";
import { useToaster } from "../../hooks";
import { toastMessages, toastTypes } from "../../constants/keywords";
import { updateDocument } from "../../firebase/services/updateServices";
import { getUniqueName } from "../../utils/helper";

const formSchema = yup
  .object({
    CompanyName: yup
      .string()
      .required("Company name is required")
      .trim("Enter valid company name")
      .min(3, "Company name must be at least 3 character long")
      .max(100, "Company name must be at most 100 characters long"),
    CompanyAddress: yup
      .string()
      .required("Company name is required")
      .trim("Enter valid company name")
      .min(3, "Company name must be at least 3 character long")
      .max(100, "Company name must be at most 100 characters long"),
    DomainName: yup
      .string()
      .required("Domain name is required")
      .trim("Enter valid domain name")
      .min(3, "Domain name must be at least 3 character long")
      .max(20, "Domain name must be at most 20 characters long"),
    Gst: yup
      .string()
      .required("Gst is required")
      .trim("Enter valid gst")
      .min(15, "Gst must be at least 15 character long")
      .max(15, "Gst must be at most 15 characters long"),
    Email: yup
      .string()
      .required("Email is required")
      .email("Enter valid email")
      .trim("Enter valid email"),
    ContactPerson: yup
      .string()
      .required("Contact person is required")
      .trim("Enter valid Contact person")
      .min(3, "Contact person must be at least 3 character long")
      .max(50, "Contact person must be at most 20 characters long"),
  })
  .strict(true);

const CompanyForm = ({ onClose, isEdit = false, company = "" }) => {
  // Init
  const initialValues = useMemo(
    () => ({
      CompanyName: company?.CompanyName || "",
      DomainName: company?.DomainName || "",
      CompanyAddress: company?.CompanyAddress || "",
      Gst: company?.Gst || "",
      Email: company?.Email || "",
      ContactPerson: company?.ContactPerson || "",
    }),
    [company]
  );

  // Hooks
  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(formSchema),
  });
  const { toaster } = useToaster();

  // Constants
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const CloseDialog = () => {
    reset();
    onClose();
  };

  const onSubmit = async (formData) => {
    try {
      const res = isEdit
        ? await updateDocument(
            {
              ...formData,
              updateAt: new Date(),
              id: company?.id,
            },
            collections.companies
          )
        : await addDocument(
            {
              ...formData,
              createdAt: new Date(),
            },
            collections.companies,
            getUniqueName(formData.CompanyName)
          );
      if (!res.status) {
        return toaster(
          toastTypes.ERROR,
          res?.error?.message || toastMessages.GENERAL_ERROR
        );
      }
      if (res.status) {
        isEdit
          ? await updateDocument(
              {
                CompanyName: formData?.CompanyName || "",
                DomainName: formData?.DomainName || "",
                updateAt: new Date(),
                id: company?.id,
              },
              collections.DomainName
            )
          : await addDocument(
              {
                CompanyName: formData?.CompanyName || "",
                DomainName: formData?.DomainName || "",
              },
              collections.DomainName,
              res.data
            );
        toaster(
          toastTypes.SUCCESS,
          isEdit
            ? toastMessages.CREATE_COMPANY_SUCCESS
            : toastMessages.UPDATE_COMPANY_SUCCESS
        );
        CloseDialog();
      }
    } catch (error) {
      toaster(toastTypes.ERROR, toastMessages.GENERAL_ERROR);
    }
  };

  return (
    <FormProvider onSubmit={handleSubmit(onSubmit)} methods={methods}>
      <RHFTextField
        name="CompanyName"
        label="Company Name"
        placeholder="Company Name"
        fullWidth
        margin="normal"
      />
      <RHFTextField
        name="DomainName"
        label="Domain Name"
        placeholder="Domain Name"
        fullWidth
        margin="normal"
      />
      <RHFTextField
        name="CompanyAddress"
        label="Company address"
        placeholder="Company address"
        fullWidth
        margin="normal"
      />
      <RHFTextField
        name="Gst"
        label="GST"
        placeholder="Company GST IN"
        fullWidth
        margin="normal"
      />
      <RHFTextField
        name="ContactPerson"
        label="Contact Person"
        placeholder="Contact Person"
        fullWidth
        margin="normal"
      />
      <RHFTextField
        name="Email"
        label="Email Address"
        placeholder="Email Address"
        fullWidth
        margin="normal"
      />

      <br></br>
      <Button onClick={CloseDialog}>Cancel</Button>
      <LoadingButton
        type="submit"
        variant="contained"
        color="primary"
        loading={isSubmitting}
      >
        {isEdit ? "Update" : "Add"}
      </LoadingButton>
    </FormProvider>
  );
};

export default CompanyForm;
