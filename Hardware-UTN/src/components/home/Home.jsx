import { useState } from "react";
import { Carousel } from "react-bootstrap";
import Layout from "../layout/Layout";
import ProductList from "../products/ProductList";
import LoginPrompt from "../auth/LoginPrompt";
import carrusel1 from "../../assets/imagenes/carrusel/carrusel1.png";
import carrusel2 from "../../assets/imagenes/carrusel/carrusel2.png";
import carrusel3 from "../../assets/imagenes/carrusel/carrusel3.png";

const carouselImages = [
  { src: carrusel1, alt: "Promoción 1" },
  { src: carrusel2, alt: "Promoción 2" },
  { src: carrusel3, alt: "Promoción 3" },
];

function Home({ cart, setCart, isLoggedIn, setIsLoggedIn, onLogout, setShowLogin, isAdmin, products }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      setShowPrompt(true);
      return;
    }
    const existing = cart.find((p) => p.id === product.id);
    if (existing) {
      setCart(cart.map((p) => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p));
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
      setCart(cart.map((p) => p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p));
    }
  };

  const cartCount = cart.reduce((acc, p) => acc + p.quantity, 0);

  return (
    <Layout
      cartCount={cartCount}
      onSearchChange={setSearchQuery}
      isLoggedIn={isLoggedIn}
      onLogout={onLogout}
      setShowLogin={setShowLogin}
      isAdmin={isAdmin}
    >
      {showPrompt && (
        <LoginPrompt
          onClose={() => setShowPrompt(false)}
          onLogin={() => { setShowPrompt(false); setShowLogin(true); }}
        />
      )}

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
