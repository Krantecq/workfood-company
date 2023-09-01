import React from "react";
import { Card, Paper, Grid, Typography, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";
import OrderStatus from "./OrderStatus";
import OrderMetaData from "./OrderMetaData";
import OrderItems from "./OrderItems";
import { useUserSelected } from "../../../../hooks";
import { useParams } from "react-router-dom";
import { getAddress } from "../../../../utils/helper";

const steps = ["Processing", "In-Transit", "Delivered"];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const OrderDetail = () => {
  const { selectedUser } = useUserSelected();
  const { orderId } = useParams();
  const selectedOrder =
    selectedUser &&
    orderId &&
    selectedUser?.orders &&
    selectedUser?.orders.length > 0
      ? selectedUser?.orders.find(({ order_id }) => orderId)
      : "";


  return (
    <>
      <OrderMetaData selectedOrder={selectedOrder} />
      <Card sx={{ minWidth: 275 }} style={{ marginTop: "12px" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Item style={{ height: "177px", width: "337px" }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 20, paddingRight: "199px" }}
                  color="text.secondary"
                  gutterBottom
                >
                  Address
                </Typography>
                <Typography variant="h7" component="div">
                  {selectedOrder.address
                    ? getAddress(selectedOrder.address)
                    : "-"}
                </Typography>
              </CardContent>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <OrderStatus steps={steps} activeStep={1} />
          </Grid>
        </Grid>
      </Card>
      <OrderItems
        rows={
          selectedOrder.items && selectedOrder.items.length > 0
            ? selectedOrder.items
            : []
        }
      />
    </>
  );
};

export default OrderDetail;
