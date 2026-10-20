import { BlockquoteIcon } from "@sanity/icons/Blockquote";
import { CalendarIcon } from "@sanity/icons/Calendar";
import { CommentIcon } from "@sanity/icons/Comment";
import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { HomeIcon } from "@sanity/icons/Home";
import { ImageIcon } from "@sanity/icons/Image";
import { ImagesIcon } from "@sanity/icons/Images";
import { StarIcon } from "@sanity/icons/Star";
import { UserIcon } from "@sanity/icons/User";
import { defineArrayMember, defineField, defineType } from "sanity";
import {
  ctaLabelField,
  emphasisField,
  eyebrowField,
  headlineField,
  hrefField,
} from "../shared/fields";

const section = (name: string, title: string, fields: ReturnType<typeof defineField>[]) =>
  defineField({
    name,
    title,
    type: "object",
    group: name,
    options: { collapsible: false },
    fields,
    validation: (rule) => rule.required(),
  });

const photoField = (description: string) =>
  defineField({ name: "image", title: "Photo", type: "photo", description });

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "Hero", icon: StarIcon, default: true },
    { name: "schedule", title: "Schedule", icon: CalendarIcon },
    { name: "statement", title: "Statement", icon: BlockquoteIcon },
    { name: "band", title: "Photo band", icon: ImageIcon },
    { name: "contact", title: "Contact", icon: EnvelopeIcon },
    { name: "testimonials", title: "Testimonials", icon: CommentIcon },
    { name: "about", title: "About", icon: UserIcon },
    { name: "gallery", title: "Gallery", icon: ImagesIcon },
  ],
  fields: [
    section("hero", "Hero", [
      eyebrowField(),
      headlineField(),
      emphasisField(),
      ctaLabelField(),
      photoField("Full-bleed action shot behind the headline. Landscape, at least 2400px wide."),
    ]),
    defineField({
      name: "ticker",
      title: "Ticker",
      type: "string",
      group: "hero",
      description: "The black strip under the hero, next to the pin icon.",
      validation: (rule) => rule.required().max(60),
    }),
    section("schedule", "Schedule heading", [eyebrowField(), headlineField(), emphasisField()]),
    section("statement", "Statement", [
      headlineField(),
      defineField({
        name: "lead",
        title: "Opening paragraph",
        type: "text",
        rows: 3,
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: "paragraphs",
        type: "array",
        of: [defineArrayMember({ type: "text", rows: 3 })],
      }),
      emphasisField(),
      ctaLabelField(),
    ]),
    section("band", "Photo band", [
      headlineField(),
      emphasisField(),
      ctaLabelField(),
      hrefField("ctaHref", "Button link"),
      photoField("Small group in action. Landscape."),
    ]),
    section("contact", "Contact", [
      eyebrowField(),
      headlineField(),
      emphasisField(),
      defineField({
        name: "cards",
        type: "array",
        of: [defineArrayMember({ type: "contactCard" })],
        validation: (rule) => rule.required().min(1).max(4),
      }),
    ]),
    section("testimonials", "Testimonials", [
      eyebrowField(),
      defineField({
        name: "items",
        title: "Testimonials",
        type: "array",
        description: "Shown in this order in the carousel.",
        of: [defineArrayMember({ type: "reference", to: [{ type: "testimonial" }] })],
        validation: (rule) => rule.required().min(1).unique(),
      }),
      photoField("Dark, low-key portrait behind the quotes."),
    ]),
    section("about", "About", [
      eyebrowField(),
      headlineField(),
      emphasisField(),
      defineField({
        name: "bio",
        type: "array",
        of: [
          defineArrayMember({
            type: "block",
            styles: [{ title: "Paragraph", value: "normal" }],
            lists: [],
            marks: {
              decorators: [
                { title: "Emphasis", value: "em" },
                { title: "Strong", value: "strong" },
              ],
              annotations: [
                {
                  name: "link",
                  type: "object",
                  title: "Link",
                  fields: [hrefField()],
                },
              ],
            },
          }),
        ],
        validation: (rule) => rule.required().min(1),
      }),
      photoField("Coach portrait behind the bio."),
    ]),
    defineField({
      name: "gallery",
      type: "array",
      group: "gallery",
      description: "Four square photos under the About section.",
      of: [defineArrayMember({ type: "photo" })],
      options: { layout: "grid" },
      validation: (rule) =>
        rule.length(4).warning("The gallery is designed for exactly four photos."),
    }),
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
});
