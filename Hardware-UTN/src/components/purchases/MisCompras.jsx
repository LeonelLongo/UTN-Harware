import { useState, useEffect } from "react";
import { Table, Badge, Card, Button, Modal } from "react-bootstrap";
import Layout from "../layout/Layout";
import { useAppContext } from "../../context/AppContext";
import { BASE_URL, getAuthHeaders } from "../../services/apiConfig";

function MisCompras() {
  const { currentUser } = useAppContext();
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmId, setConfirmId] = useState(null);
  const [canceling, setCanceling] = useState(false);

  useEffect(() => {
    if (!currentUser?.userId) return;
    fetch(`${BASE_URL}/purchases/user/${currentUser.userId}`, {
      headers: getAuthHeaders(),
    })
      .then((res) => res.json())
      .then((data) => setPurchases(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [currentUser]);

  const handleCancel = async () => {
    setCanceling(true);
    try {
      const res = await fetch(`${BASE_URL}/purchases/${confirmId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ status: "CANCELED" }),
      });
      if (!res.ok) throw new Error();
      setPurchases((prev) =>
        prev.map((p) =>
          p.purchaseId === confirmId ? { ...p, status: "CANCELED" } : p
        )
      );
      setConfirmId(null);
    } catch {
      alert("No se pudo cancelar la compra.");
    } finally {
      setCanceling(false);
    }
  };

  const getStatusBadge = (status) => {
    if (status === "COMPLETE") return <Badge bg="success">Completada</Badge>;
    if (status === "CANCELED") return <Badge bg="danger">Cancelada</Badge>;
    return <Badge bg="warning" text="dark">Pendiente</Badge>;
  };

  return (
    <Layout>
      <h4 className="fw-bold mb-4">Mis compras</h4>

      {loading ? (
        <p className="text-muted text-center py-5">Cargando...</p>
      ) : purchases.length === 0 ? (
        <Card className="text-center py-5 shadow-sm">
          <Card.Body>
            <h5 className="mt-2">Todavía no tenés compras.</h5>
          </Card.Body>
        </Card>
      ) : (
        <Card className="shadow-sm">
          <Card.Body className="p-0">
            <Table responsive hover className="mb-0">
              <thead style={{ backgroundColor: "var(--color-header)", color: "white" }}>
                <tr>
                  <th className="ps-3">#</th>
                  <th>Productos</th>
                  <th className="text-end">Total</th>
                  <th>Fecha</th>
                  <th className="text-center">Estado</th>
                  <th className="text-center">Acción</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((p) => {
                  let items = [];
                  try { items = JSON.parse(p.items); } catch { /* raw string fallback */ }
                  return (
                    <tr key={p.purchaseId} className="align-middle">
                      <td className="ps-3">
                        <Badge bg="secondary">{p.purchaseId}</Badge>
                      </td>
                      <td>
                        {items.length > 0 ? (
                          <ul className="mb-0 ps-3 small">
                            {items.map((item, i) => (
                              <li key={i}>{item.title} x{item.quantity}</li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-muted small">{p.items}</span>
                        )}
                      </td>
                      <td className="text-end fw-semibold" style={{ color: "var(--color-accent)" }}>
                        ${Number(p.price).toLocaleString("es-AR")}
                      </td>
                      <td>{new Date(p.purchaseDate).toLocaleDateString("es-AR")}</td>
                      <td className="text-center">{getStatusBadge(p.status)}</td>
                      <td className="text-center">
                        {p.status === "PENDING" && (
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => setConfirmId(p.purchaseId)}
                          >
                            Cancelar
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}

      <Modal show={confirmId !== null} onHide={() => setConfirmId(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Cancelar compra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro que querés cancelar la compra{" "}
          <strong>#{confirmId}</strong>? Esta acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setConfirmId(null)}>
            Volver
          </Button>
          <Button variant="danger" onClick={handleCancel} disabled={canceling}>
            {canceling ? "Cancelando..." : "Sí, cancelar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}

export default MisCompras;
