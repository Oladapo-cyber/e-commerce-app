import openShop from "../assets/open-shop.jpg";
import desertDress from "../assets/desert-dress.jpg";
import clothRack from "../assets/cloth-rack.jpg";
import stylishDenim from "../assets/stylish-denim.jpg";
import CardWrapper from "../components/CardWrapper";
import { category } from "../utils/data";
import Skeleton from "@mui/material/Skeleton";
import ProductCategoryCard from "../components/cards/ProductCategoryCard";
import ProductCard from "../components/cards/ProductCard";
import { useEffect, useState } from "react";
import { getAllProducts } from "../api";
import { NavLink } from "react-router-dom";
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    setLoading(true);
    await getAllProducts().then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="bg-gradient-to-br font-merriweather from-gray-100 to-gray-300">
      <section className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-[1fr_2fr_1fr] gap-6 container h-auto md:h-[90vh] mx-auto p-4">
        <div className="hidden md:block col-span-1 row-span-3 overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition duration-300 h-full">
          <img
            src={clothRack}
            alt="Hero"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition duration-300 h-full md:col-start-2 md:row-start-1">
          <img
            src={openShop}
            alt="Hero"
            className="w-full h-40 md:h-full object-cover"
          />
        </div>

        <div className="flex flex-col items-center justify-center rounded-lg md:col-start-2 md:row-start-2">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-[cursive]">
            Welcome to Our Store
          </h1>
          <p className="text-gray-800 font-medium mb-4 text-center">
            We offer the best deals when it <br /> comes to modern and stylish
            dresses. <br /> check through our collection for your choice
          </p>
          <NavLink
            to="/shop"
            className="bg-black text-white py-3 px-6 rounded-sm w-[80%] hover:bg-gray-900 transition duration-300"
          >
            Shop Now
          </NavLink>
        </div>

        <div className="overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition duration-300 h-auto md:col-start-2 md:row-start-3">
          <img
            src={stylishDenim}
            alt="Hero"
            className="w-full h-40 md:h-full object-cover"
          />
        </div>

        <div className="hidden md:block col-span-1 row-span-3 overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition duration-300 h-full">
          <img
            src={desertDress}
            alt="Hero"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      <section>
        <h2 className="flex justify-center items-center text-2xl font-bold mb-4">
          Shop by Categories
        </h2>
        <CardWrapper>
          {category.map((category) => (
            <ProductCategoryCard key={category.name} category={category} />
          ))}
        </CardWrapper>
      </section>

      <section>
        <h2 className="flex justify-center items-center text-2xl font-bold mb-4">
          Trending
        </h2>
        {loading ? (
          <div className="w-full justify-center items-center h-full">
            <CardWrapper>
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col w-full h-full shadow-lg p-4 md:p-5 bg-white rounded-md md:rounded-lg"
                >
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={160}
                    className="mb-3"
                  />
                  <Skeleton variant="text" width="80%" height={32} />
                  <Skeleton variant="text" width="60%" height={24} />
                  <Skeleton variant="text" width="40%" height={24} />
                </div>
              ))}
            </CardWrapper>
          </div>
        ) : (
          <CardWrapper>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </CardWrapper>
        )}
      </section>
    </div>
  );
};

export default Home;
