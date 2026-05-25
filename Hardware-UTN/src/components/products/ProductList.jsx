import { Row, Col } from "react-bootstrap";
import ProductItem from "./ProductItem";

function ProductList({ products, onAdd, cart = [] }) {
  const getQty = (id) => cart.find((p) => p.id === id)?.quantity ?? 0;

  return (
    <Row className="g-4">
      {products.map((product) => (
        <Col xs={12} sm={6} md={4} key={product.id}>
          <ProductItem
            name={product.name}
            price={product.price}
            onAdd={() => onAdd(product)}
            quantityInCart={getQty(product.id)}
          />
        </Col>
      ))}
    </Row>
  );
}

export default ProductList;
