import { Login, PersonAdd } from "@mui/icons-material";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-navbar fixed w-full z-30 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-3xl font-cursive">Dapstore</h1>
        <button
          className="md:hidden bg-gray-200 p-2 rounded-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
        <div className="hidden md:flex items-center space-x-6">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-64 px-3 py-2 bg-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
          />
          <ul className="flex items-center space-x-4 text-lg">
            <li>Categories</li>
            <li>Deals</li>
            <li>New</li>
            <li>Delivery</li>
          </ul>
          <div className="flex items-center space-x-4">
            <button className="bg-gray-200 flex justify-center gap-1.5 items-center text-black px-4 py-2 rounded-lg">
              <Login />
              Login
            </button>
            <button className="bg-gray-200 flex justify-center gap-1.5 items-center text-black px-4 py-2 rounded-lg">
              <PersonAdd />
              Register
            </button>
          </div>
        </div>
      </div>
      <div className={`${isOpen ? "block" : "hidden"} md:hidden px-6 pb-4`}>
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full mb-4 px-3 py-2 bg-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
        />
        <ul className="space-y-2 text-lg">
          <li>Categories</li>
          <li>Deals</li>
          <li>New</li>
          <li>Delivery</li>
        </ul>
        <div className="mt-4 space-y-2">
          <button className="  w-full bg-gray-200 flex justify-center gap-1.5 items-center text-black px-4 py-2 rounded-lg">
            <Login />
            Login
          </button>
          <button className="  w-full bg-gray-200 flex justify-center gap-1.5 items-center text-black px-4 py-2 rounded-lg">
            <PersonAdd />
            Register
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
