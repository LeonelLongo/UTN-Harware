import { Modal, Button } from "react-bootstrap";

function LoginPrompt({ onClose, onLogin }) {
  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">Iniciá sesión</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Necesitás iniciar sesión para continuar.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          style={{ backgroundColor: "var(--color-accent)", border: "none" }}
          onClick={onLogin}
        >
          Iniciar sesión
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LoginPrompt;
