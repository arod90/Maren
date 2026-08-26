"use client";
import React from "react";

/**
 * Maren primary button. Understated: square-ish, hairline or filled,
 * uppercase tracked UI label. Calm hover (no bounce).
 * Variants: solid (ink), outline (hairline), ghost (text-only on light),
 *           light (for dark/photo surfaces).
 */
export function Button({
  children, variant = "solid", size = "md", full = false,
  as = "button", href, onClick, disabled = false, style = {}, ...rest
}) {
  const pads = { sm: "11px 22px", md: "15px 30px", lg: "19px 40px" };
  const fonts = { sm: "0.72rem", md: "0.78rem", lg: "0.82rem" };

  const base = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px",
    fontFamily: "'Jost',sans-serif", fontWeight: 400,
    letterSpacing: "var(--ls-ui,0.14em)", textTransform: "uppercase",
    fontSize: fonts[size], lineHeight: 1, padding: pads[size],
    borderRadius: "var(--r-xs,2px)", cursor: disabled ? "not-allowed" : "pointer",
    border: "1px solid transparent", width: full ? "100%" : "auto",
    transition: "background-color .4s var(--ease-lux,cubic-bezier(0.16,1,0.3,1)), color .3s ease, border-color .3s ease, opacity .3s ease",
    opacity: disabled ? 0.45 : 1, whiteSpace: "nowrap", textDecoration: "none",
  };
  const variants = {
    solid:   { background: "var(--ink,#2A2620)", color: "var(--on-dark,#F1ECE2)", borderColor: "var(--ink,#2A2620)" },
    outline: { background: "transparent", color: "var(--ink,#2A2620)", borderColor: "var(--line,#D8D1C3)" },
    ghost:   { background: "transparent", color: "var(--ink,#2A2620)", borderColor: "transparent", padding: "2px 0" },
    light:   { background: "rgba(251,250,246,0.14)", color: "var(--on-image,#FBFAF6)", borderColor: "rgba(251,250,246,0.55)", backdropFilter: "blur(2px)" },
  };
  const Tag = href ? "a" : as;
  const [hover, setHover] = React.useState(false);
  const hoverStyle = !disabled && hover ? ({
    solid:   { background: "var(--ink-surface-2,#2E2A23)" },
    outline: { borderColor: "var(--ink,#2A2620)", background: "rgba(42,38,32,0.03)" },
    ghost:   { color: "var(--bronze-deep,#856846)" },
    light:   { background: "rgba(251,250,246,0.26)", borderColor: "var(--on-image,#FBFAF6)" },
  }[variant]) : {};

  return (
    <Tag
      href={href} onClick={disabled ? undefined : onClick} disabled={href ? undefined : disabled}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ ...base, ...variants[variant], ...hoverStyle, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
