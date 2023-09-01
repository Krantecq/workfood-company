import { Card, Stack, Typography, CardContent } from "@mui/material";
import {
  CalendarMonth,
  AccountBalanceWalletOutlined,
} from "@mui/icons-material";
import React from "react";
import { formateFireStoreDate } from "../../../../utils/helper";

const OrderMetaData = ({ selectedOrder }) => {
  return (
    <Stack direction={"row"} gap={2}>
      <Card sx={{ flexGrow: 1 }}>
        <CardContent>
          <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
            Order Details(#1A2027)
          </Typography>
          <Stack gap={1}>
            <Stack
              direction="row"
              justifyContent="space-between"
              gap={1}
              alignItems="center"
            >
              <Typography color="text.secondary">
                <CalendarMonth style={{ paddingTop: "8px" }} /> Date Added
              </Typography>
              <Typography color="text.secondary">
                {selectedOrder?.order_date
                  ? formateFireStoreDate(selectedOrder.order_date)
                  : "-"}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              gap={1}
              alignItems="center"
            >
              <Typography color="text.secondary">
                <AccountBalanceWalletOutlined /> Payment Method
              </Typography>
              <Typography color="text.secondary">{"Online"}</Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
      <Card sx={{ flexGrow: 1 }}>
        <CardContent>
          <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
            Customer Details
          </Typography>
          <Stack gap={1}>
            <Stack
              direction="row"
              justifyContent="space-between"
              gap={1}
              alignItems="center"
            >
              <Typography color="text.secondary">
                <CalendarMonth /> Customer
              </Typography>
              <Typography color="text.secondary">{""}</Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              gap={1}
              alignItems="center"
            >
              <Typography color="text.secondary">
                <AccountBalanceWalletOutlined /> Phone
              </Typography>
              <Typography color="text.secondary">
                {selectedOrder?.userMobile || ""}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default OrderMetaData;
