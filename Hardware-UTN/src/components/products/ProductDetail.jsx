import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Row, Col, Button, Modal, Card } from "react-bootstrap";
import Layout from "../layout/Layout";
import { products } from "../../data/products";

function ProductDetail({ cart, setCart, isLoggedIn, setIsLoggedIn }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const product = products.find((p) => p.id === Number(id));
  const cartCount = cart.reduce((acc, p) => acc + p.quantity, 0);

  if (!product) {
    return (
      <Layout cartCount={cartCount} isLoggedIn={isLoggedIn} onLogout={() => { setIsLoggedIn(false); navigate("/"); }}>
        <p className="text-muted text-center mt-5">Producto no encontrado.</p>
        <div className="text-center">
          <Link to="/" style={{ color: "var(--color-accent)" }}>← Volver al inicio</Link>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    const existing = cart.find((p) => p.id === product.id);
    if (existing) {
      setCart(cart.map((p) => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const quantityInCart = cart.find((p) => p.id === product.id)?.quantity ?? 0;

  return (
    <Layout
      cartCount={cartCount}
      isLoggedIn={isLoggedIn}
      onLogout={() => { setIsLoggedIn(false); navigate("/"); }}
    >
      <Link to="/" className="text-decoration-none small d-inline-block mb-4" style={{ color: "var(--color-accent)" }}>
        ← Volver al inicio
      </Link>

      <Card className="shadow-sm border-0 p-4">
        <Row className="align-items-center g-4">
          <Col md={6} className="text-center">
            <div style={{ backgroundColor: "#f8f8f8", borderRadius: "var(--border-radius)", padding: "32px" }}>
              <img
                src={product.image}
                alt={product.name}
                style={{ maxWidth: "100%", maxHeight: "320px", objectFit: "contain" }}
              />
            </div>
          </Col>

          <Col md={6}>
            <h2 className="fw-bold mb-3">{product.name}</h2>
            <p className="fw-bold mb-4" style={{ color: "var(--color-accent)", fontSize: "2rem" }}>
              ${product.price.toLocaleString("es-AR")}
            </p>

            <Button
              size="lg"
              className="w-100 fw-semibold mb-4"
              style={{ backgroundColor: "var(--color-accent)", border: "none" }}
              onClick={handleAddToCart}
            >
              {quantityInCart > 0 ? `+ Agregar (${quantityInCart} en carrito)` : "Agregar al carrito"}
            </Button>

            {product.specs.length > 0 && (
              <div>
                <h5 className="fw-bold mb-3">Especificaciones técnicas</h5>
                <table className="table table-sm table-bordered">
                  <tbody>
                    {product.specs.map((spec, i) => (
                      <tr key={i}>
                        <td className="fw-semibold text-muted" style={{ width: "40%" }}>{spec.label}</td>
                        <td>{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Col>
        </Row>
      </Card>

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
    </Layout>
  );
}

export default ProductDetail;
