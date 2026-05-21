import { Container } from "react-bootstrap";

function Layout({ children }) {
  return (
    <>
      {/* HEADER */}
      <div
        style={{
          backgroundColor: "#111",
          color: "white",
          padding: "15px 0",
          boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
        }}
      >
        <Container
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <h3 style={{ margin: 0, fontWeight: "bold" }}>
            Hardware UTN
          </h3>

          <img src="/logo.png" alt="logo" style={{ width: "60px" }} />
        </Container>
      </div>

      {/* CONTENIDO */}
      <div
        style={{
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
          padding: "30px 0",
        }}
      >
        <Container>{children}</Container>
      </div>
    </>
  );
}

export default Layout;