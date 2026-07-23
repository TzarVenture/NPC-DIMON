"use client";

import Link from "next/link";

const globalStyles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes flicker {
    0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
    20%, 24%, 55% { opacity: 0.4; }
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  .tc-page {
    background: #000;
    min-height: 100vh;
    font-family: 'Courier New', monospace;
    color: #ff0000;
    overflow-x: hidden;
  }

  .tc-header {
    max-width: 900px;
    margin: 0 auto;
    padding: 64px 24px 40px;
    border-bottom: 1px solid #ff0000;
  }
  .tc-header-tag {
    font-size: 14px;
    letter-spacing: 5px;
    color: #ff0000;
    margin-bottom: 16px;
  }
  .tc-header-title {
    font-size: clamp(36px, 7vw, 72px);
    font-weight: 900;
    letter-spacing: -1px;
    line-height: 1;
    color: #ff0000;
    margin-bottom: 16px;
  }
  .tc-header-meta {
    font-size: 14px;
    letter-spacing: 3px;
    color: #ff0000;
  }

  .tc-content {
    max-width: 900px;
    margin: 0 auto;
    padding: 64px 24px 80px;
  }

  .tc-intro {
    font-size: 13px;
    letter-spacing: 0.5px;
    line-height: 1.9;
    color: #666;
    margin-bottom: 56px;
    max-width: 680px;
  }

  .tc-section {
    margin-bottom: 48px;
    padding-bottom: 48px;
    border-bottom: 1px solid #ff0000;
  }
  .tc-section:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .tc-section-num {
    font-size: 9px;
    letter-spacing: 4px;
    color: #ff0000;
    opacity: 0.4;
    margin-bottom: 8px;
  }
  .tc-section-title {
    font-size: clamp(15px, 2.5vw, 19px);
    font-weight: 900;
    letter-spacing: 3px;
    color: #ff0000;
    margin-bottom: 20px;
    text-transform: uppercase;
  }
  .tc-section-body {
    font-size: 13px;
    letter-spacing: 0.3px;
    line-height: 1.9;
    color: #666;
  }
  .tc-section-body p {
    margin-bottom: 12px;
  }
  .tc-section-body p:last-child {
    margin-bottom: 0;
  }
  .tc-section-body ul {
    list-style: none;
    margin-top: 8px;
  }
  .tc-section-body ul li {
    padding: 6px 0 6px 18px;
    position: relative;
    color: #666;
  }
  .tc-section-body ul li::before {
    content: '—';
    position: absolute;
    left: 0;
    color: #ff0000;
    opacity: 0.5;
    font-size: 10px;
  }
  .tc-section-body strong {
    color: #ff0000;
    opacity: 0.8;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    .tc-header { padding: 48px 16px 32px; }
    .tc-content { padding: 40px 16px 64px; }
  }
`;

const SECTIONS = [
  {
    num: "01",
    title: "General Information",
    content: (
      <p>By accessing and using this website, you agree to comply with and be bound by the following <strong>Terms and Conditions</strong>.</p>
    ),
  },
  {
    num: "02",
    title: "User Obligations",
    content: (
      <>
        <p>As a user of our website, you agree to:</p>
        <ul>
          <li>Provide accurate information when making a purchase.</li>
          <li>Not use the website for any illegal or unauthorized purpose.</li>
          <li>Not violate any laws in your jurisdiction through the use of our services.</li>
        </ul>
      </>
    ),
  },
  {
    num: "03",
    title: "Product Information & Pricing",
    content: (
      <ul>
        <li>All product descriptions and prices are subject to change at any time without notice.</li>
        <li>We reserve the right to modify or discontinue any product at any time.</li>
        <li>We have made every effort to display as accurately as possible the colors and images of our products that appear on the store.</li>
      </ul>
    ),
  },
  {
    num: "04",
    title: "Limitation of Liability",
    content: (
      <p>DIMØN shall not be liable for any direct, indirect, incidental, punitive, or consequential damages resulting from your use of the website or the products purchased through it.</p>
    ),
  },
  {
    num: "05",
    title: "Governing Law",
    content: (
      <p>These Terms and Conditions and any separate agreements whereby we provide you services shall be governed by and construed in accordance with the laws of India.</p>
    ),
  },
];

export default function TermsAndConditionsPage() {
  return (
    <>
      <style>{globalStyles}</style>
      <div className="tc-page">
        {/* HEADER */}
        <div className="tc-header">
          <div className="tc-header-tag">LEGAL / POLICIES</div>
          <h1 className="tc-header-title">TERMS &<br />CONDITIONS</h1>
          <div className="tc-header-meta">DOCUMENT — OFFICIAL TERMS &amp; GUIDELINES</div>
        </div>

        {/* CONTENT */}
        <div className="tc-content">
          <p className="tc-intro">
            This document outlines the official Terms and Conditions for DIMØN. Please read carefully before making any purchase or engaging with our platform.
          </p>

          {SECTIONS.map((s) => (
            <div key={s.num} className="tc-section">
              <div className="tc-section-title">{s.title}</div>
              <div className="tc-section-body">{s.content}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
