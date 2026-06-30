import { useState } from "react";
import { Card, Form, Button, FormGroup } from "react-bootstrap";
import Layout from "../layout/Layout";
import { useAppContext } from "../../context/AppContext";
import { BASE_URL, getAuthHeaders } from "../../services/apiConfig";
import { successToast, errorToast } from "../../services/notifications";

function MiPerfil() {
  const { currentUser, setCurrentUser } = useAppContext();

  const [form, setForm] = useState({
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    userName: currentUser?.userName || "",
    mailAdress: currentUser?.mailAdress || "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.firstName.trim() || !form.lastName.trim() || !form.mailAdress.trim()) return;

    setLoading(true);
    try {
      const body = {
        firstName: form.firstName,
        lastName: form.lastName,
        userName: form.userName,
        mailAdress: form.mailAdress,
        ...(form.password && { password: form.password }),
      };

      const res = await fetch(`${BASE_URL}/users/${currentUser.userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "No se pudo actualizar el perfil.");
      }

      setCurrentUser({ ...currentUser, ...body, password: undefined });
      setForm((f) => ({ ...f, password: "" }));
      successToast("¡Perfil actualizado correctamente!");
    } catch (err) {
      errorToast(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div style={{ maxWidth: "480px", margin: "0 auto" }}>
        <h4 className="fw-bold mb-4">Mi perfil</h4>
        <Card className="shadow-sm border-0">
          <Card.Body className="p-4">
            <Form onSubmit={handleSubmit}>
              <div className="d-flex gap-2">
                <FormGroup className="mb-3 flex-fill">
                  <Form.Label className="fw-semibold small">Nombre</Form.Label>
                  <Form.Control
                    value={form.firstName}
                    onChange={handleChange("firstName")}
                    required
                  />
                </FormGroup>
                <FormGroup className="mb-3 flex-fill">
                  <Form.Label className="fw-semibold small">Apellido</Form.Label>
                  <Form.Control
                    value={form.lastName}
                    onChange={handleChange("lastName")}
                    required
                  />
                </FormGroup>
              </div>

              <FormGroup className="mb-3">
                <Form.Label className="fw-semibold small">Nombre de usuario</Form.Label>
                <Form.Control
                  value={form.userName}
                  onChange={handleChange("userName")}
                />
              </FormGroup>

              <FormGroup className="mb-3">
                <Form.Label className="fw-semibold small">Email</Form.Label>
                <Form.Control
                  type="email"
                  value={form.mailAdress}
                  onChange={handleChange("mailAdress")}
                  required
                />
              </FormGroup>

              <FormGroup className="mb-4">
                <Form.Label className="fw-semibold small">
                  Nueva contraseña{" "}
                  <span className="text-muted fw-normal">(dejar vacío para no cambiar)</span>
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange("password")}
                />
              </FormGroup>

              <Button
                type="submit"
                size="lg"
                className="w-100 fw-semibold"
                style={{ backgroundColor: "var(--color-accent)", border: "none" }}
                disabled={loading}
              >
                {loading ? "Guardando..." : "Guardar cambios"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Layout>
  );
}

export default MiPerfil;
