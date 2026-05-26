import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ProductItem({ id, name, price, image, onAdd, quantityInCart = 0 }) {
  const navigate = useNavigate();

  return (
    <Card
      className="h-100 shadow-sm border-0"
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/producto/${id}`)}
    >
      {image && (
        <div style={{ backgroundColor: "#f8f8f8", padding: "16px", textAlign: "center" }}>
          <img
            src={image}
            alt={name}
            style={{ height: "160px", objectFit: "contain", maxWidth: "100%" }}
          />
        </div>
      )}

      <Card.Header
        className="fw-bold"
        style={{ backgroundColor: "var(--color-header)", color: "white" }}
      >
        {name}
      </Card.Header>

      <Card.Body className="d-flex flex-column justify-content-between">
        <span className="fw-bold fs-4" style={{ color: "var(--color-accent)" }}>
          ${price.toLocaleString("es-AR")}
        </span>

        <Button
          className="mt-3 w-100 fw-semibold"
          style={{ backgroundColor: "var(--color-accent)", border: "none" }}
          onClick={(e) => { e.stopPropagation(); onAdd(); }}
        >
          {quantityInCart > 0 ? `+ Agregar (${quantityInCart} en carrito)` : "Agregar al carrito"}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductItem;
