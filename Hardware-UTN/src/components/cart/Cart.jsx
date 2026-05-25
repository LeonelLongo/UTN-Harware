import { Link } from "react-router-dom";
import { Row, Col, Table, Button, Card, Badge } from "react-bootstrap";
import Layout from "../layout/Layout";

function Cart({ cart, setCart }) {
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

  const handleClear = () => setCart([]);

  const total = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);
  const cartCount = cart.reduce((acc, p) => acc + p.quantity, 0);

  return (
    <Layout cartCount={cartCount}>
      <h4 className="mb-4 fw-bold">Carrito de compras</h4>

      {cart.length === 0 ? (
        <Card className="text-center py-5 shadow-sm">
          <Card.Body>
            <div style={{ fontSize: "3rem" }}></div>
            <h5 className="mt-3">Tu carrito está vacío</h5>
          </Card.Body>
        </Card>
      ) : (
        <Row>
          {/* Tabla de productos */}
          <Col md={8} className="mb-4">
            <Card className="shadow-sm">
              <Card.Body className="p-0">
                <Table responsive hover className="mb-0">
                  <thead style={{ backgroundColor: "var(--color-header)", color: "white" }}>
                    <tr>
                      <th className="ps-3">Producto</th>
                      <th className="text-center">Cantidad</th>
                      <th className="text-end">Precio unit.</th>
                      <th className="text-end">Subtotal</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((p) => (
                      <tr key={p.id} className="align-middle">
                        <td className="ps-3 fw-semibold">{p.name}</td>
                        <td className="text-center">
                          <div className="d-flex align-items-center justify-content-center gap-2">
                            <Button
                              size="sm"
                              variant="outline-secondary"
                              onClick={() => handleDecrement(p.id)}
                              style={{ width: "28px", height: "28px", padding: 0, lineHeight: 1 }}
                            >
                              −
                            </Button>
                            <Badge bg="secondary" style={{ fontSize: "0.9rem", minWidth: "28px" }}>
                              {p.quantity}
                            </Badge>
                            <Button
                              size="sm"
                              variant="outline-secondary"
                              onClick={() => handleIncrement(p.id)}
                              style={{ width: "28px", height: "28px", padding: 0, lineHeight: 1 }}
                            >
                              +
                            </Button>
                          </div>
                        </td>
                        <td className="text-end">${p.price}</td>
                        <td className="text-end fw-bold">${p.price * p.quantity}</td>
                        <td className="text-center">
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => handleRemove(p.id)}
                            title="Eliminar"
                          >
                            ✕
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
              <Card.Footer className="text-end">
                <Button variant="outline-danger" size="sm" onClick={handleClear}>
                  Vaciar carrito
                </Button>
              </Card.Footer>
            </Card>
          </Col>

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
                <div className="d-flex justify-content-between fw-bold fs-5">
                  <span>Total</span>
                  <span style={{ color: "var(--color-accent)" }}>${total}</span>
                </div>
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
      )}

      <Link to="/" className="text-decoration-none small" style={{ color: "var(--color-accent)" }}>
        ← Seguir comprando
      </Link>
    </Layout>
  );
}

export default Cart;
