// TradingViewWidget.jsx
// @ts-nocheck

import React, { useEffect, useRef, useState } from "react";

let tvScriptLoadingPromise;

export default function TradingViewWidget({ ticker }) {
  const onLoadScriptRef = useRef();
  const [tickerC, setTickerC] = useState("SPY");

  useEffect(() => {
    setTickerC(ticker);
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    );

    return () => (onLoadScriptRef.current = null);

    function createWidget() {
      if (
        document.getElementById("tradingview_02cb4") &&
        "TradingView" in window
      ) {
        new window.TradingView.widget({
          autosize: true,
          symbol: ` AMEX:${ticker}`,
          interval: "D",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "2",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: "tradingview_02cb4",
        });
      }
    }
  }, [ticker]);

  return (
    <div className="container">
      <div className="tradingview-widget-container">
        <div
          id="tradingview_02cb4"
          style={{ height: "585px", width: "900px" }}
        />
        <div className="tradingview-widget-copyright"></div>
      </div>
    </div>
  );
}
