import { useState, useEffect } from "react";
import { Table, Badge, Card } from "react-bootstrap";
import Layout from "../layout/Layout";
import { useAppContext } from "../../context/AppContext";
import { BASE_URL, getAuthHeaders } from "../../services/apiConfig";

function MisCompras() {
  const { currentUser } = useAppContext();
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

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
              <thead
                style={{
                  backgroundColor: "var(--color-header)",
                  color: "white",
                }}
              >
                <tr>
                  <th className="ps-3">#</th>
                  <th>Productos</th>
                  <th className="text-end">Total</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((p) => {
                  let items = [];
                  try {
                    items = JSON.parse(p.items);
                  } catch {
                    /* raw string fallback */
                  }
                  return (
                    <tr key={p.purchaseId} className="align-middle">
                      <td className="ps-3">
                        <Badge bg="secondary">{p.purchaseId}</Badge>
                      </td>
                      <td>
                        {items.length > 0 ? (
                          <ul className="mb-0 ps-3 small">
                            {items.map((item, i) => (
                              <li key={i}>
                                {item.title} x{item.quantity}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-muted small">{p.items}</span>
                        )}
                      </td>
                      <td
                        className="text-end fw-semibold"
                        style={{ color: "var(--color-accent)" }}
                      >
                        ${Number(p.price).toLocaleString("es-AR")}
                      </td>
                      <td>
                        {new Date(p.purchaseDate).toLocaleDateString("es-AR")}
                      </td>
                      <td>{getStatusBadge(p.status)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
    </Layout>
  );
}

export default MisCompras;
