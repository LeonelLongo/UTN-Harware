import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Row, Col, Button, Badge } from "react-bootstrap";
import Layout from "../layout/Layout";
import { useAppContext } from "../../context/AppContext";
import { BASE_URL } from "../../services/apiConfig";

function ProductDetail() {
  const { cart, setCart, isLoggedIn, setShowLogin } = useAppContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/items/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) {
    return (
      <Layout>
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
  const hasSummary = product.summary && product.summary.trim().length > 0;
  const discountPct = product.isOffer ? 20 : null;
  const parsedSpecs = (() => {
    if (!product.specs) return null;
    try { return JSON.parse(product.specs); } catch { return null; }
  })();
  const hasSpecs = parsedSpecs && Object.keys(parsedSpecs).length > 0;
  const discountedPrice = discountPct ? Math.round(product.value * (1 - discountPct / 100) * 100) / 100 : null;

  return (
    <Layout>
      {/* Breadcrumb */}
      <nav style={{ marginBottom: "20px", fontSize: "0.85rem" }}>
        <Link
          to="/"
          style={{ color: "var(--color-accent)", textDecoration: "none" }}
        >
          Inicio
        </Link>
        <span style={{ margin: "0 6px", color: "var(--color-text-muted)" }}>
          ›
        </span>
        <Link
          to="/productos"
          style={{ color: "var(--color-accent)", textDecoration: "none" }}
        >
          Productos
        </Link>
        <span style={{ margin: "0 6px", color: "var(--color-text-muted)" }}>
          ›
        </span>
        <span style={{ color: "var(--color-text-muted)" }}>
          {product.title}
        </span>
      </nav>

      {/* Card principal */}
      <div
        style={{
          backgroundColor: "var(--color-surface)",
          borderRadius: "var(--border-radius)",
          boxShadow: "var(--shadow-md)",
          overflow: "hidden",
          marginBottom: "24px",
          padding: "32px",
        }}
      >
        <Row className="g-5">
          {/* Imagen */}
          <Col md={5}>
            <div
              style={{
                backgroundColor: "#f8f8f8",
                borderRadius: "var(--border-radius)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "340px",
                padding: "32px",
                position: "relative",
              }}
            >
              {discountPct && (
                <div style={{ position: "absolute", top: "12px", left: "12px", backgroundColor: "#e53935", color: "white", padding: "4px 10px", borderRadius: "4px", fontSize: "0.8rem", fontWeight: 700 }}>
                  -{discountPct}%
                </div>
              )}
              <img
                src={product.imageUrl}
                alt={product.title}
                style={{
                  maxWidth: "100%",
                  maxHeight: "280px",
                  objectFit: "contain",
                }}
              />
            </div>
          </Col>

          {/* Info */}
          <Col md={7}>
            {/* Categoría + badges */}
            <div
              style={{
                display: "flex",
                gap: "6px",
                flexWrap: "wrap",
                marginBottom: "8px",
              }}
            >
              {product.category && (
                <span style={{ fontSize: "0.82rem", color: "var(--color-accent)", fontWeight: 600 }}>
                  {product.category}
                </span>
              )}
              {product.subCategory && (
                <span style={{ fontSize: "0.78rem", color: "#666", backgroundColor: "#f0f0f0", padding: "2px 8px", borderRadius: "4px" }}>
                  {product.subCategory}
                </span>
              )}
              {product.model && (
                <span style={{ fontSize: "0.78rem", color: "#666", backgroundColor: "#f0f0f0", padding: "2px 8px", borderRadius: "4px" }}>
                  {product.model}
                </span>
              )}
            </div>

            {/* Título */}
            <h2
              style={{
                fontWeight: 700,
                fontSize: "1.4rem",
                marginBottom: "8px",
                lineHeight: 1.3,
              }}
            >
              {product.title}
            </h2>

            {/* ID del producto */}
            <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
              <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", backgroundColor: "#f0f0f0", padding: "3px 10px", borderRadius: "4px" }}>
                ID: {product.id}
              </span>
            </div>

            {/* Precio */}
            <div
              style={{
                backgroundColor: "#f8f8f8",
                borderRadius: "var(--border-radius)",
                padding: "20px",
                marginBottom: "16px",
                border: "1px solid var(--color-border)",
              }}
            >
              {discountedPrice ? (
                <>
                  <div style={{ fontSize: "0.82rem", color: "var(--color-accent)", fontWeight: 600, marginBottom: "4px" }}>Mejor precio</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                    <span style={{ textDecoration: "line-through", color: "#aaa", fontSize: "0.95rem" }}>
                      ${product.value.toLocaleString("es-AR")}
                    </span>
                    <span style={{ backgroundColor: "#e53935", color: "white", fontSize: "0.75rem", fontWeight: 700, padding: "2px 7px", borderRadius: "4px" }}>
                      -{discountPct}%
                    </span>
                  </div>
                  <div style={{ color: "var(--color-accent)", fontSize: "2rem", fontWeight: 800, lineHeight: 1 }}>
                    ${discountedPrice.toLocaleString("es-AR")}
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", marginBottom: "4px" }}>Precio</div>
                  <div style={{ color: "var(--color-accent)", fontSize: "2rem", fontWeight: 800, lineHeight: 1 }}>
                    ${product.value.toLocaleString("es-AR")}
                  </div>
                </>
              )}
            </div>

            {/* Info extra */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "0.88rem",
                  color: product.stock === 0 ? "#c62828" : "var(--color-success, #2e7d32)",
                }}
              >
                <span style={{ fontSize: "1rem" }}>{product.stock === 0 ? "✕" : "✓"}</span>
                <span style={{ fontWeight: 600 }}>{product.stock === 0 ? "Sin stock" : "Stock disponible"}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "0.88rem",
                  color: "var(--color-text-muted)",
                }}
              >
                <span>🛡</span>
                <span>Garantía - 12 meses</span>
                <span
                  style={{
                    color: "var(--color-accent)",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                  onClick={() => navigate("/terminos")}
                >
                  Ver términos y condiciones
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "0.88rem",
                  color: "var(--color-text-muted)",
                }}
              >
                <span>🚚</span>
                <span>Envíos a todo el país</span>
              </div>
            </div>

            {/* Botón carrito */}
            {product.stock === 0 ? (
              <Button
                size="lg"
                className="w-100 fw-semibold"
                disabled
                style={{ padding: "14px", fontSize: "1rem" }}
              >
                Sin stock
              </Button>
            ) : quantityInCart > 0 ? (
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <Button
                  variant="outline-secondary"
                  style={{ width: "48px", height: "48px", padding: 0, lineHeight: 1, fontSize: "1.4rem", flexShrink: 0 }}
                  onClick={handleRemoveFromCart}
                >
                  −
                </Button>
                <div
                  style={{ flex: 1, textAlign: "center", backgroundColor: "var(--color-accent)", color: "white", borderRadius: "var(--border-radius)", padding: "13px", fontWeight: 600, fontSize: "1rem" }}
                >
                  {quantityInCart} en carrito
                </div>
                <Button
                  style={{ width: "48px", height: "48px", padding: 0, lineHeight: 1, fontSize: "1.4rem", flexShrink: 0, backgroundColor: "var(--color-accent)", border: "none" }}
                  onClick={handleAddToCart}
                >
                  +
                </Button>
              </div>
            ) : (
              <Button
                size="lg"
                className="w-100 fw-semibold"
                style={{ backgroundColor: "var(--color-accent)", border: "none", padding: "14px", fontSize: "1rem" }}
                onClick={handleAddToCart}
              >
                🛒 Sumar al carrito
              </Button>
            )}

            <Button
              variant="link"
              className="w-100 mt-2"
              style={{
                color: "var(--color-text-muted)",
                fontSize: "0.88rem",
                textDecoration: "none",
              }}
              onClick={() => navigate(-1)}
            >
              ← Seguir comprando
            </Button>
          </Col>
        </Row>
      </div>

      {/* Especificaciones */}
      {hasSpecs && (
        <div style={{ backgroundColor: "var(--color-surface)", borderRadius: "var(--border-radius)", boxShadow: "var(--shadow-sm)", padding: "28px 32px", marginBottom: "16px" }}>
          <h5 style={{ fontWeight: 700, marginBottom: "16px", borderLeft: "4px solid var(--color-accent)", paddingLeft: "12px" }}>
            Especificaciones
          </h5>
          <div style={{ maxWidth: "600px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {Object.entries(parsedSpecs).map(([key, value], i) => (
                  <tr key={key} style={{ backgroundColor: i % 2 === 0 ? "#f8f8f8" : "white" }}>
                    <td style={{ padding: "12px 16px", fontWeight: 600, color: "var(--color-text)", width: "40%", borderBottom: "1px solid var(--color-border)", fontSize: "0.9rem" }}>
                      {key}
                    </td>
                    <td style={{ padding: "12px 16px", color: "var(--color-text-muted)", borderBottom: "1px solid var(--color-border)", fontSize: "0.9rem" }}>
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Descripción */}
      {hasSummary && (
        <div style={{ backgroundColor: "var(--color-surface)", borderRadius: "var(--border-radius)", boxShadow: "var(--shadow-sm)", padding: "28px 32px" }}>
          <h5 style={{ fontWeight: 700, marginBottom: "16px", borderLeft: "4px solid var(--color-accent)", paddingLeft: "12px" }}>
            Descripción
          </h5>
          <p style={{ color: "var(--color-text)", lineHeight: 1.8, fontSize: "0.97rem", margin: 0, maxWidth: "720px" }}>
            {product.summary}
          </p>
        </div>
      )}
    </Layout>
  );
}

export default ProductDetail;
