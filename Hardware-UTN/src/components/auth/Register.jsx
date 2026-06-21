import { useState, useEffect } from "react";
import { Button, Card, Form, FormGroup } from "react-bootstrap";

const LS_KEY = "register_draft";

const Register = ({ onClose, onSwitchToLogin, initialEmail = "" }) => {
  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...parsed, mailAdress: initialEmail || parsed.mailAdress, password: "" };
    }
    return { firstName: "", lastName: "", userName: "", mailAdress: initialEmail, password: "" };
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { password, ...rest } = form;
    localStorage.setItem(LS_KEY, JSON.stringify(rest));
  }, [form]);

  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "El nombre es requerido.";
    if (!form.lastName.trim()) newErrors.lastName = "El apellido es requerido.";
    if (!form.userName.trim()) newErrors.userName = "El nombre de usuario es requerido.";
    if (!form.mailAdress.trim()) newErrors.mailAdress = "El email es requerido.";
    if (form.password.length < 7) newErrors.password = "La contraseña debe tener al menos 7 caracteres.";
    return newErrors;
  };

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    setErrors({ ...errors, [field]: "" });
    setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setApiError(data.message || "Error al registrar. Intentá de nuevo.");
        return;
      }

      localStorage.removeItem(LS_KEY);
      onSwitchToLogin?.();
    } catch {
      setApiError("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
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
              <h5 className="mt-2 fw-bold" style={{ color: "var(--color-accent)" }}>
                Hardware UTN
              </h5>
            </div>

            <h5 className="fw-bold mb-1">Crear cuenta</h5>
            <p className="text-muted small mb-4">Completá tus datos para registrarte</p>

            {apiError && (
              <div className="alert alert-danger py-2 small mb-3">{apiError}</div>
            )}

            <Form onSubmit={handleSubmit}>
              <div className="d-flex gap-2">
                <FormGroup className="mb-3 flex-fill">
                  <Form.Label className="fw-semibold small">Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Juan"
                    value={form.firstName}
                    onChange={handleChange("firstName")}
                    isInvalid={!!errors.firstName}
                  />
                  <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                </FormGroup>

                <FormGroup className="mb-3 flex-fill">
                  <Form.Label className="fw-semibold small">Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Pérez"
                    value={form.lastName}
                    onChange={handleChange("lastName")}
                    isInvalid={!!errors.lastName}
                  />
                  <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                </FormGroup>
              </div>

              <FormGroup className="mb-3">
                <Form.Label className="fw-semibold small">Nombre de usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="juanperez99"
                  value={form.userName}
                  onChange={handleChange("userName")}
                  isInvalid={!!errors.userName}
                />
                <Form.Control.Feedback type="invalid">{errors.userName}</Form.Control.Feedback>
              </FormGroup>

              <FormGroup className="mb-3">
                <Form.Label className="fw-semibold small">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="tu@email.com"
                  value={form.mailAdress}
                  onChange={handleChange("mailAdress")}
                  isInvalid={!!errors.mailAdress}
                />
                <Form.Control.Feedback type="invalid">{errors.mailAdress}</Form.Control.Feedback>
              </FormGroup>

              <FormGroup className="mb-4">
                <Form.Label className="fw-semibold small">Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Mínimo 7 caracteres"
                  value={form.password}
                  onChange={handleChange("password")}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              </FormGroup>

              <div className="d-grid gap-2">
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  style={{ backgroundColor: "var(--color-accent)", border: "none" }}
                >
                  {loading ? "Registrando..." : "Crear cuenta"}
                </Button>
                <Button
                  type="button"
                  size="lg"
                  variant="outline-secondary"
                  onClick={onSwitchToLogin}
                >
                  Ya tengo cuenta
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Register;
