import { Login } from "@mui/icons-material";

const Navbar = () => {
  return (
    <div className="bg-navbar flex items-center justify-between py-4 px-6 shadow-sm fixed w-full z-30">
      <h1 className="text-3xl font-cursive">Dapstore</h1>
      <div className="flex items-center space-x-6">
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
          <button className="bg-gray-200 text-black px-4 py-2 rounded-lg">
            <Login />
            Login
          </button>
          <button className="bg-gray-200 text-black px-4 py-2 rounded-lg">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
