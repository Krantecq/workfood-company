import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { useAuth, useFireStore, useToaster } from "../../hooks";
import { collections } from "../../firebase/collections";
import { MEAL_DATA, mealTableHeaders } from "../../constants/metaData";

import { MenuListing } from "./MenuListing";
import FoodItemDetails from "./FoodItemDetails";

const Menus = () => {
  // States
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isMealOpen, setIsMealOpen] = useState(false);

  const { user } = useAuth();
  const { data: locations, isFetching } = useFireStore(
    `${collections.companies}/${user.id}/OfficeAddress`
  );

  const { data: foodItems, isFoodItemsFetching } = useFireStore(
    `${collections.companies}/${user.id}/FoodItem`
  );

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

  const onClickUser = async (userId) => {
    if (!userId) return;

    const selected = foodItems.find(({ id }) => id === userId);

    if (selected) {
      setIsMealOpen(selected);
    }
  };

  const onSelectLocation = async (value) => {
    setSelectedLocation(value);
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
        <Box>Menus</Box>
      </Paper>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Stack gap={2}>
          <Stack p={2} direction="row">
            <FormControl>
              <InputLabel id="demo-simple-select-label">
                Choose Location
              </InputLabel>
              <Select
                label="Choose Location"
                placeholder="Choose Location"
                value={selectedLocation}
                onChange={({ target: { value } }) => onSelectLocation(value)}
                disabled={isFetching}
                sx={{ width: 180 }}
              >
                {locations &&
                  locations.length > 0 &&
                  locations.map(({ id, address }) => (
                    <MenuItem value={id} key={id}>
                      {address?.at(0)}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Stack>
          {selectedLocation ? (
            <MenuListing
              data={TABLE_DATA && TABLE_DATA.length > 0 ? TABLE_DATA : []}
              headingItems={mealTableHeaders}
              isLoading={isFetching || isFoodItemsFetching}
              onView={onClickUser}
              isCheckBox={false}
            />
          ) : (
            ""
          )}
          <FoodItemDetails
            open={!!isMealOpen}
            onClose={() => setIsMealOpen(false)}
            foodItemDetail={isMealOpen}
          />
        </Stack>
      </Paper>
    </Box>
  );
};

export default Menus;
