"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────
   ASCII GATE  (IN / OUT choice screen)
───────────────────────────────────────── */
function AsciiLanding({ onEnter }) {
  const [glitch, setGlitch] = useState(false);
  const [showOutScreen, setShowOutScreen] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });

  const handleOutClick = () => {
    setGlitch(true);
    setTimeout(() => {
      setGlitch(false);
      setShowOutScreen(true);
    }, 700);
  };

  const moveButton = () => {
    setIsMoving(true);
    const padding = 80;
    const maxX = window.innerWidth - padding;
    const maxY = window.innerHeight - padding;
    setBtnPos({
      x: Math.random() * maxX,
      y: Math.random() * maxY,
    });
  };

  if (showOutScreen) {
    return (
      <div className="noWayScreen">
        <div className="noWayBox">
          <span className="noWayRed">NO WAY</span>
          <br />
          <span className="noWayBlack">BACK OUT</span>
        </div>
        <div className="noWayLine" />
        <p className="noWayText">
          YOU THOUGHT YOU COULD LEAVE?
          <br />
          THERE'S ONLY ONE WAY — FORWARD.
        </p>
        <button className="btnIn" onClick={onEnter}>
          I'M IN →
        </button>
      </div>
    );
  }

  return (
    <div className="choicePage">
      <div className="choiceContainer">
        <div className="orText">OR</div>
        <div className="bigChoice">IN</div>
        <div className="bigChoice">OUT?</div>
        <div className="choiceLine" />
        <div className="choiceSubtitle">CHOOSE YOUR SIDE — NO GOING BACK</div>

        <div className="choiceButtons">
          <button
            className={`btnOut ${glitch ? "outGlitch" : ""}`}
            onMouseEnter={moveButton}
            onTouchStart={moveButton}
            onClick={moveButton}
            style={
              isMoving
                ? {
                    position: "fixed",
                    left: btnPos.x,
                    top: btnPos.y,
                    transition: "all 0.2s ease",
                  }
                : {}
            }
          >
            I'M OUT
          </button>

          <button className="btnIn" onClick={onEnter}>
            I'M IN
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   INTRO SEQUENCE  (all stages, one component)
   Calls onComplete() when done so the parent
   can switch to rendering the real site.
───────────────────────────────────────── */
export default function IntroSequence({ onComplete }) {
  // stages: landing → logo → warning → countdown → video → welcome
  const [stage, setStage] = useState("landing");
  const [timer, setTimer] = useState(172800);
  const [videoIndex, setVideoIndex] = useState(0);

  const videoRef      = useRef(null);
  const finalVideoRef = useRef(null);
  const warningSound  = useRef(null);
  const bombSound     = useRef(null);

  /* ── helpers ── */
  const formatTime = (seconds) => {
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return (
      String(d).padStart(2, "0") + ":" +
      String(h).padStart(2, "0") + ":" +
      String(m).padStart(2, "0") + ":" +
      String(s).padStart(2, "0")
    );
  };

  /* ── enter (landing → logo → warning) ── */
  const enterSite = () => {
    setStage("logo");
    setTimeout(() => setStage("warning"), 2500);
  };

  /* ── warning → countdown ── */
  useEffect(() => {
    if (stage !== "warning") return;
    if (warningSound.current) {
      warningSound.current.currentTime = 0;
      warningSound.current.play();
    }
    const t = setTimeout(() => setStage("countdown"), 3000);
    return () => clearTimeout(t);
  }, [stage]);

  /* ── countdown → video ── */
  useEffect(() => {
    if (stage !== "countdown") return;

    if (bombSound.current) {
      bombSound.current.currentTime = 0;
      bombSound.current.loop = true;
      bombSound.current.play();
    }

    let visibleTime = 5000;

    const interval = setInterval(() => {
      setTimer((prev) => (prev <= 0 ? 0 : prev - Math.floor(Math.random() * 400 + 80)));
      visibleTime -= 100;

      if (visibleTime <= 0) {
        clearInterval(interval);
        if (bombSound.current) bombSound.current.pause();
        if (videoIndex <= 2) setStage("video");
      }
    }, 100);

    return () => clearInterval(interval);
  }, [stage]);

  /* ── video clips ── */
  useEffect(() => {
    if (stage !== "video" || !videoRef.current) return;

    const video = videoRef.current;
    const segments = [
      [0, 3],
      [3, 6],
      [6, 10],
    ];
    const [start, end] = segments[videoIndex] ?? [0, 3];

    video.currentTime = start;
    video.play();

    const stop = () => {
      if (video.currentTime < end) return;
      video.pause();
      video.removeEventListener("timeupdate", stop);

      if (videoIndex < 2) {
        setVideoIndex((i) => i + 1);
        setStage("countdown");
      } else {
        setStage("welcome");
      }
    };

    video.addEventListener("timeupdate", stop);
    return () => video.removeEventListener("timeupdate", stop);
  }, [stage]);

  /* ── final video (unused in original flow, kept for completeness) ── */
  useEffect(() => {
    if (stage !== "finalVideo" || !finalVideoRef.current) return;
    finalVideoRef.current.currentTime = 20;
    finalVideoRef.current.play();
  }, [stage]);

  /* ════════════════════════════════════════
     RENDER
  ════════════════════════════════════════ */

  /* LANDING */
  if (stage === "landing") {
    return <AsciiLanding onEnter={enterSite} />;
  }

  /* LOGO */
  if (stage === "logo") {
    return (
      <div className="logoScreen">
        <Image src="/logo.png" width={300} height={300} alt="logo" className="logoBlink" />
      </div>
    );
  }

  /* WARNING */
  if (stage === "warning") {
    return (
      <div className="warningScreen">
        <audio ref={warningSound} src="/warning.mp3" />
        <div className="warningBox">WARNING</div>
        <div className="warningText">
          <p>
            THIS VIDEO MAY POTENTIALLY TRIGGER <br />
            SEIZURES FOR PEOPLE WITH <br />
            PHOTOSENSITIVE EPILEPSY.
          </p>
        </div>
      </div>
    );
  }

  /* COUNTDOWN */
  if (stage === "countdown") {
    return (
      <div className="countScreen">
        <audio ref={bombSound} src="/bomb-tick.mp3" />
        <div className="countTitle">SIGNAL COUNTDOWN</div>
        <div className="countBox">{formatTime(timer)}</div>
      </div>
    );
  }

  /* VIDEO (segmented) */
  if (stage === "video") {
    return (
      <div className="videoScreen fullVideo">
        <video ref={videoRef} autoPlay playsInline>
          <source src="/video 1.mp4" type="video/mp4" />
        </video>
      </div>
    );
  }

  /* FINAL VIDEO */
  if (stage === "finalVideo") {
    return (
      <div className="videoScreen fullVideo">
        <video
          ref={finalVideoRef}
          autoPlay
          playsInline
          onEnded={() => setStage("welcome")}
        >
          <source src="/video 1.mp4" type="video/mp4" />
        </video>
      </div>
    );
  }

  /* WELCOME — last stage, calls onComplete to reveal the real site */
  if (stage === "welcome") {
    return (
      <div className="welcomeScreen">
        <div className="welcomeBox">WELCOME</div>
        <button className="enterBtn" onClick={onComplete}>
          ENTER
        </button>
      </div>
    );
  }

  return null;
}