import { useState } from "react";
import { Table, Button, Modal, Form, Badge } from "react-bootstrap";
import { useAppContext } from "../../../context/AppContext";
import { BASE_URL, getAuthHeaders } from "../../../services/apiConfig";
import { errorToast, successToast } from "../../../services/notifications";

const CATEGORIES = [
  "Periféricos",
  "Componentes",
  "Almacenamiento",
  "Accesorios",
];

const emptyForm = {
  title: "",
  value: "",
  imageUrl: "",
  summary: "",
  category: "",
  subCategory: "",
  isOffer: false,
};

function ProductosAdmin() {
  const { products, setProducts } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()),
  );

  const openAdd = () => {
    setEditingProduct(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (product) => {
    setEditingProduct(product);
    setForm({
      title: product.title,
      value: product.value,
      imageUrl: product.imageUrl,
      summary: product.summary || "",
      category: product.category || "",
      subCategory: product.subCategory || "",
      isOffer: product.isOffer || false,
    });
    setShowModal(true);
  };

  const handleToggleOffer = async (product) => {
    try {
      const res = await fetch(`${BASE_URL}/items/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ isOffer: !product.isOffer }),
      });
      if (!res.ok) throw new Error("No se pudo actualizar la oferta.");
      const updated = await res.json();
      setProducts(products.map((p) => (p.id === product.id ? updated : p)));
    } catch (err) {
      errorToast(err.message);
    }
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.value) return;

    const body = {
      title: form.title,
      value: Number(form.value),
      imageUrl: form.imageUrl,
      summary: form.summary,
      category: form.category,
      subCategory: form.subCategory,
      isOffer: form.isOffer,
    };

    try {
      if (editingProduct) {
        const res = await fetch(`${BASE_URL}/items/${editingProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", ...getAuthHeaders() },
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error("No se pudo editar el producto.");
        const updated = await res.json();
        setProducts(
          products.map((p) => (p.id === editingProduct.id ? updated : p)),
        );
        successToast("Producto editado correctamente.");
      } else {
        const res = await fetch(`${BASE_URL}/items`, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...getAuthHeaders() },
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error("No se pudo crear el producto.");
        const created = await res.json();
        setProducts([...products, created]);
        successToast("Producto agregado correctamente.");
      }
      setShowModal(false);
    } catch (err) {
      errorToast(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/items/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("No se pudo eliminar el producto.");
      setProducts(products.filter((p) => p.id !== id));
      successToast("Producto eliminado correctamente.");
    } catch (err) {
      errorToast(err.message);
    } finally {
      setShowDeleteConfirm(null);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 gap-3">
        <h4 className="fw-bold mb-0">Productos</h4>
        <Form.Control
          type="text"
          placeholder="Buscar producto..."
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
          + Agregar producto
        </Button>
      </div>

      <Table responsive hover className="shadow-sm">
        <thead
          style={{ backgroundColor: "var(--color-header)", color: "white" }}
        >
          <tr>
            <th style={{ width: "60px" }}>#</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th className="text-center">Oferta</th>
            <th>Imagen</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((p) => (
            <tr key={p.id} className="align-middle">
              <td>
                <Badge bg="secondary">{p.id}</Badge>
              </td>
              <td className="fw-semibold">{p.title}</td>
              <td>
                {p.category ? (
                  <Badge bg="info" className="text-dark">
                    {p.category}
                  </Badge>
                ) : (
                  <span className="text-muted small">Sin categoría</span>
                )}
              </td>
              <td style={{ color: "var(--color-accent)", fontWeight: 600 }}>
                ${p.value.toLocaleString("es-AR")}
              </td>
              <td className="text-center">
                <Button
                  size="sm"
                  variant={p.isOffer ? "warning" : "outline-secondary"}
                  onClick={() => handleToggleOffer(p)}
                  title={p.isOffer ? "Quitar de ofertas" : "Poner en oferta"}
                  style={{ fontSize: "0.75rem", padding: "2px 8px" }}
                >
                  {p.isOffer ? "✓ Oferta" : "—"}
                </Button>
              </td>
              <td>
                {p.imageUrl ? (
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "contain",
                    }}
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
          {filteredProducts.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center text-muted py-4">
                No hay productos. Agregá uno con el botón de arriba.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

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
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Categoría</Form.Label>
              <Form.Select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="">Sin categoría</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Subcategoría</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: Teclados, Memorias RAM, SSD..."
                value={form.subCategory}
                onChange={(e) =>
                  setForm({ ...form, subCategory: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Precio ($)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ej: 500000"
                value={form.value}
                onChange={(e) => setForm({ ...form, value: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">URL de imagen</Form.Label>
              <Form.Control
                type="text"
                placeholder="https://..."
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              />
              {form.imageUrl && (
                <div className="mt-2 text-center">
                  <img
                    src={form.imageUrl}
                    alt="preview"
                    style={{ maxHeight: "100px", objectFit: "contain" }}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
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
            <Form.Check
              type="switch"
              id="isOffer-switch"
              label="Publicar en Ofertas"
              checked={form.isOffer}
              onChange={(e) => setForm({ ...form, isOffer: e.target.checked })}
            />
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
            disabled={!form.title.trim() || !form.value}
          >
            {editingProduct ? "Guardar cambios" : "Agregar"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showDeleteConfirm !== null}
        onHide={() => setShowDeleteConfirm(null)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro que querés eliminar{" "}
          <strong>
            {products.find((p) => p.id === showDeleteConfirm)?.title}
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

export default ProductosAdmin;
