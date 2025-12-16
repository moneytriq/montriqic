"use client";
import { useEffect } from "react";

export default function Jivio() {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "//code.jivosite.com/widget/1aWLx6J1HJ";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);
  }, []);

  return null;
}
