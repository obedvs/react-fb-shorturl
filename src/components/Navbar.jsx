import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

import { UserContext } from "../context/UserProvider.jsx";

const color = {
  'primary': 'hover:bg-blue-900 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-white bg-blue-700',
  'secondary': 'hover:bg-purple-900 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 text-white bg-purple-700',
  'danger': 'hover:bg-red-900 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 text-white bg-red-700',
  'white': 'bg-white hover:bg-gray-200 focus:ring-blue-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800 text-blue-700 dark:text-blue-300 border border-blue-700 dark:border-blue-300',
}

const Navlink = ({ to, children }) => {
  return (
    <li>
      <NavLink
        to={to}
        className="hover:bg-blue-900 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 block px-2 py-1 text-gray-900 rounded"
        >
        {children}
      </NavLink>
    </li>
  );
};

const NavButton = ({ children, onClick, variant = 'primary' }) => {
  return (
    <button onClick={onClick} type="button"
      className={`focus:ring-4 focus:outline-none px-4 py-2 text-sm font-medium text-center rounded-lg ${color[variant]}`}
    >
      {children}
    </button>
  );
};

const NavButtonLink = ({ to, children, variant = 'primary' }) => {
  return (
    <Link to={to}
      className={`focus:ring-4 focus:outline-none px-4 py-2 text-sm font-medium text-center rounded-lg text-nowrap ${color[variant]}`}
    >
      {children}
    </Link>
  );
};

const Navbar = () => {
  const { user, signOutUser } = useContext(UserContext);

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.log(error.code);
    }
  };

  return (
    <nav className="dark:bg-gray-900 start-0 dark:border-gray-600 fixed top-0 z-20 w-full bg-white border-b border-gray-200">
      <div className="md:px-10 flex items-center justify-between max-w-6xl p-4 mx-auto">
        <Link to="/" className="flex items-center w-auto">
          <span className="whitespace-nowrap dark:text-white sm:text-2xl self-center text-lg font-semibold">
            URLShort
          </span>
        </Link>
        <div className="sm:w-3/5 flex items-center justify-start w-auto">
          <ul className="sm:gap-x-4 flex items-center font-medium">
            {user ? (
              <>
                <Navlink to="/">Inicio</Navlink>
                <Navlink to="/dashboard">Dashboard</Navlink>
                {/* <Navlink to="/dashboard/perfil">Perfil</Navlink> */}
              </>
            ) : (
              <>
                <Navlink to="/">Inicio</Navlink>
              </>
            )}
          </ul>
        </div>
        <div className="gap-x-4 sm:w-1/5 flex justify-end w-auto">
          {user ? (
            <NavButton onClick={handleSignOut} variant="danger">Cerrar Sesión</NavButton>
          ) : (
            <>
            <NavButtonLink to="/login" variant="white">Iniciar Sesión</NavButtonLink>
            <NavButtonLink to="/register">Registarse</NavButtonLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
