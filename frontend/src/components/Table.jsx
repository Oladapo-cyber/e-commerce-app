import { Add, Remove } from "@mui/icons-material";
import ProductImage from "../assets/cloth-rack.jpg";

export const Product = () => {
  return (
    {products.map((item) => (
      <div className="flex gap-4">
      <img
        src={ProductImage}
        className="h-20 w-20 sm:h-30 sm:w-30 rounded-lg"
        alt="product Image"
      />
      <div>
        <p>Title</p>
        <p>Desc</p>
        <p>Size</p>
      </div>
    </div>                
              ))}
    
  );
};

const TableItem = () => {
  return (
    <tbody>
      <tr className="flex justify-between items-center py-2 bg-gray-100 pr-4">
        <td className="text-left pl-4">
          <Product />
        </td>
        <td className="flex flex-col items-start">
          <div className="flex gap-7">
            <span>$200</span>
            <span>
              <div className=" flex gap-3 border items-center rounded px-2 py-0.5">
                <Remove fontSize="5px" />2<Add fontSize="5px" />
              </div>
            </span>
            <span>$400</span>
          </div>
        </td>
      </tr>
    </tbody>
  );
};

const Table = () => {
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
      <TableItem></TableItem>
    </table>
  );
};

export default Table;
