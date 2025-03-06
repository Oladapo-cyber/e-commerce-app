/* eslint-disable react/prop-types */
import { Slider } from "@mui/material";
import ProductCard from "../components/cards/ProductCard";
import CardWrapper from "../components/CardWrapper";
import { category, filter } from "../utils/data.js";
import { useState } from "react";

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
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedSizes, setSelectedSizes] = useState(["S", "M", "L"]);
  const [selectedCategories, setSelectedCategories] = useState([
    "Men",
    "Women",
    "Kids",
    "Bags",
  ]);

  return (
    <div className="container flex flex-col sm:flex-row items-start sm:space-x-4 px-5 py-3 mx-auto p-4">
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
        {/* Add ProductCategoryCard components here */}
        <ProductCard />
      </CardWrapper>
    </div>
  );
};

export default ShopListing;
