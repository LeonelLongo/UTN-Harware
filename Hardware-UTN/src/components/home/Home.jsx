import Layout from "../layout/Layout";
import ProductList from "../products/ProductList";

function Home({cart, setCart}) {

  const products = [
    { id: 1, name: "RTX 3060", price: 300 },
    { id: 2, name: "Ryzen 5 5600", price: 200 },
    { id: 3, name: "16GB RAM", price: 80 },
  ];

  const handleAddToCart = (product) => {
    const existing = cart.find((p) => p.id === product.id);

    if (existing) {
      setCart(
        cart.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const cartCount = cart.reduce((acc, p) => acc + p.quantity, 0);

  return (
    <Layout cartCount={cartCount}>
      <ProductList products={products} onAdd={handleAddToCart} cart={cart} />
    </Layout>
  );
}

export default Home;
