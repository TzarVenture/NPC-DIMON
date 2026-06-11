export default function HomePage() {


  return (
    <>
      {/* ALERT BAR */}
      <div className="alertBar">
        <div className="scrollText">
          ⚡ NEW TRANSMISSIONS INCOMING ⚡ STAY ALERT ⚡ LIVE DROPS ⚡ NEW
          TRANSMISSIONS INCOMING ⚡ STAY ALERT ⚡ LIVE DROPS ⚡
        </div>
      </div>

      {/* STATS */}
      <div className="statsGrid" style={{color: "red"}}>
        <div className="stat">
          <div className="statNumber">03</div>
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
      <div className="sectionTitle" style={{color:"red"}}>● ALL TRANSMISSIONS</div>

      {/* DROP GRID */}
      <div className="dropGrid" style={{color:"red"}}>
        <div className="dropCard">
          <div className="dropTag">VELOCITY</div>
          <div className="dropStatus">● LIVE</div>
          <h2>PHANTOM RACER</h2>
          <p>Speed beyond perception. A machine built to defy physics.</p>
        </div>

        <div className="dropCard">
          <div className="dropTag">OPTICS</div>
          <div className="dropStatus ended">ENDED</div>
          <h2>NEON PARADOX</h2>
          <p>Light that bends reality. See what shouldn't exist.</p>
        </div>

        <div className="dropCard">
          <div className="dropTag">FORCE</div>
          <div className="dropStatus">● LIVE</div>
          <h2>GRAVITY SHIFT</h2>
          <p>Mass manipulation protocol activated.</p>
        </div>

        <div className="dropCard">
          <div className="dropTag">EDGE</div>
          <div className="dropStatus coming">COMING</div>
          <h2>ZERO LIMIT</h2>
          <p>Next transmission arriving soon.</p>
        </div>
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
    </>
  );
}