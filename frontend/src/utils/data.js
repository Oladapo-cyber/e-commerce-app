import casualWear from "../assets/CasualWear.avif";
import ethnicWear from "../assets/ethnicWear.jpg";
import winterWear from "../assets/winterWear.jpg";
import westernWear from "../assets/westernWear.jpg";
import formalWear from "../assets/formalWear.webp";

export const category = [
  {
    img: casualWear,
    name: "Casual Wear",
    off: "20-40% OFF",
  },
  {
    img: formalWear,
    name: "Formal Wear",
    off: "10-20% OFF",
  },
  {
    img: winterWear,
    name: "Winter Wear",
    off: "20-40% OFF",
  },
  {
    img: westernWear,
    name: "Western Wear",
    off: "30-40% OFF",
  },
  {
    img: ethnicWear,
    name: "Ethnic Wear",
    off: "10-40% OFF",
  },
];

export const filter = [
  {
    name: "Product Categories",
    value: "category",
    items: [
      "Men",
      "Women",
      "Kids",
      "Bags",
      "Accessories",
      "Casual Wear",
      "Formal Wear",
      "Winter Wear",
      "Ethnic Wear",
    ],
  },
  {
    name: "Filter by Price",
    value: "price",
    items: [],
  },
  {
    name: "Filter by Size",
    value: "size",
    items: ["S", "M", "L", "XL", "XXL"],
  },
];

export const pricing = [
  { name: "Gucci", price: "$1,400", flex: false, bold: true },
  { name: "Versace", price: "$1000", flex: false, bold: true },
  { name: "Puma", price: "$100", flex: false, bold: true },
  { name: "Christian Louboutin", price: "$2000", flex: false, bold: true },
];
