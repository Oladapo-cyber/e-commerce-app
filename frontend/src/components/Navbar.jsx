/* eslint-disable react/prop-types */
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  SearchRounded,
  ShoppingCartOutlined,
  FavoriteBorder,
  Menu as HamburgerIcon,
  ExitToApp,
  Logout,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { logout } from "../redux/reducers/userSlice";
import Button from "./Button";
import { useDispatch } from "react-redux";

const SearchBar = ({ className }) => (
  <input
    type="text"
    placeholder="Search for products..."
    className={`${className} bg-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all`}
  />
);

const NavLinks = ({ className, onLinkClick }) => (
  <ul className={`${className} text-lg`}>
    <li>
      <NavLink
        to="/"
        onClick={onLinkClick}
        className={({ isActive }) =>
          `px-3 py-1 rounded transition-colors duration-200
          ${
            isActive
              ? "bg-blue-100 text-blue-600 font-bold"
              : "text-gray-700 hover:bg-gray-100 hover:text-blue-500"
          }`
        }
      >
        Home
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/shop"
        onClick={onLinkClick}
        className={({ isActive }) =>
          `px-3 py-1 rounded transition-colors duration-200
          ${
            isActive
              ? "bg-blue-100 text-blue-600 font-bold"
              : "text-gray-700 hover:bg-gray-100 hover:text-blue-500"
          }`
        }
      >
        Shop
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/new_arrivals"
        onClick={onLinkClick}
        className={({ isActive }) =>
          `px-3 py-1 rounded transition-colors duration-200
          ${
            isActive
              ? "bg-blue-100 text-blue-600 font-bold"
              : "text-gray-700 hover:bg-gray-100 hover:text-blue-500"
          }`
        }
      >
        New Arrivals
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/orders"
        onClick={onLinkClick}
        className={({ isActive }) =>
          `px-3 py-1 rounded transition-colors duration-200
          ${
            isActive
              ? "bg-blue-100 text-blue-600 font-bold"
              : "text-gray-700 hover:bg-gray-100 hover:text-blue-500"
          }`
        }
      >
        Orders
      </NavLink>
    </li>
  </ul>
);

const Navbar = ({ openAuth, setOpenAuth, currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLinkClick = () => setIsOpen(false);

  return (
    <nav className="bg-white fixed w-full z-30 shadow-md rounded-b-lg">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left - Logo */}
        <NavLink to="/">
          <h1 className="font-heading text-4xl font-bold text-black tracking-tight hover:scale-105 transition-transform duration-200">
            Dapstore
          </h1>
        </NavLink>

        {/* Mobile Icons & Burger */}
        <div className="flex gap-6">
          {/* Mobile icons (left side of burger) */}
          <div className="md:hidden flex items-center space-x-3">
            <NavLink to="/search">
              <SearchRounded className="text-[30px]" />
            </NavLink>
            {currentUser && (
              <>
                <NavLink to="/favorites">
                  <FavoriteBorder className="text-[28px]" />
                </NavLink>
                <NavLink to="/cart">
                  <ShoppingCartOutlined className="text-[28px]" />
                </NavLink>
                <Avatar src={currentUser?.img} className="w-8 h-8">
                  {currentUser?.name?.[0]}
                </Avatar>
              </>
            )}
          </div>
          {/* Hamburger button */}
          <button
            className="md:hidden rounded-lg"
            onClick={() => setIsOpen(!isOpen)}
          >
            <HamburgerIcon sx={{ fontSize: "1.5rem" }} />
          </button>
        </div>

        {/* Desktop Nav Section */}
        <div className="hidden md:flex items-center space-x-6">
          <SearchBar className="w-64 px-3 py-2" />
          <NavLinks
            className="flex items-center space-x-4"
            onLinkClick={handleLinkClick}
          />
          {currentUser ? (
            <div className="flex items-center space-x-4">
              <NavLink to="/favorites">
                <FavoriteBorder className="text-[28px]" />
              </NavLink>
              <NavLink to="/cart">
                <ShoppingCartOutlined className="text-[28px]" />
              </NavLink>
              <Avatar src={currentUser?.img} className="w-8 h-8">
                {currentUser?.name?.[0]}
              </Avatar>
              <button
                onClick={() => dispatch(logout())}
                className="text-sm font-semibold text-black hover:text-blue-600 transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <Button
              text="SignIn"
              small
              onClick={() => setOpenAuth(!openAuth)}
            />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="absolute inset-0   opacity-70"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          />
          {/* Slide-in menu */}
          <div className="relative bg-white w-4/5 max-w-xs h-full shadow-lg animate-slide-in-left flex flex-col">
            <div className="flex items-center justify-between px-4 py-4 border-b">
              <span className="text-xl font-bold font-heading text-blue-700">
                Menu
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-700 text-2xl focus:outline-none"
                aria-label="Close menu"
              >
                &times;
              </button>
            </div>
            <div className="flex-1 flex flex-col gap-2 mt-4 px-4">
              <SearchBar className="w-full mb-4 px-3 py-2" />
              <NavLinks
                className="flex flex-col gap-2"
                onLinkClick={handleLinkClick}
              />
              {currentUser ? (
                <div className="flex flex-col gap-3 ">
                  <NavLink
                    to="/favorites"
                    onClick={handleLinkClick}
                    className="flex items-center gap-2 text-lg font-medium text-gray-800 hover:text-blue-600"
                  >
                    <FavoriteBorder className="text-[24px]" /> Favorites
                  </NavLink>
                  <NavLink
                    to="/cart"
                    onClick={handleLinkClick}
                    className="flex items-center gap-2 text-lg font-medium text-gray-800 hover:text-blue-600"
                  >
                    <ShoppingCartOutlined className="text-[24px]" /> Cart
                  </NavLink>
                  <div className="flex items-center text-gray-700 bg-red-100 rounded p-1 gap-2 ">
                    <Logout className="text-[24px]" />
                    <button
                      onClick={() => {
                        dispatch(logout());
                        setIsOpen(false);
                      }}
                      className="text-sm font-semibold  hover:text-blue-600 transition-colors duration-200"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-6">
                  <Button
                    text="SignIn"
                    small
                    onClick={() => {
                      setOpenAuth(!openAuth);
                      setIsOpen(false);
                    }}
                    className="w-full"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
