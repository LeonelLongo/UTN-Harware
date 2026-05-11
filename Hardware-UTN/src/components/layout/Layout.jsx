import { Container } from "react-bootstrap";

function Layout({ children }) {
  return (
    <>
      {/* HEADER */}
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          padding: "15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <h3 style={{ margin: 0 }}>Hardware UTN</h3>

          <img src="/logo.png" alt="logo" style={{ width: "80px" }} />
        </div>
      </div>

      {/* CONTENIDO */}
      <Container
        style={{
          backgroundColor: "white",
          minHeight: "100vh",
          paddingTop: "20px",
        }}
      >
        {children}
      </Container>
    </>
  );
}

export default Layout;
