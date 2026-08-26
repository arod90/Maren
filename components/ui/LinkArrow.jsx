"use client";
import React from "react";

/**
 * Editorial CTA link — tracked Jost label with an animated underline that
 * wipes out on hover, plus a bronze arrow that slides. onDark for photos.
 */
export function LinkArrow({ children, href = "#", onDark = false, onClick, style = {} }) {
  const [h, setH] = React.useState(false);
  const line = onDark ? "var(--bronze-soft)" : "var(--bronze)";
  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "12px",
        fontFamily: "var(--font-ui, 'Jost', sans-serif)",
        fontSize: "var(--fs-body-sm)",
        letterSpacing: "var(--ls-ui)",
        textTransform: "uppercase",
        textDecoration: "none",
        color: h
          ? onDark ? "var(--on-image)" : "var(--bronze-deep)"
          : onDark ? "var(--on-image)" : "var(--ink)",
        transition: "color var(--dur-fast) var(--ease-out)",
        ...style,
      }}
    >
      <span
        style={{
          paddingBottom: "6px",
          backgroundImage: `linear-gradient(${line},${line})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: h ? "0% 1px" : "100% 1px",
          backgroundPosition: h ? "100% 100%" : "0 100%",
          transition: "background-size var(--dur-med) var(--ease-lux)",
        }}
      >
        {children}
      </span>
      <span
        aria-hidden="true"
        style={{
          color: line,
          fontSize: "1.05em",
          transform: h ? "translateX(5px)" : "none",
          transition: "transform var(--dur-fast) var(--ease-out)",
        }}
      >
        →
      </span>
    </a>
  );
}
