import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Badge } from "react-bootstrap";
import { useAppContext } from "../../../context/AppContext";
import { BASE_URL, getAuthHeaders } from "../../../services/apiConfig";
import { errorToast, successToast } from "../../../services/notifications";

const emptyForm = {
  firstName: "",
  lastName: "",
  userName: "",
  mailAdress: "",
  password: "",
  rol: "user",
};

function UsuariosAdmin() {
  const { isSuperAdmin } = useAppContext();
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${BASE_URL}/users`, { headers: getAuthHeaders() })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      u.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      u.lastName?.toLowerCase().includes(search.toLowerCase()) ||
      u.mailAdress?.toLowerCase().includes(search.toLowerCase()),
  );

  const openAdd = () => {
    setEditingUser(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (user) => {
    setEditingUser(user);
    setForm({
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      mailAdress: user.mailAdress,
      password: "",
      rol: user.rol || "user",
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !form.mailAdress.trim()
    )
      return;

    const body = {
      firstName: form.firstName,
      lastName: form.lastName,
      userName: form.userName,
      mailAdress: form.mailAdress,
      ...(form.password && { password: form.password }),
      ...(isSuperAdmin && { rol: form.rol }),
    };

    try {
      if (editingUser) {
        const res = await fetch(`${BASE_URL}/users/${editingUser.userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", ...getAuthHeaders() },
          body: JSON.stringify(body),
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "No se pudo editar el usuario.");
        }
        const updated = await res.json();
        setUsers(
          users.map((u) => (u.userId === editingUser.userId ? updated : u)),
        );
        successToast("Usuario editado correctamente.");
      } else {
        const res = await fetch(`${BASE_URL}/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...getAuthHeaders() },
          body: JSON.stringify({ ...body, password: form.password }),
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "No se pudo crear el usuario.");
        }
        const created = await res.json();
        setUsers([...users, created]);
        successToast("Usuario agregado correctamente.");
      }
      setShowModal(false);
    } catch (err) {
      errorToast(err.message);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const res = await fetch(`${BASE_URL}/users/${userId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("No se pudo eliminar el usuario.");
      setUsers(users.filter((u) => u.userId !== userId));
      successToast("Usuario eliminado correctamente.");
    } catch (err) {
      errorToast(err.message);
    } finally {
      setShowDeleteConfirm(null);
    }
  };

  const getRolBadge = (user) => {
    if (user.rol === "superAdmin")
      return <Badge bg="danger">Super Admin</Badge>;
    if (user.rol === "admin")
      return (
        <Badge bg="warning" text="dark">
          Admin
        </Badge>
      );
    return <Badge bg="secondary">Usuario</Badge>;
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 gap-3">
        <h4 className="fw-bold mb-0">Usuarios</h4>
        <Form.Control
          type="text"
          placeholder="Buscar por nombre o email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: "300px" }}
        />
        <Button
          style={{
            backgroundColor: "var(--color-accent)",
            border: "none",
            flexShrink: 0,
          }}
          onClick={openAdd}
        >
          + Agregar usuario
        </Button>
      </div>

      <Table responsive hover className="shadow-sm">
        <thead
          style={{ backgroundColor: "var(--color-header)", color: "white" }}
        >
          <tr>
            <th style={{ width: "60px" }}>#</th>
            <th>Nombre</th>
            <th>Usuario</th>
            <th>Email</th>
            <th>Rol</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((u) => (
            <tr key={u.userId} className="align-middle">
              <td>
                <Badge bg="secondary">{u.userId}</Badge>
              </td>
              <td className="fw-semibold">
                {u.firstName} {u.lastName}
              </td>
              <td>{u.userName}</td>
              <td>{u.mailAdress}</td>
              <td>{getRolBadge(u)}</td>
              <td className="text-center">
                <div className="d-flex gap-2 justify-content-center">
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => openEdit(u)}
                  >
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => setShowDeleteConfirm(u.userId)}
                  >
                    Eliminar
                  </Button>
                </div>
              </td>
            </tr>
          ))}
          {filteredUsers.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center text-muted py-4">
                No hay usuarios.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal agregar/editar */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">
            {editingUser ? "Editar usuario" : "Agregar usuario"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="row">
              <Form.Group className="mb-3 col-6">
                <Form.Label className="fw-semibold">Nombre</Form.Label>
                <Form.Control
                  value={form.firstName}
                  onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3 col-6">
                <Form.Label className="fw-semibold">Apellido</Form.Label>
                <Form.Control
                  value={form.lastName}
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                />
              </Form.Group>
            </div>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Nombre de usuario</Form.Label>
              <Form.Control
                value={form.userName}
                onChange={(e) => setForm({ ...form, userName: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Email</Form.Label>
              <Form.Control
                type="email"
                value={form.mailAdress}
                onChange={(e) =>
                  setForm({ ...form, mailAdress: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">
                {editingUser
                  ? "Nueva contraseña (dejar vacío para no cambiar)"
                  : "Contraseña"}
              </Form.Label>
              <Form.Control
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </Form.Group>
            {isSuperAdmin && (
              <Form.Group className="mt-3">
                <Form.Label className="fw-semibold">Rol</Form.Label>
                <Form.Select
                  value={form.rol}
                  onChange={(e) => setForm({ ...form, rol: e.target.value })}
                >
                  <option value="user">Usuario</option>
                  <option value="admin">Admin</option>
                  <option value="superAdmin">Super Admin</option>
                </Form.Select>
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => setShowModal(false)}
          >
            Cancelar
          </Button>
          <Button
            style={{ backgroundColor: "var(--color-accent)", border: "none" }}
            onClick={handleSave}
            disabled={
              !form.firstName.trim() ||
              !form.lastName.trim() ||
              !form.mailAdress.trim() ||
              (!editingUser && !form.password.trim())
            }
          >
            {editingUser ? "Guardar cambios" : "Agregar"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal confirmar eliminación */}
      <Modal
        show={showDeleteConfirm !== null}
        onHide={() => setShowDeleteConfirm(null)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro que querés eliminar a{" "}
          <strong>
            {users.find((u) => u.userId === showDeleteConfirm)?.firstName}{" "}
            {users.find((u) => u.userId === showDeleteConfirm)?.lastName}
          </strong>
          ? Esta acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => setShowDeleteConfirm(null)}
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDelete(showDeleteConfirm)}
          >
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UsuariosAdmin;
