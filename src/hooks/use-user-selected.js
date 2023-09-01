import { useContext } from "react";
import { UserSelectedContext } from "../contexts/UserSelectedContext";

const useUserSelected = () => {
  return useContext(UserSelectedContext);
};

export default useUserSelected;
