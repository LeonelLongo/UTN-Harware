<<<<<<< Updated upstream
import Layout from "../layout/Layout";

function Cart({ cart, setCart }) {
  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <Layout>
      <h2>Carrito</h2>
=======
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Table, Button, Card, Badge, Form, InputGroup } from "react-bootstrap";
import Layout from "../layout/Layout";

const CUPON_VALIDO = "TUP2026";
const CUOTAS = 6;

function Cart({ cart, setCart, isLoggedIn, setIsLoggedIn }) {
  const [couponInput, setCouponInput] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState(false);
  const navigate = useNavigate();

  const handleRemove = (id) => {
    setCart(cart.filter((p) => p.id !== id));
  };

  const handleIncrement = (id) => {
    setCart(cart.map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p)));
  };

  const handleDecrement = (id) => {
    const item = cart.find((p) => p.id === id);
    if (item.quantity === 1) {
      handleRemove(id);
    } else {
      setCart(cart.map((p) => (p.id === id ? { ...p, quantity: p.quantity - 1 } : p)));
    }
  };

  const handleClear = () => {
    setCart([]);
    setCouponApplied(false);
    setCouponInput("");
    setCouponError(false);
  };

  const handleApplyCoupon = () => {
    if (couponInput.trim().toUpperCase() === CUPON_VALIDO) {
      setCouponApplied(true);
      setCouponError(false);
    } else {
      setCouponApplied(false);
      setCouponError(true);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponApplied(false);
    setCouponInput("");
    setCouponError(false);
  };

  const total = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);
  const cartCount = cart.reduce((acc, p) => acc + p.quantity, 0);
  const cuotaValor = couponApplied ? (total / CUOTAS).toFixed(2) : null;

  return (
    <Layout
      cartCount={cartCount}
      isLoggedIn={isLoggedIn}
      onLogout={() => { setIsLoggedIn(false); navigate("/"); }}
    >
      <h4 className="mb-4 fw-bold">Carrito de compras</h4>
>>>>>>> Stashed changes

      {cart.length === 0 ? (
        <p>No hay productos</p>
      ) : (
        <>
          {cart.map((p) => (
            <div key={p.id}>
              {p.name} x{p.quantity} - ${p.price * p.quantity}
            </div>
          ))}

<<<<<<< Updated upstream
          <h4>
            Total: $
            {cart.reduce(
              (acc, p) => acc + p.price * p.quantity,
              0
            )}
          </h4>

          <button onClick={handleClearCart}>
            Vaciar carrito
          </button>
        </>
=======
          {/* Resumen del pedido */}
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Header style={{ backgroundColor: "var(--color-header)", color: "white" }}>
                <strong>Resumen del pedido</strong>
              </Card.Header>
              <Card.Body>
                {cart.map((p) => (
                  <div key={p.id} className="d-flex justify-content-between mb-2 small">
                    <span className="text-muted">
                      {p.name} x{p.quantity}
                    </span>
                    <span>${p.price * p.quantity}</span>
                  </div>
                ))}
                <hr />
                <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
                  <span>Total</span>
                  <span style={{ color: "var(--color-accent)" }}>${total}</span>
                </div>

                {/* Cupón */}
                {!couponApplied ? (
                  <>
                    <InputGroup className="mb-1">
                      <Form.Control
                        placeholder="Código de cupón"
                        value={couponInput}
                        onChange={(e) => { setCouponInput(e.target.value); setCouponError(false); }}
                        isInvalid={couponError}
                        size="sm"
                      />
                      <Button
                        size="sm"
                        style={{ backgroundColor: "var(--color-accent)", border: "none" }}
                        onClick={handleApplyCoupon}
                      >
                        Aplicar
                      </Button>
                    </InputGroup>
                    {couponError && (
                      <p className="text-danger small mb-2">Cupón inválido.</p>
                    )}
                  </>
                ) : (
                  <div
                    className="rounded p-3 mb-2"
                    style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0" }}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="fw-semibold small text-success">
                        ✓ Cupón {CUPON_VALIDO} aplicado
                      </span>
                      <button
                        onClick={handleRemoveCoupon}
                        style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer", fontSize: "0.8rem" }}
                      >
                        Quitar
                      </button>
                    </div>
                    <p className="small text-muted mb-1">
                      {CUOTAS} cuotas sin interés de:
                    </p>
                    <p className="fw-bold fs-5 mb-0" style={{ color: "var(--color-accent)" }}>
                      ${cuotaValor} / cuota
                    </p>
                  </div>
                )}
              </Card.Body>
              <Card.Footer className="d-grid">
                <Button
                  size="lg"
                  style={{ backgroundColor: "var(--color-accent)", border: "none" }}
                >
                  Finalizar compra
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
>>>>>>> Stashed changes
      )}
    </Layout>
  );
}

export default Cart;