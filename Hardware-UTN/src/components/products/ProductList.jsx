import { Row, Col } from "react-bootstrap";
import ProductItem from "./ProductItem";

function ProductList({ products, onAdd, onRemove, cart = [] }) {
  const getQty = (id) => cart.find((p) => p.id === id)?.quantity ?? 0;

  if (products.length === 0) {
    return (
      <p className="text-muted text-center mt-5">No se encontraron productos.</p>
    );
  }

  return (
    <Row className="g-4">
      {products.map((product) => (
        <Col xs={12} sm={6} md={4} key={product.id}>
          <ProductItem
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            onAdd={() => onAdd(product)}
            onRemove={() => onRemove(product)}
            quantityInCart={getQty(product.id)}
          />
        </Col>
      ))}
    </Row>
  );
}

export default ProductList;
