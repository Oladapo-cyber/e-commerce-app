const ProductCard = () => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-lg flex flex-col cursor-pointer transform hover:scale-105 transition duration-300">
      <img
        src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80"
        alt="Product"
        className="w-full h-40 object-cover rounded-t-lg"
      />
      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Product Name</h3>
          <p className="mt-1 text-sm text-gray-600">
            Short description about the product.
          </p>
          <div className="flex items-center mt-2">
            <span className="text-green-600">★★★★☆</span>
            <span className="ml-2 text-gray-600">(5)</span>
          </div>
        </div>
        <p className="text-lg font-bold">
          $59
          <span className="align-text-top text-xs">.00</span>
        </p>
      </div>
      <button className="mt-4 bg-black text-white py-2 px-4 rounded hover:bg-gray-900 transition duration-300">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
