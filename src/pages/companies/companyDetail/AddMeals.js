/* eslint-disable eqeqeq */
import {
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import React, { useMemo, useState } from "react";

import { MuiTable, NoDataFound, TableLoader } from "../../../components";
import { MEAL_DATA, mealTableHeaders } from "../../../constants/metaData";
import { collections } from "../../../firebase/collections";
import { useFireStore, useToaster } from "../../../hooks";
import AddMealItem from "./AddMealItem";
import {
  WEEK_DAYS,
  toastMessages,
  toastTypes,
} from "../../../constants/keywords";
// import { getDocument } from "../../../firebase/services/getServices";
// import { firebaseQueryOperators } from "../../../firebase/queryBuilder";
import { Delete, Edit } from "@mui/icons-material";
import { deleteDocument } from "../../../firebase/services/deleteServices";
import { deleteFile } from "../../../firebase/services/storage";

const CustomChip = ({ item, onDeleteMeal, onEditMeal }) => (
  <Chip
    variant="outlined"
    key={item?.id}
    label={item?.itemName}
    color="success"
    onDelete={() => onDeleteMeal(item.id)}
    deleteIcon={
      <IconButton
        onDelete={() => onDeleteMeal(item.id)}
        size="small"
        color="error"
      >
        <Delete fontSize="small" />
      </IconButton>
    }
    avatar={
      <IconButton
        onClick={() => onEditMeal(item.id)}
        size="small"
        color="secondary"
      >
        <Edit fontSize="small" />
      </IconButton>
    }
  />
);

const AddMeals = ({ open, onClose, companyId }) => {
  // States
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isMealOpen, setIsMealOpen] = useState(false);
  const [editMeal, setEditMeal] = useState(null);

  const { data: locations, isFetching } = useFireStore(
    `${collections.companies}/${companyId}/OfficeAddress`
  );

  const { data: foodItems, isFoodItemsFetching } = useFireStore(
    `${collections.companies}/${companyId}/FoodItem`
  );
  const { toaster } = useToaster();

  const TABLE_DATA = useMemo(() => {
    return MEAL_DATA.map((item) => ({
      ...item,
      breakFast: foodItems?.filter(
        ({ day, mealType, locationId }) =>
          selectedLocation === locationId &&
          day == item.day &&
          mealType === "Breakfast"
      ),
      lunch: foodItems?.filter(
        ({ day, mealType, locationId }) =>
          selectedLocation === locationId &&
          day == item.day &&
          mealType === "Lunch"
      ),
      dinner: foodItems?.filter(
        ({ day, mealType, locationId }) =>
          selectedLocation === locationId &&
          day == item.day &&
          mealType === "Dinner"
      ),
      addOns: foodItems?.filter(
        ({ day, mealType, locationId }) =>
          selectedLocation === locationId &&
          day == item.day &&
          mealType === "AddOns"
      ),
      liveCounter: foodItems?.filter(
        ({ day, mealType, locationId }) =>
          selectedLocation === locationId &&
          day == item.day &&
          mealType === "Live Counter"
      ),
    }));
  }, [foodItems, selectedLocation]);

  // const fetchMeals = async (locationId) => {
  //   if (!locationId) return;
  //   const res = await getDocument(
  //     `${collections.companies}/${companyId}/FoodItem`,
  //     [
  //       {
  //         property: "locationId",
  //         operator: firebaseQueryOperators.EQUAL_TO,
  //         value: locationId,
  //       },
  //     ]
  //   );
  //   if (res.status) {
  //     setMeals(res.data);
  //   }
  // };

  const onCloseDialog = () => {
    setSelectedLocation("");
    setIsMealOpen(false);
    onClose();
  };

  const onAddMeal = () => {
    setIsMealOpen(true);
  };

  const onCloseMeal = () => {
    setIsMealOpen(false);
    setEditMeal(null);
  };

  const onSelectLocation = async (value) => {
    setSelectedLocation(value);
  };

  const onDeleteMeal = async (id) => {
    if (!id) return;
    try {
      const res = await deleteDocument(
        id,
        `${collections.companies}/${companyId}/FoodItem`
      );
      if (!res.status) {
        return toaster(
          toastTypes.ERROR,
          res.error?.message || toastMessages.GENERAL_ERROR
        );
      }
      if (res.status) {
        const selected = TABLE_DATA.find((item) => item.id === id);
        if (selected.identifier) await deleteFile(selected?.identifier);
        toaster(toastTypes.SUCCESS, toastMessages.MEAL_DELETE_SUCCESS);
      }
    } catch (error) {}
  };

  const onEditMeal = async (id) => {
    if (!id) return;
    const selected = foodItems.find((item) => item.id === id);
    if (selected) {
      setEditMeal(selected);
      setIsMealOpen(true);
    }
  };

  return (
    <Dialog open={open} onClose={onCloseDialog} maxWidth="md" fullWidth>
      <DialogTitle>Add Meals</DialogTitle>
      <DialogContent>
        <Stack gap={4}>
          <Stack direction="row" alignItems="center" gap={4}>
            <Select
              label="Choose Location"
              fullWidth
              value={selectedLocation}
              onChange={({ target: { value } }) => onSelectLocation(value)}
              disabled={isFetching}
              variant="filled"
            >
              {locations &&
                locations.length > 0 &&
                locations.map(({ id, address }) => (
                  <MenuItem value={id} key={id}>
                    {address?.at(0)}
                  </MenuItem>
                ))}
            </Select>
          </Stack>
          {selectedLocation ? (
            <Stack gap={1}>
              <Button variant="contained" onClick={onAddMeal}>
                Add Meal
              </Button>
              <AddMealItem
                isOpen={isMealOpen}
                onClose={onCloseMeal}
                companyId={companyId}
                locationId={selectedLocation}
                editMeal={editMeal}
                isEdit={!!editMeal}
              />
              <MuiTable headingItems={mealTableHeaders} isCheckBox={false}>
                <TableBody>
                  {isFoodItemsFetching ? (
                    <TableLoader colSpan={mealTableHeaders.length} />
                  ) : TABLE_DATA && TABLE_DATA.length > 0 ? (
                    TABLE_DATA?.map(
                      ({ day, breakFast, lunch, dinner, liveCounter }) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={day}
                          >
                            <TableCell>{WEEK_DAYS[day]}</TableCell>
                            <TableCell>
                              <Stack direction="row" gap={2} flexWrap={"wrap"}>
                                {breakFast && breakFast?.length > 0
                                  ? breakFast.map((item) => (
                                      <CustomChip
                                        key={item?.id}
                                        item={item}
                                        onDeleteMeal={() =>
                                          onDeleteMeal(item.id)
                                        }
                                        onEditMeal={() => onEditMeal(item.id)}
                                      />
                                    ))
                                  : ""}
                              </Stack>
                            </TableCell>
                            <TableCell>
                              <Stack direction="row" gap={2} flexWrap={"wrap"}>
                                {lunch && lunch?.length > 0
                                  ? lunch.map((item) => (
                                      <CustomChip
                                        key={item?.id}
                                        item={item}
                                        onDeleteMeal={() =>
                                          onDeleteMeal(item.id)
                                        }
                                        onEditMeal={() => onEditMeal(item.id)}
                                      />
                                    ))
                                  : ""}
                              </Stack>
                            </TableCell>
                            <TableCell>
                              <Stack direction="row" gap={2} flexWrap={"wrap"}>
                                {dinner && dinner?.length > 0
                                  ? dinner.map((item) => (
                                      <CustomChip
                                        key={item?.id}
                                        item={item}
                                        onDeleteMeal={() =>
                                          onDeleteMeal(item.id)
                                        }
                                        onEditMeal={() => onEditMeal(item.id)}
                                      />
                                    ))
                                  : ""}
                              </Stack>
                            </TableCell>
                            <TableCell>
                              <Stack direction="row" gap={2} flexWrap={"wrap"}>
                                {liveCounter && liveCounter?.length > 0
                                  ? liveCounter.map((item) => (
                                      <CustomChip
                                        key={item?.id}
                                        item={item}
                                        onDeleteMeal={() =>
                                          onDeleteMeal(item.id)
                                        }
                                        onEditMeal={() => onEditMeal(item.id)}
                                      />
                                    ))
                                  : ""}
                              </Stack>
                            </TableCell>
                          </TableRow>
                        );
                      }
                    )
                  ) : (
                    <NoDataFound colSpan={mealTableHeaders.length} />
                  )}
                </TableBody>
              </MuiTable>
            </Stack>
          ) : (
            ""
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default AddMeals;
