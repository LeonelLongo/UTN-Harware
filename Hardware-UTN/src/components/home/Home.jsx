import { useRef, useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import ProductItem from "../products/ProductItem";
import { useAppContext } from "../../context/AppContext";
import carrusel1 from "../../assets/imagenes/carrusel/carrusel1.png";
import carrusel2 from "../../assets/imagenes/carrusel/carrusel2.png";
import carrusel3 from "../../assets/imagenes/carrusel/carrusel3.png";

const carouselImages = [
  { src: carrusel1, alt: "Promoción 1" },
  { src: carrusel2, alt: "Promoción 2" },
  { src: carrusel3, alt: "Promoción 3" },
];

const sectionTitle = {
  fontWeight: 700,
  marginBottom: "16px",
  borderLeft: "4px solid var(--color-accent)",
  paddingLeft: "12px",
};

const productGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: "16px",
};

const PEEK = 40;
const GAP = 16;
const N_VISIBLE = 4;

const arrowStyle = (side) => ({
  position: "absolute",
  [side]: 0,
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 2,
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  background: "white",
  border: "1px solid #ddd",
  cursor: "pointer",
  boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.3rem",
  transition: "opacity 0.2s",
  lineHeight: 1,
});

function Home() {
  const navigate = useNavigate();
  const { products, cart, setCart } = useAppContext();
  const ofertaRef = useRef(null);
  const [wrapperWidth, setWrapperWidth] = useState(0);
  const [slideIdx, setSlideIdx] = useState(0);

  const novedades = [...products].slice(-4).reverse();
  const ofertas = products.filter((p) => p.isOffer);

  useEffect(() => {
    setSlideIdx(0);
  }, [ofertas.length]);

  useEffect(() => {
    const el = ofertaRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) =>
      setWrapperWidth(entries[0].contentRect.width),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const itemWidth =
    wrapperWidth > 0
      ? (wrapperWidth - 2 * PEEK - (N_VISIBLE - 1) * GAP) / N_VISIBLE
      : 180;
  const shiftPerSlide = itemWidth + GAP;
  const maxSlide = Math.max(0, ofertas.length - N_VISIBLE);
  const translateX = PEEK - slideIdx * shiftPerSlide;

  const getQuantity = (id) => cart.find((p) => p.id === id)?.quantity ?? 0;

  const handleAdd = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing)
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
        );
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleRemove = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing?.quantity === 1)
        return prev.filter((p) => p.id !== product.id);
      return prev.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p,
      );
    });
  };

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

      <section style={{ marginBottom: "40px" }}>
        <h4 style={sectionTitle}>Novedades</h4>
        {novedades.length > 0 ? (
          <div style={productGrid}>
            {novedades.map((p) => (
              <ProductItem
                key={p.id}
                id={p.id}
                name={p.title}
                price={p.value}
                image={p.imageUrl}
                quantityInCart={getQuantity(p.id)}
                onAdd={() => handleAdd(p)}
                onRemove={() => handleRemove(p)}
                isNew={true}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              minHeight: "180px",
              backgroundColor: "#f8f8f8",
              borderRadius: "var(--border-radius)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#bbb",
              border: "1px dashed #ddd",
            }}
          >
            Próximamente
          </div>
        )}
      </section>

      <section style={{ marginBottom: "24px" }}>
        <h4 style={sectionTitle}>Ofertas</h4>
        {ofertas.length > 0 ? (
          ofertas.length > N_VISIBLE ? (
            <div style={{ position: "relative", padding: "0 44px" }}>
              <button
                onClick={() => setSlideIdx((i) => Math.max(0, i - 1))}
                style={{
                  ...arrowStyle("left"),
                  opacity: slideIdx > 0 ? 1 : 0,
                  pointerEvents: slideIdx > 0 ? "auto" : "none",
                }}
              >
                ‹
              </button>

              <button
                onClick={() => setSlideIdx((i) => Math.min(maxSlide, i + 1))}
                style={{
                  ...arrowStyle("right"),
                  opacity: slideIdx < maxSlide ? 1 : 0,
                  pointerEvents: slideIdx < maxSlide ? "auto" : "none",
                }}
              >
                ›
              </button>

              <div
                ref={ofertaRef}
                style={{
                  overflow: "hidden",
                  opacity: wrapperWidth > 0 ? 1 : 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: `${GAP}px`,
                    transform: `translateX(${translateX}px)`,
                    transition:
                      "transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
                    willChange: "transform",
                    padding: "8px 0",
                  }}
                >
                  {ofertas.map((p, i) => {
                    const inView = i >= slideIdx && i < slideIdx + N_VISIBLE;
                    return (
                      <div
                        key={p.id}
                        style={{
                          width: `${itemWidth}px`,
                          flexShrink: 0,
                          opacity: inView ? 1 : 0.3,
                          transition: "opacity 0.4s ease",
                          pointerEvents: inView ? "auto" : "none",
                        }}
                      >
                        <ProductItem
                          id={p.id}
                          name={p.title}
                          price={p.value}
                          image={p.imageUrl}
                          quantityInCart={getQuantity(p.id)}
                          onAdd={() => handleAdd(p)}
                          onRemove={() => handleRemove(p)}
                          discount={20}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div style={productGrid}>
              {ofertas.map((p) => (
                <ProductItem
                  key={p.id}
                  id={p.id}
                  name={p.title}
                  price={p.value}
                  image={p.imageUrl}
                  quantityInCart={getQuantity(p.id)}
                  onAdd={() => handleAdd(p)}
                  onRemove={() => handleRemove(p)}
                  discount={20}
                />
              ))}
            </div>
          )
        ) : (
          <div
            style={{
              minHeight: "180px",
              backgroundColor: "#f8f8f8",
              borderRadius: "var(--border-radius)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#bbb",
              border: "1px dashed #ddd",
            }}
          >
            Próximamente
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Home;
