import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ProductItem({ id, name, price, image, onAdd, onRemove, quantityInCart = 0, isNew = false, discount = 0, stock }) {
  const navigate = useNavigate();
  const discountedPrice = discount > 0 ? Math.round(price * (1 - discount / 100) * 100) / 100 : null;
  const sinStock = stock === 0;

  return (
    <Card
      className="h-100 product-card"
      style={{ cursor: "pointer", position: "relative", opacity: sinStock ? 0.6 : 1 }}
      onClick={() => navigate(`/producto/${id}`)}
    >
      {sinStock && (
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(255,255,255,0.55)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 3,
          borderRadius: "inherit",
          pointerEvents: "none",
        }}>
          <span style={{
            backgroundColor: "rgba(0,0,0,0.72)",
            color: "white",
            fontWeight: 700,
            fontSize: "0.95rem",
            padding: "6px 18px",
            borderRadius: "4px",
            letterSpacing: "0.1em",
          }}>
            SIN STOCK
          </span>
        </div>
      )}

      {isNew && (
        <div style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          backgroundColor: "var(--color-accent)",
          color: "white",
          padding: "3px 9px",
          borderRadius: "4px",
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.06em",
          zIndex: 1,
          boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
        }}>
          NEW
        </div>
      )}

      {discount > 0 && (
        <div style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          backgroundColor: "#e53935",
          color: "white",
          padding: "3px 9px",
          borderRadius: "4px",
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.06em",
          zIndex: 1,
          boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
        }}>
          -{discount}%
        </div>
      )}

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
        {discountedPrice != null ? (
          <div>
            <span style={{ textDecoration: "line-through", color: "#aaa", fontSize: "0.9rem" }}>
              ${price.toLocaleString("es-AR")}
            </span>
            <span className="fw-bold fs-4 d-block" style={{ color: "var(--color-accent)" }}>
              ${discountedPrice.toLocaleString("es-AR")}
            </span>
          </div>
        ) : (
          <span className="fw-bold fs-4" style={{ color: "var(--color-accent)" }}>
            ${price.toLocaleString("es-AR")}
          </span>
        )}

        {sinStock ? (
          <Button className="mt-3 w-100 fw-semibold" disabled style={{ border: "none" }}>
            Sin stock
          </Button>
        ) : quantityInCart > 0 ? (
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
