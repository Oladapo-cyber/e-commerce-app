import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import { useState } from "react";
// import NotFound from "./pages/NotFound";
// import Cart from "./pages/Cart";
// import Login from "./pages/Login";
// import NewArrivals from "./pages/NewArrivals";
// import Favorites from "./pages/Favorites";
// import ShopListing from "./pages/ShopListing";

const App = () => {
  const [openAuth, setOpenAuth] = useState(false);
  return (
    <div>
      <BrowserRouter>
        <Navbar setOpenAuth={setOpenAuth} />
        <div className="container mx-auto pt-18">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* 
          <Route path="/newarrivals" element={<NewArrivals />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/login" element={<Login />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/shoplisting" element={<ShopListing />} />
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
