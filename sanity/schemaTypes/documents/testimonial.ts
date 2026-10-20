import { CommentIcon } from "@sanity/icons/Comment";
import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  icon: CommentIcon,
  description: "Real client words only, published with the client's permission.",
  fields: [
    defineField({
      name: "quote",
      type: "text",
      rows: 4,
      description: "The client's own words. No quotation marks; the site adds them.",
      validation: (rule) => [
        rule.required(),
        rule.max(220).warning("Long quotes crowd the carousel. Aim for two sentences."),
      ],
    }),
    defineField({
      name: "name",
      title: "Client name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "detail",
      type: "string",
      description: "How they train, for example 1-1 client or Small group.",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "name", subtitle: "quote" } },
});
