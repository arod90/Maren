"use client";
import React from "react";

/**
 * Villa card — a photo with a subtle zoom-on-hover, an optional corner badge,
 * and the villa name (display) + meta (tracked Jost) beneath.
 */
export function VillaCard({
  name, meta, badge, slotSrc, slotPlaceholder, ratio = "4 / 3", onClick, style = {},
}) {
  const [h, setH] = React.useState(false);
  return (
    <a
      href="#"
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{ display: "block", textDecoration: "none", ...style }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: ratio,
          overflow: "hidden",
          background: "var(--cream-3)",
          boxShadow: h ? "var(--shadow-lg)" : "var(--shadow-md)",
          transition: "box-shadow var(--dur-med) var(--ease-lux)",
        }}
      >
        <img
          src={slotSrc}
          alt={slotPlaceholder ? name : ""}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transform: h ? "scale(1.05)" : "scale(1)",
            transition: "transform 1.2s var(--ease-lux)",
          }}
        />
        {badge && (
          <span
            style={{
              position: "absolute",
              top: "16px",
              left: "16px",
              fontFamily: "'Jost',sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--on-image)",
              background: "rgba(20,17,13,0.42)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              padding: "7px 13px",
            }}
          >
            {badge}
          </span>
        )}
      </div>
      <div style={{ marginTop: "18px" }}>
        <div
          style={{
            fontFamily: "var(--font-display, 'Wasted Vindey', serif)",
            fontSize: "var(--fs-d3)",
            color: "var(--ink)",
            lineHeight: 1.08,
          }}
        >
          {name}
        </div>
        <div
          style={{
            marginTop: "8px",
            fontFamily: "'Jost',sans-serif",
            fontSize: "0.72rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--taupe)",
          }}
        >
          {meta}
        </div>
      </div>
    </a>
  );
}
