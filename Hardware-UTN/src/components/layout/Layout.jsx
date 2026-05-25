import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Layout({ children, cartCount = 0 }) {
  return (
    <>
      <div style={{ backgroundColor: "var(--color-header)", color: "white" }}>
        <Container
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
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
            }}
          >
            <img src="/logo.png" alt="logo" style={{ width: "40px" }} />
            <span style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--color-accent)" }}>
              Hardware UTN
            </span>
          </Link>

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
        </Container>
      </div>

      <div style={{ backgroundColor: "var(--color-background)", minHeight: "calc(100vh - 64px)", padding: "24px 0" }}>
        <Container>{children}</Container>
      </div>
    </>
  );
}

export default Layout;