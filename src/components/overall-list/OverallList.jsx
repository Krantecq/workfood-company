import React from "react";
import "./overall-list.scss";
import { data } from "../../constants";
import { useFireStore } from "../../hooks";
import { collections } from "../../firebase/collections";

const icons = [
  <i className="bx bx-receipt"></i>,
  <i className="bx bx-user"></i>,
  <i className="bx bx-cube"></i>,
  <i className="bx bx-dollar"></i>,
];

const OverallList = () => {
  const { data: users, dataCount } = useFireStore(collections.users);
  const { dataCount: productCount } = useFireStore(collections.products);
  const { dataCount: listingCount } = useFireStore(collections.listing);

  const dataCounts = {
    users: dataCount,
    orders:
      users &&
      users.length > 0 &&
      users.map((orders) => orders)?.flat()?.length,
    products: productCount,
    listing: listingCount,
  };

  return (
    <ul className="overall-list">
      {data?.overall?.map((item, index) => (
        <li className="overall-list__item" key={`overall-${index}`}>
          <div className="overall-list__item__icon">{icons[index]}</div>
          <div className="overall-list__item__info">
            <div className="title">
              {dataCounts[item.key] ? dataCounts[item.key] : ""}
            </div>
            <span>{item.title}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default OverallList;
