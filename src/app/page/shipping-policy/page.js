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

  .sp-page {
    background: #000;
    min-height: 100vh;
    font-family: 'Courier New', monospace;
    color: #ff0000;
    overflow-x: hidden;
  }

  .sp-header {
    max-width: 900px;
    margin: 0 auto;
    padding: 64px 24px 40px;
    border-bottom: 1px solid #ff0000;
  }
  .sp-header-tag {
    font-size: 14px;
    letter-spacing: 5px;
    color: #ff0000;
    margin-bottom: 16px;
  }
  .sp-header-title {
    font-size: clamp(36px, 7vw, 72px);
    font-weight: 900;
    letter-spacing: -1px;
    line-height: 1;
    color: #ff0000;
    margin-bottom: 16px;
  }
  .sp-header-meta {
    font-size: 14px;
    letter-spacing: 3px;
    color: #ff0000;
  }

  .sp-content {
    max-width: 900px;
    margin: 0 auto;
    padding: 64px 24px 80px;
  }

  .sp-intro {
    font-size: 13px;
    letter-spacing: 0.5px;
    line-height: 1.9;
    color: #666;
    margin-bottom: 56px;
    max-width: 680px;
  }

  .sp-section {
    margin-bottom: 48px;
    padding-bottom: 48px;
    border-bottom: 1px solid #ff0000;
  }
  .sp-section:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .sp-section-num {
    font-size: 9px;
    letter-spacing: 4px;
    color: #ff0000;
    opacity: 0.4;
    margin-bottom: 8px;
  }
  .sp-section-title {
    font-size: clamp(15px, 2.5vw, 19px);
    font-weight: 900;
    letter-spacing: 3px;
    color: #ff0000;
    margin-bottom: 20px;
    text-transform: uppercase;
  }
  .sp-section-body {
    font-size: 13px;
    letter-spacing: 0.3px;
    line-height: 1.9;
    color: #666;
  }
  .sp-section-body p {
    margin-bottom: 12px;
  }
  .sp-section-body p:last-child {
    margin-bottom: 0;
  }
  .sp-section-body ul {
    list-style: none;
    margin-top: 8px;
  }
  .sp-section-body ul li {
    padding: 6px 0 6px 18px;
    position: relative;
    color: #666;
  }
  .sp-section-body ul li::before {
    content: '—';
    position: absolute;
    left: 0;
    color: #ff0000;
    opacity: 0.5;
    font-size: 10px;
  }
  .sp-section-body strong {
    color: #ff0000;
    opacity: 0.8;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    .sp-header { padding: 48px 16px 32px; }
    .sp-content { padding: 40px 16px 64px; }
  }
`;

const SECTIONS = [
  {
    num: "01",
    title: "Order Processing Time",
    content: (
      <p>All orders are processed within <strong>1-3 business days</strong>. Orders are not shipped or delivered on weekends or holidays.</p>
    ),
  },
  {
    num: "02",
    title: "Shipping Rates & Delivery Estimates",
    content: (
      <>
        <p>Shipping charges for your order will be calculated and displayed at checkout.</p>
        <ul>
          <li>Standard delivery typically takes <strong>5-7 business days</strong> within India.</li>
          <li>Delivery delays can occasionally occur due to unforeseen circumstances.</li>
        </ul>
      </>
    ),
  },
  {
    num: "03",
    title: "Shipment Confirmation & Order Tracking",
    content: (
      <p>You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.</p>
    ),
  },
  {
    num: "04",
    title: "Damages",
    content: (
      <p>DIMØN is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim. Please save all packaging materials and damaged goods before filing a claim.</p>
    ),
  },
];

export default function ShippingPolicyPage() {
  return (
    <>
      <style>{globalStyles}</style>
      <div className="sp-page">
        {/* HEADER */}
        <div className="sp-header">
          <div className="sp-header-tag">SHIPPING / DELIVERY</div>
          <h1 className="sp-header-title">SHIPPING<br />POLICY</h1>
          <div className="sp-header-meta">DOCUMENT — SHIPPING TERMS &amp; GUIDELINES</div>
        </div>

        {/* CONTENT */}
        <div className="sp-content">
          <p className="sp-intro">
            This document outlines the official Shipping Policy for DIMØN. Please read carefully to understand our processing times and delivery methods.
          </p>

          {SECTIONS.map((s) => (
            <div key={s.num} className="sp-section">
              <div className="sp-section-title">{s.title}</div>
              <div className="sp-section-body">{s.content}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
