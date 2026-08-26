"use client";
import React from "react";
import { Reveal } from "../Reveal.jsx";
import { SectionHeading } from "../ui/SectionHeading.jsx";
import { LinkArrow } from "../ui/LinkArrow.jsx";
import { Eyebrow } from "../ui/Eyebrow.jsx";
import { ExperienceTile } from "../ui/ExperienceTile.jsx";
import { StaffPolaroid } from "../ui/StaffPolaroid.jsx";
import { Button } from "../ui/Button.jsx";

/* Maren website — bottom sections: Destinations, Experiences, Meet, Concierge, Booking, Footer */

/* ---------- DESTINATIONS (full-bleed panels) ---------- */
function Destinations() {

  const panels = [
    { id: 'dest-stbarth', eyebrow: 'St Barth', title: 'The spirit of St Barth, elevated',
      copy: "Perched above the Caribbean's most storied shores, Maren St Barth captures the island's effortless glamour and natural rhythm — refined living in perfect harmony with its surroundings.",
      ph: 'DESTINATION · aerial turquoise shoreline, waves on pale sand (16:9, 2560×1440)' },
    { id: 'dest-ibiza', eyebrow: 'Ibiza', title: 'A quieter side of Ibiza, made yours',
      copy: 'Set above the southern coastline, Maren Ibiza offers a refined escape from the island’s energy. In Es Cubells, serenity, culture, and effortless beauty meet in perfect, sunlit balance.',
      ph: 'DESTINATION · rugged Mediterranean cliffs meeting the sea at dusk (16:9, 2560×1440)' },
  ];
  return (
    <section>
      <div className="wrap" style={{ paddingTop: 'clamp(80px,12vw,150px)', paddingBottom: 'clamp(36px,5vw,64px)' }}>
        <Reveal><SectionHeading eyebrow="Destinations" size="d1" maxWidth="min(760px,66vw)"
          title="Fabled locations chosen for their innate charisma" /></Reveal>
      </div>
      {panels.map((p, i) => (
        <div key={p.id} style={{ position: 'relative', height: 'clamp(520px,82vh,860px)', overflow: 'hidden' }}>
          <img src={`/images/${p.id}.jpg`} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'linear-gradient(to top left, rgba(18,15,11,.68) 0%, rgba(18,15,11,.34) 42%, rgba(18,15,11,.05) 72%, rgba(18,15,11,0) 100%)' }} />
          <Reveal style={{ position: 'absolute', right: 'clamp(20px,6vw,110px)', bottom: 'clamp(48px,8vw,110px)', maxWidth: 'min(460px,82vw)' }}>
            <SectionHeading eyebrow={p.eyebrow} onDark size="d3" title={p.title} lead={p.copy}>
              <LinkArrow href="#" onDark>Explore our destinations</LinkArrow>
            </SectionHeading>
          </Reveal>
        </div>
      ))}
    </section>
  );
}

/* ---------- EXPERIENCES ---------- */
function Experiences() {

  const tiles = [
    { id: 'exp-dining', title: 'Gastronomy', caption: 'Private chefs and menus built around your table.' },
    { id: 'exp-wellness', title: 'Wellness', caption: 'Serene spa rituals and your personal padel court.' },
    { id: 'exp-celebrate', title: 'Celebrations', caption: 'Gatherings that leave a lasting impression.' },
  ];
  return (
    <section style={{ background: 'var(--cream-2)', padding: 'clamp(80px,12vw,160px) 0' }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 'clamp(32px,5vw,80px)', alignItems: 'center', marginBottom: 'clamp(44px,6vw,80px)' }}>
          <Reveal>
            <Eyebrow>Experiences</Eyebrow>
            <p style={{ marginTop: '22px', fontFamily: "'Wasted Vindey',serif", fontSize: 'clamp(1.9rem,1.2rem+2.2vw,3rem)', lineHeight: 1.18, color: 'var(--ink)', textWrap: 'pretty' }}>
              Every Maren experience is made to measure — all shaped around the way you live, gather, and host.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div style={{ position: 'relative', aspectRatio: '4 / 3', boxShadow: 'var(--shadow-photo)' }}>
              <img src="/images/exp-hero.jpg" alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </Reveal>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 'clamp(16px,2.5vw,28px)', marginBottom: 'clamp(36px,5vw,56px)' }}>
          {tiles.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.08}>
              <ExperienceTile title={t.title} caption={t.caption} slotId={t.id} slotSrc={`/images/${t.id}.jpg`}
                slotPlaceholder={`${t.title} · ${t.caption} (3:4, 1200×1600)`} />
            </Reveal>
          ))}
        </div>
        <Reveal><LinkArrow href="#">Explore the possibilities</LinkArrow></Reveal>
      </div>
    </section>
  );
}

/* ---------- MEET (interactive polaroid gallery — the whole team) ---------- */
const TEAM = [
  { key: 'founder', name: 'Élise Marchand', role: 'Founder', slot: 'founder', src: '/images/founder.jpg', bio: 'A restless eye for place and detail, Élise founded Maren to make destination living feel personal again.' },
  { key: 'host', name: 'Tomás Rivera', role: 'Head of Guest Experience', slot: 'host', src: '/images/host.jpg', bio: 'Tomás anticipates the small things before they become questions — the quiet architecture of a perfect stay.' },
  { key: 'chef', name: 'Julien Rey', role: 'Executive Chef', slot: 'chef-2', src: '/images/chef.jpg', bio: 'One of the leading voices in contemporary coastal cuisine, Julien blends tradition with a modern hand.' },
];

function Meet() {

  const [active, setActive] = React.useState(1);
  const [wide, setWide] = React.useState(false);
  React.useEffect(() => {
    const check = () => setWide(window.innerWidth >= 960);
    check(); window.addEventListener('resize', check); return () => window.removeEventListener('resize', check);
  }, []);

  const Controls = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', alignItems: wide ? 'flex-start' : 'center' }}>
      {TEAM.map((p, i) => {
        const on = i === active;
        return (
          <button key={p.key} onClick={() => setActive(i)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '11px 0', textAlign: wide ? 'left' : 'center',
              display: 'flex', flexDirection: 'column', gap: '7px', alignItems: wide ? 'flex-start' : 'center', width: wide ? '100%' : 'auto' }}>
            <span style={{ fontFamily: "'Jost',sans-serif", fontSize: wide ? '0.82rem' : '0.76rem', letterSpacing: '0.18em', textTransform: 'uppercase',
              color: on ? 'var(--ink)' : 'var(--taupe)', transition: 'color .3s ease', whiteSpace: 'nowrap' }}>{p.role}</span>
            <span style={{ width: on ? (wide ? '56px' : '100%') : '0px', height: '1px', background: 'var(--bronze)', transition: 'width .5s var(--ease-lux)' }} />
          </button>
        );
      })}
    </div>
  );

  if (wide) {
    return (
      <section style={{ padding: 'clamp(90px,12vw,170px) 0' }}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 'clamp(48px,6vw,110px)', alignItems: 'center' }}>
          <Reveal><TeamStage people={TEAM} active={active} /></Reveal>
          <Reveal delay={0.1}>
            <div>
              <Eyebrow>Meet the team</Eyebrow>
              <h2 style={{ marginTop: '22px', fontFamily: "'Wasted Vindey',serif", fontWeight: 400, fontSize: 'var(--fs-d1)', lineHeight: 1.06, color: 'var(--ink)', textWrap: 'pretty', maxWidth: '16ch' }}>
                The hands and hearts behind every stay
              </h2>
              <div style={{ marginTop: '28px', minHeight: '112px' }}>
                <p className="signature" style={{ fontSize: '2rem', color: 'var(--bronze-deep)', margin: '0 0 6px', lineHeight: 1 }}>{TEAM[active].name}</p>
                <p key={active} style={{ fontFamily: "'EB Garamond',serif", fontSize: 'var(--fs-lead)', lineHeight: 1.55, color: 'var(--ink-2)', margin: 0, maxWidth: '42ch', textWrap: 'pretty', animation: 'marenFade .6s var(--ease-lux)' }}>{TEAM[active].bio}</p>
              </div>
              <div style={{ marginTop: '30px', borderTop: '1px solid var(--line-2)', paddingTop: '12px' }}>{Controls}</div>
            </div>
          </Reveal>
        </div>
        <style>{`@keyframes marenFade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`}</style>
      </section>
    );
  }

  return (
    <section style={{ padding: 'clamp(80px,12vw,160px) 0' }}>
      <div className="wrap" style={{ textAlign: 'center', maxWidth: 'min(680px,92vw)', marginInline: 'auto' }}>
        <Reveal><Eyebrow align="center">Meet the team</Eyebrow></Reveal>
        <Reveal delay={0.08}>
          <h2 style={{ marginTop: '22px', fontFamily: "'Wasted Vindey',serif", fontWeight: 400, fontSize: 'var(--fs-d1)', lineHeight: 1.08, color: 'var(--ink)', textWrap: 'pretty' }}>
            The hands and hearts behind every stay
          </h2>
          <p className="lead" style={{ marginTop: '24px', marginInline: 'auto', maxWidth: 'min(560px,92vw)' }}>
            From the kitchen to your welcome, Maren is shaped by people who make the extraordinary feel effortless.
          </p>
        </Reveal>
      </div>
      <div className="wrap" style={{ marginTop: 'clamp(44px,6vw,84px)' }}>
        <TeamStage people={TEAM} active={active} />
        <p key={active} style={{ textAlign: 'center', fontFamily: "'EB Garamond',serif", fontSize: 'var(--fs-lead)', lineHeight: 1.5,
          color: 'var(--ink-2)', margin: 'clamp(28px,4vw,48px) auto 0', maxWidth: 'min(560px,90vw)', textWrap: 'pretty', animation: 'marenFade .6s var(--ease-lux)' }}>{TEAM[active].bio}</p>
        <div style={{ marginTop: 'clamp(24px,3.5vw,40px)', display: 'flex', justifyContent: 'center', gap: 'clamp(22px,4vw,56px)', flexWrap: 'wrap' }}>{Controls}</div>
      </div>
      <style>{`@keyframes marenFade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`}</style>
    </section>
  );
}

/* Overlapping polaroids on a flat surface — display only, driven by `active` */
function TeamStage({ people, active }) {

  const [spread, setSpread] = React.useState(150);
  React.useEffect(() => {
    const check = () => setSpread(window.innerWidth < 720 ? 96 : window.innerWidth < 960 ? 150 : 118);
    check(); window.addEventListener('resize', check); return () => window.removeEventListener('resize', check);
  }, []);
  return (
    <div style={{ position: 'relative', height: 'clamp(440px,54vh,600px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div aria-hidden="true" style={{ position: 'absolute', bottom: 'clamp(30px,6%,64px)', left: '50%', transform: 'translateX(-50%)',
        width: 'min(500px,80%)', height: '44px', background: 'radial-gradient(ellipse, rgba(42,38,32,.16), rgba(42,38,32,0) 70%)', filter: 'blur(5px)' }} />
      {people.map((p, i) => {
        const isActive = i === active;
        const off = i - active;
        const dist = Math.abs(off);
        const ox = isActive ? 0 : Math.sign(off) * spread * (0.6 + dist * 0.4);
        const rot = isActive ? 0 : Math.sign(off) * (5 + dist * 3);
        const lift = isActive ? -16 : 10 + dist * 6;
        const scale = isActive ? 1.04 : 0.86 - dist * 0.03;
        return (
          <div key={p.key} aria-hidden={!isActive}
            style={{
              position: 'absolute', left: '50%', top: '50%', pointerEvents: 'none',
              width: 'clamp(228px,27vw,326px)', willChange: 'transform, opacity',
              transform: `translate(-50%, -50%) translate(${ox}px, ${lift}px) rotate(${rot}deg) scale(${scale})`,
              zIndex: isActive ? 30 : 20 - dist,
              opacity: 1,
              transition: 'transform .85s var(--ease-lux), filter .85s var(--ease-lux)',
              filter: isActive ? 'none' : 'saturate(.9) brightness(.97)',
            }}>
            <StaffPolaroid name={p.name} role={p.role} mark="Maren" slotId={p.slot} slotSrc={p.src} style={{ maxWidth: 'none' }} />
          </div>
        );
      })}
    </div>
  );
}

/* ---------- CONCIERGE (line-motif service section) ---------- */
function Concierge() {

  const items = [
    { n: '01', t: 'A dedicated host', c: 'One point of contact who knows your preferences before you arrive.' },
    { n: '02', t: 'Anticipatory service', c: 'We resolve the small things before they ever become questions.' },
    { n: '03', t: 'Around the clock', c: 'Your team is quietly available, day and night, throughout your stay.' },
  ];
  return (
    <section style={{ position: 'relative', background: 'var(--cream)', padding: 'clamp(80px,12vw,160px) 0', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none',
        backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='600' viewBox='0 0 1200 600'><g fill='none' stroke='%23B4AB9B' stroke-width='1' opacity='0.5'><path d='M-20 420 C 200 360 340 400 520 350 C 720 296 860 330 1080 270 C 1160 248 1220 250 1240 244'/><path d='M-20 470 C 220 420 360 452 560 405 C 760 358 900 388 1100 336'/><path d='M-20 372 C 180 320 300 350 470 310'/></g></svg>\")",
        backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="wrap" style={{ position: 'relative' }}>
        <Reveal><SectionHeading eyebrow="Five-star service" size="d1" maxWidth="min(680px,62vw)"
          title="Service that anticipates, delivered intuitively" /></Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 'clamp(28px,4vw,56px)', marginTop: 'clamp(48px,6vw,88px)' }}>
          {items.map((it, i) => (
            <Reveal key={it.n} delay={i * 0.1}>
              <div style={{ fontFamily: "'Wasted Vindey',serif", fontSize: '2.6rem', color: 'var(--bronze)', lineHeight: 1, marginBottom: '18px' }}>{it.n}</div>
              <h3 style={{ fontFamily: "'Wasted Vindey',serif", fontWeight: 400, fontSize: '1.5rem', color: 'var(--ink)', marginBottom: '12px' }}>{it.t}</h3>
              <p style={{ fontFamily: "'EB Garamond',serif", fontSize: '1.02rem', lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: '32ch' }}>{it.c}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- BOOKING (editorial reservations invitation) ---------- */
function BookingSection({ onBook }) {

  const steps = [
    { n: '01', t: 'Choose your dates', c: 'Arrival, departure, and who joins you.' },
    { n: '02', t: 'Select a residence', c: 'A villa matched to the stay you imagine.' },
    { n: '03', t: 'Curate the details', c: 'Chef, spa, transfers — arranged in advance.' },
  ];
  return (
    <section id="booking" style={{ position: 'relative', overflow: 'hidden', background: 'var(--ink-surface)', color: 'var(--on-dark)' }}>
      <img src="/images/booking-bg.jpg" alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(115deg, rgba(16,13,9,.82) 0%, rgba(16,13,9,.58) 46%, rgba(16,13,9,.30) 100%)' }} />
      <div className="wrap" style={{ position: 'relative', padding: 'clamp(90px,13vw,180px) 0',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 'clamp(40px,6vw,90px)', alignItems: 'center' }}>
        <div>
          <Reveal><Eyebrow onDark>Reservations</Eyebrow></Reveal>
          <Reveal delay={0.06}>
            <h2 style={{ marginTop: '24px', fontFamily: "'Wasted Vindey',serif", fontWeight: 400,
              fontSize: 'var(--fs-d1)', lineHeight: 1.06, color: 'var(--on-dark)', textWrap: 'pretty', maxWidth: '15ch' }}>
              Reserve your stay in minutes
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p style={{ marginTop: '22px', fontFamily: "'EB Garamond',serif", fontSize: 'var(--fs-lead)', lineHeight: 1.6,
              color: 'var(--on-image-mut,rgba(251,250,246,.86))', maxWidth: '46ch' }}>
              No forms to labour over, no payment today. A dedicated host confirms every detail with you personally.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div style={{ marginTop: 'clamp(32px,4vw,44px)', display: 'flex', gap: '22px', flexWrap: 'wrap', alignItems: 'center' }}>
              <Button variant="light" size="lg" onClick={() => onBook && onBook()}>Book your stay</Button>
              <span style={{ fontFamily: "'EB Garamond',serif", fontStyle: 'italic', fontSize: '1.05rem', color: 'var(--on-image-mut,rgba(251,250,246,.8))' }}>or call +590 590 00 00 00</span>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.16}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {steps.map((s, i) => (
              <div key={s.n} style={{ display: 'flex', gap: '22px', alignItems: 'baseline',
                padding: 'clamp(20px,2.6vw,30px) 0', borderTop: i === 0 ? 'none' : '1px solid rgba(251,250,246,0.18)' }}>
                <span style={{ fontFamily: "'Wasted Vindey',serif", fontSize: '1.7rem', color: 'var(--bronze-soft,#C9AE86)', lineHeight: 1, flexShrink: 0 }}>{s.n}</span>
                <div>
                  <div style={{ fontFamily: "'EB Garamond',serif", fontSize: '1.35rem', color: 'var(--on-dark)', marginBottom: '5px' }}>{s.t}</div>
                  <div style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.8rem', letterSpacing: '0.03em', color: 'var(--on-image-mut,rgba(251,250,246,.72))' }}>{s.c}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- FOOTER (stylish oversized sign-off) ---------- */
function Footer({ onBook }) {

  const nav = ['Villas', 'Destinations', 'Experiences', 'The Studio', 'Journal'];
  return (
    <footer style={{ background: 'var(--ink-surface)', color: 'var(--on-dark)', overflow: 'hidden' }}>
      {/* top row — invitation + quick nav + contact, kept light */}
      <div className="wrap" style={{ paddingTop: 'clamp(64px,9vw,120px)', paddingBottom: 'clamp(40px,6vw,72px)',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 'clamp(36px,5vw,72px)', alignItems: 'start' }}>
        <div style={{ maxWidth: '30ch' }}>
          <p className="signature" style={{ fontSize: 'clamp(2.2rem,1.4rem+2vw,3.2rem)', color: 'var(--bronze-soft,#C9AE86)', lineHeight: 1, margin: '0 0 20px' }}>Stay with us</p>
          <p style={{ fontFamily: "'EB Garamond',serif", fontSize: '1.1rem', lineHeight: 1.55, color: 'var(--on-image-mut,rgba(251,250,246,.82))', margin: '0 0 26px' }}>
            Begin your journey into destination living.
          </p>
          <Button variant="light" onClick={onBook}>Book your stay</Button>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {nav.map((l) => (
            <a key={l} href="#" style={{ fontFamily: "'EB Garamond',serif", fontSize: '1.15rem', color: 'var(--on-dark)', opacity: 0.86, width: 'fit-content' }}>{l}</a>
          ))}
        </nav>
        <div style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.74rem', letterSpacing: '0.14em', lineHeight: 2.1, color: 'var(--on-image-mut,rgba(251,250,246,.72))' }}>
          <div style={{ fontSize: '0.62rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: 'var(--on-dark-mut)', marginBottom: '12px' }}>Get in touch</div>
          <a href="#" style={{ color: 'var(--on-dark)', display: 'block' }}>hello@maren.com</a>
          <a href="#" style={{ color: 'var(--on-dark)', display: 'block' }}>+590 590 00 00 00</a>
          <a href="#" style={{ color: 'var(--on-dark)', display: 'block' }}>Instagram</a>
        </div>
      </div>

      {/* oversized wordmark sign-off */}
      <div aria-hidden="true" style={{ position: 'relative', padding: '0 clamp(16px,4vw,40px)', marginTop: 'clamp(8px,2vw,24px)' }}>
        <div style={{ fontFamily: "'Wasted Vindey',serif", fontWeight: 400, textAlign: 'center', lineHeight: 0.8,
          fontSize: 'clamp(5.5rem,26vw,26rem)', letterSpacing: '0.01em',
          color: 'transparent', WebkitTextStroke: '1px rgba(201,174,134,0.5)',
          transform: 'translateY(14%)', userSelect: 'none' }}>Maren</div>
      </div>

      <div className="wrap" style={{ borderTop: '1px solid rgba(167,157,141,0.2)', padding: '22px 0 40px', display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'space-between',
        fontFamily: "'Jost',sans-serif", fontSize: '0.64rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--on-dark-mut)' }}>
        <span>© 2026 Maren. All rights reserved.</span>
        <span>Privacy · Cookies · A design-system demonstration</span>
      </div>
    </footer>
  );
}

export { Destinations, Experiences, Meet, Concierge, BookingSection, Footer };
