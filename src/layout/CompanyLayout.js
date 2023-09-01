import React, { useState } from "react";
import { DashboardWrapperMain } from "../components/dashboard-wrapper/DashboardWrapper";
import { Button, Stack, Typography } from "@mui/material";
import CompanyCards from "../pages/companies/companyDetail/CompanyCards";
import { Outlet, useParams } from "react-router-dom";
import { useFireStore } from "../hooks";
import { firebaseQueryOperators } from "../firebase/queryBuilder";
import { collections } from "../firebase/collections";
import AddNewCompany from "../pages/companies/AddCompanyDetails";
import AddLocation from "../pages/companies/companyDetail/AddLocation";
import { getDocument } from "../firebase/services/getServices";
import AddMeals from "../pages/companies/companyDetail/AddMeals";
import AddHeaderImage from "../pages/companies/companyDetail/AddHeaderImage";
import { colors } from "../constants";

const CompanyLayout = () => {
  // States
  const [isEdit, setIsEdit] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isMealOpen, setIsMealOpen] = useState(false);
  const [locations, setLocations] = useState([]);
  const [isHeaderOpen, setIsHeaderOpen] = useState(false);

  // Hooks
  const { id } = useParams();
  const { isFetching, data } = useFireStore(`${collections.CompanyName}`, [
    { property: "id", operator: firebaseQueryOperators.EQUAL_TO, value: id },
  ]);

  if (isFetching) return "Loading...";

  const company = data?.at(0);

  const onUpdateCompany = () => setIsEdit(true);

  const fetchLocations = async () => {
    try {
      const res = await getDocument(
        `${collections.CompanyName}/${id}/OfficeAddress`
      );
      if (res.status && res.data && res.data.length > 0) {
        setLocations(res.data);
      } else setLocations([]);
    } catch (error) {}
  };

  const onAddLocation = async () => {
    await fetchLocations();
    setIsLocationOpen(true);
  };

  const onAddMeal = async () => {
    setIsMealOpen(true);
  };

  const onAddHeader = async () => {
    setIsHeaderOpen(true);
  };
  const onCloseHeader = async () => {
    setIsHeaderOpen(false);
  };

  const onCloseLocation = () => {
    setIsLocationOpen(false);
  };
  const onCloseMeals = () => {
    setIsMealOpen(false);
  };

  return data ? (
    <DashboardWrapperMain>
      <Stack pr={5} gap={4}>
        <Stack
          gap={12}
          direction="row"
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Typography variant="h2">{company?.CompanyName}</Typography>
          <Stack direction="row" gap={2}>
            <Button
              variant="contained"
              onClick={onAddMeal}
              sx={{ backgroundColor: colors.yellow, color: "#000" }}
            >
              Add Meals
            </Button>
            <AddMeals open={isMealOpen} onClose={onCloseMeals} companyId={id} />
            <Button
              variant="contained"
              onClick={onAddLocation}
              sx={{ backgroundColor: colors.yellow, color: "#000" }}
            >
              Add New Location
            </Button>
            <AddLocation
              open={isLocationOpen}
              onClose={onCloseLocation}
              data={locations}
              companyId={id}
              fetchLocations={fetchLocations}
            />
            <Button
              variant="contained"
              onClick={onUpdateCompany}
              sx={{ backgroundColor: colors.yellow, color: "#000" }}
            >
              Change Basic Details
            </Button>
            <AddNewCompany
              isEdit={isEdit}
              company={company}
              Open={isEdit}
              Close={() => setIsEdit(false)}
            />
            <Button
              variant="contained"
              onClick={onAddHeader}
              sx={{ backgroundColor: colors.yellow, color: "#000" }}
            >
              Add Header Images
            </Button>
            <AddHeaderImage
              open={isHeaderOpen}
              companyId={id}
              onClose={onCloseHeader}
            />
          </Stack>
        </Stack>
        <Stack gap={12} sx={{ w: "100%" }}>
          <CompanyCards companyId={id} />
        </Stack>
        <Outlet />
      </Stack>
    </DashboardWrapperMain>
  ) : (
    "No Company found"
  );
};

export default CompanyLayout;
