import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const LINES = [
  { text: "> HARDWARE-UTN DIAGNOSTIC TERMINAL v2.4.1", delay: 0 },
  { text: "> Iniciando diagnóstico del sistema...", delay: 600 },
  { text: "> Verificando rutas de red...", delay: 1200 },
  { text: "> [OK] Gateway: 192.168.1.1", delay: 1800 },
  { text: "> [OK] DNS: 8.8.8.8", delay: 2200 },
  { text: "> [OK] API Backend: localhost:3000", delay: 2600 },
  { text: "> Buscando recurso solicitado...", delay: 3200 },
  { text: "> Escaneando directorios...", delay: 3800 },
  { text: "> .............................................", delay: 4200 },
  { text: "> [ERROR] CÓDIGO 404: RECURSO NO ENCONTRADO", delay: 5000, error: true },
  { text: "> El sistema no puede localizar la ruta solicitada.", delay: 5600, error: true },
  { text: "> Posibles causas:", delay: 6200 },
  { text: ">   — La URL fue escrita incorrectamente.", delay: 6600 },
  { text: ">   — La página fue movida o eliminada.", delay: 7000 },
  { text: ">   — El componente no fue deployado.", delay: 7400 },
  { text: "> Recomendación: volver al inicio y reintentar.", delay: 8000 },
  { text: "> ___", delay: 8600, blink: true },
];

function TypewriterLine({ text, error, blink, onDone }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const idx = useRef(0);

  useEffect(() => {
    if (text === "> ___") {
      setDisplayed(text);
      setDone(true);
      onDone?.();
      return;
    }
    const interval = setInterval(() => {
      idx.current += 1;
      setDisplayed(text.slice(0, idx.current));
      if (idx.current >= text.length) {
        clearInterval(interval);
        setDone(true);
        onDone?.();
      }
    }, 18);
    return () => clearInterval(interval);
  }, [text]);

  const color = error ? "#ff4444" : "#00e676";

  return (
    <div style={{ color, fontFamily: "'Courier New', Courier, monospace", fontSize: "0.95rem", lineHeight: 1.7, minHeight: "1.7rem", whiteSpace: "pre" }}>
      {blink && done ? (
        <BlinkCursor />
      ) : (
        <>
          {displayed}
          {!done && <span style={{ animation: "blink 0.7s step-end infinite", opacity: 1 }}>█</span>}
        </>
      )}
    </div>
  );
}

function BlinkCursor() {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setOn((v) => !v), 500);
    return () => clearInterval(t);
  }, []);
  return <span style={{ color: "#00e676" }}>{on ? "█" : " "}</span>;
}

function NotFound() {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(1);
  const [showButtons, setShowButtons] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleCount]);

  const handleLineDone = (idx) => {
    if (idx === LINES.length - 1) {
      setTimeout(() => setShowButtons(true), 400);
    } else {
      const next = LINES[idx + 1];
      setTimeout(() => setVisibleCount(idx + 2), next.delay - LINES[idx].delay);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0d0d0d", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <div style={{ width: "100%", maxWidth: "700px", backgroundColor: "#111", border: "1px solid #1a1a1a", borderRadius: "8px", overflow: "hidden", boxShadow: "0 0 40px rgba(0,230,118,0.08)" }}>

        {/* Barra de título */}
        <div style={{ backgroundColor: "#1a1a1a", padding: "10px 16px", display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid #222" }}>
          <span style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#ff5f57", display: "inline-block" }} />
          <span style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#febc2e", display: "inline-block" }} />
          <span style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#28c840", display: "inline-block" }} />
          <span style={{ marginLeft: "12px", color: "#555", fontSize: "0.8rem", fontFamily: "monospace" }}>hardware-utn — diagnóstico@sistema — 80x24</span>
        </div>

        {/* Terminal */}
        <div style={{ padding: "24px 28px", minHeight: "380px" }}>
          {LINES.slice(0, visibleCount).map((line, i) => (
            <TypewriterLine
              key={i}
              text={line.text}
              error={line.error}
              blink={line.blink}
              onDone={() => handleLineDone(i)}
            />
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Botones */}
      {showButtons && (
        <div style={{ marginTop: "32px", display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", animation: "fadeIn 0.5s ease" }}>
          <button
            onClick={() => navigate("/")}
            style={{ backgroundColor: "#00e676", color: "#0d0d0d", border: "none", padding: "12px 28px", borderRadius: "4px", fontFamily: "monospace", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", letterSpacing: "0.05em" }}
          >
            &gt; VOLVER AL INICIO
          </button>
          <button
            onClick={() => navigate(-1)}
            style={{ backgroundColor: "transparent", color: "#00e676", border: "1px solid #00e676", padding: "12px 28px", borderRadius: "4px", fontFamily: "monospace", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", letterSpacing: "0.05em" }}
          >
            &gt; IR ATRÁS
          </button>
        </div>
      )}

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}

export default NotFound;
