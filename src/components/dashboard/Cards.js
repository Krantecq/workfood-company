import React from "react";
import { colors, data } from "../../constants";
import { useFireStore } from "../../hooks";
import { collections } from "../../firebase/collections";
import { format } from "date-fns";

const Card = ({ recentOrders = [], users = [] }) => {
  const { dataCount: companyCount } = useFireStore(collections.companies);

  const dataCounts = {
    users: users?.length || 0,
    orders: recentOrders?.length || 0,
    listing: companyCount || 0,
    foodItems: recentOrders
      ?.map(({ cartItems }) =>
        cartItems && cartItems?.length > 0 ? cartItems : []
      )
      ?.flat()?.length,
    deliveredOrders: recentOrders
      ?.filter(
        ({ orderDate }) => orderDate === format(new Date(), "yyyy-MM-dd")
      )
      ?.filter(({ status }) => ["Delivered", "delivered"].includes(status))
      ?.length,
    ordersValue: `₹${recentOrders
      ?.filter(
        ({ orderDate }) => orderDate === format(new Date(), "yyyy-MM-dd")
      )
      ?.reduce((a, b) => a + b.totalQuantity, 0)}`,
    undeliveredOrders: recentOrders
      ?.filter(
        ({ orderDate }) => orderDate === format(new Date(), "yyyy-MM-dd")
      )
      ?.filter(({ status }) => !["Delivered", "delivered"].includes(status))
      ?.length,
    walletBalance: `₹${
      users && users?.length > 0
        ? users.reduce((acc, b) => acc + b.Wallet, 0)
        : 0 || 0
    }`,
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {data?.overall?.map((item, index) => (
        <div
          key={index}
          style={{
            height: 120,
            width: 240,
            backgroundColor: [0, 4].includes(index)
              ? colors.yellow
              : colors.white,
            margin: 10,
            borderRadius: 10,
            padding: 20,
            boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                fontSize: 16,
                color: "#000",
              }}
            >
              {item.title}
            </p>
            <p
              style={{
                color: [0, 4].includes(index) ? colors.white : colors.yellow,
              }}
            >
              {item.icon}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <h1
              style={{
                fontSize: 38,
                marginBottom: 10,
                color: "#000",
                fontWeight: 500,
              }}
            >
              {dataCounts[item.key]}
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
