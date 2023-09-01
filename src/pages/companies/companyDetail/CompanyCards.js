import React, { useEffect, useMemo, useState } from "react";
import { colors, data } from "../../../constants";
import { useFireStore } from "../../../hooks";
import { collections } from "../../../firebase/collections";
import { useLocation, useNavigate } from "react-router-dom";
import { getDocument } from "../../../firebase/services/getServices";

const CompanyCards = ({ companyId }) => {
  const [orders, setOrders] = useState([]);
  const [ratings, setRatings] = useState([]);

  // Hooks
  const { dataCount: usersCount, data: users } = useFireStore(
    `${collections.companies}/${companyId}/Employee`
  );

  useEffect(() => {
    (async () => {
      if (users && users.length > 0) {
        const userOrders = await Promise.all(
          users.map(async (item) => {
            const res = await getDocument(
              `${collections.companies}/${companyId}/Employee/${item.id}/orders`
            );
            if (res.status && res.data && res.data.length > 0) {
              return res.data;
            } else return [];
          })
        );
        setRatings(
          userOrders
            ?.flat()
            ?.map(({ cartItems }) => cartItems)
            ?.flat()
        );
        return setOrders(userOrders?.flat());
      } else {
        return setOrders([]);
      }
    })();
  }, [companyId, users]);

  const navigate = useNavigate();
  const location = useLocation();

  const dataCounts = useMemo(
    () => ({
      users: usersCount || 0,
      orders: orders?.length || 0,
      ratings: ratings?.length || 0,
      walletBalance: `₹${
        users && users?.length > 0
          ? users.reduce((acc, b) => acc + b.Wallet, 0)
          : 0 || 0
      }`,
    }),
    [usersCount, users, orders, ratings]
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {data?.companyCard?.map((item, index) => (
        <div
          key={index}
          style={{
            height: 120,
            width: 240,
            backgroundColor: location.pathname.includes(item.path)
              ? colors.yellow
              : colors.white,
            margin: 10,
            marginLeft: 0,
            marginRight: 10,
            borderRadius: 10,
            padding: 20,
            boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
          }}
          onClick={() => navigate(item.path)}
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
                color: location.pathname.includes(item.path)
                  ? colors.white
                  : colors.yellow,
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

export default CompanyCards;
