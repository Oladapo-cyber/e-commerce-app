/* eslint-disable react/prop-types */
import { Add, Remove } from "@mui/icons-material";
import ProductImage from "../assets/cloth-rack.jpg";

export const Product = ({ title, desc, size }) => {
  return (
    <div className="flex gap-4">
      <img
        src={ProductImage}
        className="h-20 w-20 sm:h-30 sm:w-30 rounded-lg"
        alt="product Image"
      />
      <div>
        <p>{title}</p>
        <p>{desc}</p>
        <p>{size}</p>
      </div>
    </div>
  );
};

const TableItem = ({ product, addCart, removeCart }) => {
  return (
    <tr className="flex justify-between items-center py-2 bg-gray-100 pr-4">
      <td className="text-left pl-4">
        <Product
          title={product.title}
          desc={product.desc}
          size={product.size}
        />
      </td>
      <td className="flex flex-col items-start">
        <div className="flex gap-7">
          <span>${product.price}</span>
          <span>
            <div className=" flex gap-3 border items-center rounded px-2 py-0.5">
              <Remove fontSize="5px" onClick={() => removeCart(product._id)} />
              {product.quantity}
              <Add fontSize="5px" onClick={() => addCart(product._id)} />
            </div>
          </span>
          <span>${product.price * product.quantity}</span>
        </div>
      </td>
    </tr>
  );
};

const Table = ({ products, addCart, removeCart }) => {
  return (
    <table className="min-w-full mb-5">
      <thead>
        <tr className="flex justify-between items-center bg-gray-100 pr-4">
          <th className="text-left pl-4">Item</th>
          <th className="flex flex-col items-start">
            <div className="flex gap-7">
              <span>Price</span>
              <span>Quantity</span>
              <span>Subtotal</span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {products.map((item) => (
          <TableItem
            key={item.product._id}
            product={item.product}
            addCart={addCart}
            removeCart={removeCart}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
