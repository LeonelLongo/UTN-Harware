import { useState } from "react";
<<<<<<< Updated upstream
import { Button } from "react-bootstrap";
=======
import { Carousel, Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
>>>>>>> Stashed changes
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

function Home({ cart, setCart, isLoggedIn, setIsLoggedIn }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (product) => {
<<<<<<< Updated upstream
    console.log("SE EJECUTA", product);
    const existing = cart.find((p) => p.id === product.id);
=======
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
>>>>>>> Stashed changes

    const existing = cart.find((p) => p.id === product.id);
    if (existing) {
      setCart(cart.map((p) => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
<<<<<<< Updated upstream
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
=======
    <Layout cartCount={cartCount} onSearchChange={setSearchQuery} isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)}>
      <Carousel
        controls={false}
        interval={5000}
        className="mb-4"
        style={{ borderRadius: "var(--border-radius)", overflow: "hidden" }}
      >
        {carouselImages.map((img, i) => (
          <Carousel.Item key={i}>
            <img className="d-block w-100" src={img.src} alt={img.alt} />
          </Carousel.Item>
        ))}
      </Carousel>

      <ProductList products={filteredProducts} onAdd={handleAddToCart} cart={cart} />

      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered>
        <Modal.Body className="text-center py-4 px-4">
          <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>🔒</div>
          <p className="fw-semibold fs-5 mb-4">
            Para continuar con el proceso de compra debe iniciar sesión
          </p>
          <Button
            style={{ backgroundColor: "var(--color-accent)", border: "none" }}
            onClick={() => navigate("/login")}
          >
            Iniciar sesión
          </Button>
        </Modal.Body>
      </Modal>
>>>>>>> Stashed changes
    </Layout>
  );
}

export default Home;
