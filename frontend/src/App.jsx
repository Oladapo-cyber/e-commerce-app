import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import { useState } from "react";
import ShopListing from "./pages/ShopListing";
// import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
// import Login from "./pages/Login";
// import NewArrivals from "./pages/NewArrivals";
import Favorites from "./pages/Favorites";
import ProductDetails from "./pages/ProductDetails";
import { useSelector, useDispatch } from "react-redux";
// import ShopListing from "./pages/ShopListing";
import ToastMessage from "./components/ToastMessage";
import Footer from "./components/Footer";
import Orders from "./pages/Orders";

const App = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { open, message, severity } = useSelector((state) => state.user);
  const [openAuth, setOpenAuth] = useState(false);
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <BrowserRouter>
        <Navbar setOpenAuth={setOpenAuth} currentUser={currentUser} />
        <div className="pt-18 flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<ShopListing />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shop/:id" element={<ProductDetails />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
        {openAuth && (
          <Authentication openAuth={openAuth} setOpenAuth={setOpenAuth} />
        )}
        {open && (
          <ToastMessage message={message} severity={severity} open={open} />
        )}
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
