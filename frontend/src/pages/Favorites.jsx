import ProductCard from "../components/cards/ProductCard";
import CardWrapper from "../components/CardWrapper";

const Favorites = () => {
  return (
    <div>
      <h1 className="flex justify-start m-2 items-center text-2xl font-bold mb-4">
        Favorite Items
      </h1>
      <CardWrapper>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </CardWrapper>
    </div>
  );
};

export default Favorites;
