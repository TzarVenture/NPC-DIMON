"use client";

import { useState } from "react";
import IntroSequence from "./components/IntroSequence";
import Header from "./components/Header";
import HomePage from "./components/HomePage";

export default function RootPage() {
  // introComplete flips to true when the user clicks ENTER on the welcome screen
  const [introComplete, setIntroComplete] = useState(false);

  // if (!introComplete) {
  //   return <IntroSequence onComplete={() => setIntroComplete(true)} />;
  // }

  // Once intro is done, render the actual site (header + home content)
  return (
    <div className="mainSite">
      <Header />
      <HomePage />
    </div>
  );
}