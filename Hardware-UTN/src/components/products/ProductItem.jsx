import { Card, Button, Badge } from "react-bootstrap";

function ProductItem({ name, price, onAdd, quantityInCart = 0 }) {
  return (
    <Card className="h-100 shadow-sm border-0">
      <Card.Header
        className="fw-bold"
        style={{ backgroundColor: "var(--color-header)", color: "white" }}
      >
        {name}
      </Card.Header>

      <Card.Body className="d-flex flex-column justify-content-between">
        <span className="fw-bold fs-3" style={{ color: "var(--color-accent)" }}>
          ${price}
        </span>

        <Button
          className="mt-3 w-100 fw-semibold"
          style={{ backgroundColor: "var(--color-accent)", border: "none" }}
          onClick={onAdd}
        >
          {quantityInCart > 0 ? `+ Agregar (${quantityInCart} en carrito)` : "Agregar al carrito"}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductItem;
