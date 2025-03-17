/* eslint-disable react/prop-types */
import { Rating } from "@mui/material";
import ProductImage from "../assets/cloth-rack.jpg";
import { useState } from "react";

const SelectOnClick = ({ children }) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center text-sm border-2 rounded-full h-9 w-9 ${
        selected ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {children}
    </button>
  );
};

const ProductDetails = () => {
  return (
    <div className="flex justify-center items-center w-full h-[90%]">
      <div className="flex flex-1 max-w-[1400px] w-full p-3 flex-col justify-center gap-7 py-4 md:flex-row">
        <div className="flex flex-1 items-center justify-center">
          <img
            className="h-[350px] rounded-xl md:h-[600px]"
            src={ProductImage}
            alt=""
          />
        </div>
        <div className="flex gap-4 flex-col py-1 px-2.5 flex-1">
          <div className="text-2xl font-semibold">Title</div>
          <div className="text-lg font-normal">Name</div>
          <Rating value={3.5} />
          <div className="flex items-center gap-2 text-2xl font-medium">
            $120
            <span className="text-[16px] font-medium line-through">$200</span>
            <span className="text-[16px] font-medium text-green-600">
              40% off
            </span>
          </div>
          <div className="text-lg font-normal">Product Description</div>

          <div className="flex flex-col gap-3 text-lg font-medium">
            <div className="flex italic gap-3">
              <SelectOnClick>S</SelectOnClick>
              <SelectOnClick>L</SelectOnClick>
              <SelectOnClick>XL</SelectOnClick>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
