import { useState } from "react";
import { Button, Card, Form, FormGroup } from "react-bootstrap";

const Login = ({ setIsLoggedIn, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: false, password: false });

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors({ ...errors, email: false });
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors({ ...errors, password: false });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {
      email: email.trim() === "",
      password: password.length < 7,
    };
    setErrors(newErrors);
    if (!newErrors.email && !newErrors.password) {
      setIsLoggedIn(true);
      onClose();
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.65)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        animation: "fadeIn 0.2s ease",
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "0 16px",
          animation: "slideDown 0.25s ease",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="shadow-lg border-0">
          <Card.Body className="p-4">
            <div className="text-center mb-4">
              <img src="/logo.png" alt="logo" style={{ width: "120px" }} />
              <h5
                className="mt-2 fw-bold"
                style={{ color: "var(--color-accent)" }}
              >
                Hardware UTN
              </h5>
            </div>

            <h5 className="fw-bold mb-1">Iniciar sesión</h5>
            <p className="text-muted small mb-4">
              Ingresá tus credenciales para continuar
            </p>

            <Form onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <Form.Label className="fw-semibold small">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={handleEmailChange}
                  isInvalid={errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  Ingresá un email válido.
                </Form.Control.Feedback>
              </FormGroup>

              <FormGroup className="mb-4">
                <Form.Label className="fw-semibold small">
                  Contraseña
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Mínimo 7 caracteres"
                  value={password}
                  onChange={handlePasswordChange}
                  isInvalid={errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  La contraseña debe tener al menos 7 caracteres.
                </Form.Control.Feedback>
              </FormGroup>

              <div className="d-grid gap-2">
                <Button
                  type="submit"
                  size="lg"
                  style={{
                    backgroundColor: "var(--color-accent)",
                    border: "none",
                  }}
                >
                  Ingresar
                </Button>
                <Button
                  type="button"
                  size="lg"
                  variant="outline-secondary"
                  onClick={onClose}
                >
                  Cancelar
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Login;
