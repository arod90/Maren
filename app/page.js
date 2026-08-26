"use client";
import React from "react";
import { Loader } from "@/components/Loader.jsx";
import { TopNav } from "@/components/TopNav.jsx";
import { MenuOverlay } from "@/components/MenuOverlay.jsx";
import { Hero, Intro, Philosophy, Villas } from "@/components/sections/SectionsA.jsx";
import {
  Destinations,
  Experiences,
  Meet,
  Concierge,
  BookingSection,
  Footer,
} from "@/components/sections/SectionsB.jsx";
import { BookingFlow } from "@/components/BookingFlow.jsx";

/* Maren — app shell: loader, hero reveal, nav state, menu & booking flow. */
export default function MarenApp() {
  const [loaded, setLoaded] = React.useState(false);
  const [heroRevealed, setHeroRevealed] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [booking, setBooking] = React.useState(false);
  const [seed, setSeed] = React.useState(null);

  // The booking flow seeds a calendar from `new Date()`, so mount the
  // interactive site only after hydration; the loader covers the first ~2.6s.
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    const t1 = setTimeout(() => setLoaded(true), 2600);
    const t2 = setTimeout(() => setHeroRevealed(true), 4600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = menuOpen || booking ? "hidden" : "";
  }, [menuOpen, booking]);

  const openBooking = (s) => {
    setSeed(s && s.villaId ? s : null);
    setBooking(true);
  };

  return (
    <>
      <Loader gone={loaded} />
      {mounted && (
        <>
          <TopNav
            scrolled={scrolled && !menuOpen}
            menuOpen={menuOpen}
            onMenu={() => setMenuOpen((o) => !o)}
            onEnquire={() => {
              setMenuOpen(false);
              openBooking();
            }}
          />
          <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} onEnquire={() => openBooking()} />

          <main>
            <Hero revealed={heroRevealed} onBook={openBooking} />
            <Intro />
            <Philosophy />
            <Villas onBook={openBooking} />
            <Destinations />
            <Experiences />
            <Meet />
            <Concierge />
            <BookingSection onBook={openBooking} />
          </main>
          <Footer onBook={openBooking} />

          <BookingFlow open={booking} onClose={() => setBooking(false)} seed={seed} />
        </>
      )}
    </>
  );
}
