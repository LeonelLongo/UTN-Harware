import { useState } from "react";
import { Button, Card, Form, FormGroup } from "react-bootstrap";

const Login = ({ setIsLoggedIn, setIsAdmin, setIsSuperAdmin, onClose, onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: false, password: false });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState({ type: null, message: "" });

  const clearLoginError = () => setLoginError({ type: null, message: "" });

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors({ ...errors, email: false });
    clearLoginError();
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors({ ...errors, password: false });
    clearLoginError();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {
      email: email.trim() === "",
      password: password.length < 7,
    };
    setErrors(newErrors);
    if (newErrors.email || newErrors.password) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mailAdress: email, password }),
      });

      if (res.status === 404) {
        setLoginError({ type: "notFound", message: "Este email no está registrado." });
        return;
      }
      if (res.status === 401) {
        setLoginError({ type: "wrongPassword", message: "Contraseña incorrecta." });
        return;
      }
      if (!res.ok) {
        setLoginError({ type: "error", message: "Error al iniciar sesión. Intentá de nuevo." });
        return;
      }

      const userData = await res.json();
      setIsLoggedIn(true);
      if (userData.admin) setIsAdmin(true);
      if (userData.superAdmin) setIsSuperAdmin(true);
      onClose();
    } catch {
      setLoginError({ type: "error", message: "No se pudo conectar con el servidor." });
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

            {loginError.type === "notFound" && (
              <div className="alert alert-warning py-2 small mb-3 d-flex align-items-center justify-content-between gap-2">
                <span>{loginError.message}</span>
                <button
                  type="button"
                  onClick={() => onSwitchToRegister?.(email)}
                  style={{ background: "none", border: "none", padding: 0, fontWeight: 600, color: "var(--color-accent)", cursor: "pointer", whiteSpace: "nowrap" }}
                >
                  Registrarme →
                </button>
              </div>
            )}
            {loginError.type === "wrongPassword" && (
              <div className="alert alert-danger py-2 small mb-3">
                {loginError.message}
              </div>
            )}
            {loginError.type === "error" && (
              <div className="alert alert-danger py-2 small mb-3">
                {loginError.message}
              </div>
            )}

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
                <div style={{ position: "relative" }}>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Mínimo 7 caracteres"
                    value={password}
                    onChange={handlePasswordChange}
                    isInvalid={errors.password}
                    style={{ paddingRight: "42px" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#6b7280",
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <div style={{ color: "#dc3545", fontSize: "0.875em", marginTop: "4px" }}>
                    La contraseña debe tener al menos 7 caracteres.
                  </div>
                )}
              </FormGroup>

              <div className="d-grid gap-2">
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  style={{
                    backgroundColor: "var(--color-accent)",
                    border: "none",
                  }}
                >
                  {loading ? "Verificando..." : "Ingresar"}
                </Button>
                <Button
                  type="button"
                  size="lg"
                  variant="outline-secondary"
                  onClick={() => onSwitchToRegister?.()}
                >
                  Registrarme
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
