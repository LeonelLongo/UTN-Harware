import { useState } from "react";
import { Button } from "react-bootstrap";
import Layout from "../layout/Layout";
import ProductList from "../products/ProductList";

function Home({cart, setCart}) {

  const products = [
    { id: 1, name: "RTX 3060", price: 300 },
    { id: 2, name: "Ryzen 5 5600", price: 200 },
    { id: 3, name: "16GB RAM", price: 80 },
  ];

  const handleAddToCart = (product) => {
    console.log("SE EJECUTA", product);
    const existing = cart.find((p) => p.id === product.id);

    if (existing) {
      setCart(
        cart.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <Layout>
      {/* BOTÓN CORRECTO */}
      <div style={{ marginBottom: "20px" }}>
        <Button variant="danger" onClick={handleClearCart}>
          Vaciar carrito
        </Button>
      </div>

      <ProductList products={products} onAdd={handleAddToCart} />
      <div style={{ marginBottom: "20px" }}>
        <h5>Carrito ({cart.length})</h5>

        {cart.map((p) => (
          <div key={p.id}>
            {p.name} x{p.quantity}
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Home;
