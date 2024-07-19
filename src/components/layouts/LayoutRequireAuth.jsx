import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { UserContext } from "../../context/UserProvider.jsx";

const LayoutRequireAuth = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="px-4 mx-auto mt-20">
      <Outlet />
    </div>
  );
};

export default LayoutRequireAuth;
