"use client";

import Link from "next/link";

export default function Header() {
  return (
    <div className="topHeader" style={{ color: "red", background: "black" }}>
      {/* LEFT: logo + brand */}
      <div className="leftHeader">
        <div className="logoBox">??</div>
        <div className="hq">TRANSMISSION HQ</div>
      </div>

      {/* NAV */}
      <nav className="navItem">
        <ul className="navItem-ul">
          <li>
            <Link href="/products/menstrual-jacket">Menstrual Jacket</Link>
          </li>
          <li>
            <Link href="/products/smocker-shoes">Smocker Shoes</Link>
          </li>
          <li>
            <Link href="/page/about">About US</Link>
          </li>
          <li>
            <Link href="/page/privacy-policy">Privacy Policy</Link>
          </li>
        </ul>
      </nav>

      {/* RIGHT: elapsed */}
      <div className="elapsedBox">
        <div className="elapsedLabel">ELAPSED</div>
        <div className="elapsedTime">04:07:52:15</div>
      </div>
    </div>
  );
}