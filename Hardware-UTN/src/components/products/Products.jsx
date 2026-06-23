import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../layout/Layout";
import ProductList from "./ProductList";
import LoginPrompt from "../auth/LoginPrompt";
import { useAppContext } from "../../context/AppContext";

const CATEGORIES = [
  "Periféricos",
  "Componentes",
  "Accesorios",
];

function Products() {
  const { cart, setCart, isLoggedIn, setShowLogin, products } = useAppContext();
  const [searchParams] = useSearchParams();
  const initialQ = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQ);
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [showPrompt, setShowPrompt] = useState(false);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "Todas" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => (a.stock === 0 ? 1 : 0) - (b.stock === 0 ? 1 : 0));

  const ofertaIds = new Set(products.filter((p) => p.isOffer).map((p) => p.id));

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      setShowPrompt(true);
      return;
    }
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

  const handleRemoveFromCart = (product) => {
    const existing = cart.find((p) => p.id === product.id);
    if (!existing) return;
    if (existing.quantity === 1) {
      setCart(cart.filter((p) => p.id !== product.id));
    } else {
      setCart(
        cart.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p,
        ),
      );
    }
  };

  return (
    <Layout onSearchChange={setSearchQuery} initialSearch={initialQ}>
      {showPrompt && (
        <LoginPrompt
          onClose={() => setShowPrompt(false)}
          onLogin={() => {
            setShowPrompt(false);
            setShowLogin(true);
          }}
        />
      )}

      <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
        {/* Sidebar de categorías */}
        <div style={{ width: "160px", flexShrink: 0 }}>
          <p
            style={{
              color: "#999",
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              margin: "0 0 10px 0",
            }}
          >
            Categorías
          </p>
          {["Todas", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "center",
                padding: "8px 10px",
                borderRadius: "var(--border-radius)",
                border: selectedCategory === cat ? "none" : "1px solid #ddd",
                cursor: "pointer",
                fontSize: "0.85rem",
                fontWeight: selectedCategory === cat ? 700 : 400,
                backgroundColor:
                  selectedCategory === cat ? "var(--color-accent)" : "white",
                color: selectedCategory === cat ? "white" : "#444",
                marginBottom: "6px",
                transition: "background-color 0.15s, color 0.15s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grilla de productos */}
        <div style={{ flex: 1 }}>
          <ProductList
            products={filteredProducts}
            onAdd={handleAddToCart}
            onRemove={handleRemoveFromCart}
            cart={cart}
            ofertaIds={ofertaIds}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Products;
