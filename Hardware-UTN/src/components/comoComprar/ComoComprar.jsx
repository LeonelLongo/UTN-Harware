import Layout from "../layout/Layout";

const PASOS = [
  {
    numero: 1,
    titulo: "Explorá el catálogo",
    descripcion:
      "Navegá por las categorías del menú lateral o usá el buscador para encontrar el producto que necesitás. Podés ver la descripción, el precio y las imágenes de cada artículo.",
  },
  {
    numero: 2,
    titulo: "Agregá al carrito",
    descripcion:
      'Una vez que encontraste lo que buscás, hacé clic en "Agregar al carrito". Podés seguir comprando y agregar más productos antes de pagar.',
  },
  {
    numero: 3,
    titulo: "Iniciá sesión",
    descripcion:
      "Para finalizar tu compra necesitás tener una cuenta. Si no tenés, podés registrarte en segundos. Solo necesitás tu nombre, email y una contraseña.",
  },
  {
    numero: 4,
    titulo: "Revisá tu carrito",
    descripcion:
      "Entrá al carrito desde el botón en la barra superior. Ahí podés ver todos los productos elegidos, modificar cantidades o eliminar lo que no querés.",
  },
  {
    numero: 5,
    titulo: "Confirmá tu compra",
    descripcion:
      "Cuando estés listo, confirmá el pedido. Recibirás un resumen con los productos adquiridos y el estado de tu compra.",
  },
];

function ComoComprar() {
  return (
    <Layout>
      <div
        style={{ maxWidth: "720px", margin: "0 auto", padding: "8px 0 40px" }}
      >
        <h2 style={{ fontWeight: 700, marginBottom: "8px" }}>¿Cómo comprar?</h2>
        <p
          style={{
            color: "var(--color-text-muted, #666)",
            marginBottom: "36px",
          }}
        >
          Seguí estos pasos y tenés tu pedido en minutos.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {PASOS.map((paso) => (
            <div
              key={paso.numero}
              style={{
                display: "flex",
                gap: "20px",
                alignItems: "flex-start",
                backgroundColor: "white",
                borderRadius: "var(--border-radius)",
                padding: "20px 24px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-accent)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "1rem",
                  flexShrink: 0,
                }}
              >
                {paso.numero}
              </div>
              <div>
                <h5 style={{ fontWeight: 700, marginBottom: "4px" }}>
                  {paso.titulo}
                </h5>
                <p style={{ margin: 0, color: "#555", lineHeight: 1.6 }}>
                  {paso.descripcion}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default ComoComprar;
