// /* eslint-disable react/prop-types */

import Button from "../components/Button";
import Table from "../components/Table";
import TextInput from "../components/TextInput";

// import { pricing } from "../utils/data";

// const TableItem = ({ name, price, flex, bold }) => {
//   return (
//     <tr
//       className={`flex ${flex ? "flex" : "block"} ${bold ? "font-bold" : ""}`}
//     >
//       <td className="px-4 py-2">{name}</td>
//       <td className="px-4 py-2">{price}</td>
//     </tr>
//   );
// };

const Cart = () => {
  return (
    <div className="flex items-center flex-col overflow-y-scroll md:px-5 md:py-7 gap-7">
      <section className="w-full max-w-[1400px] py-4">
        <h1 className="flex justify-center items-center text-2xl font-bold mb-4">
          Your Shopping Cart
        </h1>
        <div className="flex flex-col gap-7 p-3 md:flex-row">
          <div className=" flex-1">
            <Table />
          </div>
          <div className=" flex-1">
            <div
              className="flex justify-between text-xl font-semibold
            
            
            
            "
            >
              <span className="font-bold">Subtotal:</span> $12.00
            </div>
            <div className="flex flex-col gap-1.5 text-[18px] mt-2 ">
              <span className="font-semibold">Delivery details:</span>
              <div>
                <div className="flex gap-1.5">
                  <TextInput placeholder={"First Name"} />
                  <TextInput placeholder={"Last Name"} />
                </div>
                <TextInput placeholder={"Email"} />
                <TextInput placeholder={"Phone......."} />
                <TextInput placeholder={"Enter your full address..."} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 text-[18px] mt-2 ">
              <span className="font-semibold">Payment details:</span>
              <div>
                <div className="flex gap-1.5">
                  <TextInput placeholder={"Card Number"} />
                  <TextInput placeholder={"Expiry Date"} />
                </div>
                <TextInput placeholder={"CVV"} />
                <TextInput placeholder={"Card Holder Name"} />
              </div>
            </div>
            <Button text={"Submit Order"} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
