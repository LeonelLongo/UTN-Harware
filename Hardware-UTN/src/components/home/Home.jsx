import { useState } from "react";
import { Carousel } from "react-bootstrap";
import Layout from "../layout/Layout";
import ProductList from "../products/ProductList";
import { products } from "../../data/products";
import carrusel1 from "../../assets/imagenes/carrusel/carrusel1.png";
import carrusel2 from "../../assets/imagenes/carrusel/carrusel2.png";
import carrusel3 from "../../assets/imagenes/carrusel/carrusel3.png";

const carouselImages = [
  { src: carrusel1, alt: "Promoción 1" },
  { src: carrusel2, alt: "Promoción 2" },
  { src: carrusel3, alt: "Promoción 3" },
];

function Home({ cart, setCart, isLoggedIn, setIsLoggedIn, setShowLogin }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      setShowLogin(true);
      return;
    }
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

  const handleRemoveFromCart = (product) => {
    const existing = cart.find((p) => p.id === product.id);
    if (!existing) return;
    if (existing.quantity === 1) {
      setCart(cart.filter((p) => p.id !== product.id));
    } else {
      setCart(
        cart.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p,
        ),
      );
    }
  };

  const cartCount = cart.reduce((acc, p) => acc + p.quantity, 0);

  return (
    <Layout
      cartCount={cartCount}
      onSearchChange={setSearchQuery}
      isLoggedIn={isLoggedIn}
      onLogout={() => setIsLoggedIn(false)}
      setShowLogin={setShowLogin}
    >
      <Carousel
        controls={false}
        interval={5000}
        className="mb-4"
        style={{ borderRadius: "var(--border-radius)", overflow: "hidden" }}
      >
        {carouselImages.map((img, i) => (
          <Carousel.Item key={i}>
            <img
              className="d-block w-100"
              src={img.src}
              alt={img.alt}
              style={{ aspectRatio: "1919 / 820", objectFit: "cover" }}
            />
          </Carousel.Item>
        ))}
      </Carousel>

      <ProductList
        products={filteredProducts}
        onAdd={handleAddToCart}
        onRemove={handleRemoveFromCart}
        cart={cart}
      />
    </Layout>
  );
}

export default Home;
