import React, { useEffect, useState } from "react";
import DashboardWrapper, {
  DashboardWrapperMain,
} from "../components/dashboard-wrapper/DashboardWrapper";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Stack, Typography } from "@mui/material";
import { useAuth, useFireStore } from "../hooks";
import { collections } from "../firebase/collections";
import { companiesOrdersTableHeaders } from "../constants/metaData";
import { sortRecentOrders } from "../utils/helper";
import Card from "../components/dashboard/Cards";
import { getDocument } from "../firebase/services/getServices";
import OrderListing from "./companies/companyDetail/OrderListing";
import { Loader } from "../components";
import OrderDetails from "./companies/companyDetail/OrderDetails";
import { format } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // States

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewOrder, setViewOrder] = useState(null);

  // Hooks
  const { user } = useAuth();
  const { data: usersData, isFetching } = useFireStore(
    `${collections.companies}/${user.id}/Employee`
  );

  useEffect(() => {
    (async () => {
      if (usersData && usersData.length > 0) {
        setIsLoading(true);
        const userOrders = await Promise.all(
          usersData.map(async (item) => {
            const res = await getDocument(
              `${collections.companies}/${user.id}/Employee/${item.id}/orders`
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
  }, [usersData, user]);

  const onViewOrder = (id) => {
    if (!id) return;
    const selected = orders.find((item) => item.id === id);
    if (selected) {
      setViewOrder(selected);
    }
  };

  if (isFetching || isLoading) return <Loader />;

  return (
    <DashboardWrapper>
      <DashboardWrapperMain>
        <div className="row" style={{ marginTop: "34px" }}>
          <Stack gap={3} sx={{ w: "100%" }}>
            <Typography variant="h2">{user?.CompanyName}</Typography>
            <Card recentOrders={orders} users={usersData} />
            <h2>Today's Orders</h2>
            <hr></hr>
            <Stack pb={4}>
              <OrderListing
                data={
                  orders && orders?.length > 0
                    ? orders?.filter(
                        ({ orderDate }) =>
                          orderDate === format(new Date(), "yyyy-MM-dd")
                      )
                    : []
                }
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
            </Stack>
          </Stack>
        </div>
      </DashboardWrapperMain>
    </DashboardWrapper>
  );
};

export default Dashboard;
