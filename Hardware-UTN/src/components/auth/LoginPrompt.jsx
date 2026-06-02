import { Button } from "react-bootstrap";

function LoginPrompt({ onClose, onLogin }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1100,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "white",
          borderRadius: "var(--border-radius)",
          padding: "36px 32px",
          maxWidth: "400px",
          width: "90%",
          textAlign: "center",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>🔒</div>
        <h5 className="fw-bold mb-2">Iniciá sesión para continuar</h5>
        <p className="text-muted mb-4">
          Para proceder en el proceso de compra debés iniciar sesión.
        </p>
        <div className="d-grid gap-2">
          <Button
            size="lg"
            style={{ backgroundColor: "var(--color-accent)", border: "none" }}
            onClick={onLogin}
          >
            Iniciar sesión
          </Button>
          <Button size="lg" variant="outline-secondary" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LoginPrompt;
