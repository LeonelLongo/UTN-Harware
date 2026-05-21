import Layout from "../layout/Layout";

function Cart({ cart, setCart }) {
  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <Layout>
      <h2>Carrito</h2>

      {cart.length === 0 ? (
        <p>No hay productos</p>
      ) : (
        <>
          {cart.map((p) => (
            <div key={p.id}>
              {p.name} x{p.quantity} - ${p.price * p.quantity}
            </div>
          ))}

          <h4>
            Total: $
            {cart.reduce(
              (acc, p) => acc + p.price * p.quantity,
              0
            )}
          </h4>

          <button onClick={handleClearCart}>
            Vaciar carrito
          </button>
        </>
      )}
    </Layout>
  );
}

export default Cart;