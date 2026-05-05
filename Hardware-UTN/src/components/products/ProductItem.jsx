import React from "react";
import { Card, Button } from "react-bootstrap";

function ProductItem({ name, price, onAdd }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        className="mt-5 mx-auto shadow"
        style={{
          maxWidth: "400px",
          backgroundColor: "#FFD2C9",
          color: "wite",
          borderRadius: "10px",
        }}
      >
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>${price}</Card.Text>
          <Button onClick={onAdd}>Agregar</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProductItem;
