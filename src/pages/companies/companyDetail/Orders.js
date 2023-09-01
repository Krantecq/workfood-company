import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFireStore } from "../../../hooks";
import { collections } from "../../../firebase/collections";
import { Paper } from "@mui/material";
import { companiesOrdersTableHeaders } from "../../../constants/metaData";
import { getDocument } from "../../../firebase/services/getServices";
import OrderListing from "./OrderListing";
import { Loader } from "../../../components";
import OrderDetails from "./OrderDetails";
import { sortRecentOrders } from "../../../utils/helper";

const Orders = () => {
  // States
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewOrder, setViewOrder] = useState(null);

  // Hooks
  const { id } = useParams();
  const { data, isFetching } = useFireStore(
    `${collections.companies}/${id}/Employee`
  );

  useEffect(() => {
    (async () => {
      if (data && data.length > 0) {
        setIsLoading(true);

        const userOrders = await Promise.all(
          data.map(async (item) => {
            const res = await getDocument(
              `${collections.companies}/${id}/Employee/${item.id}/orders`
            );
            if (res.status && res.data && res.data.length > 0) {
              return res.data;
            } else return [];
          })
        );
        setIsLoading(false);

        return setOrders(sortRecentOrders(userOrders?.flat()));
      } else {
        return setOrders([]);
      }
    })();
  }, [id, data]);

  if (isFetching || isLoading) return <Loader />;

  const onViewOrder = (id) => {
    if (!id) return;
    const selected = orders.find((item) => item.id === id);
    if (selected) {
      setViewOrder(selected);
    }
  };

  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <OrderListing
        data={orders && orders?.length > 0 ? orders : []}
        headingItems={companiesOrdersTableHeaders}
        isLoading={isFetching || isLoading}
        isCheckBox={false}
        onViewOrder={onViewOrder}
      />
      <OrderDetails
        open={!!viewOrder}
        onClose={() => setViewOrder(null)}
        orderDetail={viewOrder}
      />
    </Paper>
  );
};

export default Orders;
