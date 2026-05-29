import { useEffect } from "react";
import Layout from "../layout/Layout";

function Terminos({ setShowLogin }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout setShowLogin={setShowLogin}>
      <div
        style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 16px" }}
      >
        <h2 style={{ fontWeight: 700, marginBottom: "8px" }}>
          Términos y condiciones
        </h2>
        <p
          style={{
            color: "var(--color-text-muted)",
            marginBottom: "32px",
            fontSize: "0.9rem",
          }}
        >
          Última actualización: mayo 2025
        </p>

        <Section title="1. Aceptación de los términos">
          Al acceder y realizar compras en Hardware UTN, el usuario acepta
          quedar sujeto a los presentes Términos y Condiciones. Si no está de
          acuerdo con alguna de estas condiciones, le pedimos que se abstenga de
          utilizar nuestros servicios.
        </Section>

        <Section title="2. Productos y disponibilidad">
          Todos los productos publicados en Hardware UTN están sujetos a
          disponibilidad de stock. Nos reservamos el derecho de modificar
          precios, descripciones y disponibilidad sin previo aviso. Las imágenes
          de los productos son ilustrativas y pueden diferir levemente del
          producto real.
        </Section>

        <Section title="3. Precios y medios de pago">
          Los precios publicados están expresados en pesos argentinos e incluyen
          IVA. Hardware UTN acepta pagos con tarjeta de crédito, débito y
          transferencia bancaria. En caso de error en el precio publicado, nos
          reservamos el derecho de cancelar la orden afectada, notificando al
          cliente de inmediato.
        </Section>

        <Section title="4. Proceso de compra y envíos">
          Una vez confirmado el pago, el pedido será procesado en un plazo de 1
          a 3 días hábiles. Los envíos se realizan a través de correo oficial o
          transporte privado según la localidad del comprador. Hardware UTN no
          se responsabiliza por demoras ocasionadas por el servicio de
          transporte una vez despachado el pedido.
        </Section>

        <Section title="5. Garantía y devoluciones">
          Todos los productos cuentan con garantía del fabricante. Ante
          cualquier desperfecto de fábrica dentro del período de garantía, el
          cliente debe contactarse con nosotros dentro de los 30 días de
          recibido el producto. No se aceptan devoluciones por cambio de opinión
          una vez que el producto ha sido utilizado.
        </Section>

        <Section title="6. Responsabilidad">
          Hardware UTN no se responsabiliza por daños directos o indirectos
          causados por el uso inadecuado de los productos adquiridos. La
          instalación y compatibilidad de los componentes es responsabilidad
          exclusiva del comprador.
        </Section>

        <Section title="7. Privacidad de datos">
          Los datos personales ingresados al momento del registro son utilizados
          exclusivamente para gestionar pedidos y mejorar la experiencia de
          compra. No compartimos información con terceros sin consentimiento del
          usuario. Para más información, consultá nuestra Política de
          Privacidad.
        </Section>

        <Section title="8. Modificaciones">
          Hardware UTN se reserva el derecho de modificar estos Términos y
          Condiciones en cualquier momento. Los cambios entrarán en vigencia a
          partir de su publicación en el sitio. Se recomienda revisar esta
          sección periódicamente.
        </Section>

        <Section title="9. Contacto">
          Ante cualquier consulta relacionada con estos términos, podés
          comunicarte con nosotros a través de nuestras redes sociales o al
          correo oficial de Hardware UTN.
        </Section>
      </div>
    </Layout>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: "28px" }}>
      <h5 style={{ fontWeight: 700, marginBottom: "8px" }}>{title}</h5>
      <p
        style={{
          color: "var(--color-text-muted)",
          lineHeight: "1.7",
          margin: 0,
        }}
      >
        {children}
      </p>
    </div>
  );
}

export default Terminos;
