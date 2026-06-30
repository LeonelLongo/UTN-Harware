import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Badge } from "react-bootstrap";
import { BASE_URL, getAuthHeaders } from "../../../services/apiConfig";
import { errorToast, successToast } from "../../../services/notifications";

function ComprasAdmin() {
  const [purchases, setPurchases] = useState([]);
  const [showStatusModal, setShowStatusModal] = useState(null);
  const [newStatus, setNewStatus] = useState("PENDING");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [filterUser, setFilterUser] = useState("");

  useEffect(() => {
    fetch(`${BASE_URL}/purchases`, { headers: getAuthHeaders() })
      .then((res) => res.json())
      .then((data) => setPurchases(data))
      .catch((err) => console.log(err));
  }, []);

  const filteredPurchases = purchases.filter((p) => {
    const userName = p.User
      ? `${p.User.firstName} ${p.User.lastName}`.toLowerCase()
      : String(p.userId);
    return userName.includes(filterUser.toLowerCase());
  });

  const openStatusModal = (purchase) => {
    setNewStatus(purchase.status);
    setShowStatusModal(purchase.purchaseId);
  };

  const handleUpdateStatus = async (purchaseId) => {
    try {
      const res = await fetch(`${BASE_URL}/purchases/${purchaseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "No se pudo actualizar el estado.");
      }
      const updated = await res.json();
      setPurchases(
        purchases.map((p) => (p.purchaseId === purchaseId ? updated : p)),
      );
      successToast("Estado actualizado correctamente.");
    } catch (err) {
      errorToast(err.message);
    } finally {
      setShowStatusModal(null);
    }
  };

  const handleDelete = async (purchaseId) => {
    try {
      const res = await fetch(`${BASE_URL}/purchases/${purchaseId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("No se pudo eliminar la compra.");
      setPurchases(purchases.filter((p) => p.purchaseId !== purchaseId));
      successToast("Compra eliminada correctamente.");
    } catch (err) {
      errorToast(err.message);
    } finally {
      setShowDeleteConfirm(null);
    }
  };

  const getStatusBadge = (status) => {
    if (status === "COMPLETE") return <Badge bg="success">COMPLETE</Badge>;
    if (status === "CANCELED") return <Badge bg="danger">CANCELED</Badge>;
    return (
      <Badge bg="warning" text="dark">
        PENDING
      </Badge>
    );
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 gap-3">
        <h4 className="fw-bold mb-0">Compras</h4>
        <Form.Control
          type="text"
          placeholder="Filtrar por usuario..."
          value={filterUser}
          onChange={(e) => setFilterUser(e.target.value)}
          style={{ maxWidth: "300px" }}
        />
      </div>

      <Table responsive hover className="shadow-sm">
        <thead
          style={{ backgroundColor: "var(--color-header)", color: "white" }}
        >
          <tr>
            <th style={{ width: "60px" }}>#</th>
            <th>Usuario</th>
            <th>Productos</th>
            <th className="text-center">Items</th>
            <th>Total</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredPurchases.map((p) => (
            <tr key={p.purchaseId} className="align-middle">
              <td>
                <Badge bg="secondary">{p.purchaseId}</Badge>
              </td>
              <td>
                {p.User ? (
                  <span className="fw-semibold">
                    {p.User.firstName} {p.User.lastName}
                  </span>
                ) : (
                  <span className="text-muted">ID {p.userId}</span>
                )}
              </td>
              <td>
                {(() => {
                  try {
                    const items = JSON.parse(p.items);
                    return (
                      <ul className="mb-0 ps-3 small">
                        {items.map((item, i) => (
                          <li key={i}>
                            {item.title} x{item.quantity}
                          </li>
                        ))}
                      </ul>
                    );
                  } catch {
                    return <span className="text-muted small">{p.items}</span>;
                  }
                })()}
              </td>
              <td className="text-center">{p.quantity}</td>
              <td style={{ color: "var(--color-accent)", fontWeight: 600 }}>
                ${Number(p.price).toLocaleString("es-AR")}
              </td>
              <td>{new Date(p.purchaseDate).toLocaleDateString("es-AR")}</td>
              <td>{getStatusBadge(p.status)}</td>
              <td className="text-center">
                <div className="d-flex gap-2 justify-content-center">
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => openStatusModal(p)}
                  >
                    Estado
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => setShowDeleteConfirm(p.purchaseId)}
                  >
                    Eliminar
                  </Button>
                </div>
              </td>
            </tr>
          ))}
          {filteredPurchases.length === 0 && (
            <tr>
              <td colSpan={8} className="text-center text-muted py-4">
                No hay compras registradas.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal cambiar estado */}
      <Modal
        show={showStatusModal !== null}
        onHide={() => setShowStatusModal(null)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">
            Cambiar estado de la compra
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <option value="PENDING">PENDING</option>
            <option value="COMPLETE">COMPLETE</option>
            <option value="CANCELED">CANCELED</option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => setShowStatusModal(null)}
          >
            Cancelar
          </Button>
          <Button
            style={{ backgroundColor: "var(--color-accent)", border: "none" }}
            onClick={() => handleUpdateStatus(showStatusModal)}
          >
            Guardar
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
          ¿Estás seguro que querés eliminar la compra{" "}
          <strong>#{showDeleteConfirm}</strong>? Esta acción no se puede
          deshacer.
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

export default ComprasAdmin;
