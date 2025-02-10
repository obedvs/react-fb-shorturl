import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import { UserContext } from "@/context/UserProvider";

import Navbar from "@/components/Navbar";

import Login from "@/routes/Login";
import Dashboard from "@/routes/Dashboard";
import Register from "@/routes/Register";
import NotFound from "@/routes/NotFound";
// import Perfil from "./routes/Perfil.jsx";

import LayoutRequireAuth from "@/components/layouts/LayoutRequireAuth";
import LayoutContainerForm from "@/components/layouts/LayoutContainerForm";
import LayoutRedirect from "@/components/layouts/LayoutRedirect";
import Home from "@/routes/Home";

const App = () => {
  const { user } = useContext(UserContext);

  if (user === false) {
    return <h1>Cargando...</h1>;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/dashboard" element={<LayoutRequireAuth />}>
          <Route index element={<Dashboard />} />
          {/* <Route path="perfil" element={<Perfil />} /> */}
        </Route>

        <Route path="/" element={<LayoutContainerForm />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/:nanoid" element={<LayoutRedirect />}>
          <Route index element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
