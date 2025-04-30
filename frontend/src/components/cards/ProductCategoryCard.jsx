import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const ProductCategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/shop?category=${category.name}`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex flex-col shadow-lg h-fit p-0 cursor-pointer bg-white rounded-lg overflow-hidden transition-transform hover:scale-105 focus:outline-none"
      aria-label={`Browse ${category.name} category`}
    >
      <img
        src={category.img}
        alt={category.name}
        className="w-full h-40 object-cover"
        loading="lazy"
      />
      <div className="flex flex-col flex-1 justify-between px-5 py-4">
        <p className="text-lg font-heading font-semibold text-gray-800 text-center mb-1">
          {category.name}
        </p>
        <p className="text-sm text-gray-600 text-center">
          {category.description ||
            category.off ||
            "Organic cotton, fairtrade certified"}
        </p>
      </div>
    </button>
  );
};

export default ProductCategoryCard;
