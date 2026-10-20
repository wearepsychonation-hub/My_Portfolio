import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { defineField, defineType } from "sanity";
import { ctaLabelField, headlineField, hrefField } from "../shared/fields";

export const contactCard = defineType({
  name: "contactCard",
  title: "Contact card",
  type: "object",
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: "icon",
      type: "string",
      description: "Generic line icons only; platform logos are not part of the system.",
      options: {
        list: [
          { title: "Phone", value: "phone" },
          { title: "Chat bubble", value: "chat" },
          { title: "Envelope", value: "mail" },
          { title: "Camera", value: "camera" },
          { title: "Map pin", value: "pin" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      validation: (rule) => rule.required(),
    }),
    headlineField("title", "Title"),
    defineField({
      name: "text",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required().max(90),
    }),
    ctaLabelField(),
    hrefField(),
  ],
  preview: { select: { title: "title", subtitle: "href" } },
});
