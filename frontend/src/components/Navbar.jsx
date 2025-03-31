/* eslint-disable react/prop-types */
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  SearchRounded,
  ShoppingCartOutlined,
  FavoriteBorder,
  Menu as HamburgerIcon,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../redux/reducers/userSlice";
import Button from "./Button";

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
          isActive ? "text-blue-500" : "text-black"
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
          isActive ? "text-blue-500" : "text-black"
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
          isActive ? "text-blue-500" : "text-black"
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
          isActive ? "text-blue-500" : "text-black"
        }
      >
        Orders
      </NavLink>
    </li>
    <li>
      {/* <NavLink
        to="/contact"
        onClick={onLinkClick}
        className={({ isActive }) =>
          isActive ? "text-blue-500" : "text-black"
        }
      >
        Contact
      </NavLink> */}
    </li>
    <li>
      <NavLink
        to="/favorites"
        onClick={onLinkClick}
        className={({ isActive }) =>
          isActive ? "text-gray-900 underline font-bold" : "text-black"
        }
      >
        Favorites
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/cart"
        onClick={onLinkClick}
        className={({ isActive }) =>
          isActive ? "text-blue-500" : "text-black"
        }
      >
        Cart
      </NavLink>
    </li>
  </ul>
);

const Navbar = ({ openAuth, setOpenAuth, currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLinkClick = () => setIsOpen(false);

  return (
    <nav className="bg-white fixed w-full z-30 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left - Logo */}
        <NavLink to="/">
          <h1 className="font-[cursive] text-4xl">Dapstore</h1>
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
                className="text-sm font-semibold text-black hover:text-blue-600"
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
      <div className={`${isOpen ? "block" : "hidden"} md:hidden px-6 pb-4`}>
        <SearchBar className="w-full mb-4 px-3 py-2" />
        <NavLinks className="space-y-2" onLinkClick={handleLinkClick} />
        {currentUser ? (
          <div className="mt-4 space-y-2">
            <NavLink to="/favorites" onClick={handleLinkClick}>
              <FavoriteBorder className="text-[28px]" />
            </NavLink>
            <NavLink to="/cart" onClick={handleLinkClick}>
              <ShoppingCartOutlined className="text-[28px]" />
            </NavLink>
            <Avatar src={currentUser?.img} className="w-8 h-8">
              {currentUser?.name?.[0]}
            </Avatar>
            <button
              onClick={() => {
                dispatch(logout());
                setIsOpen(false);
              }}
              className="text-sm font-semibold text-black hover:text-blue-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="mt-4 space-y-2">
            <Button
              text="SignIn"
              small
              onClick={() => {
                setOpenAuth(!openAuth);
                setIsOpen(false);
              }}
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
