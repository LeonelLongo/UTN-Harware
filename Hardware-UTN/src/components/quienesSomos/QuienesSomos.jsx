import { useEffect } from "react";
import Layout from "../layout/Layout";

function QuienesSomos() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div
        style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 16px" }}
      >
        <h2 style={{ fontWeight: 700, marginBottom: "8px" }}>Quiénes somos</h2>
        <p
          style={{
            color: "var(--color-text-muted)",
            marginBottom: "32px",
            fontSize: "0.9rem",
          }}
        >
          Rosario, Santa Fe — Argentina
        </p>

        <Section title="Nuestros comienzos">
          Todo empezó en los pasillos de la UTN, Facultad de Rosario. Somos
          tres amigos que nos conocimos en primer año de la carrera y desde el
          primer día teníamos algo en común: una obsesión por las
          computadoras y sus componentes. Pasábamos las horas libres entre clase
          y clase hablando de placas de video, procesadores y builds, mientras
          el resto descansaba.
        </Section>

        <Section title="El origen de Hardware UTN">
          En 2023, cansados de ver cómo en Rosario era difícil conseguir
          componentes de calidad a precios justos, decidimos dar el salto. Con
          poco más que conocimiento, ganas y una notebook vieja, fundamos
          Hardware UTN. Lo que arrancó como un emprendimiento entre amigos fue
          creciendo de a poco, impulsado por la confianza de clientes que, como
          nosotros, buscan lo mejor para sus equipos.
        </Section>

        <Section title="Qué nos mueve">
          Nos apasiona ayudar a cada persona a armar o mejorar su PC, ya sea
          para gaming, trabajo o estudio. Sabemos lo que es invertir los ahorros
          en un componente y queremos que esa inversión valga la pena. Por eso
          asesoramos a cada cliente de forma personalizada, con la misma
          honestidad con la que le recomendaríamos algo a un amigo.
        </Section>

        <Section title="Hoy">
          Seguimos siendo los mismos tres amigos de la facultad, ahora con más
          experiencia, más catálogo y más clientes satisfechos. Trabajamos desde
          Rosario pero enviamos a todo el país. Hardware UTN es nuestro
          proyecto, nuestra pasión y, sobre todo, una forma de demostrar que con
          conocimiento y compromiso se puede construir algo real.
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

export default QuienesSomos;
