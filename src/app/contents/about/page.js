"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const globalStyles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes glitch {
    0% { clip-path: inset(40% 0 61% 0); transform: translate(-2px, 0); }
    20% { clip-path: inset(92% 0 1% 0); transform: translate(2px, 0); }
    40% { clip-path: inset(43% 0 1% 0); transform: translate(1px, 0); }
    60% { clip-path: inset(25% 0 58% 0); transform: translate(-1px, 0); }
    80% { clip-path: inset(54% 0 7% 0); transform: translate(2px, 0); }
    100% { clip-path: inset(58% 0 43% 0); transform: translate(-2px, 0); }
  }
  @keyframes glitch2 {
    0% { clip-path: inset(50% 0 30% 0); transform: translate(2px, 0); }
    25% { clip-path: inset(15% 0 70% 0); transform: translate(-2px, 0); }
    50% { clip-path: inset(80% 0 5% 0); transform: translate(1px, 0); }
    75% { clip-path: inset(5% 0 85% 0); transform: translate(-1px, 0); }
    100% { clip-path: inset(40% 0 40% 0); transform: translate(2px, 0); }
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  @keyframes scanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }
  @keyframes pulse-red {
    0%, 100% { box-shadow: 0 0 0 0 rgba(255,0,0,0.4); }
    50% { box-shadow: 0 0 0 8px rgba(255,0,0,0); }
  }
  @keyframes flicker {
    0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
    20%, 24%, 55% { opacity: 0.4; }
  }

  /* NAV */
  .about-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 40px;
    height: 82px;
    background: #000;
    border-bottom: 1px solid #ff0000;
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .about-nav-links {
    display: flex;
    gap: 32px;
  }
  .about-nav-links a {
    color: #ff0000;
    font-size: 13px;
    letter-spacing: 2px;
    text-decoration: none;
  }
  .about-nav-links a.active {
    opacity: 1;
    border-bottom: 1px solid #ff0000;
    padding-bottom: 2px;
  }
  .about-timer-label {
    font-size: 9px;
    letter-spacing: 3px;
    color: #ff0000;
    text-align: right;
  }
  .about-timer-value {
    font-size: 18px;
    letter-spacing: 2px;
    color: #ff0000;
    font-weight: 700;
    animation: flicker 6s infinite;
    text-align: right;
  }

  /* TICKER */
  .about-ticker {
    background: #ff0000;
    overflow: hidden;
    padding: 6px 0;
    white-space: nowrap;
  }
  .about-ticker-track {
    display: inline-block;
    animation: marquee 20s linear infinite;
    font-size: 10px;
    letter-spacing: 3px;
    color: #000;
    font-weight: 900;
  }

  /* HERO */
  .about-hero {
    padding: 80px 24px 0;
    max-width: 900px;
    margin: 0 auto;
  }
  .about-hero-tag {
    font-size: 10px;
    letter-spacing: 5px;
    color: #ff0000;
    opacity: 0.6;
    margin-bottom: 24px;
  }
  .about-glitch-wrap {
    position: relative;
    display: inline-block;
    margin-bottom: 24px;
  }
  .about-hero-title {
    font-size: clamp(72px, 14vw, 140px);
    font-weight: 900;
    letter-spacing: -2px;
    line-height: 0.9;
    color: #ff0000;
    margin: 0;
  }
  .about-glitch-1 {
    position: absolute;
    top: 0; left: 0;
    font-size: clamp(72px, 14vw, 140px);
    font-weight: 900;
    letter-spacing: -2px;
    line-height: 0.9;
    color: #ff0000;
    animation: glitch 2s infinite linear alternate-reverse;
    opacity: 0.6;
    pointer-events: none;
  }
  .about-glitch-2 {
    position: absolute;
    top: 0; left: 0;
    font-size: clamp(72px, 14vw, 140px);
    font-weight: 900;
    letter-spacing: -2px;
    line-height: 0.9;
    color: #ff0000;
    animation: glitch2 3s infinite linear alternate;
    opacity: 0.4;
    pointer-events: none;
  }
  .about-hero-sub {
    font-size: clamp(12px, 2vw, 15px);
    letter-spacing: 4px;
    color: #ff0000;
    opacity: 0.5;
    margin-top: 32px;
  }
  .about-hero-sub span { opacity: 1; }
  .about-hero-divider {
    height: 1px;
    background: linear-gradient(90deg, #ff0000 0%, rgba(255,0,0,0.2) 60%, transparent 100%);
    margin-top: 60px;
  }

  /* CONTENT */
  .about-content {
    max-width: 900px;
    margin: 0 auto;
    padding: 80px 24px;
  }
  .about-block {
    margin-bottom: 72px;
  }
  .about-block-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }
  .about-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #ff0000;
    animation: pulse-red 2s infinite;
    flex-shrink: 0;
  }
  .about-block-tag {
    font-size: 18px;
    letter-spacing: 5px;
    color: #ff0000;
    font-weight: 700;
  }
  .about-block-title {
    font-size: clamp(28px, 5vw, 52px);
    font-weight: 900;
    letter-spacing: 2px;
    line-height: 1.05;
    color: #ff0000;
    margin-bottom: 28px;
  }
  .about-body-text {
    font-size: clamp(13px, 1.5vw, 15px);
    letter-spacing: 0.5px;
    line-height: 1.9;
    color: #888;
    margin-bottom: 16px;
    max-width: 680px;
  }
  .about-tagline {
    color: #ff0000 !important;
    font-size: clamp(11px, 1.5vw, 13px) !important;
    letter-spacing: 2px !important;
    border-left: 2px solid #ff0000;
    padding-left: 16px;
    margin-top: 24px;
  }
  .about-section-divider {
    height: 1px;
    background: rgba(255,0,0,0.15);
    margin-bottom: 72px;
  }

  /* MANIFESTO */
  .about-manifesto {
    border-top: 1px solid rgba(255,0,0,0.2);
    border-bottom: 1px solid rgba(255,0,0,0.2);
    padding: 40px 24px;
    background: #050000;
  }
  .about-manifesto-inner {
    display: flex;
    flex-wrap: wrap;
    gap: 16px 32px;
    justify-content: center;
    align-items: center;
  }
  .about-manifesto-text {
    font-size: clamp(10px, 2vw, 13px);
    letter-spacing: 5px;
    color: #ff0000;
    font-weight: 900;
  }
  .about-manifesto-sep {
    color: #ff0000;
    opacity: 0.3;
    font-size: 14px;
  }

  /* FOOTER */
  .about-footer {
    padding: 48px 24px 32px;
    border-top: 1px solid rgba(255,0,0,0.15);
    max-width: 900px;
    margin: 0 auto;
  }
  .about-footer-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 32px;
    flex-wrap: wrap;
    gap: 16px;
  }
  .about-footer-logo {
    font-size: clamp(40px, 8vw, 80px);
    font-weight: 900;
    color: #ff0000;
    opacity: 0.12;
    letter-spacing: -2px;
    line-height: 1;
  }
  .about-footer-tagline {
    font-size: 9px;
    letter-spacing: 6px;
    color: #ff0000;
    opacity: 0.3;
  }
  .about-footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }
  .about-footer-copy {
    font-size: 9px;
    letter-spacing: 2px;
    color: #ff0000;
    opacity: 0.3;
  }
  .about-footer-links {
    display: flex;
    gap: 24px;
  }
  .about-footer-links a {
    font-size: 9px;
    letter-spacing: 3px;
    color: #ff0000;
    opacity: 0.5;
    text-decoration: none;
  }

  /* FADE ANIMATION */
  .fade-hidden {
    opacity: 0;
    transform: translateY(40px);
  }
  .fade-visible {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }

  /* MOBILE */
  @media (max-width: 768px) {
    .about-nav {
      padding: 0 16px;
      height: auto;
      min-height: 56px;
      flex-wrap: wrap;
      gap: 8px;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    .about-nav-links {
      gap: 16px;
    }
    .about-nav-links a {
      font-size: 10px;
    }
    .about-hero {
      padding: 48px 16px 0;
    }
    .about-content {
      padding: 48px 16px;
    }
    .about-block {
      margin-bottom: 48px;
    }
    .about-section-divider {
      margin-bottom: 48px;
    }
    .about-footer {
      padding: 32px 16px;
    }
    .about-footer-top {
      flex-direction: column;
      align-items: flex-start;
    }
    .about-footer-bottom {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  @media (max-width: 480px) {
    .about-nav-links {
      display: none;
    }
    .about-timer-value {
      font-size: 14px;
    }
    .about-manifesto-inner {
      gap: 12px 20px;
    }
  }
`;

const NAV_LINKS = ["Menstrual Jacket", "Smoker Shoes", "About US", "Privacy Policy"];

export default function AboutPage() {
  const [elapsed, setElapsed] = useState({ h: 4, m: 7, s: 52, ms: 15 });
  const [visible, setVisible] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed((prev) => {
        let ms = prev.ms + 1, s = prev.s, m = prev.m, h = prev.h;
        if (ms >= 100) { ms = 0; s++; }
        if (s >= 60) { s = 0; m++; }
        if (m >= 60) { m = 0; h++; }
        return { h, m, s, ms };
      });
    }, 10);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) setVisible((v) => ({ ...v, [e.target.dataset.key]: true }));
      }),
      { threshold: 0.15 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const pad = (n) => String(n).padStart(2, "0");
  const fmt = (e) => `${pad(e.h)}:${pad(e.m)}:${pad(e.s)}:${pad(e.ms)}`;
  const ref = (key) => (el) => { sectionRefs.current[key] = el; };
  const vis = (key) => visible[key] ? "fade-visible" : "fade-hidden";

  return (
    <>
      <style>{globalStyles}</style>
      <div style={{ background: "#000", minHeight: "100vh", fontFamily: "'Courier New', monospace", color: "#ff0000", overflowX: "hidden" }}>

        {/* SCANLINE */}
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "2px", background: "rgba(255,0,0,0.07)", animation: "scanline 8s linear infinite", pointerEvents: "none", zIndex: 9999 }} />

        {/* NAV */}
        {/* <nav className="about-nav">
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/">
            <div style={{ background: "#ff0", color: "#000", fontWeight: 900, fontSize: "14px", padding: "", letterSpacing: "1px", cursor: "pointer" }}>??</div>
            </Link>
            <Link href="/">
                <span style={{ fontSize: "11px", letterSpacing: "4px", color: "#ff0000", fontWeight: 700 }}>TRANSMISSION HQ</span>
            </Link>
          </div>
          <div className="about-nav-links">
            {NAV_LINKS.map((l) => (
              <Link
                key={l}
                href={
                    l === "About US" ? "/pages/about" :
                    l === "Menstrual Jacket" ? "/pages/productPages/MenstrualJacket" :
                    l === "Smoker Shoes" ? "/pages/productPages/SmokerShoes" :
                    l === "Privacy Policy" ? "/pages/PrivacyPolicy" :
                    "#"
                }
                className={l === "About US" ? "active" : ""}
                >
                {l}
                </Link>
            ))}
          </div>
          <div>
            <div className="about-timer-label">ELAPSED</div>
            <div className="about-timer-value">{fmt(elapsed)}</div>
          </div>
        </nav> */}

        {/* TICKER */}
        <div className="about-ticker">
          <div className="about-ticker-track">
            {Array(4).fill("NEW TRANSMISSIONS INCOMING ⚡ STAY ALERT ⚡ LIVE DROPS ⚡ ").join("")}
          </div>
        </div>

        {/* HERO */}
        <section className="about-hero">
          <div className="about-glitch-wrap">
            <h1 className="about-hero-title">DIMØN</h1>
            <span className="about-glitch-1" aria-hidden>DIMØN</span>
            <span className="about-glitch-2" aria-hidden>DIMØN</span>
          </div>
          <p ref={ref("heroSub")} data-key="heroSub" className={`about-hero-sub ${vis("heroSub")}`}>
            NOT JUST A FASHION BRAND.&nbsp;<span>A CULTURAL MOVEMENT.</span>
          </p>
          <div className="about-hero-divider" />
        </section>

        {/* CONTENT */}
        <section className="about-content">

          {/* VISION */}
          <div ref={ref("vision")} data-key="vision" className={`about-block ${vis("vision")}`}>
            <div className="about-block-header">
              <div className="about-dot" />
              <span className="about-block-tag">VISION</span>
            </div>
            <h2 className="about-block-title">REBELLION.<br />FREEDOM.<br />EXPRESSION.</h2>
            <p className="about-body-text">
              DIMØN envisions a world where fashion becomes a form of rebellion, freedom, and cultural expression — not just clothing. We exist to challenge ordinary thinking, break societal norms, and build a generation that is fearless in identity, creativity, and self-expression.
            </p>
            <p className="about-body-text">
              Born from India, DIMØN aims to create a global creative movement where fashion, art, music, and culture collide to shape the future of youth culture and modern luxury.
            </p>
          </div>

          <div className="about-section-divider" />

          {/* MISSION */}
          <div ref={ref("mission")} data-key="mission" className={`about-block ${vis("mission")}`}>
            <div className="about-block-header">
              <div className="about-dot" />
              <span className="about-block-tag">MISSION</span>
            </div>
            <h2 className="about-block-title">BUILD MORE<br />THAN A BRAND.</h2>
            <p className="about-body-text">
              DIMØN's mission is to create bold, emotionally powerful fashion and experiences that question conformity and inspire individuality. Through disruptive design, artistic storytelling, and culture-driven creativity, we aim to build more than a brand — we are building a movement for people who refuse to fit into predefined standards.
            </p>
            <p className="about-body-text">
              Every collection, visual, and experience by DIMØN is designed to spark emotion, start conversations, and redefine how modern culture is expressed through fashion and art.
            </p>
          </div>

          <div className="about-section-divider" />

          {/* WHO WE ARE */}
          <div ref={ref("about")} data-key="about" className={`about-block ${vis("about")}`}>
            <div className="about-block-header">
              <div className="about-dot" />
              <span className="about-block-tag">ABOUT US</span>
            </div>
            <h2 className="about-block-title">AT THE<br />INTERSECTION<br />OF EVERYTHING.</h2>
            <p className="about-body-text">
              DIMØN is not just a fashion brand — it is a cultural movement built for those who refuse to blend in. Born from the idea of challenging ordinary thinking, DIMØN exists at the intersection of fashion, art, music, and rebellion. We create emotionally driven pieces and experiences that represent individuality, ambition, and fearless self-expression.
            </p>
            <p className="about-body-text">
              Every design by DIMØN carries a story, an emotion, and a statement. Inspired by modern youth culture and disruptive creativity, we aim to redefine how fashion is experienced — not as clothing alone, but as identity and energy. From visuals to collections, everything we build is created to challenge norms, spark conversations, and leave impact.
            </p>
            
          </div>

        </section>
      </div>
    </>
  );
}