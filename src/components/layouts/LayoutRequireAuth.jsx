import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { UserContext } from "../../context/UserProvider.jsx";

const LayoutRequireAuth = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="mt-20">
      <Outlet />
    </div>
  );
};

export default LayoutRequireAuth;
