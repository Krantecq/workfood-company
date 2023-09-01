import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TablePagination,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { OrderListing } from "./OrderListing";
import { useAuth, useFireStore } from "../../hooks";
import { collections } from "../../firebase/collections";
import { getDocument } from "../../firebase/services/getServices";
import { sortRecentOrders } from "../../utils/helper";
import { companiesOrdersTableHeaders } from "../../constants/metaData";
import { DatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns";
import OrderDetails from "../companies/companyDetail/OrderDetails";

const Orders = () => {
  // States
  const [recentOrders, setRecentOrders] = useState([]);
  const [filterConfig, setFilterConfig] = useState({
    date: null,
    payment: "",
  });
  const [pageConfig, setPageConfig] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [viewOrder, setViewOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Hooks
  const { user } = useAuth();

  const onChangeFilter = (name, value) => {
    setFilterConfig((prev) => ({ ...prev, [name]: value }));
  };

  const onChangePage = (name, value) => {
    setPageConfig((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Effects
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await getDocument(
        `${collections.companies}/${user.id}/Employee`
      );
      if (res.status && res.data && res.data.length > 0) {
        const orders = await Promise.all(
          res.data.map(async ({ id }) => {
            const userRes = await getDocument(
              `${collections.companies}/${user.id}/Employee/${id}/orders`
            );
            if (userRes.status && userRes?.data?.length > 0) {
              return userRes.data?.map((order) => ({
                ...order,
                companyId: user.id,
              }));
            } else return [];
          })
        );
        setRecentOrders(orders?.flat());
        setIsLoading(false);
      } else {
        setRecentOrders([]);
        setIsLoading(false);
      }
    })();
  }, [user]);

  const onViewOrder = (id) => {
    if (!id) return;
    const selected = recentOrders.find((item) => item.id === id);
    if (selected) {
      setViewOrder(selected);
    }
  };

  const FILTERED_DATA = useMemo(() => {
    if (recentOrders?.length > 0) {
      let updated = [...recentOrders];
      if (filterConfig.payment) {
        updated = updated.filter(
          ({ method }) => method === filterConfig.payment
        );
      } else if (filterConfig.date) {
        updated = updated.filter(
          ({ orderDate }) =>
            orderDate && orderDate === format(filterConfig.date, "yyyy-MM-dd")
        );
      } else {
        updated = [...recentOrders];
      }
      return updated;
    } else return [];
  }, [recentOrders, filterConfig]);

  const PAGINATED_DATA = useMemo(() => {
    if (FILTERED_DATA.length > 0) {
      return FILTERED_DATA.slice(
        pageConfig.page * pageConfig.rowsPerPage,
        (pageConfig.page + 1) * pageConfig.rowsPerPage
      );
    } else return [];
  }, [pageConfig, FILTERED_DATA]);

  const onClear = () => setFilterConfig({ date: null, payment: "" });

  return (
    <Box sx={{ width: "100%" }} pr={5}>
      <Paper
        sx={{
          p: 2,
          color: "primary",
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>Orders({recentOrders?.length || 0})</Box>
        <Stack direction="row" gap={1} alignItems="center">
          <FormControl>
            <InputLabel id="demo-simple-select-label">
              Payment Method
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filterConfig.payment}
              label="Payment Method"
              onChange={(event) =>
                onChangeFilter("payment", event.target.value)
              }
              sx={{ width: 180 }}
            >
              <MenuItem value={"Online Method"}>Online Method</MenuItem>
              <MenuItem value={"Wallet"}>Wallet</MenuItem>
            </Select>
          </FormControl>
          <DatePicker
            label="Choose Date"
            value={filterConfig.date}
            onChange={(e) => onChangeFilter("date", e)}
          />
          <Button variant="contained" onClick={onClear}>
            Clear Filter
          </Button>
        </Stack>
      </Paper>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <OrderListing
          data={PAGINATED_DATA}
          isLoading={isLoading}
          headingItems={companiesOrdersTableHeaders}
          onViewOrder={onViewOrder}
        />
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={FILTERED_DATA?.length}
          rowsPerPage={pageConfig.rowsPerPage}
          page={pageConfig.page}
          onPageChange={(e, page) => onChangePage("page", page)}
          onRowsPerPageChange={(e) => {
            onChangePage("rowsPerPage", e.target.value);
            onChangePage("page", 0);
          }}
        />
        <OrderDetails
          open={!!viewOrder}
          onClose={() => setViewOrder(null)}
          orderDetail={viewOrder}
        />
      </Paper>
    </Box>
  );
};

export default Orders;
