import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

import { UserContext } from "@/context/UserProvider";
import Logo from "@/components/Icons/Logo";
import { FirebaseError } from "firebase/app";

const color = {
  primary:
    "hover:bg-blue-900 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-white bg-blue-700",
  secondary:
    "hover:bg-purple-900 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 text-white bg-purple-700",
  danger:
    "hover:bg-red-900 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 text-white bg-red-700",
  white:
    "bg-white hover:bg-gray-200 focus:ring-blue-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800 text-blue-700 dark:text-blue-300 border border-blue-700 dark:border-blue-300",
};

const Navlink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
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

const NavButton = ({
  children,
  onClick,
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: keyof typeof color;
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`focus:ring-4 focus:outline-none ${color[variant]} px-4 py-2 text-sm font-medium text-center rounded-lg`}
    >
      {children}
    </button>
  );
};

const NavButtonLink = ({
  to,
  children,
  variant = "primary",
}: {
  to: string;
  children: React.ReactNode;
  variant?: keyof typeof color;
}) => {
  return (
    <Link
      to={to}
      className={`focus:ring-4 focus:outline-none text-nowrap ${color[variant]} px-4 py-2 text-sm font-medium text-center rounded-lg`}
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
      if (error instanceof FirebaseError) {
        console.log(error.code);
      }
    }
  };

  return (
    <nav className="dark:bg-gray-900 start-0 dark:border-gray-600 bg-white/75 fixed top-0 z-20 w-full border-b border-gray-200 backdrop-blur-md">
      <div className="md:px-10 flex justify-between items-center p-4 mx-auto max-w-6xl">
        <Link to="/" className="flex gap-2 items-center w-auto">
          <Logo />
          <h1 className="dark:text-white sm:text-2xl self-center text-lg font-semibold whitespace-nowrap">
            url.abbr
          </h1>
        </Link>
        <div className="sm:w-3/5 flex justify-start items-center w-auto">
          <ul className="sm:gap-x-2 flex items-center font-medium">
            {user ? (
              <>
                <Navlink to="/">Home</Navlink>
                <Navlink to="/dashboard">Dashboard</Navlink>
                {/* <Navlink to="/dashboard/perfil">Perfil</Navlink> */}
              </>
            ) : (
              <>
                <Navlink to="/">Home</Navlink>
              </>
            )}
          </ul>
        </div>
        <div className="sm:w-1/5 flex gap-x-2 justify-end w-auto">
          {user ? (
            <NavButton onClick={handleSignOut} variant="danger">
              Log Out
            </NavButton>
          ) : (
            <>
              <NavButtonLink to="/login" variant="white">
                Log In
              </NavButtonLink>
              <NavButtonLink to="/register">Sign Up</NavButtonLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
