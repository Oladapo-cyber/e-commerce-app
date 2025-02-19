import { category } from "../utils/data";
import ProductCategoryCard from "./cards/ProductCategoryCard";
const CardWrapper = () => {
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {category.map((category) => (
        <ProductCategoryCard key={category.name} category={category} />
      ))}
    </div>
  );
};

export default CardWrapper;
