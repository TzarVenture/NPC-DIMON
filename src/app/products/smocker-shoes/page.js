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

  /* ── NEW: COMING SOON glitch animations ── */
  @keyframes rgbShiftR {
    0%,100% { transform: translate(0, 0); opacity: 0; }
    10%      { transform: translate(-4px, 0); opacity: 0.7; }
    20%      { transform: translate(3px, -1px); opacity: 0.5; }
    30%      { transform: translate(-2px, 2px); opacity: 0.8; }
    40%      { transform: translate(0, 0); opacity: 0; }
    70%      { transform: translate(-5px, 1px); opacity: 0.6; }
    80%      { transform: translate(2px, 0); opacity: 0.4; }
  }
  @keyframes rgbShiftB {
    0%,100% { transform: translate(0, 0); opacity: 0; }
    10%      { transform: translate(4px, 0); opacity: 0.6; }
    20%      { transform: translate(-3px, 1px); opacity: 0.4; }
    30%      { transform: translate(2px, -2px); opacity: 0.7; }
    40%      { transform: translate(0, 0); opacity: 0; }
    70%      { transform: translate(5px, -1px); opacity: 0.5; }
    80%      { transform: translate(-2px, 0); opacity: 0.3; }
  }
  @keyframes distortSkew {
    0%,100% { transform: skewX(0deg); }
    10%     { transform: skewX(-2deg) scaleX(1.01); }
    20%     { transform: skewX(1.5deg); }
    50%     { transform: skewX(0deg); }
    60%     { transform: skewX(2.5deg) scaleX(0.99); }
    70%     { transform: skewX(-1deg); }
  }
  @keyframes scanTear {
    0%   { top: -10px; opacity: 0; }
    5%   { opacity: 1; }
    95%  { opacity: 1; }
    100% { top: 110%; opacity: 0; }
  }
  @keyframes lineGlitch {
    0%,100% { transform: translateY(0) scaleX(1); opacity: 0; }
    5%      { opacity: 1; transform: translateY(0) scaleX(1); }
    15%     { transform: translateY(2px) scaleX(1.02); }
    25%     { transform: translateY(-1px) scaleX(0.98); opacity: 0.8; }
    35%     { opacity: 0; }
  }
  /* ── END NEW ── */

  /* NAV */
  .cs-nav {
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
  .cs-nav-links {
    display: flex;
    gap: 32px;
  }
  .cs-nav-links a {
    color: #ff0000;
    font-size: 13px;
    letter-spacing: 2px;
    text-decoration: none;
  }
  .cs-nav-links a:hover { opacity: 1; }
  .cs-timer-label {
    font-size: 9px;
    letter-spacing: 3px;
    color: #ff0000;
    text-align: right;
  }
  .cs-nav-links a.active{
    opacity: 1;
    border-bottom: 1px solid #ff0000;
    padding-bottom: 2px;
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
    background: #ff0000;
    overflow: hidden;
    padding: 6px 0;
    white-space: nowrap;
  }
  .cs-ticker-track {
    display: inline-block;
    animation: marquee 20s linear infinite;
    font-size: 10px;
    letter-spacing: 3px;
    color: #000;
    font-weight: 900;
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
  }
  .cs-tag {
    font-size: 14px;
    letter-spacing: 6px;
    color: #ff0000;
    margin-bottom: 32px;
    animation: fadeUp 0.8s ease both;
    animation-delay: 0.1s;
  }
  .cs-glitch-wrap {
    position: relative;
    display: inline-block;
    margin-bottom: 16px;
    animation: fadeUp 0.8s ease both;
    animation-delay: 0.25s;
  }
  .cs-title {
    font-size: clamp(72px, 16vw, 160px);
    font-weight: 900;
    letter-spacing: -2px;
    line-height: 0.9;
    color: #ff0000;
  }
  .cs-glitch-1 {
    position: absolute; top: 0; left: 0;
    font-size: clamp(72px, 16vw, 160px);
    font-weight: 900; letter-spacing: -2px; line-height: 0.9;
    color: #ff0000;
    animation: glitch 2s infinite linear alternate-reverse;
    opacity: 0.6; pointer-events: none;
  }
  .cs-glitch-2 {
    position: absolute; top: 0; left: 0;
    font-size: clamp(72px, 16vw, 160px);
    font-weight: 900; letter-spacing: -2px; line-height: 0.9;
    color: #ff0000;
    animation: glitch2 3s infinite linear alternate;
    opacity: 0.4; pointer-events: none;
  }

  /* ── NEW: COMING SOON wrapper & layers ── */
  .cs-coming-soon-outer {
    position: relative;
    display: inline-block;
    margin-top: 8px;
    animation: fadeUp 0.8s ease both;
    animation-delay: 0.4s;
  }
  .cs-coming-soon {
    font-size: clamp(28px, 6vw, 64px);
    font-weight: 900;
    letter-spacing: 12px;
    color: #ff0000;
    position: relative;
    z-index: 2;
    animation: distortSkew 3.5s infinite;
  }
  .cs-coming-soon .cursor {
    animation: blink 1s step-end infinite;
    margin-left: 4px;
  }
  .cs-cs-rgb-r {
    position: absolute; top: 0; left: 0;
    font-size: clamp(28px, 6vw, 64px);
    font-weight: 900; letter-spacing: 12px;
    color: #ff5555;
    mix-blend-mode: screen;
    pointer-events: none; z-index: 1;
    animation: rgbShiftR 2.8s infinite;
    white-space: nowrap;
  }
  .cs-cs-rgb-b {
    position: absolute; top: 0; left: 0;
    font-size: clamp(28px, 6vw, 64px);
    font-weight: 900; letter-spacing: 12px;
    color: #5555ff;
    mix-blend-mode: screen;
    pointer-events: none; z-index: 1;
    animation: rgbShiftB 2.8s infinite;
    white-space: nowrap;
  }
  .cs-cs-scan-tear {
    position: absolute; left: -5%; width: 110%; height: 3px;
    background: rgba(255,0,0,0.5);
    pointer-events: none; z-index: 4;
    animation: scanTear 5s infinite linear;
  }
  .cs-cs-scan-tear2 {
    position: absolute; left: -5%; width: 110%; height: 1px;
    background: rgba(255,80,80,0.4);
    pointer-events: none; z-index: 4;
    animation: scanTear 7s infinite linear 2.5s;
  }
  .cs-cs-line-glitch {
    position: absolute; left: 0; right: 0; height: 2px;
    background: #ff0000; top: 40%;
    pointer-events: none; z-index: 5;
    animation: lineGlitch 4s infinite 1s;
  }
  /* ── END NEW ── */

  .cs-divider {
    height: 1px;
    width: 100%;
    max-width: 480px;
    background: linear-gradient(90deg, transparent 0%, #ff0000 50%, transparent 100%);
    margin: 36px auto;
    animation: fadeUp 0.8s ease both;
    animation-delay: 0.55s;
  }

  .cs-sub {
    font-size: clamp(11px, 1.5vw, 13px);
    letter-spacing: 4px;
    color: #ff0000;
    opacity: 0.45;
    max-width: 480px;
    line-height: 2;
    animation: fadeUp 0.8s ease both;
    animation-delay: 0.7s;
  }
  .cs-sub span { opacity: 1; color: #ff0000; }

  /* LOADING BAR */
  .cs-bar-wrap {
    margin-top: 52px;
    width: 100%;
    max-width: 360px;
    animation: fadeUp 0.8s ease both;
    animation-delay: 0.85s;
  }
  .cs-bar-label {
    display: flex;
    justify-content: space-between;
    font-size: 9px;
    letter-spacing: 3px;
    color: #ff0000;
    opacity: 0.4;
    margin-bottom: 8px;
  }
  .cs-bar-track {
    height: 2px;
    background: rgba(255,0,0,0.12);
    width: 100%;
    position: relative;
    overflow: hidden;
  }
  .cs-bar-fill {
    height: 100%;
    background: #ff0000;
    animation: revealBar 2.5s ease-out 1s both;
  }

  /* DOT */
  .cs-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #ff0000;
    animation: pulse-red 2s infinite;
    margin: 40px auto 0;
  }

  /* FOOTER */
  .cs-footer {
    padding: 32px 40px;
    border-top: 1px solid rgba(255,0,0,0.12);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }
  .cs-footer-copy {
    font-size: 9px;
    letter-spacing: 2px;
    color: #ff0000;
    opacity: 0.3;
  }
  .cs-footer-tagline {
    font-size: 9px;
    letter-spacing: 5px;
    color: #ff0000;
    opacity: 0.3;
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

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>/\\|[]{}";
const SCRAMBLE_TARGET = "COMING SOON";

export default function SmokerShoes() {
  const [elapsed, setElapsed] = useState({ h: 4, m: 7, s: 52, ms: 15 });
  const scrambleRef = useRef(null);

  // ── Elapsed timer ──
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed((prev) => {
        let ms = prev.ms + 1, s = prev.s, m = prev.m, h = prev.h;
        if (ms >= 100) { ms = 0; s++; }
        if (s >= 60)   { s = 0; m++; }
        if (m >= 60)   { m = 0; h++; }
        return { h, m, s, ms };
      });
    }, 10);
    return () => clearInterval(interval);
  }, []);

  // ── Text scramble for COMING SOON ──
  useEffect(() => {
    const el = scrambleRef.current;
    if (!el) return;

    let intervalId = null;

    function scramble(callback) {
      let frame = 0;
      const maxFrames = 18;
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        const revealed = Math.floor((frame / maxFrames) * SCRAMBLE_TARGET.length);
        let out = "";
        for (let i = 0; i < SCRAMBLE_TARGET.length; i++) {
          if (SCRAMBLE_TARGET[i] === " ") { out += " "; continue; }
          out += i < revealed
            ? SCRAMBLE_TARGET[i]
            : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
        // Preserve the cursor span
        el.childNodes[0].textContent = out;
        frame++;
        if (frame > maxFrames) {
          clearInterval(intervalId);
          el.childNodes[0].textContent = SCRAMBLE_TARGET;
          if (callback) setTimeout(callback, 2200 + Math.random() * 1800);
        }
      }, 55);
    }

    function loop() { scramble(loop); }
    const startTimeout = setTimeout(loop, 1400);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(intervalId);
    };
  }, []);

  // ── Hard glitch jolt (random skew burst) ──
  useEffect(() => {
    const outer = document.querySelector(".cs-coming-soon-outer");
    if (!outer) return;

    function triggerHardGlitch() {
      outer.style.transform = `skewX(${(Math.random() - 0.5) * 8}deg) translateX(${(Math.random() - 0.5) * 12}px)`;
      outer.style.filter = `brightness(${1.2 + Math.random() * 0.6})`;
      setTimeout(() => {
        outer.style.transform = "";
        outer.style.filter = "";
      }, 80 + Math.random() * 80);
    }

    const id = setInterval(triggerHardGlitch, 2200 + Math.random() * 1500);
    return () => clearInterval(id);
  }, []);

  const pad = (n) => String(n).padStart(2, "0");
  const fmt = (e) => `${pad(e.h)}:${pad(e.m)}:${pad(e.s)}:${pad(e.ms)}`;

  return (
    <>
      <style>{globalStyles}</style>
      <div style={{ background: "#000", minHeight: "100vh", fontFamily: "'Courier New', monospace", color: "#ff0000", overflowX: "hidden" }}>

        {/* SCANLINE */}
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "2px", background: "rgba(255,0,0,0.07)", animation: "scanline 8s linear infinite", pointerEvents: "none", zIndex: 9999 }} />

        {/* NAV */}
        {/* <nav className="cs-nav">
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/">
              <div style={{ background: "#ff0", color: "#000", fontWeight: 900, fontSize: "14px", letterSpacing: "1px", cursor: "pointer" }}>??</div>
            </Link>
            <Link href="/">
              <span style={{ fontSize: "11px", letterSpacing: "4px", color: "#ff0000", fontWeight: 700 }}>TRANSMISSION HQ</span>
            </Link>
          </div>
          <div className="cs-nav-links">
            {NAV_LINKS.map((l) => (
              <Link
                key={l}
                href={
                  l === "About US"          ? "/pages/about" :
                  l === "Menstrual Jacket"  ? "/pages/productPages/MenstrualJacket" :
                  l === "Smoker Shoes"      ? "/pages/productPages/SmokerShoes" :
                  l === "Privacy Policy"    ? "/pages/PrivacyPolicy" :
                  "#"
                }
                className={l === "Smoker Shoes" ? "active" : ""}
              >
                {l}
              </Link>
            ))}
          </div>
          <div>
            <div className="cs-timer-label">ELAPSED</div>
            <div className="cs-timer-value">{fmt(elapsed)}</div>
          </div>
        </nav> */}

        {/* TICKER */}
        {/* <div className="cs-ticker">
          <div className="cs-ticker-track">
            {Array(4).fill("NEW TRANSMISSIONS INCOMING ⚡ STAY ALERT ⚡ LIVE DROPS ⚡ ").join("")}
          </div>
        </div> */}

        {/* HERO */}
        <section className="cs-hero">
          <p className="cs-tag">// TRANSMISSION PENDING</p>

          <div className="cs-glitch-wrap">
            <h1 className="cs-title">DIMØN</h1>
            <span className="cs-glitch-1" aria-hidden>DIMØN</span>
            <span className="cs-glitch-2" aria-hidden>DIMØN</span>
          </div>

          {/* ── UPDATED: COMING SOON with glitch layers ── */}
          <div className="cs-coming-soon-outer">
            {/* RGB split — red channel */}
            <span className="cs-cs-rgb-r" aria-hidden>COMING SOON_</span>
            {/* RGB split — blue channel */}
            <span className="cs-cs-rgb-b" aria-hidden>COMING SOON_</span>

            {/* Main text driven by JS scramble */}
            <div className="cs-coming-soon" ref={scrambleRef}>
              <span>COMING SOON</span>
              <span className="cursor">_</span>
            </div>

            {/* Scan tear lines */}
            <div className="cs-cs-scan-tear" />
            <div className="cs-cs-scan-tear2" />
            {/* Horizontal glitch bar */}
            <div className="cs-cs-line-glitch" />
          </div>
          {/* ── END UPDATED ── */}

          <div className="cs-divider" />

          <p className="cs-sub">
            SOMETHING IS BEING BUILT.<br />
            <span>THE MOVEMENT IS NOT READY FOR YOU YET.</span><br />
            STAY TUNED. STAY ALERT.
          </p>

          <div className="cs-bar-wrap">
            <div className="cs-bar-label">
              <span>LOADING TRANSMISSION</span>
              <span>73%</span>
            </div>
            <div className="cs-bar-track">
              <div className="cs-bar-fill" />
            </div>
          </div>

          <div className="cs-dot" />
        </section>

      </div>
    </>
  );
}