import { PinIcon } from "@sanity/icons/Pin";
import { defineField, defineType } from "sanity";
import { hrefField } from "../shared/fields";

export const GYM_TONES = [
  { title: "Solid black", value: "solid" },
  { title: "Black outline", value: "outline" },
  { title: "Light gray", value: "tint" },
];

export const gym = defineType({
  name: "gym",
  title: "Gym",
  type: "document",
  icon: PinIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      description: "Shown on schedule slots, filter tabs and the location card.",
      validation: (rule) => rule.required().max(24),
    }),
    defineField({
      name: "neighborhood",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "address",
      type: "string",
      description: "Street address and city, as it should appear on the card.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tone",
      type: "string",
      description:
        "How this gym's sessions look in the schedule. Gyms are told apart by tone, never by color, so each gym needs its own (three gyms at most).",
      options: { list: GYM_TONES, layout: "radio" },
      validation: (rule) =>
        rule.required().custom(async (tone, context) => {
          if (!tone) return true;
          const id = context.document?._id.replace(/^drafts\./, "");
          const taken = await context
            .getClient({ apiVersion: "2026-10-01" })
            .fetch<string | null>(
              `*[_type == "gym" && tone == $tone && !(_id in [$id, "drafts." + $id])][0].name`,
              { tone, id },
            );
          return taken ? `${taken} already uses this tone. Pick another.` : true;
        }),
    }),
    hrefField("directionsUrl", "Directions link"),
    hrefField("bookUrl", "Booking link"),
    defineField({
      name: "image",
      title: "Exterior photo",
      type: "photo",
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Position in tabs, legend and location cards. Lowest first.",
      initialValue: 1,
      validation: (rule) => rule.required().integer().min(1),
    }),
  ],
  orderings: [
    { title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", neighborhood: "neighborhood", tone: "tone", media: "image" },
    prepare: ({ title, neighborhood, tone, media }) => ({
      title,
      subtitle: [GYM_TONES.find((t) => t.value === tone)?.title, neighborhood]
        .filter(Boolean)
        .join(" · "),
      media: media ?? PinIcon,
    }),
  },
});
