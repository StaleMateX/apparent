import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ isLoggedIn }) => {
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export { PrivateRoutes };
