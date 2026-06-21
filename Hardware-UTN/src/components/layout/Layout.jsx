import { useState } from "react";
import { Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import Footer from "./Footer";
import LoginPrompt from "../auth/LoginPrompt";
import UserMenu from "./UserMenu";
import { useAppContext } from "../../context/AppContext";
import { FiUser, FiShoppingCart } from "react-icons/fi";


const CATEGORIES = [
  "Periféricos",
  "Componentes",
  "Almacenamiento",
  "Accesorios",
];

const NAV_LINKS = [
  { label: "Productos", to: "/productos" },
  { label: "Cómo Comprar", to: "/como-comprar" },
];

function Layout({ children, onSearchChange = null, initialSearch = "" }) {
  const { isLoggedIn, isAdmin, isSuperAdmin, setShowLogin, cart } = useAppContext();
  const cartCount = cart.reduce((acc, p) => acc + p.quantity, 0);
  const [inputValue, setInputValue] = useState(initialSearch);
  const [showCartPrompt, setShowCartPrompt] = useState(false);

  const handleSearch = () => {
    if (onSearchChange) onSearchChange(inputValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleCartClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setShowCartPrompt(true);
    }
  };

  return (
    <>
      {showCartPrompt && (
        <LoginPrompt
          onClose={() => setShowCartPrompt(false)}
          onLogin={() => {
            setShowCartPrompt(false);
            setShowLogin?.(true);
          }}
        />
      )}

      <div
        style={{
          backgroundColor: "var(--color-header)",
          color: "white",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <Container
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            gap: "16px",
          }}
        >
          <Link
            to="/"
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              color: "white",
              flexShrink: 0,
              transition: "transform 0.2s ease",
            }}
          >
            <img src="/logo.png" alt="logo" style={{ width: "40px" }} />
            <span
              style={{
                fontWeight: 700,
                fontSize: "1.1rem",
                color: "var(--color-accent)",
              }}
            >
              Hardware UTN
            </span>
          </Link>

          {(isAdmin || isSuperAdmin) && (
            <Link
              to="/admin"
              style={{
                textDecoration: "none",
                color: "white",
                padding: "8px 16px",
                borderRadius: "var(--border-radius)",
                fontWeight: 600,
                fontSize: "0.95rem",
                border: "1px solid var(--color-accent)",
                backgroundColor: "transparent",
                flexShrink: 0,
              }}
            >
              ADMIN
            </Link>
          )}

          {onSearchChange && (
            <div style={{ flex: 1, maxWidth: "480px", display: "flex" }}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Buscar productos..."
                style={{
                  flex: 1,
                  padding: "8px 14px",
                  borderRadius: "var(--border-radius) 0 0 var(--border-radius)",
                  border: "none",
                  fontSize: "0.95rem",
                  outline: "none",
                  backgroundColor: "#2e2e2e",
                  color: "white",
                }}
              />
              <button
                onClick={handleSearch}
                style={{
                  padding: "8px 12px",
                  backgroundColor: "var(--color-accent)",
                  border: "none",
                  borderRadius: "0 var(--border-radius) var(--border-radius) 0",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  color: "white",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            </div>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexShrink: 0,
            }}
          >
            {isLoggedIn ? (
              <UserMenu />
            ) : (
              <button
                onClick={() => setShowLogin?.(true)}
                style={{
                  background: "none",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "var(--border-radius)",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  border: "1px solid white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FiUser style={{ marginRight: "6px" }} />
                Ingresa
              </button>
            )}

            <Link
              to="/cart"
              onClick={handleCartClick}
              title="Carrito"
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                color: "white",
                width: "38px",
                height: "38px",
                flexShrink: 0,
              }}
            >
              <FiShoppingCart size={20} />
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-6px",
                    right: "-6px",
                    backgroundColor: "white",
                    color: "var(--color-accent)",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    border: "1px solid var(--color-accent)",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </Container>
      </div>

      {/* Nav secundaria — fondo blanco, fuera del bloque oscuro */}
      <div
        style={{
          background: "rgba(100, 100, 100, 0.12)",
          borderBottom: "5px solid rgba(0, 0, 0, 0.1)",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.06)",
          position: "sticky",
          top: "64px",
          zIndex: 999,
        }}
      >
        <Container>
          <nav
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "4px",
              padding: "8px 0",
            }}
          >
            {NAV_LINKS.map(({ label, to }) => (
              <NavLink
                key={label}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `subnav-link${isActive ? " active" : ""}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </Container>
      </div>

      <div
        style={{
          backgroundColor: "var(--color-background)",
          minHeight: "calc(100vh - 64px)",
          padding: "24px 0",
        }}
      >
        <Container>{children}</Container>
      </div>
      <Footer />
    </>
  );
}

export default Layout;
