import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "./components/ProductList";
import SearchBar from "./components/SearchBar";
import AppNavbar from "./components/Navbar"; // Import renamed Navbar

function Ap() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch products from the API
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  // Add product to the cart
  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Update quantity in cart
  const updateCartQuantity = (productId, amount) => {
    setCart(
      cart.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + amount } : item
      ).filter(item => item.quantity > 0)
    );
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // Filtered products based on search term
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      {/*AppNavbar */}
      <AppNavbar cart={cart} removeFromCart={removeFromCart} />

      <h1>E-Commerce Platform</h1>

      {/* Search Bar */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Product List */}  
      <ProductList products={filteredProducts} addToCart={addToCart} />
    </div>
  );
}

export default Ap;
