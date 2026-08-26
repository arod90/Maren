"use client";
import React from "react";

/* Maren — full-screen menu overlay (clip-path reveal over a dark surface). */
export function MenuOverlay({ open, onClose, onEnquire }) {
  const links = ["Home", "About", "Destinations", "Villas", "Experiences", "Studio", "Contact"];
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "var(--ink-surface)",
        color: "var(--on-dark)",
        clipPath: open ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
        transition: "clip-path .9s var(--ease-lux)",
        pointerEvents: open ? "auto" : "none",
        display: "grid",
        gridTemplateColumns: "1fr",
        alignContent: "center",
      }}
    >
      <div className="wrap" style={{ paddingTop: "90px", paddingBottom: "48px" }}>
        <nav style={{ display: "flex", flexDirection: "column", gap: "clamp(6px,1.6vh,16px)" }}>
          {links.map((l, i) => (
            <a
              key={l}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
              style={{
                fontFamily: "'Wasted Vindey',serif",
                fontSize: "clamp(2rem,1rem+4vw,4.5rem)",
                lineHeight: 1.1,
                color: "var(--on-dark)",
                textDecoration: "none",
                width: "fit-content",
                opacity: open ? 1 : 0,
                transform: open ? "none" : "translateY(24px)",
                transition: `opacity .8s var(--ease-lux) ${0.15 + i * 0.06}s, transform .8s var(--ease-lux) ${0.15 + i * 0.06}s, color .3s ease`,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--bronze-soft)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--on-dark)")}
            >
              {l}
            </a>
          ))}
        </nav>
        <div
          style={{
            marginTop: "clamp(32px,5vh,64px)",
            display: "flex",
            gap: "40px",
            flexWrap: "wrap",
            alignItems: "center",
            fontFamily: "'Jost',sans-serif",
            fontSize: "0.72rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--on-dark-mut)",
          }}
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onClose();
              onEnquire();
            }}
            style={{ color: "var(--on-dark)", textDecoration: "none" }}
          >
            Book now
          </a>
          <span>Instagram</span>
          <span>+590 590 00 00 00</span>
        </div>
      </div>
    </div>
  );
}
