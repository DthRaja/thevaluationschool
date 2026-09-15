"use client";

import ReactDOM from "react-dom";

/**
 * Poppins Regular/Medium are used above the fold (hero heading area) and
 * swap in late, reflowing everything below them — including the large
 * hero video box further down — and driving most of the homepage's CLS.
 * Preloading them lets the browser fetch the real font before the
 * fallback font has a chance to paint and get swapped out.
 */
const PreloadFonts = () => {
  ReactDOM.preload("/fonts/poppins/Poppins-Regular.woff2", {
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  });

  ReactDOM.preload("/fonts/poppins/Poppins-Medium.woff2", {
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  });

  return null;
};

export default PreloadFonts;
