const Footer = () => (
  <footer className="bg-gray-900 text-gray-200">
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h2 className="font-heading text-2xl font-bold mb-2 text-white">
          Dapstore
        </h2>
        <p className="text-gray-400 text-sm">
          Your one-stop shop for modern and stylish clothing. Quality, variety,
          and great deals—always.
        </p>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Shop</h3>
        <ul className="space-y-1 text-sm">
          <li>
            <a href="/shop" className="hover:text-white">
              All Products
            </a>
          </li>
          <li>
            <a href="/new_arrivals" className="hover:text-white">
              New Arrivals
            </a>
          </li>
          <li>
            <a href="/favorites" className="hover:text-white">
              Favorites
            </a>
          </li>
          <li>
            <a href="/cart" className="hover:text-white">
              Cart
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Customer Service</h3>
        <ul className="space-y-1 text-sm">
          <li>
            <a href="#" className="hover:text-white">
              Contact Us
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white">
              Shipping & Returns
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white">
              FAQ
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Follow Us</h3>
        <div className="flex space-x-4 mt-2">
          <a href="#" aria-label="Instagram" className="hover:text-white">
            Instagram
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-white">
            Twitter
          </a>
          <a href="#" aria-label="Facebook" className="hover:text-white">
            Facebook
          </a>
        </div>
      </div>
    </div>
    <div className="border-t border-gray-700 text-center py-4 text-xs text-gray-400">
      &copy; {new Date().getFullYear()} Dapstore. All rights reserved.
    </div>
  </footer>
);

export default Footer;
// This code defines a Footer component for a web application. The footer contains four main sections:
// 1. **Brand Description**: A brief description of the brand "Dapstore".
// 2. **Shop Links**: Links to various sections of the shop, including "All Products", "New Arrivals", "Favorites", and "Cart".
// 3. **Customer Service Links**: Links to customer service resources such as "Contact Us", "Shipping & Returns", and "FAQ".
// 4. **Social Media Links**: Icons and links to the brand's social media profiles on Instagram, Twitter, and Facebook.
