/* eslint-disable react/prop-types */
import { CircularProgress, Slider } from "@mui/material";
import ProductCard from "../components/cards/ProductCard";
import CardWrapper from "../components/CardWrapper";
import { filter } from "../utils/data.js";
import { useEffect, useState, useCallback } from "react";
import { getAllProducts } from "../api/index.js";

const Filters = ({ children }) => {
  return (
    <div className="w-full sm:w-56 h-[90%] font-extrabold overflow-y-scroll px-5 py-4">
      {children}
    </div>
  );
};

const Menu = ({ children }) => {
  return <div className="flex flex-col gap-1">{children}</div>;
};

const FilterSection = ({ children }) => {
  return <div className="flex flex-col gap-4">{children}</div>;
};

const Item = ({ children }) => {
  return <div className="flex flex-wrap gap-2.5">{children}</div>;
};

const SelectableItem = ({ children, selected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer flex border-2 rounded-lg px-2 py-0.5 text-xs w-fit ${
        selected ? "bg-gray-700 text-white" : "text-gray-400"
      }`}
    >
      {children}
    </div>
  );
};

const ShopListing = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedSizes, setSelectedSizes] = useState(["S", "M", "L", "XL"]);
  const [selectedCategories, setSelectedCategories] = useState([
    "Men",
    "Women",
    "Kids",
    "Bags",
  ]);

  const getFilteredProducts = useCallback(async () => {
    setLoading(true);

    const res = await getAllProducts(
      `minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}${
        selectedSizes.length > 0 ? `&sizes=${selectedSizes.join(",")}` : ""
      }${
        selectedCategories.length > 0
          ? `&categories=${selectedCategories.join(",")}`
          : ""
      }`
    );
    setProducts(res.data);
    setLoading(false);
  }, [priceRange, selectedSizes, selectedCategories]);

  useEffect(() => {
    getFilteredProducts();
  }, [getFilteredProducts]);
  return (
    <div className="flex flex-col sm:flex-row items-start sm:space-x-4 p-5 mx-auto">
      {loading ? (
        <div className="w-full flex justify-center items-center h-full">
          <CircularProgress />
        </div>
      ) : (
        <>
          <Filters>
            <Menu>
              {filter.map((filters) => (
                <FilterSection key={filters.name}>
                  <h1 className="text-lg font-bold text-gray-900">
                    {filters.name}
                  </h1>
                  {filters.value === "price" ? (
                    <Slider
                      defaultValue={priceRange}
                      min={0}
                      max={1000}
                      valueLabelDisplay="auto"
                      marks={[
                        { value: 0, label: "$0" },
                        { value: 1000, label: "$1000" },
                      ]}
                      onChange={(e, newValue) => setPriceRange(newValue)}
                    />
                  ) : filters.value === "size" ? (
                    <Item>
                      {filters.items.map((item) => (
                        <SelectableItem
                          key={item}
                          selected={selectedSizes.includes(item)}
                          onClick={() =>
                            setSelectedSizes((prev) =>
                              prev.includes(item)
                                ? prev.filter((category) => category !== item)
                                : [...prev, item]
                            )
                          }
                        >
                          {item}
                        </SelectableItem>
                      ))}
                    </Item>
                  ) : filters.value === "category" ? (
                    <Item>
                      {filters.items.map((item) => (
                        <SelectableItem
                          key={item}
                          selected={selectedCategories.includes(item)}
                          onClick={() =>
                            setSelectedCategories((prev) =>
                              prev.includes(item)
                                ? prev.filter((category) => category !== item)
                                : [...prev, item]
                            )
                          }
                        >
                          {item}
                        </SelectableItem>
                      ))}
                    </Item>
                  ) : null}
                </FilterSection>
              ))}
            </Menu>
          </Filters>
          <CardWrapper>
            {products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </CardWrapper>
        </>
      )}
    </div>
  );
};

export default ShopListing;
