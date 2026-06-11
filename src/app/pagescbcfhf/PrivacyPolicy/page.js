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

  /* NAV */
  .pp-nav {
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
  .pp-nav-links {
    display: flex;
    gap: 32px;
  }
  .pp-nav-links a {
    color: #ff0000;
    font-size: 13px;
    letter-spacing: 2px;
    text-decoration: none;
  }
  .pp-nav-links a.active {
    opacity: 1;
    border-bottom: 1px solid #ff0000;
    padding-bottom: 2px;
  }

  /* TICKER */
  .pp-ticker {
    background: #ff0000;
    overflow: hidden;
    padding: 6px 0;
    white-space: nowrap;
  }
  .pp-ticker-track {
    display: inline-block;
    animation: marquee 20s linear infinite;
    font-size: 10px;
    letter-spacing: 3px;
    color: #000;
    font-weight: 900;
  }

  /* PAGE */
  .pp-page {
    background: #000;
    min-height: 100vh;
    font-family: 'Courier New', monospace;
    color: #ff0000;
    overflow-x: hidden;
  }

  /* HEADER */
  .pp-header {
    max-width: 900px;
    margin: 0 auto;
    padding: 64px 24px 40px;
    border-bottom: 1px solid #ff0000;
  }
  .pp-header-tag {
    font-size: 14px;
    letter-spacing: 5px;
    color: #ff0000;
    margin-bottom: 16px;
  }
  .pp-header-title {
    font-size: clamp(36px, 7vw, 72px);
    font-weight: 900;
    letter-spacing: -1px;
    line-height: 1;
    color: #ff0000;
    margin-bottom: 16px;
  }
  .pp-header-meta {
    font-size: 14px;
    letter-spacing: 3px;
    color: #ff0000;
  }

  /* CONTENT */
  .pp-content {
    max-width: 900px;
    margin: 0 auto;
    padding: 64px 24px 80px;
  }

  .pp-intro {
    font-size: 13px;
    letter-spacing: 0.5px;
    line-height: 1.9;
    color: #666;
    margin-bottom: 56px;
    max-width: 680px;
  }

  .pp-section {
    margin-bottom: 48px;
    padding-bottom: 48px;
    border-bottom: 1px solid #ff0000;
  }
  .pp-section:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .pp-section-num {
    font-size: 9px;
    letter-spacing: 4px;
    color: #ff0000;
    opacity: 0.4;
    margin-bottom: 8px;
  }
  .pp-section-title {
    font-size: clamp(15px, 2.5vw, 19px);
    font-weight: 900;
    letter-spacing: 3px;
    color: #ff0000;
    margin-bottom: 20px;
    text-transform: uppercase;
  }
  .pp-section-body {
    font-size: 13px;
    letter-spacing: 0.3px;
    line-height: 1.9;
    color: #666;
  }
  .pp-section-body p {
    margin-bottom: 12px;
  }
  .pp-section-body p:last-child {
    margin-bottom: 0;
  }
  .pp-section-body ul {
    list-style: none;
    margin-top: 8px;
  }
  .pp-section-body ul li {
    padding: 6px 0 6px 18px;
    position: relative;
    color: #666;
  }
  .pp-section-body ul li::before {
    content: '—';
    position: absolute;
    left: 0;
    color: #ff0000;
    opacity: 0.5;
    font-size: 10px;
  }
  .pp-section-body strong {
    color: #ff0000;
    opacity: 0.8;
    font-weight: 700;
  }

  /* FOOTER */
  .pp-footer {
    padding: 48px 24px 32px;
    border-top: 1px solid rgba(255,0,0,0.15);
    max-width: 900px;
    margin: 0 auto;
  }
  .pp-footer-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 32px;
    flex-wrap: wrap;
    gap: 16px;
  }
  .pp-footer-logo {
    font-size: clamp(40px, 8vw, 80px);
    font-weight: 900;
    color: #ff0000;
    opacity: 0.08;
    letter-spacing: -2px;
    line-height: 1;
  }
  .pp-footer-tagline {
    font-size: 9px;
    letter-spacing: 6px;
    color: #ff0000;
    opacity: 0.3;
  }
  .pp-footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }
  .pp-footer-copy {
    font-size: 9px;
    letter-spacing: 2px;
    color: #ff0000;
    opacity: 0.3;
  }
  .pp-footer-links {
    display: flex;
    gap: 24px;
  }
  .pp-footer-links a {
    font-size: 9px;
    letter-spacing: 3px;
    color: #ff0000;
    opacity: 0.5;
    text-decoration: none;
  }

  /* MOBILE */
  @media (max-width: 768px) {
    .pp-nav {
      padding: 10px 16px;
      height: auto;
      min-height: 56px;
      flex-wrap: wrap;
      gap: 8px;
    }
    .pp-nav-links { gap: 16px; }
    .pp-nav-links a { font-size: 10px; }
    .pp-header { padding: 48px 16px 32px; }
    .pp-content { padding: 40px 16px 64px; }
    .pp-footer { padding: 32px 16px; }
    .pp-footer-top { flex-direction: column; align-items: flex-start; }
    .pp-footer-bottom { flex-direction: column; align-items: flex-start; }
  }
  @media (max-width: 480px) {
    .pp-nav-links { display: none; }
  }
`;

const NAV_LINKS = ["Menstrual Jacket", "Smoker Shoes", "About US", "Privacy Policy"];

const SECTIONS = [
  {
    num: "01",
    title: "Refund Policy",
    content: (
      <p>Refunds are applicable only in cases of <strong>manufacturing defects</strong>.</p>
    ),
  },
  {
    num: "02",
    title: "Exchange Policy",
    content: (
      <>
        <p>Products can be exchanged only in case of size differences.</p>
        <ul>
          <li>The product must be in intact and unused condition for exchange eligibility.</li>
        </ul>
      </>
    ),
  },
  {
    num: "03",
    title: "Payment Terms",
    content: (
      <ul>
        <li>Original price applies if the payment is completed online.</li>
        <li>An additional <strong>₹1,000 charge</strong> may apply for Cash on Delivery (COD) payments.</li>
      </ul>
    ),
  },
  {
    num: "04",
    title: "Customer Support Policy",
    content: (
      <p>All customers will have <strong>24 hours</strong> to get their queries resolved.</p>
    ),
  },
  {
    num: "05",
    title: "Payment Methods",
    content: (
      <>
        <p>Accepted payment methods include:</p>
        <ul>
          <li>UPI</li>
          <li>Cards</li>
          <li>Wallets</li>
          <li>Cash on Delivery (COD)</li>
        </ul>
        <p style={{ marginTop: "12px" }}>COD availability is subject to serviceability based on the customer's pincode.</p>
      </>
    ),
  },
  {
    num: "06",
    title: "Intellectual Property Rights (IPR)",
    content: (
      <p>
        All content, designs, logos, product images, product descriptions, and other materials available on the website are protected under <strong>Intellectual Property Rights (IPR)</strong>. Unauthorized use, reproduction, or distribution of any website content or products-related material is strictly prohibited.
      </p>
    ),
  },
  {
    num: "07",
    title: "Newsletter Subscription",
    content: (
      <p>
        Users may subscribe to the newsletter by providing their email address through the subscription section on the website.
      </p>
    ),
  },
  {
    num: "08",
    title: "Product Authenticity",
    content: (
      <p>
        All DIMØN products purchased are <strong>authentic</strong> if purchased only from the official DIMØN website.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <style>{globalStyles}</style>
      <div className="pp-page">

        {/* NAV */}
        <nav className="pp-nav">
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/">
              <div style={{ background: "#ff0", color: "#000", fontWeight: 900, fontSize: "14px", letterSpacing: "1px", cursor: "pointer" }}>??</div>
            </Link>
            <Link href="/">
              <span style={{ fontSize: "11px", letterSpacing: "4px", color: "#ff0000", fontWeight: 700 }}>TRANSMISSION HQ</span>
            </Link>
          </div>
          <div className="pp-nav-links">
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
                className={
                    l === "Privacy Policy" ? "active" :
                    ""
                }
                >
                {l}
                </Link>
            ))}
          </div>
          <div />
        </nav>

        {/* TICKER */}
        <div className="pp-ticker">
          <div className="pp-ticker-track">
            {Array(4).fill("NEW TRANSMISSIONS INCOMING ⚡ STAY ALERT ⚡ LIVE DROPS ⚡ ").join("")}
          </div>
        </div>

        {/* HEADER */}
        <div className="pp-header">
          <div className="pp-header-tag">LEGAL / POLICIES</div>
          <h1 className="pp-header-title">WEBSITE<br />POLICIES</h1>
          <div className="pp-header-meta">DOCUMENT — OFFICIAL TERMS &amp; GUIDELINES</div>
        </div>

        {/* CONTENT */}
        <div className="pp-content">
          <p className="pp-intro">
            This document outlines the official website policies, payment terms, and customer support guidelines for DIMØN. Please read carefully before making any purchase or engaging with our platform.
          </p>

          {SECTIONS.map((s) => (
            <div key={s.num} className="pp-section">
              <div className="pp-section-title">{s.title}</div>
              <div className="pp-section-body">{s.content}</div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}