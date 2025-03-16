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
// import ShopListing from "./pages/ShopListing";

const App = () => {
  const [openAuth, setOpenAuth] = useState(false);
  return (
    <div>
      <BrowserRouter>
        <Navbar setOpenAuth={setOpenAuth} />
        <div className="pt-18">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<ShopListing />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shop/:id" element={<ProductDetails />} />
            {/* 
          <Route path="/newarrivals" element={<NewArrivals />} />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/login" element={<Login />} />
          
          
          <Route path="*" element={<NotFound />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} /> */}
          </Routes>
        </div>
        {openAuth && (
          <Authentication openAuth={openAuth} setOpenAuth={setOpenAuth} />
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
