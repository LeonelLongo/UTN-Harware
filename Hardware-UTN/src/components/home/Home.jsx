import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import carrusel1 from "../../assets/imagenes/carrusel/carrusel1.png";
import carrusel2 from "../../assets/imagenes/carrusel/carrusel2.png";
import carrusel3 from "../../assets/imagenes/carrusel/carrusel3.png";

const carouselImages = [
  { src: carrusel1, alt: "Promoción 1" },
  { src: carrusel2, alt: "Promoción 2" },
  { src: carrusel3, alt: "Promoción 3" },
];

function Home() {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    if (query.trim())
      navigate(`/productos?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <Layout onSearchChange={handleSearch}>
      <Carousel
        controls={false}
        interval={5000}
        className="mb-4"
        style={{ borderRadius: "var(--border-radius)", overflow: "hidden" }}
      >
        {carouselImages.map((img, i) => (
          <Carousel.Item key={i}>
            <img
              className="d-block w-100"
              src={img.src}
              alt={img.alt}
              style={{ aspectRatio: "1919 / 820", objectFit: "cover" }}
            />
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Sección Novedades */}
      <section style={{ marginBottom: "40px" }}>
        <h4
          style={{
            fontWeight: 700,
            marginBottom: "16px",
            borderLeft: "4px solid var(--color-accent)",
            paddingLeft: "12px",
          }}
        >
          Novedades
        </h4>
        <div
          style={{
            display: "flex",
            gap: "16px",
            minHeight: "180px",
            backgroundColor: "#f8f8f8",
            borderRadius: "var(--border-radius)",
            alignItems: "center",
            justifyContent: "center",
            color: "#bbb",
            fontSize: "0.95rem",
            border: "1px dashed #ddd",
          }}
        >
          Próximamente
        </div>
      </section>

      {/* Sección Ofertas */}
      <section style={{ marginBottom: "24px" }}>
        <h4
          style={{
            fontWeight: 700,
            marginBottom: "16px",
            borderLeft: "4px solid var(--color-accent)",
            paddingLeft: "12px",
          }}
        >
          Ofertas
        </h4>
        <div
          style={{
            display: "flex",
            gap: "16px",
            minHeight: "180px",
            backgroundColor: "#f8f8f8",
            borderRadius: "var(--border-radius)",
            alignItems: "center",
            justifyContent: "center",
            color: "#bbb",
            fontSize: "0.95rem",
            border: "1px dashed #ddd",
          }}
        >
          Próximamente
        </div>
      </section>
    </Layout>
  );
}

export default Home;
