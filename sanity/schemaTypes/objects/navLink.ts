import { LinkIcon } from "@sanity/icons/Link";
import { defineField, defineType } from "sanity";
import { hrefField } from "../shared/fields";

export const navLink = defineType({
  name: "navLink",
  title: "Navigation link",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({ name: "label", type: "string", validation: (rule) => rule.required().max(20) }),
    hrefField(),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});
