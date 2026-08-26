import React from "react";

/**
 * Maren wordmark — the brand lockup, all-caps, tracked.
 * No logo symbol exists; this IS the mark.
 */
export function Wordmark({ as = "span", size = "md", color, tracking, style = {}, className = "", ...rest }) {
  const Tag = as;
  const sizes = { sm: "0.95rem", md: "1.35rem", lg: "2rem", xl: "3.25rem" };
  return (
    <Tag
      className={`maren-wordmark ${className}`}
      style={{
        fontFamily: "var(--font-wordmark, 'Light Rock', 'Wasted Vindey', serif)",
        textTransform: "uppercase",
        letterSpacing: tracking || "var(--ls-wordmark, 0.34em)",
        fontWeight: 400,
        lineHeight: 1,
        textIndent: tracking || "0.34em",
        color: color || "var(--ink, #2A2620)",
        fontSize: sizes[size] || size,
        display: "inline-block",
        ...style,
      }}
      {...rest}
    >
      MAREN
    </Tag>
  );
}
