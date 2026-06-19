import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#1c1c1c",
        color: "white",
        padding: "40px 0 20px 0",
        borderTop: "3px solid var(--color-accent)",
      }}
    >
      <Container>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: "0 0 auto" }}>
            <img src="/logo.png" alt="logo" style={{ width: "80px" }} />
          </div>

          <div
            style={{
              width: "1px",
              backgroundColor: "white",
              alignSelf: "stretch",
              opacity: 0.4,
            }}
          />

          <div style={{ textAlign: "center", flex: "1 1 0" }}>
            <p
              style={{
                fontWeight: 600,
                fontSize: "1.05rem",
                marginBottom: "14px",
                letterSpacing: "0.5px",
              }}
            >
              Seguinos en:
            </p>
            <div
              style={{ display: "flex", gap: "14px", justifyContent: "center" }}
            >
              <a
                href="https://www.instagram.com/hardwareutn"
                target="_blank"
                rel="noopener noreferrer"
                style={iconStyle}
                aria-label="Instagram"
              >
                <FaInstagram size={22} />
              </a>
              <a
                href="https://x.com/hardwareutn?s=11"
                target="_blank"
                rel="noopener noreferrer"
                style={iconStyle}
                aria-label="X"
              >
                <FaXTwitter size={22} />
              </a>
            </div>
          </div>

          <div
            style={{
              width: "1px",
              backgroundColor: "white",
              alignSelf: "stretch",
              opacity: 0.4,
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              flex: "1 1 0",
              alignItems: "center",
            }}
          >
            <Link
              to="/terminos"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "1.05rem",
                fontWeight: 500,
              }}
            >
              Términos y condiciones
            </Link>
            <Link
              to="/quienes-somos"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "1.05rem",
                fontWeight: 500,
              }}
            >
              Quiénes somos
            </Link>
          </div>

          <div
            style={{
              width: "1px",
              backgroundColor: "white",
              alignSelf: "stretch",
              opacity: 0.4,
            }}
          />

          <div style={{ flex: "0 0 auto" }}>
            <img src="/logo.png" alt="logo" style={{ width: "80px" }} />
          </div>
        </div>
      </Container>
      <div
        style={{
          textAlign: "center",
          marginTop: "32px",
          paddingTop: "20px",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          fontSize: "0.8rem",
          color: "rgba(255,255,255,0.4)",
        }}
      >
        © {new Date().getFullYear()} Hardware UTN. Todos los derechos
        reservados.
      </div>
    </footer>
  );
}

const iconStyle = {
  color: "white",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "42px",
  height: "42px",
  borderRadius: "50%",
  border: "1px solid rgba(255,255,255,0.3)",
  transition: "background 0.2s",
};

export default Footer;
