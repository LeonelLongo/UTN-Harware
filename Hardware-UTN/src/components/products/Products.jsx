import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../layout/Layout";
import ProductList from "./ProductList";
import LoginPrompt from "../auth/LoginPrompt";
import { useAppContext } from "../../context/AppContext";
import { warningToast } from "../../services/notifications";

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
  const [selectedSubCategory, setSelectedSubCategory] = useState("Todas");
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    setSelectedSubCategory("Todas");
  }, [selectedCategory]);

  const availableSubCategories = selectedCategory !== "Todas"
    ? [...new Set(products.filter(p => p.category === selectedCategory && p.subCategory).map(p => p.subCategory))]
    : [];

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "Todas" || p.category === selectedCategory;
    const matchesSubCategory =
      selectedSubCategory === "Todas" || p.subCategory === selectedSubCategory;
    return matchesSearch && matchesCategory && matchesSubCategory;
  }).sort((a, b) => (a.stock === 0 ? 1 : 0) - (b.stock === 0 ? 1 : 0));

  const ofertaIds = new Set(products.filter((p) => p.isOffer).map((p) => p.id));

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      setShowPrompt(true);
      return;
    }
    const existing = cart.find((p) => p.id === product.id);
    if (existing) {
      if (product.stock != null && existing.quantity >= product.stock) {
        warningToast(`Stock máximo alcanzado para "${product.title}".`);
        return;
      }
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

          {availableSubCategories.length > 0 && (
            <>
              <p style={{ color: "#999", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", margin: "14px 0 8px 0" }}>
                Subcategorías
              </p>
              {["Todas", ...availableSubCategories].map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubCategory(sub)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "center",
                    padding: "6px 10px",
                    borderRadius: "var(--border-radius)",
                    border: selectedSubCategory === sub ? "none" : "1px solid #eee",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                    fontWeight: selectedSubCategory === sub ? 700 : 400,
                    backgroundColor: selectedSubCategory === sub ? "#555" : "#f8f8f8",
                    color: selectedSubCategory === sub ? "white" : "#555",
                    marginBottom: "5px",
                    transition: "background-color 0.15s, color 0.15s",
                  }}
                >
                  {sub}
                </button>
              ))}
            </>
          )}
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
