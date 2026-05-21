import { useState } from "react";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }  ) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

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
    <Card className="mt-5 mx-3 p-3 px-5 shadow">
      <Card.Body>
        <Row className="mb-2">
          <h5>¡Bienvenido a Hardware UTN!</h5>
        </Row>

        <Form onSubmit={handleSubmit}>
          <FormGroup className="mb-4">
            <Form.Control
              type="email"
              placeholder="Ingresar email"
              onChange={handleEmailChange}
              value={email}
              className={errors.email ? "border border-danger" : ""}
              style={{
                backgroundColor: "#E39E8F",
                color: "white",
                border: "1px solid #444",
              }}
            />
            {errors.email && (
              <p style={{ color: "red" }}>Ingresá un email válido</p>
            )}
          </FormGroup>

          <FormGroup className="mb-4">
            <Form.Control
              type="password"
              placeholder="Ingresar contraseña"
              onChange={handlePasswordChange}
              value={password}
              className={errors.password ? "border border-danger" : ""}
              style={{
                backgroundColor: "#E39E8F",
                color: "white",
                border: "1px solid #444",
              }}
            />
            {errors.password && (
              <p style={{ color: "red" }}>
                La contraseña debe tener al menos 6 caracteres
              </p>
            )}
          </FormGroup>

          <Row>
            <Col />
            <Col md={6} className="d-flex justify-content-end">
              <Button variant="success" type="submit" style={{ width: "100%" }}>
                Iniciar sesión
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Login;
