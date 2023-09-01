import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collections } from "../firebase/collections";
import { firebaseQueryOperators } from "../firebase/queryBuilder";
import { getDocument } from "../firebase/services/getServices";
import { PATH_DASHBOARD } from "../routes/paths";

export const UserSelectedContext = createContext(null);

const UserSelectedProvider = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const navigate = useNavigate();

  const fetchUser = async (userId) => {
    if (!userId) return;
    try {
      const res = await getDocument(collections.users, [
        {
          property: "userId",
          operator: firebaseQueryOperators.EQUAL_TO,
          value: userId,
        },
      ]);
      if (res.status && res.data && res.data.length > 0) {
        return setSelectedUser(res.data.at(0));
      }
      navigate(PATH_DASHBOARD.users.root);
    } catch (error) {
      navigate(PATH_DASHBOARD.users.root);
    }
  };

  return (
    <UserSelectedContext.Provider
      value={{ selectedUser, setSelectedUser, fetchUser }}
    >
      {children}
    </UserSelectedContext.Provider>
  );
};

export default UserSelectedProvider;
