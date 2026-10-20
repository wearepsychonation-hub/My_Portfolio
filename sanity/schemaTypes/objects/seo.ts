import { SearchIcon } from "@sanity/icons/Search";
import { defineField, defineType } from "sanity";
import { BRAND_TOKENS_HINT } from "../shared/fields";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  icon: SearchIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      description: `Browser tab and search result title. ${BRAND_TOKENS_HINT}`,
      validation: (rule) =>
        rule.required().max(60).warning("Search engines cut titles after ~60 characters."),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      validation: (rule) =>
        rule.required().max(160).warning("Search engines cut descriptions after ~160 characters."),
    }),
    defineField({
      name: "ogImage",
      title: "Share image",
      type: "photo",
      description:
        "Shown when the site is shared on social or messaging apps. 1200×630 works best.",
    }),
  ],
});
