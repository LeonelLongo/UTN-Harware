import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Row, Col, Button, Card, Badge } from "react-bootstrap";
import Layout from "../layout/Layout";

function ProductDetail({
  cart,
  setCart,
  isLoggedIn,
  setIsLoggedIn,
  setShowLogin,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:3000/items/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.log(err));
  }, [id]);

  const cartCount = cart.reduce((acc, p) => acc + p.quantity, 0);

  if (!product) {
    return (
      <Layout
        cartCount={cartCount}
        isLoggedIn={isLoggedIn}
        onLogout={() => {
          setIsLoggedIn(false);
          navigate("/");
        }}
        setShowLogin={setShowLogin}
      >
        <p className="text-muted text-center mt-5">Producto no encontrado.</p>
        <div className="text-center">
          <Link to="/" style={{ color: "var(--color-accent)" }}>
            ← Volver al inicio
          </Link>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
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

  const handleRemoveFromCart = () => {
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

  const quantityInCart = cart.find((p) => p.id === product.id)?.quantity ?? 0;

  return (
    <Layout
      cartCount={cartCount}
      isLoggedIn={isLoggedIn}
      onLogout={() => {
        setIsLoggedIn(false);
        navigate("/");
      }}
      setShowLogin={setShowLogin}
    >
      <Link
        to="/"
        className="text-decoration-none small d-inline-block mb-4"
        style={{ color: "var(--color-accent)" }}
      >
        ← Volver al inicio
      </Link>

      <Card className="shadow-sm border-0 p-4">
        <Row className="align-items-center g-4">
          <Col md={6} className="text-center">
            <div
              style={{
                backgroundColor: "#f8f8f8",
                borderRadius: "var(--border-radius)",
                padding: "32px",
              }}
            >
              <img
                src={product.imageUrl}
                alt={product.title}
                style={{
                  maxWidth: "100%",
                  maxHeight: "320px",
                  objectFit: "contain",
                }}
              />
            </div>
          </Col>

          <Col md={6}>
            <h2 className="fw-bold mb-3">{product.title}</h2>
            <p
              className="fw-bold mb-4"
              style={{ color: "var(--color-accent)", fontSize: "2rem" }}
            >
              ${product.value.toLocaleString("es-AR")}
            </p>

            {quantityInCart > 0 ? (
              <div className="d-flex align-items-center gap-3 mb-4">
                <Button
                  size="lg"
                  variant="outline-secondary"
                  style={{
                    width: "48px",
                    height: "48px",
                    padding: 0,
                    lineHeight: 1,
                    flexShrink: 0,
                  }}
                  onClick={handleRemoveFromCart}
                >
                  −
                </Button>
                <Badge
                  className="flex-grow-1 text-center py-3"
                  style={{
                    backgroundColor: "var(--color-accent)",
                    fontSize: "1rem",
                  }}
                >
                  {quantityInCart} en carrito
                </Badge>
                <Button
                  size="lg"
                  style={{
                    width: "48px",
                    height: "48px",
                    padding: 0,
                    lineHeight: 1,
                    flexShrink: 0,
                    backgroundColor: "var(--color-accent)",
                    border: "none",
                  }}
                  onClick={handleAddToCart}
                >
                  +
                </Button>
              </div>
            ) : (
              <Button
                size="lg"
                className="w-100 fw-semibold mb-4"
                style={{
                  backgroundColor: "var(--color-accent)",
                  border: "none",
                }}
                onClick={handleAddToCart}
              >
                Agregar al carrito
              </Button>
            )}

            {product.summary && <p className="text-muted">{product.summary}</p>}
          </Col>
        </Row>
      </Card>
    </Layout>
  );
}

export default ProductDetail;
