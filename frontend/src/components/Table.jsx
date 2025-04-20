/* eslint-disable react/prop-types */
import { Add, DeleteOutlineRounded, Remove } from "@mui/icons-material";

export const Product = ({ title, img, desc, size }) => {
  return (
    <div className="flex gap-4">
      <img
        src={img}
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

const TableItem = ({ product, quantity, addCart, removeCart }) => {
  return (
    <tr className="flex justify-between items-center py-2 bg-gray-100 pr-4">
      <td className="text-left pl-4">
        <Product
          img={product?.img}
          alt={product?.title}
          className="h-20 w-20 sm:h-30 sm:w-30 rounded-lg"
          title={product?.title}
          desc={product?.desc}
          size={product?.size}
        />
      </td>
      <td className="flex flex-col items-start">
        <div className="flex gap-7">
          <span>${product?.price?.org}</span>
          <span>
            <div className=" flex gap-3 border items-center rounded px-2 py-0.5">
              <Remove
                style={{
                  cursor: "pointer",
                }}
                fontSize="5px"
                onClick={() => removeCart(product._id, quantity - 1)}
              />
              {quantity}
              <Add
                style={{
                  cursor: "pointer",
                }}
                fontSize="5px"
                onClick={() => addCart(product._id)}
              />
            </div>
          </span>
          <span>${(quantity * product?.price?.org).toFixed(2)}</span>
          <DeleteOutlineRounded
            sx={{ color: "red" }}
            onClick={() => removeCart(product?._id, quantity - 1, "full")}
          />
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
            quantity={item.quantity}
            addCart={addCart}
            removeCart={removeCart}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
