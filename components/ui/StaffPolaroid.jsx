import React from "react";

/**
 * Staff polaroid — a white photo mat over a black-and-white portrait, with the
 * name set in Priestacy script and the role in tracked Jost. `mark` prints a
 * faint studio stamp on the mat.
 */
export function StaffPolaroid({ name, role, mark, slotSrc, slotPlaceholder, style = {} }) {
  return (
    <figure
      style={{
        margin: 0,
        width: "100%",
        maxWidth: "320px",
        background: "var(--shell)",
        padding: "14px 14px 22px",
        boxShadow: "var(--shadow-lg)",
        ...style,
      }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: "4 / 5",
          overflow: "hidden",
          background: "var(--cream-3)",
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
            filter: "grayscale(1) contrast(1.02)",
          }}
        />
      </div>
      <figcaption style={{ textAlign: "center", marginTop: "15px" }}>
        <div className="signature" style={{ fontSize: "1.85rem", color: "var(--ink)", lineHeight: 1 }}>
          {name}
        </div>
        <div
          style={{
            marginTop: "9px",
            fontFamily: "'Jost',sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--taupe)",
          }}
        >
          {role}
        </div>
        {mark && (
          <div
            style={{
              marginTop: "10px",
              fontFamily: "var(--font-wordmark, 'Light Rock', serif)",
              fontSize: "0.6rem",
              letterSpacing: "0.34em",
              textIndent: "0.34em",
              textTransform: "uppercase",
              color: "var(--taupe-2)",
              opacity: 0.7,
            }}
          >
            {mark}
          </div>
        )}
      </figcaption>
    </figure>
  );
}
