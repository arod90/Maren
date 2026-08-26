import React from "react";
import { Eyebrow } from "./Eyebrow.jsx";

/**
 * Section heading block — eyebrow + display title (Wasted Vindey) + optional
 * serif lead + optional children (a LinkArrow/CTA). onDark for photo/dark
 * surfaces. `size` picks the display scale; `maxWidth` caps the title measure.
 */
export function SectionHeading({
  eyebrow, size = "d2", title, lead, maxWidth, onDark = false, align = "left", children, style = {},
}) {
  const fs = { d1: "var(--fs-d1)", d2: "var(--fs-d2)", d3: "var(--fs-d3)" }[size] || "var(--fs-d2)";
  const ink = onDark ? "var(--on-image)" : "var(--ink)";
  const body = onDark ? "var(--on-image-mut)" : "var(--ink-2)";
  const center = align === "center";
  return (
    <div style={{ textAlign: center ? "center" : "left", ...style }}>
      {eyebrow && <Eyebrow onDark={onDark} align={align}>{eyebrow}</Eyebrow>}
      {title && (
        <h2
          style={{
            margin: eyebrow ? "24px 0 0" : 0,
            fontFamily: "var(--font-display, 'Wasted Vindey', serif)",
            fontWeight: 400,
            fontSize: fs,
            lineHeight: "var(--lh-tight, 1.06)",
            letterSpacing: "var(--ls-display)",
            color: ink,
            textWrap: "pretty",
            maxWidth: maxWidth || "18ch",
            marginInline: center ? "auto" : undefined,
          }}
        >
          {title}
        </h2>
      )}
      {lead && (
        <p
          style={{
            margin: "22px 0 0",
            fontFamily: "var(--font-serif, 'EB Garamond', serif)",
            fontSize: "var(--fs-lead)",
            lineHeight: "var(--lh-lead, 1.5)",
            color: body,
            maxWidth: "48ch",
            marginInline: center ? "auto" : undefined,
            textWrap: "pretty",
          }}
        >
          {lead}
        </p>
      )}
      {children && <div style={{ marginTop: "28px" }}>{children}</div>}
    </div>
  );
}
