import { useState } from "react";
import { Table, Button, Modal, Form, Badge } from "react-bootstrap";
import Layout from "../layout/Layout";

const emptyForm = { name: "", price: "", image: "", summary: "" };

function Admin({ products, setProducts, isLoggedIn, onLogout, isAdmin }) {
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const openAdd = () => {
    setEditingProduct(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (product) => {
    setEditingProduct(product);
    setForm({ name: product.name, price: product.price, image: product.image, summary: product.summary || "" });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.price) return;

    if (editingProduct) {
      setProducts(products.map((p) =>
        p.id === editingProduct.id
          ? { ...p, name: form.name, price: Number(form.price), image: form.image, summary: form.summary }
          : p
      ));
    } else {
      const newId = Math.max(0, ...products.map((p) => p.id)) + 1;
      setProducts([...products, {
        id: newId,
        name: form.name,
        price: Number(form.price),
        image: form.image,
        summary: form.summary,
        specs: [],
      }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
    setShowDeleteConfirm(null);
  };

  return (
    <Layout
      isLoggedIn={isLoggedIn}
      isAdmin={isAdmin}
      onLogout={onLogout}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0">Panel de administración</h4>
        <Button
          style={{ backgroundColor: "var(--color-accent)", border: "none" }}
          onClick={openAdd}
        >
          + Agregar producto
        </Button>
      </div>

      <Table responsive hover className="shadow-sm">
        <thead style={{ backgroundColor: "var(--color-header)", color: "white" }}>
          <tr>
            <th style={{ width: "60px" }}>#</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Imagen</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="align-middle">
              <td>
                <Badge bg="secondary">{p.id}</Badge>
              </td>
              <td className="fw-semibold">{p.name}</td>
              <td style={{ color: "var(--color-accent)", fontWeight: 600 }}>
                ${p.price.toLocaleString("es-AR")}
              </td>
              <td>
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{ width: "50px", height: "50px", objectFit: "contain" }}
                  />
                ) : (
                  <span className="text-muted small">Sin imagen</span>
                )}
              </td>
              <td className="text-center">
                <div className="d-flex gap-2 justify-content-center">
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => openEdit(p)}
                  >
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => setShowDeleteConfirm(p.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </td>
            </tr>
          ))}

          {products.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center text-muted py-4">
                No hay productos. Agregá uno con el botón de arriba.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal agregar / editar */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">
            {editingProduct ? "Editar producto" : "Agregar producto"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: RTX 4090"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Precio ($)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ej: 500000"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">URL de imagen</Form.Label>
              <Form.Control
                type="text"
                placeholder="https://... o ruta local"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
              {form.image && (
                <div className="mt-2 text-center">
                  <img
                    src={form.image}
                    alt="preview"
                    style={{ maxHeight: "100px", objectFit: "contain" }}
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Descripción breve del producto..."
                value={form.summary}
                onChange={(e) => setForm({ ...form, summary: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button
            style={{ backgroundColor: "var(--color-accent)", border: "none" }}
            onClick={handleSave}
            disabled={!form.name.trim() || !form.price}
          >
            {editingProduct ? "Guardar cambios" : "Agregar"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal confirmar eliminación */}
      <Modal show={showDeleteConfirm !== null} onHide={() => setShowDeleteConfirm(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro que querés eliminar{" "}
          <strong>{products.find((p) => p.id === showDeleteConfirm)?.name}</strong>?
          Esta acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowDeleteConfirm(null)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => handleDelete(showDeleteConfirm)}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}

export default Admin;
