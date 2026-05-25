import { useState } from "react";
import { Button, Card, Form, FormGroup, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: false, password: false });
  const navigate = useNavigate();

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
      navigate("/");
    }
  };

  return (
    <div
      style={{ backgroundColor: "var(--color-header)", minHeight: "100vh" }}
      className="d-flex align-items-center justify-content-center"
    >
      <Container style={{ maxWidth: "420px" }}>
        <div className="text-center mb-4">
          <img src="/logo.png" alt="logo" style={{ width: "200px" }} />
          <h4
            className="mt-2 fw-bold"
            style={{ color: "var(--color-accent)", letterSpacing: "0.5px" }}
          >
            Hardware UTN
          </h4>
        </div>

        <Card className="shadow-lg border-0">
          <Card.Body className="p-4">
            <h5 className="fw-bold mb-1">Iniciar sesión</h5>
            <p className="text-muted small mb-4">Ingresá tus credenciales para continuar</p>

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
                <Form.Label className="fw-semibold small">Contraseña</Form.Label>
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

              <div className="d-grid">
                <Button
                  type="submit"
                  size="lg"
                  style={{ backgroundColor: "var(--color-accent)", border: "none" }}
                >
                  Ingresar
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
