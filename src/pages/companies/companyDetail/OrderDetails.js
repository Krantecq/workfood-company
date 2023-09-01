import {
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TableBody,
  TableCell,
  TableRow,
  Grid,
  Typography,
  Avatar,
} from "@mui/material";
import React from "react";

import { MuiTable, NoDataFound, TableLoader } from "../../../components";
import { MEAL_TIME, foodItemsTableHeaders } from "../../../constants/metaData";
import { format } from "date-fns";

const OrderDetails = ({
  open,
  onClose,
  orderDetail = "",
  isLoading = false,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Order Details (#{orderDetail?.id})</DialogTitle>
      <DialogContent>
        <Stack>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={4}>
              <Typography>Order No : {orderDetail?.orderNo || "-"}</Typography>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Typography>
                Customer : {orderDetail?.customerName || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Typography>
                Company : {orderDetail?.companyname || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Typography>
                Delivery Time : {orderDetail?.deliveryTime || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Typography>Method : {orderDetail?.method || "-"}</Typography>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Typography>
                Order Address : {orderDetail?.orderAddress || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Typography>
                Order Timing :{" "}
                {orderDetail?.orderTiming
                  ? MEAL_TIME.find(
                      ({ value }) => value === orderDetail?.orderTiming
                    )?.label
                  : "-" || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Typography>Status : {orderDetail?.status || "-"}</Typography>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Typography>Payment Id : {orderDetail?.paymentId}</Typography>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Typography>
                Total : {orderDetail?.totalQuantity || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Typography>
                Order Date : {orderDetail?.orderDate || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Typography>
                Payment Time :{" "}
                {orderDetail?.paymentTime
                  ? format(new Date(orderDetail?.paymentTime), "dd/MM/yyyy")
                  : "" || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Typography>Day : {orderDetail?.day || "-"}</Typography>
            </Grid>
          </Grid>
        </Stack>
        <Stack>
          <MuiTable headingItems={foodItemsTableHeaders} isCheckBox={false}>
            <TableBody>
              {isLoading ? (
                <TableLoader colSpan={foodItemsTableHeaders.length} />
              ) : orderDetail?.cartItems &&
                orderDetail?.cartItems?.length > 0 ? (
                [
                  ...orderDetail?.cartItems,
                  ...(orderDetail?.addons?.length > 0
                    ? orderDetail?.addons
                    : []),
                ]?.map(
                  (
                    {
                      id,
                      itemImageUrl,
                      itemName,
                      itemPrice,
                      Nutrient,
                      dislike,
                      quantity,
                      like,
                    },
                    index
                  ) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={id}>
                        <TableCell>
                          <Stack direction="row" gap={2}>
                            <Avatar src={itemImageUrl} />
                            <Typography>{itemName}</Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          {itemPrice ? `₹${itemPrice}` : "" || ""}
                        </TableCell>
                        <TableCell>{quantity || ""}</TableCell>
                        <TableCell>{like}</TableCell>
                        <TableCell>{dislike}</TableCell>
                        <TableCell>
                          <Stack direction="row" gap={1} flexWrap={"wrap"}>
                            {Nutrient && Object.keys(Nutrient)?.length > 0
                              ? Object.keys(Nutrient).map((item) => (
                                  <Chip
                                    variant="outlined"
                                    key={item}
                                    label={`${item} : ${
                                      item === "Calories"
                                        ? `${Nutrient[item]} Kcal`
                                        : `${Nutrient[item]} gm` || "-"
                                    }`}
                                    color="success"
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
                <NoDataFound colSpan={foodItemsTableHeaders.length} />
              )}
            </TableBody>
          </MuiTable>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetails;
