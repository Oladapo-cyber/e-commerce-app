/* eslint-disable react/prop-types */
import { Login, PersonAdd } from "@mui/icons-material";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const SearchBar = ({ className }) => (
  <input
    type="text"
    placeholder="Search for products..."
    className={`${className} bg-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all`}
  />
);

const NavLinks = ({ className }) => (
  <ul className={`${className} text-lg`}>
    <li>
      <NavLink
        to="/categories"
        className={({ isActive }) =>
          isActive ? "text-blue-500" : "text-black"
        }
      >
        Categories
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/deals"
        className={({ isActive }) =>
          isActive ? "text-blue-500" : "text-black"
        }
      >
        Deals
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/new"
        className={({ isActive }) =>
          isActive ? "text-gray-900 underline font-bold" : "text-black"
        }
      >
        New
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/delivery"
        className={({ isActive }) =>
          isActive ? "text-blue-500" : "text-black"
        }
      >
        Delivery
      </NavLink>
    </li>
  </ul>
);

// Updated AuthButtons now accepts openAuth and setOpenAuth as props,
// or you can pass a specific toggle function.
const AuthButtons = ({ className, openAuth, setOpenAuth, onLoginClick }) => (
  <div className={className}>
    <button
      // If onLoginClick prop is provided, use it.
      // Otherwise, fallback to toggling openAuth directly.
      onClick={onLoginClick ? onLoginClick : () => setOpenAuth(!openAuth)}
      className="bg-gray-200 hover:bg-black hover:text-white ease-in-out duration-300 flex justify-center gap-1.5 items-center w-full text-black px-4 py-2 rounded-lg"
    >
      <Login />
      Login
    </button>
    <button className="bg-gray-200 hover:bg-black hover:text-white ease-in-out duration-300 flex justify-center gap-1.5 items-center w-full text-black px-4 py-2 rounded-lg">
      <PersonAdd />
      Register
    </button>
  </div>
);

const Navbar = ({ openAuth, setOpenAuth }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle function for the authentication modal.
  const toggleAuth = () => setOpenAuth((prev) => !prev);

  return (
    <nav className="bg-white fixed w-full z-30 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="font-[cursive] text-4xl">Dapstore</h1>
        <button
          className="md:hidden bg-gray-200 p-2 rounded-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
        <div className="hidden md:flex items-center space-x-6">
          <SearchBar className="w-64 px-3 py-2" />
          <NavLinks className="flex items-center space-x-4" />
          <AuthButtons
            className="flex items-center space-x-4"
            openAuth={openAuth}
            setOpenAuth={setOpenAuth}
            onLoginClick={toggleAuth}
          />
        </div>
      </div>
      <div className={`${isOpen ? "block" : "hidden"} md:hidden px-6 pb-4`}>
        <SearchBar className="w-full mb-4 px-3 py-2" />
        <NavLinks className="space-y-2" />
        <AuthButtons
          className="mt-4 space-y-2"
          openAuth={openAuth}
          setOpenAuth={setOpenAuth}
          onLoginClick={toggleAuth}
        />
      </div>
    </nav>
  );
};

export default Navbar;
