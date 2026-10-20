import { CalendarIcon } from "@sanity/icons/Calendar";
import { ClockIcon } from "@sanity/icons/Clock";
import { CogIcon } from "@sanity/icons/Cog";
import { CommentIcon } from "@sanity/icons/Comment";
import { HomeIcon } from "@sanity/icons/Home";
import { PinIcon } from "@sanity/icons/Pin";
import type { StructureBuilder, StructureResolver } from "sanity/structure";
import { DAY_OPTIONS } from "./schemaTypes/documents/session";

const singleton = (S: StructureBuilder, type: string, title: string, icon: typeof CogIcon) =>
  S.listItem()
    .title(title)
    .icon(icon)
    .child(S.document().schemaType(type).documentId(type).title(title));

const sessionsForDay = (S: StructureBuilder, day: { title: string; value: string }) =>
  S.listItem()
    .title(day.title)
    .icon(ClockIcon)
    .child(
      S.documentList()
        .title(`${day.title} sessions`)
        .schemaType("session")
        .filter('_type == "session" && day == $day')
        .params({ day: day.value })
        .defaultOrdering([{ field: "start", direction: "asc" }])
        .initialValueTemplates([S.initialValueTemplateItem("session-on-day", { day: day.value })]),
    );

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      singleton(S, "siteSettings", "Site settings", CogIcon),
      singleton(S, "homePage", "Home page", HomeIcon),
      S.divider(),
      S.listItem()
        .title("Schedule")
        .icon(CalendarIcon)
        .child(
          S.list()
            .title("Schedule")
            .items([
              S.documentTypeListItem("gym")
                .title("Gyms")
                .icon(PinIcon)
                .child(
                  S.documentTypeList("gym")
                    .title("Gyms")
                    .defaultOrdering([{ field: "order", direction: "asc" }]),
                ),
              S.divider(),
              ...DAY_OPTIONS.map((day) => sessionsForDay(S, day)),
              S.divider(),
              S.documentTypeListItem("session").title("All sessions").icon(ClockIcon),
            ]),
        ),
      S.documentTypeListItem("testimonial").title("Testimonials").icon(CommentIcon),
    ]);
