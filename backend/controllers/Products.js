import mongoose from "mongoose"; // Import the mongoose library for database operations
import Products from "../models/Products.js"; // Import the Products model to interact with the products collection
import { createError } from "../error.js"; // Import a helper to create error objects

// Create a new product (or multiple products) controller
export const addProducts = async (req, res, next) => {
  try {
    // Extract products data from the request body
    const productsData = req.body;

    // Check if the received data is an array. Our endpoint expects an array of products.
    if (!Array.isArray(productsData)) {
      // If not, pass a 400 error (Bad Request) to our error handler
      return next(
        createError(400, "Invalid request, an array of products is expected")
      );
    }

    // Array to store the newly created products
    const createdProducts = [];

    // Loop over each product's information in the received array
    for (const productInfo of productsData) {
      // Destructure the product details from the productInfo object
      const { title, name, desc, img, price, sizes, category } = productInfo;

      // Create a new instance of the Products model for the current product
      const product = new Products({
        title,
        name,
        desc,
        img,
        price,
        sizes,
        category,
      });

      // Save the product to the database and store the created product
      const createdProduct = await product.save();
      createdProducts.push(createdProduct);
    }

    // When all products are created, respond with a success message and the created products array
    return res
      .status(201)
      .json({ message: "products added successfully", createdProducts });
  } catch (error) {
    // Pass any errors that occur to the error handling middleware
    next(error);
  }
};

// Retrieve products based on query parameters such as categories, price, sizes, and search term
export const getProducts = async (req, res, next) => {
  try {
    // Destructure query parameters from the request URL
    let { categories, minPrice, maxPrice, sizes, search } = req.query;

    // If sizes or categories are provided as comma-separated strings, split them into an array
    sizes = sizes?.split(",");
    categories = categories?.split(",");

    // Initialize filter object for querying the database
    const filter = {};

    // If categories are provided, filter products whose category is in the provided array
    if (categories && Array.isArray(categories)) {
      filter.category = { $in: categories };
    }

    // If minPrice or maxPrice is provided, add price filtering criteria to the filter object
    if (minPrice || maxPrice) {
      filter["price.org"] = {}; // Expecting that the product price is stored under a nested 'org' field
      if (minPrice) {
        // Add condition to match products with price greater than or equal to minPrice
        filter["price.org"]["$gte"] = parseFloat(minPrice);
      }

      if (maxPrice) {
        // Add condition to match products with price less than or equal to maxPrice
        filter["price.org"]["$lte"] = parseFloat(maxPrice);
      }
    }

    // If sizes are provided, filter products whose sizes field contains any of the provided sizes
    if (sizes && Array.isArray(sizes)) {
      filter.sizes = { $in: sizes };
    }

    // If a search term is provided, filter products whose title or description matches (case-insensitive)
    if (search) {
      filter.$or = [
        { title: { $regex: new RegExp(search, "i") } },
        { desc: { $regex: new RegExp(search, "i") } },
      ];
    }

    // Query the database with the filter criteria
    const products = await Products.find(filter);
    // Respond with HTTP 200 status and the array of matching products in JSON format
    return res.status(200).json(products);
  } catch (error) {
    // Pass any query errors to the error handling middleware
    next(error);
  }
};

// Retrieve a single product by its unique ID
export const getProductById = async (req, res, next) => {
  try {
    // Extract the product ID from the URL parameters
    const { id } = req.params;

    // Validate that the provided ID is a valid Mongo ObjectId
    if (!mongoose.isValidObjectId(id)) {
      // If not valid, pass a 400 error (Bad Request) to the error handler
      return next(createError(400, "Invalid product ID"));
    }

    // Find the product by its ID in the database
    const product = await Products.findById(id);
    // If no product is found, pass a 404 error (Not Found)
    if (!product) {
      return next(createError(404, "Product not found"));
    }
    // If the product is found, respond with the product details in JSON format
    return res.status(200).json(product);
  } catch (error) {
    // Pass any errors that occur during the lookup to the error handler
    return next(error);
  }
};

//Added the delete and patch controllers when I wanted to make changes to data I had sent to the database
// Controller to delete a product by its ID
export const deleteProduct = async (req, res, next) => {
  try {
    // Extract the product ID from URL parameters
    const { id } = req.params;
    // Attempt to delete the product by its ID from the database
    const deletedProduct = await Products.findByIdAndDelete(id);

    // If no product is found, pass a 404 error to the error handler
    if (!deletedProduct) {
      return next(createError(404, "Product not found"));
    }

    // If deletion is successful, respond with a 200 status and a success message
    return res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    // In case of any errors, pass them to the error handling middleware
    next(error);
  }
};

// Controller to update a product's details using HTTP PATCH
export const updateProductPatch = async (req, res, next) => {
  try {
    // Extract the product ID from URL parameters
    const { id } = req.params;
    // Get the fields to be updated from the request body
    const updatedData = req.body;

    // Use findByIdAndUpdate to update only the provided fields
    // { new: true } makes sure the updated document is returned
    const updatedProduct = await Products.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    // If no product is found, pass a 404 error to the error handler
    if (!updatedProduct) {
      return next(createError(404, "Product not found"));
    }

    // Respond with the updated product details and a 200 HTTP status
    return res.status(200).json(updatedProduct);
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
};
