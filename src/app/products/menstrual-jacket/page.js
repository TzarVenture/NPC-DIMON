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
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes revealBar {
    from { width: 0%; }
    to { width: 73%; }
  }
  @keyframes noise {
    0%   { transform: translate(0,0); }
    10%  { transform: translate(-2%,-2%); }
    20%  { transform: translate(2%,1%); }
    30%  { transform: translate(-1%,3%); }
    40%  { transform: translate(3%,-1%); }
    50%  { transform: translate(-2%,2%); }
    60%  { transform: translate(1%,-3%); }
    70%  { transform: translate(-3%,1%); }
    80%  { transform: translate(2%,2%); }
    90%  { transform: translate(-1%,-2%); }
    100% { transform: translate(0,0); }
  }
  @keyframes drift {
    0%   { transform: translate(0px, 0px) rotate(0deg); opacity: 0.04; }
    33%  { transform: translate(6px, -8px) rotate(0.5deg); opacity: 0.07; }
    66%  { transform: translate(-4px, 4px) rotate(-0.3deg); opacity: 0.03; }
    100% { transform: translate(0px, 0px) rotate(0deg); opacity: 0.04; }
  }
  @keyframes redpulse {
    0%, 100% { opacity: 0.03; }
    50% { opacity: 0.09; }
  }
  @keyframes typeIn {
    from { width: 0; }
    to { width: 100%; }
  }
  @keyframes ghostFloat {
    0%   { transform: translateY(0px) translateX(0px); opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 1; }
    100% { transform: translateY(-120px) translateX(20px); opacity: 0; }
  }
  @keyframes vhsroll {
    0%   { transform: translateY(0); opacity: 0.06; }
    100% { transform: translateY(100vh); opacity: 0.06; }
  }
  @keyframes cryptoFlicker {
    0%, 100% { opacity: 0.08; }
    30% { opacity: 0.18; }
    60% { opacity: 0.05; }
  }
  @keyframes eyeBlink {
    0%, 90%, 100% { transform: scaleY(1); }
    95% { transform: scaleY(0.05); }
  }
  @keyframes ripple {
    0% { transform: scale(1); opacity: 0.6; }
    100% { transform: scale(3); opacity: 0; }
  }

  /* NAV */
  .cs-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 40px;
    height: 82px;
    background: rgba(0,0,0,0.92);
    border-bottom: 1px solid rgba(255,0,0,0.3);
    position: sticky;
    top: 0;
    z-index: 100;
    backdrop-filter: blur(4px);
  }
  .cs-nav-links {
    display: flex;
    gap: 32px;
  }
  .cs-nav-links a {
    color: #ff0000;
    font-size: 13px;
    letter-spacing: 2px;
    text-decoration: none;
    opacity: 0.5;
    transition: opacity 0.3s;
  }
  .cs-nav-links a:hover { opacity: 1; }
  .cs-nav-links a.active {
    opacity: 1;
    border-bottom: 1px solid #ff0000;
    padding-bottom: 2px;
  }
  .cs-timer-label {
    font-size: 9px;
    letter-spacing: 3px;
    color: #ff0000;
    text-align: right;
    opacity: 0.4;
  }
  .cs-timer-value {
    font-size: 18px;
    letter-spacing: 2px;
    color: #ff0000;
    font-weight: 700;
    animation: flicker 6s infinite;
    text-align: right;
  }

  /* TICKER */
  .cs-ticker {
    background: #0a0000;
    overflow: hidden;
    padding: 6px 0;
    white-space: nowrap;
    border-bottom: 1px solid rgba(255,0,0,0.1);
  }
  .cs-ticker-track {
    display: inline-block;
    animation: marquee 30s linear infinite;
    font-size: 9px;
    letter-spacing: 5px;
    color: rgba(255,0,0,0.3);
    font-weight: 400;
  }

  /* PAGE */
  .cs-page {
    background: #000;
    min-height: 100vh;
    font-family: 'Courier New', monospace;
    color: #ff0000;
    overflow: hidden;
    position: relative;
    cursor: crosshair;
  }

  /* NOISE OVERLAY */
  .cs-noise {
    position: fixed;
    inset: -50%;
    width: 200%;
    height: 200%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.028;
    pointer-events: none;
    z-index: 9998;
    animation: noise 0.5s steps(2) infinite;
  }

  /* VHS ROLL LINES */
  .cs-vhs {
    position: fixed;
    top: 0; left: 0;
    width: 100%;
    height: 3px;
    background: rgba(255,0,0,0.08);
    animation: vhsroll 4s linear infinite;
    pointer-events: none;
    z-index: 9997;
  }
  .cs-vhs2 {
    position: fixed;
    top: 0; left: 0;
    width: 100%;
    height: 1px;
    background: rgba(255,0,0,0.04);
    animation: vhsroll 7s linear infinite;
    animation-delay: -3s;
    pointer-events: none;
    z-index: 9997;
  }

  /* BACKGROUND SYMBOLS */
  .cs-bg-symbols {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  }
  .cs-bg-symbol {
    position: absolute;
    font-family: 'Courier New', monospace;
    color: #ff0000;
    font-weight: 900;
    animation: cryptoFlicker 4s ease-in-out infinite;
    user-select: none;
  }

  /* RED GLOW BLOB */
  .cs-glow {
    position: fixed;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,0,0,0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    animation: drift 10s ease-in-out infinite;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  /* HERO */
  .cs-hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 82px - 34px);
    padding: 60px 24px;
    text-align: center;
    position: relative;
    z-index: 1;
  }

  /* EYE */
  .cs-eye-wrap {
    margin-bottom: 40px;
    animation: fadeUp 1s ease both;
    animation-delay: 0.1s;
  }
  .cs-eye {
    width: 64px;
    height: 28px;
    border: 1.5px solid rgba(255,0,0,0.5);
    border-radius: 50%;
    position: relative;
    margin: 0 auto;
    animation: eyeBlink 5s ease-in-out infinite;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cs-eye::before {
    content: '';
    width: 14px;
    height: 14px;
    background: #ff0000;
    border-radius: 50%;
    opacity: 0.9;
    position: relative;
    z-index: 1;
  }
  .cs-eye::after {
    content: '';
    position: absolute;
    width: 14px;
    height: 14px;
    background: transparent;
    border: 1px solid rgba(255,0,0,0.3);
    border-radius: 50%;
    animation: ripple 2s ease-out infinite;
  }
  .cs-eye-label {
    font-size: 8px;
    letter-spacing: 6px;
    color: #ff0000;
    opacity: 0.25;
    margin-top: 10px;
    text-align: center;
  }

  .cs-tag {
    font-size: 9px;
    letter-spacing: 8px;
    color: #ff0000;
    margin-bottom: 32px;
    animation: fadeUp 0.8s ease both;
    animation-delay: 0.2s;
    opacity: 0.35;
  }

  .cs-glitch-wrap {
    position: relative;
    display: inline-block;
    margin-bottom: 8px;
    animation: fadeUp 0.8s ease both;
    animation-delay: 0.35s;
  }
  .cs-title {
    font-size: clamp(72px, 16vw, 160px);
    font-weight: 900;
    letter-spacing: -2px;
    line-height: 0.9;
    color: #ff0000;
    text-shadow: 0 0 80px rgba(255,0,0,0.2);
  }
  .cs-glitch-1 {
    position: absolute; top: 0; left: 0;
    font-size: clamp(72px, 16vw, 160px);
    font-weight: 900; letter-spacing: -2px; line-height: 0.9;
    color: #ff0000;
    animation: glitch 1.5s infinite linear alternate-reverse;
    opacity: 0.5; pointer-events: none;
  }
  .cs-glitch-2 {
    position: absolute; top: 0; left: 0;
    font-size: clamp(72px, 16vw, 160px);
    font-weight: 900; letter-spacing: -2px; line-height: 0.9;
    color: #ff0000;
    animation: glitch2 2.5s infinite linear alternate;
    opacity: 0.3; pointer-events: none;
  }

  .cs-redacted {
    display: inline-block;
    background: #ff0000;
    color: #ff0000;
    font-size: clamp(14px, 3vw, 22px);
    font-weight: 900;
    letter-spacing: 8px;
    padding: 4px 16px;
    margin-top: 12px;
    user-select: none;
    animation: fadeUp 0.8s ease both;
    animation-delay: 0.5s;
    position: relative;
    overflow: hidden;
  }
  .cs-redacted::after {
    content: 'MENSTRUAL JACKET';
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ff0000;
    font-size: inherit;
    letter-spacing: inherit;
    padding: inherit;
    animation: flicker 3s infinite;
    opacity: 0.07;
  }

  .cs-coming-soon {
    font-size: clamp(18px, 4vw, 38px);
    font-weight: 900;
    letter-spacing: 14px;
    color: #ff0000;
    margin-top: 28px;
    animation: fadeUp 0.8s ease both;
    animation-delay: 0.6s;
    opacity: 0.9;
  }
  .cs-coming-soon .cursor {
    animation: blink 1s step-end infinite;
    margin-left: 4px;
  }

  .cs-divider {
    height: 1px;
    width: 100%;
    max-width: 480px;
    background: linear-gradient(90deg, transparent 0%, rgba(255,0,0,0.4) 50%, transparent 100%);
    margin: 36px auto;
    animation: fadeUp 0.8s ease both;
    animation-delay: 0.7s;
  }

  /* CLASSIFIED LINES */
  .cs-classified {
    animation: fadeUp 0.8s ease both;
    animation-delay: 0.75s;
    max-width: 440px;
    width: 100%;
    margin: 0 auto;
  }
  .cs-classified-line {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;
    font-size: 10px;
    letter-spacing: 3px;
    color: rgba(255,0,0,0.25);
  }
  .cs-classified-line .label {
    opacity: 0.5;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .cs-classified-line .val {
    flex: 1;
    border-bottom: 1px solid rgba(255,0,0,0.1);
    height: 1px;
    position: relative;
  }
  .cs-classified-line .val::after {
    content: attr(data-val);
    position: absolute;
    right: 0;
    top: -8px;
    font-size: 9px;
    letter-spacing: 2px;
    color: rgba(255,0,0,0.2);
  }

  .cs-sub {
    font-size: clamp(10px, 1.5vw, 11px);
    letter-spacing: 4px;
    color: #ff0000;
    opacity: 0.2;
    max-width: 400px;
    line-height: 2.2;
    animation: fadeUp 0.8s ease both;
    animation-delay: 0.9s;
    margin-top: 32px;
  }
  .cs-sub span { opacity: 1; }

  /* LOADING BAR */
  .cs-bar-wrap {
    margin-top: 48px;
    width: 100%;
    max-width: 360px;
    animation: fadeUp 0.8s ease both;
    animation-delay: 1s;
  }
  .cs-bar-label {
    display: flex;
    justify-content: space-between;
    font-size: 8px;
    letter-spacing: 4px;
    color: #ff0000;
    opacity: 0.2;
    margin-bottom: 8px;
  }
  .cs-bar-track {
    height: 1px;
    background: rgba(255,0,0,0.08);
    width: 100%;
    position: relative;
    overflow: hidden;
  }
  .cs-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, rgba(255,0,0,0.3), #ff0000);
    animation: revealBar 3s ease-out 1.2s both;
  }

  /* WARNING BOX */
  .cs-warning {
    margin-top: 40px;
    border: 1px solid rgba(255,0,0,0.12);
    padding: 16px 24px;
    max-width: 360px;
    width: 100%;
    animation: fadeUp 0.8s ease both;
    animation-delay: 1.1s;
    position: relative;
  }
  .cs-warning::before {
    content: '⚠ CLASSIFIED';
    position: absolute;
    top: -7px;
    left: 16px;
    background: #000;
    padding: 0 8px;
    font-size: 8px;
    letter-spacing: 4px;
    color: rgba(255,0,0,0.4);
  }
  .cs-warning-text {
    font-size: 9px;
    letter-spacing: 2px;
    color: rgba(255,0,0,0.2);
    line-height: 2;
    text-align: center;
  }

  /* DOT */
  .cs-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #ff0000;
    animation: pulse-red 2s infinite;
    margin: 36px auto 0;
    opacity: 0.6;
  }

  /* FOOTER */
  .cs-footer {
    padding: 32px 40px;
    border-top: 1px solid rgba(255,0,0,0.06);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    position: relative;
    z-index: 1;
  }
  .cs-footer-copy {
    font-size: 9px;
    letter-spacing: 2px;
    color: #ff0000;
    opacity: 0.15;
  }
  .cs-footer-tagline {
    font-size: 9px;
    letter-spacing: 5px;
    color: #ff0000;
    opacity: 0.15;
  }

  @media (max-width: 768px) {
    .cs-nav {
      padding: 10px 16px;
      height: auto;
      min-height: 56px;
      flex-wrap: wrap;
      gap: 8px;
    }
    .cs-nav-links { gap: 16px; }
    .cs-nav-links a { font-size: 10px; }
    .cs-footer { padding: 24px 16px; flex-direction: column; align-items: flex-start; }
  }
  @media (max-width: 480px) {
    .cs-nav-links { display: none; }
    .cs-timer-value { font-size: 14px; }
  }
`;

const NAV_LINKS = ["Menstrual Jacket", "Smoker Shoes", "About US", "Privacy Policy"];

const BG_SYMBOLS = [
  { text: "◈", size: 120, top: "8%", left: "5%", delay: "0s" },
  { text: "⌖", size: 80, top: "15%", right: "8%", delay: "1.2s" },
  { text: "◉", size: 60, top: "70%", left: "3%", delay: "0.6s" },
  { text: "⊗", size: 100, top: "75%", right: "4%", delay: "2s" },
  { text: "◈", size: 40, top: "40%", left: "2%", delay: "3s" },
  { text: "⌗", size: 50, top: "55%", right: "6%", delay: "1.5s" },
  { text: "◉", size: 30, top: "90%", left: "45%", delay: "0.8s" },
  { text: "⊕", size: 70, top: "25%", left: "48%", delay: "2.5s" },
];

const CLASSIFIED_LINES = [
  { label: "OBJECT", val: "████████████" },
  { label: "STATUS", val: "TRANSMISSION PENDING" },
  { label: "CLEARANCE", val: "RESTRICTED" },
  { label: "ORIGIN", val: "███ INDIA ███" },
  { label: "ETA", val: "UNKNOWN" },
];

export default function MenstrualJacketPage() {
  const [elapsed, setElapsed] = useState({ h: 4, m: 7, s: 52, ms: 15 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
    const handleMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const pad = (n) => String(n).padStart(2, "0");
  const fmt = (e) => `${pad(e.h)}:${pad(e.m)}:${pad(e.s)}:${pad(e.ms)}`;

  return (
    <>
      <style>{globalStyles}</style>
      <div className="cs-page">

        {/* NOISE + VHS */}
        <div className="cs-noise" />
        <div className="cs-vhs" />
        <div className="cs-vhs2" />

        {/* MOUSE FOLLOW GLOW */}
        <div style={{
          position: "fixed",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,0,0,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
          left: mousePos.x - 200,
          top: mousePos.y - 200,
          transition: "left 0.4s ease, top 0.4s ease",
        }} />

        {/* AMBIENT GLOW */}
        <div className="cs-glow" />

        {/* BACKGROUND SYMBOLS */}
        <div className="cs-bg-symbols">
          {BG_SYMBOLS.map((s, i) => (
            <div
              key={i}
              className="cs-bg-symbol"
              style={{
                fontSize: s.size,
                top: s.top,
                left: s.left,
                right: s.right,
                animationDelay: s.delay,
              }}
            >
              {s.text}
            </div>
          ))}
        </div>

        {/* HERO */}
        <section className="cs-hero">

          {/* EYE */}
          <div className="cs-eye-wrap">
            <div className="cs-eye" />
            <div className="cs-eye-label">WATCHING</div>
          </div>

          <p className="cs-tag">// CLASSIFIED TRANSMISSION — FILE 001</p>

          <div className="cs-glitch-wrap">
            <h1 className="cs-title">DIMØN</h1>
            <span className="cs-glitch-1" aria-hidden>DIMØN</span>
            <span className="cs-glitch-2" aria-hidden>DIMØN</span>
          </div>

          <div className="cs-redacted">MENSTRUAL JACKET</div>

          <div className="cs-coming-soon">
            COMING SOON<span className="cursor">_</span>
          </div>

          <div className="cs-divider" />

          {/* CLASSIFIED DATA */}
          <div className="cs-classified">
            {CLASSIFIED_LINES.map((line, i) => (
              <div key={i} className="cs-classified-line">
                <span className="label">{line.label}</span>
                <span className="val" data-val={line.val} />
              </div>
            ))}
          </div>

          <p className="cs-sub">
            SOMETHING IS BEING BUILT.<br />
            <span>THE MOVEMENT IS NOT READY FOR YOU YET.</span><br />
            STAY TUNED. STAY ALERT.
          </p>

          <div className="cs-bar-wrap">
            <div className="cs-bar-label">
              <span>DECRYPTING TRANSMISSION</span>
              <span>73%</span>
            </div>
            <div className="cs-bar-track">
              <div className="cs-bar-fill" />
            </div>
          </div>

          <div className="cs-warning">
            <div className="cs-warning-text">
              UNAUTHORIZED ACCESS TO THIS FILE<br />
              IS SUBJECT TO IMMEDIATE TERMINATION<br />
              OF SIGNAL — DIMØN SEES ALL
            </div>
          </div>

          <div className="cs-dot" />
        </section>

        {/* FOOTER */}
        <footer className="cs-footer">
          <div className="cs-footer-copy">© DIMØN — ALL TRANSMISSIONS MONITORED</div>
          <div className="cs-footer-tagline">NOT JUST A BRAND. A SIGNAL.</div>
        </footer>

      </div>
    </>
  );
}
