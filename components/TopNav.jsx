"use client";
import React from "react";
import { Wordmark } from "./ui/Wordmark.jsx";

/**
 * Fixed header — MENU (left, glyph morphs to ✕) · MAREN wordmark (center) ·
 * Book now (right). Transparent over the hero, gains a cream blur once
 * scrolled; text goes light over hero/menu, ink once the bar is solid.
 */
export function TopNav({ scrolled = false, menuOpen = false, onMenu, onEnquire }) {
  const solid = scrolled && !menuOpen;
  const ink = solid ? "var(--ink)" : "var(--on-image)";

  const labelStyle = {
    fontFamily: "'Jost',sans-serif",
    fontSize: "0.7rem",
    fontWeight: 400,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: ink,
    background: "none",
    border: "none",
    cursor: "pointer",
    transition: "color var(--dur-med) var(--ease-lux)",
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 300,
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        height: "clamp(64px,7vw,88px)",
        padding: "0 var(--gutter)",
        background: solid ? "rgba(244,241,234,0.82)" : "transparent",
        backdropFilter: solid ? "blur(12px)" : "none",
        WebkitBackdropFilter: solid ? "blur(12px)" : "none",
        borderBottom: solid ? "1px solid var(--line)" : "1px solid transparent",
        transition:
          "background var(--dur-med) var(--ease-lux), border-color var(--dur-med) var(--ease-lux)",
      }}
    >
      {/* MENU (left) */}
      <button
        onClick={onMenu}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        style={{ ...labelStyle, justifySelf: "start", display: "inline-flex", alignItems: "center", gap: "13px" }}
      >
        <span style={{ position: "relative", width: "22px", height: "12px", display: "inline-block", flexShrink: 0 }}>
          <span
            style={{
              position: "absolute",
              left: 0,
              top: menuOpen ? "6px" : "1px",
              width: "22px",
              height: "1px",
              background: "currentColor",
              transform: menuOpen ? "rotate(45deg)" : "none",
              transition: "transform var(--dur-fast) var(--ease-lux), top var(--dur-fast) var(--ease-lux)",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: 0,
              top: menuOpen ? "6px" : "10px",
              width: "22px",
              height: "1px",
              background: "currentColor",
              transform: menuOpen ? "rotate(-45deg)" : "none",
              transition: "transform var(--dur-fast) var(--ease-lux), top var(--dur-fast) var(--ease-lux)",
            }}
          />
        </span>
        <span className="topnav-word">{menuOpen ? "Close" : "Menu"}</span>
      </button>

      {/* Wordmark (center) */}
      <a href="#top" style={{ justifySelf: "center", textDecoration: "none" }}>
        <Wordmark size="1.3rem" color={ink} style={{ transition: "color var(--dur-med) var(--ease-lux)" }} />
      </a>

      {/* Book now (right) */}
      <button onClick={onEnquire} style={{ ...labelStyle, justifySelf: "end" }}>
        Book now
      </button>

      <style>{`@media(max-width:560px){.topnav-word{display:none}}`}</style>
    </header>
  );
}
