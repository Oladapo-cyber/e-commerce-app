import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const ProductCategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/shop?category=${category.name}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col shadow-lg h-fit p-5 cursor-pointer bg-white rounded-lg"
    >
      <img
        src={category.img}
        alt={category.name}
        className="w-full h-40 object-cover rounded-md"
      />
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold text-gray-800">{category.name}</p>
          <p className="text-lg font-bold">
            ${category.price || "59"}
            <span className="align-text-top text-xs">.00</span>
          </p>
        </div>
        <p className="inline text-sm text-gray-600">
          {category.description || "Organic cotton, fairtrade certified"}
        </p>
        <div className="flex items-center mt-2">
          <span className="text-green-600">{category.rating || "★★★★☆"}</span>
          <span className="ml-2 text-gray-600">
            ({category.ratingCount || "4"})
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCategoryCard;
