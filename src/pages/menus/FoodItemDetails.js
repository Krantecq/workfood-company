import {
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Grid,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import React from "react";

const FoodItemDetails = ({
  open,
  onClose,
  foodItemDetail = "",
  isLoading = false,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Food Item Details</DialogTitle>
      <DialogContent>
        <Stack>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={12}>
              <Avatar src={foodItemDetail?.itemImageUrl} alt="item image" />
            </Grid>
            <Grid item xs={12} lg={4}>
              <Typography>
                Meal Name : {foodItemDetail?.itemName || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Typography>
                Meal Type : {foodItemDetail?.mealType || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Typography>
                Meal Price :{" "}
                {foodItemDetail?.itemPrice
                  ? `₹${foodItemDetail?.itemPrice}`
                  : "" || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Typography>
                Items Included :{" "}
                {foodItemDetail?.items && foodItemDetail?.items?.length > 0
                  ? foodItemDetail?.items?.join(", ")
                  : "" || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Typography>
                Fat :{" "}
                {foodItemDetail?.Nutrient?.Fat
                  ? `${foodItemDetail?.Nutrient?.Fat} gm`
                  : "" || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Typography>
                Calories :{" "}
                {foodItemDetail?.Nutrient?.Calories
                  ? `${foodItemDetail?.Nutrient?.Calories} Kacl`
                  : "" || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Typography>
                Protein :{" "}
                {foodItemDetail?.Nutrient?.Protein
                  ? `${foodItemDetail?.Nutrient?.Protein} gm`
                  : "" || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Typography>Like : {`${foodItemDetail?.like}`}</Typography>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Typography>Dislike : {`${foodItemDetail?.dislike}`}</Typography>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Reviews :
              </Typography>
              <List>
                {foodItemDetail?.reviews &&
                foodItemDetail?.reviews?.length > 0 ? (
                  foodItemDetail?.reviews?.map((item, index) => (
                    <React.Fragment key={index}>
                      <ListItem>
                        <ListItemIcon>
                          <Typography color="black">{`${
                            index + 1
                          }.`}</Typography>
                        </ListItemIcon>
                        <ListItemText primary={`${item}`} />
                      </ListItem>
                      {foodItemDetail?.reviews?.length - 1 !== index ? (
                        <Divider />
                      ) : (
                        ""
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText primary={"No Reviews Found"} />
                  </ListItem>
                )}
              </List>
            </Grid>
          </Grid>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default FoodItemDetails;
