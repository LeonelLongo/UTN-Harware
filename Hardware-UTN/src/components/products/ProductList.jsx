import React from "react";
import { Row, Col } from "react-bootstrap";
import ProductItem from "./ProductItem";

function ProductList({ products, onAdd }) {
  return (
<Row>
      {products.map((product) => (
        <Col md={4} key={product.id}>
          <ProductItem
            name={product.name}
            price={product.price}
            onAdd={() => onAdd(product)}
          />
        </Col>
      ))}
    </Row>
  );
}

export default ProductList;
