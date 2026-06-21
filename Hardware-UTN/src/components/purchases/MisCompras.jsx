import { useState, useEffect } from "react";
import { Table, Badge, Card } from "react-bootstrap";
import Layout from "../layout/Layout";
import { useAppContext } from "../../context/AppContext";

function MisCompras() {
  const { currentUser } = useAppContext();
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser?.userId) return;
    fetch(`http://localhost:3000/purchases/user/${currentUser.userId}`)
      .then((res) => res.json())
      .then((data) => setPurchases(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [currentUser]);

  const getStatusBadge = (status) => (
    <Badge bg={status === "COMPLETE" ? "success" : "warning"} text={status === "COMPLETE" ? "white" : "dark"}>
      {status}
    </Badge>
  );

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
                  <th className="ps-3">Producto</th>
                  <th className="text-center">Cantidad</th>
                  <th className="text-end">Precio</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((p) => (
                  <tr key={p.purchaseId} className="align-middle">
                    <td className="ps-3 fw-semibold">{p.product}</td>
                    <td className="text-center">{p.quantity}</td>
                    <td className="text-end">${Number(p.price).toLocaleString("es-AR")}</td>
                    <td>{new Date(p.purchaseDate).toLocaleDateString("es-AR")}</td>
                    <td>{getStatusBadge(p.status)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
    </Layout>
  );
}

export default MisCompras;
