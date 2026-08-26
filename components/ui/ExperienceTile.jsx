"use client";
import React from "react";

/**
 * Experience tile — a tall 3:4 photo with a display title and a short serif
 * caption beneath. Gentle zoom on hover.
 */
export function ExperienceTile({ title, caption, slotSrc, slotPlaceholder, style = {} }) {
  const [h, setH] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{ ...style }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: "3 / 4",
          overflow: "hidden",
          background: "var(--cream-3)",
        }}
      >
        <img
          src={slotSrc}
          alt={slotPlaceholder ? title : ""}
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
      </div>
      <h3
        style={{
          margin: "18px 0 0",
          fontFamily: "var(--font-display, 'Wasted Vindey', serif)",
          fontWeight: 400,
          fontSize: "1.5rem",
          lineHeight: 1.1,
          color: "var(--ink)",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          margin: "9px 0 0",
          fontFamily: "var(--font-serif, 'EB Garamond', serif)",
          fontSize: "0.98rem",
          lineHeight: 1.55,
          color: "var(--ink-2)",
          maxWidth: "34ch",
        }}
      >
        {caption}
      </p>
    </div>
  );
}
