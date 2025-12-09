"use client";
import { useEffect } from "react";

export default function TawkTo() {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/693868cd6127cb198377b6cc/1jc25iq6a";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);
  }, []);

  return null; 
}
