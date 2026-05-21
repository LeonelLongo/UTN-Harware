import { Card, Button } from "react-bootstrap";

function ProductItem({ name, price, onAdd }) {
  return (
    <Card
      style={{
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        textAlign: "center",
        padding: "10px",
      }}
    >
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>${price}</Card.Text>

        <Button variant="primary" onClick={onAdd}>
          Agregar
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductItem;