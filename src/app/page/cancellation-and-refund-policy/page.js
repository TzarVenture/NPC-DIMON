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

  .cr-page {
    background: #000;
    min-height: 100vh;
    font-family: 'Courier New', monospace;
    color: #ff0000;
    overflow-x: hidden;
  }

  .cr-header {
    max-width: 900px;
    margin: 0 auto;
    padding: 64px 24px 40px;
    border-bottom: 1px solid #ff0000;
  }
  .cr-header-tag {
    font-size: 14px;
    letter-spacing: 5px;
    color: #ff0000;
    margin-bottom: 16px;
  }
  .cr-header-title {
    font-size: clamp(36px, 7vw, 72px);
    font-weight: 900;
    letter-spacing: -1px;
    line-height: 1;
    color: #ff0000;
    margin-bottom: 16px;
  }
  .cr-header-meta {
    font-size: 14px;
    letter-spacing: 3px;
    color: #ff0000;
  }

  .cr-content {
    max-width: 900px;
    margin: 0 auto;
    padding: 64px 24px 80px;
  }

  .cr-intro {
    font-size: 13px;
    letter-spacing: 0.5px;
    line-height: 1.9;
    color: #666;
    margin-bottom: 56px;
    max-width: 680px;
  }

  .cr-section {
    margin-bottom: 48px;
    padding-bottom: 48px;
    border-bottom: 1px solid #ff0000;
  }
  .cr-section:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .cr-section-num {
    font-size: 9px;
    letter-spacing: 4px;
    color: #ff0000;
    opacity: 0.4;
    margin-bottom: 8px;
  }
  .cr-section-title {
    font-size: clamp(15px, 2.5vw, 19px);
    font-weight: 900;
    letter-spacing: 3px;
    color: #ff0000;
    margin-bottom: 20px;
    text-transform: uppercase;
  }
  .cr-section-body {
    font-size: 13px;
    letter-spacing: 0.3px;
    line-height: 1.9;
    color: #666;
  }
  .cr-section-body p {
    margin-bottom: 12px;
  }
  .cr-section-body p:last-child {
    margin-bottom: 0;
  }
  .cr-section-body ul {
    list-style: none;
    margin-top: 8px;
  }
  .cr-section-body ul li {
    padding: 6px 0 6px 18px;
    position: relative;
    color: #666;
  }
  .cr-section-body ul li::before {
    content: '—';
    position: absolute;
    left: 0;
    color: #ff0000;
    opacity: 0.5;
    font-size: 10px;
  }
  .cr-section-body strong {
    color: #ff0000;
    opacity: 0.8;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    .cr-header { padding: 48px 16px 32px; }
    .cr-content { padding: 40px 16px 64px; }
  }
`;

const SECTIONS = [
  {
    num: "01",
    title: "Order Cancellation",
    content: (
      <>
        <p>Orders can only be cancelled within <strong>24 hours</strong> of placement.</p>
        <p>Once the order has been processed and shipped, cancellation requests will not be accepted. To request a cancellation, please contact our support team immediately.</p>
      </>
    ),
  },
  {
    num: "02",
    title: "Refund Policy",
    content: (
      <>
        <p>Refunds are applicable only in cases of <strong>manufacturing defects</strong>.</p>
        <ul>
          <li>If you receive a defective product, you must notify us within <strong>48 hours</strong> of delivery.</li>
          <li>We will require photo/video evidence of the defect before approving a refund.</li>
        </ul>
      </>
    ),
  },
  {
    num: "03",
    title: "Exchange Policy",
    content: (
      <>
        <p>Products can be exchanged only in case of <strong>size differences</strong>.</p>
        <ul>
          <li>The product must be in intact, unwashed, and unused condition with all original tags attached.</li>
          <li>Exchange requests must be raised within <strong>7 days</strong> of delivery.</li>
        </ul>
      </>
    ),
  },
  {
    num: "04",
    title: "Refund Process",
    content: (
      <p>Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, the refund will be processed to your original method of payment within <strong>5-7 business days</strong>.</p>
    ),
  },
];

export default function CancellationAndRefundPolicyPage() {
  return (
    <>
      <style>{globalStyles}</style>
      <div className="cr-page">
        {/* HEADER */}
        <div className="cr-header">
          <div className="cr-header-tag">LEGAL / POLICIES</div>
          <h1 className="cr-header-title">CANCELLATION<br />&amp; REFUND</h1>
          <div className="cr-header-meta">DOCUMENT — RETURNS &amp; CANCELLATION GUIDELINES</div>
        </div>

        {/* CONTENT */}
        <div className="cr-content">
          <p className="cr-intro">
            This document outlines the official Cancellation and Refund policies for DIMØN. We strive to provide the best quality products, but if an issue arises, please review the guidelines below.
          </p>

          {SECTIONS.map((s) => (
            <div key={s.num} className="cr-section">
              <div className="cr-section-title">{s.title}</div>
              <div className="cr-section-body">{s.content}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
