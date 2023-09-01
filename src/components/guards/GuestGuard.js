import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import Loader from "../loader";

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default function GuestGuard({ children }) {
  const { user, isLoading } = useAuth();
  if (isLoading) return <Loader />;
  if (user) return <Navigate to={"/dashboard"} replace />;
  return <>{children}</>;
}
