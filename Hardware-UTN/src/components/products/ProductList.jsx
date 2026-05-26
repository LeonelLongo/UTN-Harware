import React from "react";
import { Row, Col } from "react-bootstrap";
import ProductItem from "./ProductItem";

<<<<<<< Updated upstream
function ProductList({ products, onAdd }) {
=======
function ProductList({ products, onAdd, cart = [] }) {
  const getQty = (id) => cart.find((p) => p.id === id)?.quantity ?? 0;

  if (products.length === 0) {
    return (
      <p className="text-muted text-center mt-5">No se encontraron productos.</p>
    );
  }

>>>>>>> Stashed changes
  return (
<Row>
      {products.map((product) => (
        <Col md={4} key={product.id}>
          <ProductItem
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            onAdd={() => onAdd(product)}
          />
        </Col>
      ))}
    </Row>
  );
}

export default ProductList;
