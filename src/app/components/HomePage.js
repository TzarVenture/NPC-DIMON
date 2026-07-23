"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const [isNormalMode, setIsNormalMode] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const json = await res.json();
        if (json.success && json.data) {
          setProducts(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      containerRef.current.style.setProperty("--x", `${e.clientX}px`);
      containerRef.current.style.setProperty("--y", `${e.clientY}px`);
    }
  };

  return (
    <div
      className="homePageContainer"
      onMouseMove={isNormalMode ? undefined : handleMouseMove}
      style={{
        // Flambeau/torch cursor from a CDN, fallback to auto
        cursor: isNormalMode ? 'auto' : `url('https://cdn-icons-png.flaticon.com/32/785/785116.png') 16 16, auto`,
        minHeight: "100vh",
        position: "relative",
        backgroundImage: isNormalMode ? "none" : "url('/monster.png')", // Generated scary monster background
        backgroundSize: "cover",

        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundColor: isNormalMode ? "#111" : "transparent"
      }}
    >

      {/* THE BLACK OVERLAY FLASHLIGHT EFFECT */}

      {!isNormalMode && (
        <div
          className="flashlightOverlay"
          ref={containerRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.92)", // Slightly transparent so the site is faintly visible
            pointerEvents: "none",
            zIndex: 50,
            // Starts off-screen so everything is dark until mouse moves
            "--x": "-1000px",
            "--y": "-1000px",
            // The transparent part of the mask hides the overlay (revealing the site clearly)
            maskImage: "radial-gradient(circle 250px at var(--x) var(--y), transparent 0%, rgba(0,0,0,0.5) 40%, black 80%)",
            WebkitMaskImage: "radial-gradient(circle 250px at var(--x) var(--y), transparent 0%, rgba(0,0,0,0.5) 40%, black 80%)"
          }}
        />
      )}

      {/* ALERT BAR */}
      <div className="alertBar">
        <div className="scrollText">
          ⚡ NEW TRANSMISSIONS INCOMING ⚡ STAY ALERT ⚡ LIVE DROPS ⚡ NEW
          TRANSMISSIONS INCOMING ⚡ STAY ALERT ⚡ LIVE DROPS ⚡
        </div>
      </div>

      {/* STATS */}
      <div className="statsGrid" style={{ color: "red" }}>
        <div className="stat">
          <div className="statNumber">{products.length < 10 ? `0${products.length}` : products.length}</div>
          <div className="statLabel">ACTIVE DROPS</div>
        </div>
        <div className="stat">
          <div className="statNumber">12.4K</div>
          <div className="statLabel">TOTAL ENTRIES</div>
        </div>
        <div className="stat">
          <div className="statNumber">??:??</div>
          <div className="statLabel">NEXT DROP</div>
        </div>
      </div>

      {/* SECTION TITLE */}
      <div className="sectionTitle" style={{ color: "red" }}>● ALL TRANSMISSIONS</div>

      {/* DROP GRID */}
      <div className="dropGrid" style={{ color: "red" }}>
        {loading ? (
          <div style={{ padding: "20px" }}>LOADING...</div>
        ) : products.length > 0 ? (
          products.map((product) => {
            const isEnded = product.stock === 0;
            return (
              <Link href={`/checkout/${product._id}`} key={product._id}>
                <div className="dropCard">
                  <div className="dropTag">{product.category ? product.category.toUpperCase() : "ITEM"}</div>
                  <div className={`dropStatus ${isEnded ? "ended" : ""}`}>
                    {isEnded ? "ENDED" : "● LIVE"}
                  </div>
                  <h2 style={{ textTransform: "uppercase" }}>{product.title}</h2>
                  <p>{product.description}</p>
                </div>
              </Link>
            );
          })
        ) : (
          <div style={{ padding: "20px" }}>NO TRANSMISSIONS FOUND.</div>
        )}
      </div>

      {/* MORE INCOMING */}
      <div className="moreIncomingSection">
        <div className="incomingBox">
          <div className="incomingLabel">SIGNAL DETECTED</div>
          <div className="incomingTitle">MORE INCOMING</div>
          <div className="incomingSub">
            STAY CONNECTED. DON'T MISS THE NEXT TRANSMISSION.
          </div>
        </div>
      </div>
    </div>
  );
}

