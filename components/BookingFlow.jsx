"use client";
import React from "react";
import { Wordmark } from "./ui/Wordmark.jsx";
import { Button } from "./ui/Button.jsx";

/* Maren — full-screen multi-step booking flow (mock).
   Steps: Stay → Residence → Enhancements → Details → Confirmed.
   Exposes window.BookingFlow. Self-contained, token-styled, no cramped popovers. */

const VILLAS = [
  { id: 'villa-zile', name: 'Maren Zilé', place: 'St Barth', beds: 6, rate: 8900, img: '/images/villa-zile.jpg',
    blurb: 'A teak-and-glass pavilion above the Caribbean, with a long infinity pool and gardens.' },
  { id: 'villa-grey', name: 'Maren Grey', place: 'Ibiza', beds: 10, rate: 12400, img: '/images/villa-grey.jpg',
    blurb: 'A cliffside estate in pale stone, cantilevered over a turquoise pool and the sea.' },
  { id: 'villa-reva', name: 'Maren Reva', place: 'St Barth', beds: 6, rate: 0, img: '/images/villa-reva.jpg',
    blurb: 'A stone sanctuary framed by palms. Opening November 2026.', soon: true },
];
const EXTRAS = [
  { id: 'chef', name: 'Private chef', note: 'Menus built around your table', price: 650, unit: 'night' },
  { id: 'spa', name: 'Daily spa ritual', note: 'In-villa treatments each morning', price: 290, unit: 'night' },
  { id: 'transfer', name: 'Private airport transfer', note: 'Chauffeured, both ways', price: 420, unit: 'once' },
  { id: 'sail', name: 'Sunset sail', note: 'A private catamaran evening', price: 1800, unit: 'once' },
  { id: 'provisions', name: 'Pre-stocked provisions', note: 'Your kitchen, ready on arrival', price: 500, unit: 'once' },
];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DOW = ['S','M','T','W','T','F','S'];
const money = (n) => '$' + n.toLocaleString('en-US');

function BookingFlow({ open, onClose, seed }) {

  const [step, setStep] = React.useState(0);
  const [villaId, setVillaId] = React.useState(null);
  const [range, setRange] = React.useState({ start: null, end: null });
  const [guests, setGuests] = React.useState({ adults: 2, children: 0 });
  const [extras, setExtras] = React.useState({});
  const [form, setForm] = React.useState({ name: '', email: '', phone: '', notes: '' });
  const [dir, setDir] = React.useState(1);
  const scrollRef = React.useRef(null);
  const go = (n) => { setDir(n > step ? 1 : -1); setStep(n); };

  React.useEffect(() => {
    if (!open) return;
    setStep(0); setDir(1);
    if (seed && seed.villaId) setVillaId(seed.villaId);
  }, [open, seed]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  React.useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0; }, [step]);

  const villa = VILLAS.find((v) => v.id === villaId) || null;
  const nights = range.start && range.end ? Math.max(1, Math.round((range.end - range.start) / 86400000)) : 0;
  const lodging = villa && nights ? villa.rate * nights : 0;
  const extrasTotal = EXTRAS.reduce((s, e) => {
    if (!extras[e.id]) return s;
    return s + (e.unit === 'night' ? e.price * (nights || 1) : e.price);
  }, 0);
  const total = lodging + extrasTotal;

  const steps = ['Stay', 'Residence', 'Enhancements', 'Details'];
  const canNext = [
    range.start && range.end,
    !!villa && !villa.soon,
    true,
    form.name && /.+@.+/.test(form.email),
  ][step];

  const confirmed = step === 4;
  const code = React.useMemo(() => 'MRN-' + Math.random().toString(36).slice(2, 7).toUpperCase(), [confirmed]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 400, background: 'var(--cream)',
      opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
      transition: 'opacity .5s var(--ease-lux)', display: 'flex', overflow: 'hidden',
    }}>
      {confirmed ? (
        <Confirmed code={code} villa={villa} range={range} nights={nights} guests={guests} total={total} onClose={onClose} />
      ) : (
        <>
          {/* LEFT — form column */}
          <div ref={scrollRef} style={{ flex: '1 1 auto', height: '100%', overflowY: 'auto', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: '1 1 auto', width: '100%', maxWidth: '680px', margin: '0 auto', padding: 'clamp(18px,2.6vh,34px) clamp(22px,5vw,64px) 100px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'clamp(18px,3vh,34px)' }}>
                <Wordmark size="1.1rem" />
                <div style={{ width: '44px' }} />
              </div>

              <Stepper steps={steps} step={step} onGo={(i) => i < step && go(i)} />

              <div key={step} style={{ marginTop: 'clamp(22px,3.4vh,44px)', animation: `bfStep${dir > 0 ? 'Fwd' : 'Back'} .6s var(--ease-lux)` }}>
                {step === 0 && <StepStay {...{ range, setRange, guests, setGuests }} />}
                {step === 1 && <StepResidence {...{ villaId, setVillaId, nights }} />}
                {step === 2 && <StepExtras {...{ extras, setExtras, nights }} />}
                {step === 3 && <StepDetails {...{ form, setForm }} />}
              </div>
            </div>

            {/* sticky action bar */}
            <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 5,
              background: 'linear-gradient(to top, var(--cream) 62%, rgba(244,241,234,0))', pointerEvents: 'none' }}>
              <div style={{ maxWidth: '680px', margin: '0 auto', padding: '18px clamp(22px,5vw,64px) 26px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', pointerEvents: 'auto' }}>
                <button onClick={() => (step === 0 ? onClose() : go(step - 1))} style={ghostBtn}>
                  {step === 0 ? 'Cancel' : '‹ Back'}
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  {total > 0 && (
                    <div style={{ textAlign: 'right', lineHeight: 1.15 }}>
                      <div style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--taupe)' }}>Estimated total</div>
                      <div style={{ fontFamily: "'EB Garamond',serif", fontSize: '1.35rem', color: 'var(--ink)' }}>{money(total)}</div>
                    </div>
                  )}
                  <button onClick={() => go(step + 1)} disabled={!canNext} style={{ ...primaryBtn, opacity: canNext ? 1 : 0.4, cursor: canNext ? 'pointer' : 'not-allowed' }}>
                    {step === 3 ? 'Confirm reservation' : 'Continue'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — summary + image (desktop) */}
          <SummaryPanel villa={villa} range={range} nights={nights} guests={guests} extras={extras} lodging={lodging} extrasTotal={extrasTotal} total={total} />

          {/* persistent, always-visible close — sits above both columns */}
          <button onClick={onClose} aria-label="Close booking" style={{
            position: 'fixed', top: 'clamp(18px,2.4vw,30px)', right: 'clamp(18px,2.4vw,30px)', zIndex: 20,
            width: '46px', height: '46px', borderRadius: '999px', cursor: 'pointer',
            display: 'grid', placeItems: 'center', color: 'var(--on-dark)',
            background: 'rgba(20,17,13,.42)', border: '1px solid rgba(251,250,246,.34)',
            backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', transition: 'background .3s ease, transform .3s ease',
          }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(20,17,13,.7)'; e.currentTarget.style.transform = 'rotate(90deg)'; }}
             onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(20,17,13,.42)'; e.currentTarget.style.transform = 'none'; }}>
            <span style={{ position: 'relative', width: '17px', height: '17px', display: 'inline-block' }}>
              <span style={{ position: 'absolute', top: '8px', left: 0, width: '17px', height: '1.5px', background: 'currentColor', transform: 'rotate(45deg)' }} />
              <span style={{ position: 'absolute', top: '8px', left: 0, width: '17px', height: '1.5px', background: 'currentColor', transform: 'rotate(-45deg)' }} />
            </span>
          </button>
        </>
      )}
      <style>{`@keyframes bfStepFwd{from{opacity:0;transform:translateX(28px)}to{opacity:1;transform:none}}@keyframes bfStepBack{from{opacity:0;transform:translateX(-28px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}

/* ---------------- shared styles ---------------- */
const closeBtn = { background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Jost',sans-serif", fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--taupe)' };
const ghostBtn = { background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Jost',sans-serif", fontSize: '0.74rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-2)' };
const primaryBtn = { background: 'var(--ink)', color: 'var(--on-dark)', border: 'none', padding: '16px 32px', fontFamily: "'Jost',sans-serif", fontSize: '0.74rem', letterSpacing: '0.16em', textTransform: 'uppercase', borderRadius: 'var(--r-xs)', transition: 'background .4s var(--ease-lux), opacity .3s ease' };
const stepTitle = { fontFamily: "'Wasted Vindey',serif", fontWeight: 400, fontSize: 'clamp(1.7rem,1.1rem+1.5vw,2.4rem)', lineHeight: 1.06, color: 'var(--ink)', margin: '0 0 6px', textWrap: 'pretty' };
const stepSub = { fontFamily: "'EB Garamond',serif", fontSize: '1.02rem', color: 'var(--ink-2)', margin: '0 0 clamp(18px,2.6vh,30px)' };
const fieldLabel = { display: 'block', fontFamily: "'Jost',sans-serif", fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--taupe)', marginBottom: '10px' };

/* ---------------- stepper ---------------- */
function Stepper({ steps, step, onGo }) {
  return (
    <div style={{ display: 'flex', gap: 'clamp(10px,2vw,26px)', alignItems: 'center', flexWrap: 'wrap' }}>
      {steps.map((s, i) => {
        const done = i < step, on = i === step;
        return (
          <div key={s} onClick={() => onGo(i)} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: done ? 'pointer' : 'default' }}>
            <span style={{ width: '26px', height: '26px', borderRadius: '999px', display: 'grid', placeItems: 'center',
              border: '1px solid ' + (on || done ? 'var(--bronze)' : 'var(--line)'),
              background: done ? 'var(--bronze)' : 'transparent', color: done ? 'var(--on-dark)' : on ? 'var(--bronze-deep)' : 'var(--taupe-2)',
              fontFamily: "'Jost',sans-serif", fontSize: '0.7rem', transition: 'all .3s ease' }}>{done ? '✓' : i + 1}</span>
            <span style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.66rem', letterSpacing: '0.16em', textTransform: 'uppercase',
              color: on ? 'var(--ink)' : 'var(--taupe)', transition: 'color .3s ease' }}>{s}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- step 0 : stay ---------------- */
function StepStay({ range, setRange, guests, setGuests }) {
  const [view, setView] = React.useState(() => { const d = new Date(); return { y: d.getFullYear(), m: d.getMonth() }; });
  const nights = range.start && range.end ? Math.max(1, Math.round((range.end - range.start) / 86400000)) : 0;
  function pick(day, my) {
    const d = new Date(my.y, my.m, day);
    setRange((r) => {
      if (!r.start || (r.start && r.end)) return { start: d, end: null };
      if (d <= r.start) return { start: d, end: null };
      return { start: r.start, end: d };
    });
  }
  const next = { y: view.m === 11 ? view.y + 1 : view.y, m: (view.m + 1) % 12 };
  return (
    <div style={{ animation: 'bfIn .5s var(--ease-lux)' }}>
      <h2 style={stepTitle}>When would you like to arrive?</h2>
      <p style={stepSub}>Select your arrival and departure. Rates and availability update as you choose.</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <CalArrow dir="left" onClick={() => setView((v) => ({ y: v.m === 0 ? v.y - 1 : v.y, m: (v.m + 11) % 12 }))} />
        <span style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--taupe)' }}>
          {nights ? `${nights} night${nights !== 1 ? 's' : ''} selected` : 'Choose your dates'}
        </span>
        <CalArrow dir="right" onClick={() => setView((v) => ({ y: v.m === 11 ? v.y + 1 : v.y, m: (v.m + 1) % 12 }))} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: 'clamp(18px,3vw,40px)' }}>
        <Month my={view} range={range} onPick={pick} />
        <Month my={next} range={range} onPick={pick} />
      </div>
      <div style={{ marginTop: 'clamp(18px,2.6vh,30px)', borderTop: '1px solid var(--line-2)', paddingTop: 'clamp(14px,2vh,24px)' }}>
        <span style={fieldLabel}>Guests</span>
        <Stepper2 label="Adults" value={guests.adults} min={1} onChange={(v) => setGuests((g) => ({ ...g, adults: v }))} />
        <Stepper2 label="Children" value={guests.children} min={0} onChange={(v) => setGuests((g) => ({ ...g, children: v }))} />
      </div>
      <style>{`@keyframes bfIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}
function Month({ my, range, onPick }) {
  const first = new Date(my.y, my.m, 1).getDay();
  const days = new Date(my.y, my.m + 1, 0).getDate();
  const cells = []; for (let i = 0; i < first; i++) cells.push(null); for (let d = 1; d <= days; d++) cells.push(d);
  const asDate = (d) => new Date(my.y, my.m, d);
  const inRange = (d) => { if (!d || !range.start) return false; const x = asDate(d); return range.end ? x >= range.start && x <= range.end : +x === +range.start; };
  const isEdge = (d) => { if (!d || !range.start) return false; const x = asDate(d); return +x === +range.start || (range.end && +x === +range.end); };
  return (
    <div>
      <div style={{ fontFamily: "'EB Garamond',serif", fontSize: '1.05rem', color: 'var(--ink)', marginBottom: '8px' }}>{MONTHS[my.m]} {my.y}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', marginBottom: '4px' }}>
        {DOW.map((d, i) => <span key={i} style={{ textAlign: 'center', fontSize: '0.58rem', letterSpacing: '0.08em', color: 'var(--taupe-2)' }}>{d}</span>)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '2px' }}>
        {cells.map((d, i) => (
          <button key={i} disabled={!d} onClick={() => onPick(d, my)} style={{
            aspectRatio: '1', border: 'none', cursor: d ? 'pointer' : 'default',
            background: isEdge(d) ? 'var(--ink)' : inRange(d) ? 'rgba(166,131,90,0.15)' : 'transparent',
            color: isEdge(d) ? 'var(--on-dark)' : d ? 'var(--ink-2)' : 'transparent',
            borderRadius: isEdge(d) ? 'var(--r-xs)' : 0,
            fontFamily: "'EB Garamond',serif", fontSize: '0.92rem', transition: 'background .2s ease' }}>{d || ''}</button>
        ))}
      </div>
    </div>
  );
}
function CalArrow({ dir, onClick }) {
  return <button onClick={onClick} aria-label={dir} style={{ width: '38px', height: '38px', border: '1px solid var(--line)', background: 'transparent', cursor: 'pointer', color: 'var(--ink)', fontSize: '1rem', borderRadius: 'var(--r-xs)' }}>{dir === 'left' ? '‹' : '›'}</button>;
}
function Stepper2({ label, value, onChange, min = 0 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid var(--line-2)' }}>
      <span style={{ fontFamily: "'EB Garamond',serif", fontSize: '1.1rem', color: 'var(--ink)' }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
        <Round onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min}>−</Round>
        <span style={{ minWidth: '20px', textAlign: 'center', fontFamily: "'EB Garamond',serif", fontSize: '1.1rem' }}>{value}</span>
        <Round onClick={() => onChange(value + 1)}>+</Round>
      </div>
    </div>
  );
}
function Round({ children, onClick, disabled }) {
  return <button onClick={onClick} disabled={disabled} style={{ width: '36px', height: '36px', borderRadius: '999px', border: '1px solid var(--line)', background: 'transparent', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1, color: 'var(--ink)', fontSize: '1.05rem' }}>{children}</button>;
}

/* ---------------- step 1 : residence ---------------- */
function StepResidence({ villaId, setVillaId, nights }) {
  return (
    <div style={{ animation: 'bfIn .5s var(--ease-lux)' }}>
      <h2 style={stepTitle}>Choose your residence</h2>
      <p style={stepSub}>Each Maren villa is a world of its own. Select the one that calls to you.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {VILLAS.map((v) => {
          const on = v.id === villaId;
          return (
            <button key={v.id} onClick={() => !v.soon && setVillaId(v.id)} disabled={v.soon} style={{
              display: 'grid', gridTemplateColumns: '132px 1fr', gap: '18px', textAlign: 'left', padding: 0, overflow: 'hidden',
              background: 'var(--shell)', border: '1px solid ' + (on ? 'var(--bronze)' : 'var(--line)'),
              borderRadius: 'var(--r-sm)', cursor: v.soon ? 'not-allowed' : 'pointer', opacity: v.soon ? 0.62 : 1,
              boxShadow: on ? 'var(--shadow-md)' : 'none', transition: 'border-color .3s ease, box-shadow .4s ease' }}>
              <div style={{ position: 'relative', width: '132px', height: '124px', background: 'var(--cream-3)' }}>
                <img src={v.img} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '16px 18px 16px 0', minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '10px' }}>
                  <span style={{ fontFamily: "'Wasted Vindey',serif", fontSize: '1.5rem', color: 'var(--ink)', lineHeight: 1 }}>{v.name}</span>
                  {!v.soon && <span style={{ fontFamily: "'EB Garamond',serif", fontSize: '1rem', color: 'var(--bronze-deep)', whiteSpace: 'nowrap' }}>{money(v.rate)}<span style={{ fontSize: '0.72rem', color: 'var(--taupe)' }}> / night</span></span>}
                </div>
                <div style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--taupe)', margin: '7px 0 9px' }}>{v.beds} bedrooms · {v.place}{v.soon ? ' · Opening Nov 2026' : ''}</div>
                <p style={{ fontFamily: "'EB Garamond',serif", fontSize: '0.95rem', lineHeight: 1.5, color: 'var(--ink-2)', margin: 0 }}>{v.blurb}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- step 2 : enhancements ---------------- */
function StepExtras({ extras, setExtras, nights }) {
  return (
    <div style={{ animation: 'bfIn .5s var(--ease-lux)' }}>
      <h2 style={stepTitle}>Curate your stay</h2>
      <p style={stepSub}>Optional touches, arranged before you arrive. Add as many or as few as you like.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {EXTRAS.map((e) => {
          const on = !!extras[e.id];
          return (
            <button key={e.id} onClick={() => setExtras((x) => ({ ...x, [e.id]: !x[e.id] }))} style={{
              display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left', padding: '18px 20px',
              background: on ? 'rgba(166,131,90,0.06)' : 'var(--shell)', border: '1px solid ' + (on ? 'var(--bronze)' : 'var(--line)'),
              borderRadius: 'var(--r-sm)', cursor: 'pointer', transition: 'all .3s ease' }}>
              <span style={{ width: '24px', height: '24px', borderRadius: '999px', flexShrink: 0, display: 'grid', placeItems: 'center',
                border: '1px solid ' + (on ? 'var(--bronze)' : 'var(--line)'), background: on ? 'var(--bronze)' : 'transparent',
                color: 'var(--on-dark)', fontSize: '0.7rem', transition: 'all .3s ease' }}>{on ? '✓' : ''}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "'EB Garamond',serif", fontSize: '1.12rem', color: 'var(--ink)' }}>{e.name}</div>
                <div style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.68rem', letterSpacing: '0.04em', color: 'var(--taupe)', marginTop: '3px' }}>{e.note}</div>
              </div>
              <span style={{ fontFamily: "'EB Garamond',serif", fontSize: '1rem', color: 'var(--ink)', whiteSpace: 'nowrap' }}>{money(e.price)}<span style={{ fontSize: '0.72rem', color: 'var(--taupe)' }}> / {e.unit === 'night' ? 'night' : 'stay'}</span></span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- step 3 : details ---------------- */
function StepDetails({ form, setForm }) {
  return (
    <div style={{ animation: 'bfIn .5s var(--ease-lux)' }}>
      <h2 style={stepTitle}>Your details</h2>
      <p style={stepSub}>A dedicated host will confirm every detail with you personally.</p>
      <div style={{ display: 'grid', gap: '22px' }}>
        <BField label="Full name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '22px' }}>
          <BField label="E-mail" type="email" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} />
          <BField label="Phone" type="tel" value={form.phone} onChange={(v) => setForm((f) => ({ ...f, phone: v }))} />
        </div>
        <BField label="Anything we should know? (optional)" area value={form.notes} onChange={(v) => setForm((f) => ({ ...f, notes: v }))} />
      </div>
    </div>
  );
}
function BField({ label, value, onChange, type = 'text', area }) {
  const [focus, setFocus] = React.useState(false);
  const base = { width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid ' + (focus ? 'var(--bronze)' : 'var(--line)'), padding: '10px 0', fontFamily: "'EB Garamond',serif", fontSize: '1.12rem', color: 'var(--ink)', outline: 'none', transition: 'border-color .3s ease', resize: 'none' };
  return (
    <label style={{ display: 'block' }}>
      <span style={fieldLabel}>{label}</span>
      {area
        ? <textarea rows={3} value={value} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} onChange={(e) => onChange(e.target.value)} style={base} />
        : <input type={type} value={value} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} onChange={(e) => onChange(e.target.value)} style={base} />}
    </label>
  );
}

/* ---------------- summary panel (right) ---------------- */
function SummaryPanel({ villa, range, nights, guests, extras, lodging, extrasTotal, total }) {
  const fmt = (d) => d ? `${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)}` : '—';
  const chosen = EXTRAS.filter((e) => extras[e.id]);
  return (
    <aside className="bf-summary" style={{ position: 'relative', width: 'clamp(320px,34vw,460px)', height: '100%', flexShrink: 0, color: 'var(--on-image)', overflow: 'hidden' }}>
      <img src="/images/booking-bg.jpg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(20,17,13,.5), rgba(20,17,13,.72))' }} />
      <div style={{ position: 'relative', height: '100%', overflowY: 'auto', padding: 'clamp(36px,3vw,56px) clamp(28px,2.4vw,44px)' }}>
        <div style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.6rem', letterSpacing: '0.26em', textTransform: 'uppercase', opacity: 0.8, marginBottom: '18px' }}>Your reservation</div>
        <div style={{ fontFamily: "'Wasted Vindey',serif", fontSize: '2rem', lineHeight: 1.1, marginBottom: '26px' }}>{villa ? villa.name : 'A Maren villa'}</div>
        <SumRow k="Destination" v={villa ? villa.place : '—'} />
        <SumRow k="Arrival" v={fmt(range.start)} />
        <SumRow k="Departure" v={fmt(range.end)} />
        <SumRow k="Guests" v={`${guests.adults + guests.children} guest${guests.adults + guests.children !== 1 ? 's' : ''}`} />
        {villa && nights > 0 && <SumRow k={`${money(villa.rate)} × ${nights} night${nights !== 1 ? 's' : ''}`} v={money(lodging)} />}
        {chosen.map((e) => <SumRow key={e.id} k={e.name} v={money(e.unit === 'night' ? e.price * (nights || 1) : e.price)} light />)}
        <div style={{ borderTop: '1px solid rgba(251,250,246,0.25)', marginTop: '20px', paddingTop: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.66rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.85 }}>Estimated total</span>
          <span style={{ fontFamily: "'Wasted Vindey',serif", fontSize: '1.9rem' }}>{total ? money(total) : '—'}</span>
        </div>
        <p style={{ fontFamily: "'EB Garamond',serif", fontStyle: 'italic', fontSize: '0.9rem', opacity: 0.72, marginTop: '18px', lineHeight: 1.5 }}>No payment is taken now. Your host confirms every detail before anything is charged.</p>
      </div>
    </aside>
  );
}
function SumRow({ k, v, light }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '14px', padding: '9px 0', borderBottom: '1px solid rgba(251,250,246,0.14)' }}>
      <span style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.66rem', letterSpacing: '0.14em', textTransform: 'uppercase', opacity: light ? 0.62 : 0.8 }}>{k}</span>
      <span style={{ fontFamily: "'EB Garamond',serif", fontSize: '1rem', textAlign: 'right' }}>{v}</span>
    </div>
  );
}

/* ---------------- confirmation ---------------- */
function Confirmed({ code, villa, range, nights, guests, total, onClose }) {

  const fmt = (d) => d ? `${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)}` : '—';
  return (
    <div style={{ width: '100%', height: '100%', overflowY: 'auto', display: 'grid', placeItems: 'center', padding: '40px 22px', textAlign: 'center' }}>
      <div style={{ maxWidth: '560px', animation: 'bfIn .7s var(--ease-lux)' }}>
        <div style={{ width: '78px', height: '78px', margin: '0 auto 30px', borderRadius: '999px', border: '1px solid var(--bronze)', display: 'grid', placeItems: 'center', animation: 'bfSeal .8s var(--ease-lux)' }}>
          <span style={{ color: 'var(--bronze-deep)', fontSize: '2rem' }}>✓</span>
        </div>
        <div style={{ marginBottom: '18px' }}><Wordmark size="1.1rem" /></div>
        <p className="signature" style={{ fontSize: '3rem', color: 'var(--bronze-deep)', margin: '0 0 10px', lineHeight: 1 }}>Thank you</p>
        <h2 style={{ fontFamily: "'Wasted Vindey',serif", fontWeight: 400, fontSize: 'clamp(1.8rem,1.2rem+1.8vw,2.7rem)', color: 'var(--ink)', lineHeight: 1.1, margin: '0 0 20px', textWrap: 'pretty' }}>
          Your stay is reserved
        </h2>
        <p className="lead" style={{ marginInline: 'auto', maxWidth: '46ch' }}>
          A dedicated host is preparing your itinerary and will be in touch within a day to confirm every detail of your arrival.
        </p>
        <div style={{ margin: '34px auto 0', maxWidth: '420px', background: 'var(--shell)', border: '1px solid var(--line)', borderRadius: 'var(--r-sm)', padding: '24px 28px', textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
            <span style={fieldLabel}>Confirmation</span>
            <span style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.8rem', letterSpacing: '0.14em', color: 'var(--bronze-deep)' }}>{code}</span>
          </div>
          <SumRowLight k="Residence" v={villa ? villa.name : '—'} />
          <SumRowLight k="Dates" v={`${fmt(range.start)} — ${fmt(range.end)} · ${nights} night${nights !== 1 ? 's' : ''}`} />
          <SumRowLight k="Guests" v={`${guests.adults + guests.children}`} />
          <SumRowLight k="Estimated total" v={total ? money(total) : '—'} last />
        </div>
        <div style={{ marginTop: '34px' }}><Button variant="solid" onClick={onClose}>Return to Maren</Button></div>
      </div>
      <style>{`@keyframes bfSeal{0%{transform:scale(.6);opacity:0}60%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}`}</style>
    </div>
  );
}
function SumRowLight({ k, v, last }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '14px', padding: '9px 0', borderBottom: last ? 'none' : '1px solid var(--line-2)' }}>
      <span style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.64rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--taupe)' }}>{k}</span>
      <span style={{ fontFamily: "'EB Garamond',serif", fontSize: '1rem', color: 'var(--ink)', textAlign: 'right' }}>{v}</span>
    </div>
  );
}

export { BookingFlow };
