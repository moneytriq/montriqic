"use client";

import { useEffect, useRef } from "react";
import styles from "./tradingview-widget.module.css";

export default function TradingViewWidget() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Prevent duplicate script injection
    if (containerRef.current.querySelector("script")) return;

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
    script.async = true;

    script.innerHTML = JSON.stringify({
      displayMode: "regular",
      feedMode: "all_symbols",
      colorTheme: "light",
      isTransparent: true,
      locale: "en",
      width: "100%",
      height: 550,
      margin: "auto",
    });

    containerRef.current.appendChild(script);
  }, []);

  return (
    <div ref={containerRef}>
      <div className="tradingview-widget-container__widget" />
      <div className="tradingview-widget-copyright" />
    </div>
  );
}
