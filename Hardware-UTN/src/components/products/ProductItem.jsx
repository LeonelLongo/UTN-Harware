import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ProductItem({ id, name, price, image, onAdd, onRemove, quantityInCart = 0 }) {
  const navigate = useNavigate();

  return (
    <Card
      className="h-100 product-card"
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/producto/${id}`)}
    >
      {image && (
        <div
          style={{
            backgroundColor: "#f8f8f8",
            padding: "16px",
            textAlign: "center",
          }}
        >
          <img
            src={image}
            alt={name}
            className="product-img"
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

        {quantityInCart > 0 ? (
          <div
            className="mt-3 d-flex align-items-center justify-content-between"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="outline-secondary"
              style={{
                width: "36px",
                height: "36px",
                padding: 0,
                lineHeight: 1,
              }}
              onClick={() => onRemove()}
            >
              −
            </Button>
            <span className="fw-semibold">{quantityInCart} en carrito</span>
            <Button
              style={{
                width: "36px",
                height: "36px",
                padding: 0,
                lineHeight: 1,
                backgroundColor: "var(--color-accent)",
                border: "none",
              }}
              onClick={() => onAdd()}
            >
              +
            </Button>
          </div>
        ) : (
          <Button
            className="mt-3 w-100 fw-semibold"
            style={{ backgroundColor: "var(--color-accent)", border: "none" }}
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
            }}
          >
            Agregar al carrito
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProductItem;
