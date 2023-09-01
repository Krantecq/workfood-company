import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useFireStore } from "../../../hooks";
import { collections } from "../../../firebase/collections";
import {
  Paper,
  Stack,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import {
  MEAL_DATA,
  companiesRatingsTableHeaders,
} from "../../../constants/metaData";
import { getDocument } from "../../../firebase/services/getServices";
import RatingListing from "./RatingListing";
import { Loader } from "../../../components";
import { WEEK_DAYS } from "../../../constants/keywords";
import { getDayFromDate } from "../../../utils/helper";
import { firebaseQueryOperators } from "../../../firebase/queryBuilder";
import ViewReviews from "./ViewReviews";

const Ratings = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterConfig, setFilterConfig] = useState({
    day: getDayFromDate(),
  });
  const [viewReview, setViewReview] = useState(null);

  // Hooks
  const { id } = useParams();

  const { data, isFetching } = useFireStore(
    `${collections.companies}/${id}/FoodItem`
    // [
    //   {
    //     property: "day",
    //     operator: firebaseQueryOperators.EQUAL_TO,
    //     value: filterConfig.day.toString(),
    //   },
    // ]
  );

  useEffect(() => {
    (async () => {
      if (data && data.length > 0) {
        return setUsers(data);
      } else {
        return setUsers([]);
      }
    })();
  }, [id, data]);

  const FILTERED_DATA = useMemo(() => {
    if (users?.length > 0) {
      let updated = [...users];

      if (filterConfig.day) {
        updated = updated.filter(({ day }) => day == filterConfig.day);
      } else {
        updated = [...users];
      }
      return updated;
    } else return [];
  }, [users, filterConfig]);

  if (isFetching || isLoading) return <Loader />;

  const onChangeFilter = (name, value) => {
    setFilterConfig((prev) => ({ ...prev, [name]: value }));
  };

  const onView = (id) => {
    if (!id) return;
    const selected = FILTERED_DATA.find((item) => item.id === id);
    if (selected) {
      setViewReview(selected);
    }
  };

  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <Stack p={4}>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Select Day</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filterConfig.day}
            label="Select Day"
            onChange={(event) => onChangeFilter("day", event.target.value)}
            sx={{ width: 180 }}
          >
            {MEAL_DATA.map((item) => (
              <MenuItem value={item.day.toString()}>
                {WEEK_DAYS[item.day]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <RatingListing
        data={FILTERED_DATA && FILTERED_DATA?.length > 0 ? FILTERED_DATA : []}
        headingItems={companiesRatingsTableHeaders}
        isLoading={isFetching || isLoading}
        isCheckBox={false}
        onView={onView}
      />
      <ViewReviews
        open={!!viewReview}
        onClose={() => setViewReview(null)}
        order={viewReview}
      />
    </Paper>
  );
};

export default Ratings;
