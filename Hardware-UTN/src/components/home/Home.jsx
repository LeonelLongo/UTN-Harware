import { Container } from "react-bootstrap";
import { useState } from "react";
import ProductList from "../components/products/ProductList";
import Layout from "../components/layout/Layout";

function Home() {
  const products = [
    { id: 1, name: "RTX 3060", price: 300 },
    { id: 2, name: "Ryzen 5 5600", price: 200 },
    { id: 3, name: "16GB RAM", price: 80 },
  ];
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    const existingProduct = cart.find((p) => p.id === product.id);

    if (existingProduct) {
      const updatedCart = cart.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (productId) => {
    const existingProduct = cart.find((p) => p.id === productId);

    if (existingProduct.quantity > 1) {
      const updatedCart = cart.map((p) =>
        p.id === productId ? { ...p, quantity: p.quantity - 1 } : p,
      );
      setCart(updatedCart);
    } else {
      const updatedCart = cart.filter((p) => p.id !== productId);
      setCart(updatedCart);
    }
  };

  console.log(cart);

  return (
    <Layout>
      <ul>
        {cart.map((p) => (
          <li key={p.id}>
            {p.name} - Cantidad: {p.quantity}
            <button onClick={() => handleRemoveFromCart(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <p>Productos en carrito: {cart.length}</p>
      <ProductList products={products} onAdd={handleAddToCart} />

    </Layout>
  );
}

export default Home;
