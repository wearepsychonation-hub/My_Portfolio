import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Custom text sizes share the text-* prefix with colors; without this, text-label would drop text-ink.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-xl",
            "display-l",
            "display-m",
            "h2",
            "h2-mobile",
            "h3",
            "wordmark",
            "lead",
            "emphasis",
            "base",
            "body-s",
            "quote",
            "quote-mobile",
            "label",
            "label-s",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
