"use client";
import React from "react";

/* Maren loader — wordmark fades in, a bronze hairline draws out, tagline
   settles, then the whole panel wipes up (clip-path) to reveal the site. */
export function Loader({ gone }) {
  const [phase, setPhase] = React.useState(0); // 0 hidden, 1 wordmark, 2 line
  React.useEffect(() => {
    const a = setTimeout(() => setPhase(1), 120);
    const b = setTimeout(() => setPhase(2), 900);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 500,
        background: "var(--cream)",
        display: "grid",
        placeItems: "center",
        clipPath: gone ? "inset(0 0 100% 0)" : "inset(0 0 0 0)",
        transition: "clip-path 1.1s var(--ease-lux)",
        pointerEvents: gone ? "none" : "auto",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? "none" : "translateY(14px)",
            transition: "opacity 1s var(--ease-lux), transform 1s var(--ease-lux)",
          }}
        >
          <span
            id="maren-loader-mark"
            style={{
              fontFamily: "var(--font-wordmark, 'Light Rock', 'Wasted Vindey', serif)",
              textTransform: "uppercase",
              letterSpacing: "0.34em",
              textIndent: "0.34em",
              fontWeight: 400,
              lineHeight: 1,
              color: "var(--ink)",
              display: "inline-block",
            }}
          >
            MAREN
          </span>
        </div>
        <div
          style={{
            height: "1px",
            background: "var(--bronze)",
            margin: "38px auto 0",
            width: phase >= 2 ? "min(360px,66vw)" : "0px",
            transition: "width 1.1s var(--ease-lux)",
          }}
        />
        <div
          style={{
            marginTop: "24px",
            opacity: phase >= 2 ? 0.9 : 0,
            transition: "opacity .8s ease .2s",
            fontFamily: "'Jost',sans-serif",
            fontSize: "0.9rem",
            letterSpacing: "0.34em",
            textTransform: "uppercase",
            color: "var(--taupe)",
          }}
        >
          Destination living, redefined
        </div>
      </div>
    </div>
  );
}
