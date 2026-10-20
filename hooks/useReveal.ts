"use client";

import { useEffect, useRef } from "react";

/** Marks the element `data-reveal="in"` once it scrolls into view. Styles live in globals.css. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => {
      el.dataset.reveal = "in";
    };
    if (!("IntersectionObserver" in window)) return show();

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          show();
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    // Never leave content hidden, e.g. in a static capture or a print.
    const fallback = setTimeout(show, 2500);
    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return ref;
}
