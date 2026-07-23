"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="topHeader" style={{ color: "red", background: "black" }}>
        {/* LEFT: logo + brand */}
        <Link href="/" className="leftHeader" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="logoBox">??</div>
          <div className="hq">TRANSMISSION HQ</div>
          {/* <div className="hq">DIMON</div> */}
        </Link>

        {/* Hamburger Icon for Mobile */}
        <div className="hamburger" onClick={() => setIsMenuOpen(true)}>
          ☰
        </div>

        {/* Desktop NAV */}
        <nav className="navItem desktopOnly">
          <ul className="navItem-ul">
            <li>
              <Link href="/page/about">About US</Link>
            </li>
            <li>
              <Link href="/page/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/page/terms-and-conditions">Terms & Conditions</Link>
            </li>
            <li>
              <Link href="/page/shipping-policy">Shipping Policy</Link>
            </li>
            <li>
              <Link href="/page/cancellation-and-refund-policy">Cancellation & Refund</Link>
            </li>
          </ul>
        </nav>

        {/* RIGHT: elapsed */}
        <div className="elapsedBox">
          <div className="elapsedLabel">ELAPSED</div>
          <div className="elapsedTime">04:07:52:15</div>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div className="menuOverlay" onClick={() => setIsMenuOpen(false)}></div>
      )}

      {/* SIDE MENU (Mobile) */}
      <nav className={`sideMenu ${isMenuOpen ? "open" : ""}`}>
        <div className="sideMenuHeader">
          <div className="closeBtn" onClick={() => setIsMenuOpen(false)}>✕</div>
        </div>
        <ul className="sideMenu-ul">
          <li>
            <Link href="/page/about" onClick={() => setIsMenuOpen(false)}>About US</Link>
          </li>
          <li>
            <Link href="/page/privacy-policy" onClick={() => setIsMenuOpen(false)}>Privacy Policy</Link>
          </li>
          <li>
            <Link href="/page/terms-and-conditions" onClick={() => setIsMenuOpen(false)}>Terms & Conditions</Link>
          </li>
          <li>
            <Link href="/page/shipping-policy" onClick={() => setIsMenuOpen(false)}>Shipping Policy</Link>
          </li>
          <li>
            <Link href="/page/cancellation-and-refund-policy" onClick={() => setIsMenuOpen(false)}>Cancellation & Refund</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}