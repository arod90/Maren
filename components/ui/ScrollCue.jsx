import React from "react";

/**
 * Hero scroll cue — a tracked "Scroll" label above a thin vertical line
 * that pulses downward. onDark for placement over photography.
 */
export function ScrollCue({ onDark = false, style = {} }) {
  const c = onDark ? "var(--on-image)" : "var(--ink)";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
        color: c,
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-ui, 'Jost', sans-serif)",
          fontSize: "0.62rem",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          opacity: 0.82,
        }}
      >
        Scroll
      </span>
      <span
        style={{
          position: "relative",
          width: "1px",
          height: "52px",
          overflow: "hidden",
          background: "currentColor",
          opacity: 0.28,
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "40%",
            background: "currentColor",
            animation: "marenCue 2.4s var(--ease-in-out) infinite",
          }}
        />
      </span>
      <style>{`@keyframes marenCue{0%{transform:translateY(-100%);opacity:0}30%{opacity:1}100%{transform:translateY(260%);opacity:0}}`}</style>
    </div>
  );
}
