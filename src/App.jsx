import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import { UserContext } from "./context/UserProvider.jsx";

import Navbar from "./components/Navbar.jsx";

import Login from "./routes/Login.jsx";
import Dashboard from "./routes/Dashboard.jsx";
import Register from "./routes/Register.jsx";
// import Perfil from "./routes/Perfil.jsx";
import NotFound from "./routes/NotFound.jsx";

import LayoutRequireAuth from "./components/layouts/LayoutRequireAuth.jsx";
import LayoutContainerForm from "./components/layouts/LayoutContainerForm.jsx";
import LayoutRedirect from "./components/layouts/LayoutRedirect.jsx";
import Home from "./routes/Home.jsx";

const App = () => {
  const { user } = useContext(UserContext);

  if (user === false) {
    return <h1>Cargando...</h1>;
  }

  return (
    <>
      <Navbar />
      <Routes>
        
        <Route path="/" element={<Home />}/>

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
