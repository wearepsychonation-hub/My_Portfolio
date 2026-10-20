import { defineField, type StringRule } from "sanity";

/** Voice rules from design-system/README.md, surfaced as warnings so editors can still save. */
function voice(rule: StringRule) {
  return rule.custom((value) => {
    if (!value) return true;
    if (value.includes("!")) return "No exclamation marks in this voice.";
    if (!value.trim().endsWith(".")) return "Headlines are short sentences that end with a period.";
    return true;
  });
}

export const headlineField = (name = "headline", title = "Headline") =>
  defineField({
    name,
    title,
    type: "string",
    description: "Sentence case, ending with a period. For example: Back to basics.",
    validation: (rule) => [rule.required(), voice(rule).warning()],
  });

export const eyebrowField = () =>
  defineField({
    name: "eyebrow",
    type: "string",
    description:
      "Small uppercase label above the headline. Typed in sentence case; shown uppercase.",
    validation: (rule) => rule.required().max(40),
  });

export const emphasisField = () =>
  defineField({
    name: "emphasis",
    title: "Italic line",
    type: "string",
    description:
      "One italic line under the headline. For example: Your body. Your goals. Your lifestyle.",
    validation: (rule) => [
      rule.required(),
      rule.max(90).warning("Keep the italic line to one short sentence."),
    ],
  });

export const ctaLabelField = (name = "ctaLabel", title = "Button label") =>
  defineField({
    name,
    title,
    type: "string",
    description: "Two or three words. Shown uppercase.",
    validation: (rule) => rule.required().max(28),
  });

const HREF = /^(https?:\/\/|\/|#|tel:|mailto:)/;

/** Accepts the link kinds the site uses: pages, #section anchors, tel:, mailto: and web URLs. */
export const hrefField = (name = "href", title = "Link") =>
  defineField({
    name,
    title,
    type: "string",
    description:
      "A web address (https://…), a section on this page (#schedule), tel:… or mailto:….",
    validation: (rule) =>
      rule
        .required()
        .regex(HREF, { name: "link" })
        .error("Start with https://, /, #, tel: or mailto:"),
  });
