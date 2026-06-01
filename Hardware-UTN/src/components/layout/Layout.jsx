import { useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";

function Layout({
  children,
  cartCount = 0,
  onSearchChange = null,
  isLoggedIn = false,
  onLogout = null,
  setShowLogin,
}) {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    if (onSearchChange) onSearchChange(inputValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <>
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
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              color: "white",
              flexShrink: 0,
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

          {onSearchChange && (
            <div style={{ flex: 1, maxWidth: "400px", display: "flex" }}>
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
              <button
                onClick={() => {
                  onLogout?.();
                  navigate("/");
                }}
                style={{
                  background: "none",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "var(--border-radius)",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  border: "1px solid white",
                  cursor: "pointer",
                }}
              >
                Cerrar sesión
              </button>
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
                }}
              >
                Iniciar sesión
              </button>
            )}

            <Link
              to="/cart"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
                backgroundColor: "var(--color-accent)",
                color: "white",
                padding: "8px 16px",
                borderRadius: "var(--border-radius)",
                fontWeight: 600,
                fontSize: "0.95rem",
              }}
            >
              Carrito
              {cartCount > 0 && (
                <span
                  style={{
                    backgroundColor: "white",
                    color: "var(--color-accent)",
                    borderRadius: "50%",
                    width: "22px",
                    height: "22px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                  }}
                >
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
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
