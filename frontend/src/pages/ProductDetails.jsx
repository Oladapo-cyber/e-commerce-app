import { Rating } from "@mui/material";
import ProductImage from "../assets/cloth-rack.jpg";

const ProductDetails = () => {
  return (
    <div className="flex justify-center items-center w-full h-[90%]">
      <div className="flex flex-1 max-w-[1400px] w-full p-3 flex-col justify-center gap-7 py-4 md:flex-row">
        <div className="flex flex-1 items-center justify-center bg-red-400">
          l
          <img
            className="h-[400px] rounded-xl md:h-[600px]"
            src={ProductImage}
            alt=""
          />
        </div>
        <div className="flex gap-4 flex-col py-1 px-2.5 flex-1 bg-blue-400">
          <div>Title</div>
          <div>Name</div>
          <Rating value={3.5} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
