import React from "react";

/**
 * Maren eyebrow — small tracked Jost label above headings.
 * onDark lightens it for photo/dark surfaces. Optional bronze tick.
 */
export function Eyebrow({ children, onDark = false, align = "left", tick = true, style = {} }) {
  return (
    <div
      className="eyebrow"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "12px",
        color: onDark ? "var(--on-image-mut)" : "var(--taupe)",
        justifyContent: align === "center" ? "center" : "flex-start",
        ...style,
      }}
    >
      {tick && (
        <span
          style={{
            width: "26px",
            height: "1px",
            background: onDark ? "var(--bronze-soft)" : "var(--bronze)",
            flexShrink: 0,
          }}
        />
      )}
      <span>{children}</span>
    </div>
  );
}
