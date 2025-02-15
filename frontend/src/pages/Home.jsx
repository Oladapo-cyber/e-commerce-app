const Home = () => {
  return (
    <div className="flex flex-col pt-20 items-center justify-center">
      <section>
        <h1 className="text-4xl font-bold">Welcome to Our E-Commerce Store!</h1>
        <p className="text-lg">
          Discover a wide range of products at amazing prices.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Featured Products</h2>
        <div className="flex flex-wrap justify-center">
          {/* Example Product Card - Replace with actual product data */}
          <div className="m-4 p-4 border rounded shadow-md w-64">
            <img
              src="https://via.placeholder.com/150"
              alt="Product"
              className="mb-2"
            />
            <h3 className="text-xl font-medium">Product Name</h3>
            <p className="text-gray-600">$99.99</p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded mt-2 hover:bg-blue-700">
              View Details
            </button>
          </div>
          {/* End Example Product Card */}
          <div className="m-4 p-4 border rounded shadow-md w-64">
            <img
              src="https://via.placeholder.com/150"
              alt="Product"
              className="mb-2"
            />
            <h3 className="text-xl font-medium">Product Name</h3>
            <p className="text-gray-600">$99.99</p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded mt-2 hover:bg-blue-700">
              View Details
            </button>
          </div>
          <div className="m-4 p-4 border rounded shadow-md w-64">
            <img
              src="https://via.placeholder.com/150"
              alt="Product"
              className="mb-2"
            />
            <h3 className="text-xl font-medium">Product Name</h3>
            <p className="text-gray-600">$99.99</p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded mt-2 hover:bg-blue-700">
              View Details
            </button>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Categories</h2>
        <ul className="flex justify-center space-x-4">
          <li>
            <a href="#" className="text-blue-500 hover:underline">
              Category 1
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-500 hover:underline">
              Category 2
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-500 hover:underline">
              Category 3
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
