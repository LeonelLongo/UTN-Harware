import { useState } from "react";
import Layout from "../layout/Layout";
import { useAppContext } from "../../context/AppContext";
import ProductosAdmin from "./sections/ProductosAdmin";
import UsuariosAdmin from "./sections/UsuariosAdmin";
import ComprasAdmin from "./sections/ComprasAdmin";

const SECCIONES_ADMIN = ["Productos", "Usuarios"];
const SECCIONES_SUPERADMIN = ["Productos", "Usuarios", "Compras"];

function AdminPanel() {
  const { isSuperAdmin } = useAppContext();
  const secciones = isSuperAdmin ? SECCIONES_SUPERADMIN : SECCIONES_ADMIN;
  const [seccionActiva, setSeccionActiva] = useState("Productos");

  return (
    <Layout>
      <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
        {/* Sidebar */}
        <div style={{ width: "160px", flexShrink: 0 }}>
          <p
            style={{
              color: "#999",
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              margin: "0 0 10px 0",
            }}
          >
            Panel
          </p>
          {secciones.map((sec) => (
            <button
              key={sec}
              onClick={() => setSeccionActiva(sec)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "center",
                padding: "8px 10px",
                borderRadius: "var(--border-radius)",
                border: seccionActiva === sec ? "none" : "1px solid #ddd",
                cursor: "pointer",
                fontSize: "0.85rem",
                fontWeight: seccionActiva === sec ? 700 : 400,
                backgroundColor: seccionActiva === sec ? "var(--color-accent)" : "white",
                color: seccionActiva === sec ? "white" : "#444",
                marginBottom: "6px",
                transition: "background-color 0.15s, color 0.15s",
              }}
            >
              {sec}
            </button>
          ))}
        </div>

        {/* Contenido */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {seccionActiva === "Productos" && <ProductosAdmin />}
          {seccionActiva === "Usuarios" && <UsuariosAdmin />}
          {seccionActiva === "Compras" && isSuperAdmin && <ComprasAdmin />}
        </div>
      </div>
    </Layout>
  );
}

export default AdminPanel;
