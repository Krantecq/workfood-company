import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import Loader from "../loader";

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { user, isLoading } = useAuth();
  if (isLoading) return <Loader />;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
