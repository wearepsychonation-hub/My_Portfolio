import { ImageIcon } from "@sanity/icons/Image";
import { defineField, defineType } from "sanity";

export const photo = defineType({
  name: "photo",
  title: "Photo",
  type: "image",
  icon: ImageIcon,
  description:
    "Real training photography, black and white or desaturated. No stock, no before/after.",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      description: "Describe what is in the photo for people using screen readers.",
      validation: (rule) =>
        rule.custom((alt, context) => {
          const parent = context.parent as { asset?: unknown } | undefined;
          return !parent?.asset || alt ? true : "Alt text is required.";
        }),
    }),
  ],
});
