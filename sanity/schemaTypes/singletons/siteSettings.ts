import { CogIcon } from "@sanity/icons/Cog";
import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { MenuIcon } from "@sanity/icons/Menu";
import { SearchIcon } from "@sanity/icons/Search";
import { UserIcon } from "@sanity/icons/User";
import { defineArrayMember, defineField, defineType } from "sanity";
import { hrefField } from "../shared/fields";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "identity", title: "Trainer", icon: UserIcon, default: true },
    { name: "contact", title: "Contact", icon: EnvelopeIcon },
    { name: "navigation", title: "Navigation", icon: MenuIcon },
    { name: "seo", title: "SEO", icon: SearchIcon },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Trainer name",
      type: "string",
      group: "identity",
      description: "Used as the wordmark in the nav and footer, and in the About headline.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "city",
      type: "string",
      group: "identity",
      validation: (rule) => rule.required(),
    }),
    { ...hrefField("bookUrl", "Booking link"), group: "identity" },
    defineField({
      name: "phone",
      type: "string",
      group: "contact",
      description: "As it should be read, for example 020 7946 0000.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp number",
      type: "string",
      group: "contact",
      description: "Include the country code so the WhatsApp link works.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      type: "string",
      group: "contact",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "instagram",
      title: "Instagram handle",
      type: "string",
      group: "contact",
      validation: (rule) =>
        rule
          .required()
          .regex(/^@[\w.]+$/, { name: "handle" })
          .error("Start with @, e.g. @yourname"),
    }),
    defineField({
      name: "nav",
      title: "Navigation links",
      type: "array",
      group: "navigation",
      description: "Links in the top bar. The Book button is added automatically.",
      of: [defineArrayMember({ type: "navLink" })],
      validation: (rule) => rule.required().min(1).max(5),
    }),
    defineField({
      name: "seo",
      title: "SEO defaults",
      type: "seo",
      group: "seo",
      options: { collapsible: false },
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
