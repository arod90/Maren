"use client";
import React from "react";
import { Reveal } from "../Reveal.jsx";
import { ScrollCue } from "../ui/ScrollCue.jsx";
import { Button } from "../ui/Button.jsx";
import { SectionHeading } from "../ui/SectionHeading.jsx";
import { LinkArrow } from "../ui/LinkArrow.jsx";
import { VillaCard } from "../ui/VillaCard.jsx";

/* Maren website — top sections: Hero, Intro, Philosophy, Villas */

/* ---------- HERO ---------- */
function Hero({ revealed, onBook }) {

  const [entered, setEntered] = React.useState(false);
  React.useEffect(() => { const t = setTimeout(() => setEntered(true), 2700); return () => clearTimeout(t); }, []);
  const lines = [['Welcome', 'home', 'to', 'the'], ['extraordinary']];
  let wi = 0;
  return (
    <section id="top" style={{ position: 'relative', height: '100svh', minHeight: '620px', overflow: 'hidden', background: 'var(--cream)' }}>
      {/* image fades in, choreographed with the headline turning white */}
      <div style={{
        position: 'absolute', inset: 0,
        opacity: revealed ? 1 : 0,
        transition: 'opacity 2.6s var(--ease-lux)',
      }}>
        <img src="/images/hero.jpg" alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'var(--scrim-full)', pointerEvents: 'none' }} />
      </div>
      {/* legibility scrim anchored bottom-left, only present once the image is in */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        opacity: revealed ? 1 : 0, transition: 'opacity 2.6s var(--ease-lux)',
        background: 'linear-gradient(to top, rgba(16,13,9,.62) 0%, rgba(16,13,9,.32) 30%, rgba(16,13,9,.04) 56%, rgba(16,13,9,0) 74%)' }} />
      {/* headline — words rise in (entry), then color flips dark→white in sync with the image */}
      <div style={{ position: 'absolute', left: 'clamp(20px,5vw,80px)', right: 'clamp(20px,5vw,80px)', bottom: 'clamp(120px,18vh,220px)', maxWidth: 'min(1100px,92vw)', pointerEvents: 'none' }}>
        <h1 style={{
          fontFamily: "'Wasted Vindey','Cormorant Garamond',serif", fontWeight: 400,
          fontSize: 'var(--fs-hero)', lineHeight: 1.04, letterSpacing: '-0.01em',
          color: revealed ? 'var(--on-image)' : 'var(--ink)',
          textShadow: revealed ? '0 2px 30px rgba(12,9,6,.45)' : 'none',
          transition: 'color 2.6s var(--ease-lux), text-shadow 2.6s var(--ease-lux)', margin: 0,
        }}>
          {lines.map((words, li) => (
            <span key={li} style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.08em' }}>
              {words.map((w) => {
                const d = 0.12 * (wi++);
                return (
                  <span key={w + d} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}>
                    <span style={{
                      display: 'inline-block',
                      transform: entered ? 'translateY(0)' : 'translateY(110%)',
                      opacity: entered ? 1 : 0,
                      transition: `transform 1.3s var(--ease-lux) ${d}s, opacity 1.3s var(--ease-lux) ${d}s`,
                    }}>{w}</span>
                    <span>&nbsp;</span>
                  </span>
                );
              })}
            </span>
          ))}
        </h1>
        <div style={{ marginTop: 'clamp(24px,3vw,38px)', pointerEvents: 'auto',
          opacity: revealed ? 1 : 0, transform: revealed ? 'none' : 'translateY(10px)',
          transition: 'opacity 1.4s var(--ease-lux) 1s, transform 1.4s var(--ease-lux) 1s' }}>
          <Button variant="light" onClick={() => onBook && onBook()}>Book your stay</Button>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 'clamp(28px,5vh,54px)', display: 'flex', justifyContent: 'center',
        opacity: revealed ? 1 : 0, transition: 'opacity 1.4s ease 1.4s' }}>
        <ScrollCue onDark />
      </div>
    </section>
  );
}

/* ---------- INTRO STATEMENT ---------- */
function Intro() {
  return (
    <section style={{ padding: 'clamp(72px,10vw,150px) 0' }}>
      <div className="wrap">
        <Reveal>
          <p style={{
            fontFamily: "'Wasted Vindey','Cormorant Garamond',serif", fontWeight: 400,
            fontSize: 'clamp(1.6rem,1rem+2vw,2.8rem)', lineHeight: 1.28, letterSpacing: '-0.005em',
            color: 'var(--ink)', maxWidth: 'min(920px,92vw)', margin: 0, textWrap: 'pretty',
          }}>
            Maren redefines destination living with an evolving ensemble of private villas, designed in harmony with their fabled locations.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="lead" style={{ marginTop: 'clamp(26px,3.5vw,44px)', maxWidth: 'min(640px,92vw)' }}>
            Impeccably appointed residences set the scene for rarefied experiences, realised through five-star service tailored only to you.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- PHILOSOPHY (image + text) ---------- */
function Philosophy() {

  return (
    <section style={{ padding: '0 0 clamp(80px,12vw,160px)' }}>
      <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 'clamp(32px,5vw,88px)', alignItems: 'center' }}>
        <Reveal>
          <div style={{ position: 'relative', aspectRatio: '4 / 5', boxShadow: 'var(--shadow-photo)' }}>
            <img src="/images/philosophy.jpg" alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <SectionHeading eyebrow="Our philosophy" size="d3"
            title="Nature, architecture and understated luxury converge"
            lead="Immersive sanctuaries offer space to breathe, reflect, and reconnect. With every detail considered and five-star service intuitively delivered, Maren reimagines destination living as a deeply personal and effortlessly elevated experience.">
            <LinkArrow href="#about">Discover our philosophy</LinkArrow>
          </SectionHeading>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- VILLAS ---------- */
function Villas({ onBook }) {

  const villas = [
    { name: 'Maren Zilé', meta: '6 bedrooms · St Barth', id: 'villa-zile' },
    { name: 'Maren Grey', meta: '10 bedrooms · Ibiza', id: 'villa-grey' },
    { name: 'Maren Reva', meta: '6 bedrooms · St Barth', id: 'villa-reva', badge: 'Opening Nov 2026' },
  ];
  return (
    <section style={{ background: 'var(--cream-2)', padding: 'clamp(80px,12vw,160px) 0' }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 'clamp(32px,5vw,72px)', alignItems: 'end', marginBottom: 'clamp(44px,6vw,80px)' }}>
          <Reveal>
            <SectionHeading eyebrow="Villas" size="d1"
              title="Architectural sanctuaries designed for destination living" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead" style={{ maxWidth: '46ch' }}>
              Conceived with leading architects, each villa is an architectural statement of balance and beauty, thoughtfully placed within its landscape and designed entirely around your way of life.
            </p>
          </Reveal>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 'clamp(20px,3vw,40px)' }}>
          {villas.map((v, i) => (
            <Reveal key={v.name} delay={i * 0.08}>
              <VillaCard name={v.name} meta={v.meta} badge={v.badge}
                slotId={v.id} slotSrc={`/images/${v.id}.jpg`} slotPlaceholder={`${v.name} · exterior + pool at golden hour (4:3, 1600×1200)`}
                ratio="4 / 3" onClick={(e) => e.preventDefault()} />
              <div style={{ marginTop: '18px' }}>
                {v.badge
                  ? <span style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--taupe)' }}>Coming soon</span>
                  : <Button variant="outline" size="sm" onClick={() => onBook && onBook({ villaId: v.id })}>Book now</Button>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export { Hero, Intro, Philosophy, Villas };
