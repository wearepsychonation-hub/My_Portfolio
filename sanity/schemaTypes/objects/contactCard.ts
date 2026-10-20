import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { defineField, defineType } from "sanity";
import { CONTACT_CHANNELS } from "@/lib/contact";
import { ctaLabelField, headlineField } from "../shared/fields";

export const contactCard = defineType({
  name: "contactCard",
  title: "Contact card",
  type: "object",
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: "channel",
      type: "string",
      description:
        "The number, address or handle and the link come from Site settings → Contact, so they're only entered once.",
      options: {
        list: Object.entries(CONTACT_CHANNELS).map(([value, { title }]) => ({ title, value })),
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
      description: "One short line. The contact detail is added after it.",
      validation: (rule) => rule.required().max(90),
    }),
    ctaLabelField(),
  ],
  preview: { select: { title: "title", subtitle: "channel" } },
});
