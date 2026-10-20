"use client";

import { useEffect, useRef } from "react";

let observer: IntersectionObserver | undefined;

/** One observer for every revealed element on the page. */
function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.reveal = "in";
        observer?.unobserve(entry.target);
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );
  return observer;
}

/** Marks the element `data-reveal="in"` once it scrolls into view. Styles live in globals.css. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.dataset.reveal = "in";
      return;
    }
    const io = getObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  return ref;
}
