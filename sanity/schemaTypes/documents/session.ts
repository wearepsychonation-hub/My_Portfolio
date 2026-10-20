import { ClockIcon } from "@sanity/icons/Clock";
import { defineField, defineType } from "sanity";
import { DAYS } from "@/lib/schedule";

export const DAY_OPTIONS = DAYS.map((d) => ({ title: d.long, value: d.key }));

const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;

export const session = defineType({
  name: "session",
  title: "Session",
  type: "document",
  icon: ClockIcon,
  fields: [
    defineField({
      name: "day",
      type: "string",
      options: { list: DAY_OPTIONS, layout: "radio", direction: "horizontal" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "start",
      type: "string",
      description: "24-hour time, for example 06:00 or 17:30.",
      validation: (rule) =>
        rule.required().regex(TIME, { name: "HH:mm" }).error("Use HH:mm, e.g. 06:00"),
    }),
    defineField({
      name: "end",
      type: "string",
      description: "24-hour time, after the start.",
      validation: (rule) =>
        rule
          .required()
          .regex(TIME, { name: "HH:mm" })
          .error("Use HH:mm, e.g. 07:00")
          .custom((end, context) => {
            const start = (context.document as { start?: string } | undefined)?.start;
            // Zero-padded HH:mm strings compare correctly as text.
            return !end || !start || end > start ? true : "The session must end after it starts.";
          }),
    }),
    defineField({
      name: "gym",
      type: "reference",
      to: [{ type: "gym" }],
      options: { disableNew: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "type",
      title: "Session type",
      type: "string",
      options: {
        list: [
          { title: "1-1", value: "1-1" },
          { title: "Group", value: "Group" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "1-1",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "fullyBooked",
      type: "boolean",
      description:
        "Shows the slot hatched with the time struck through, and removes the booking link.",
      initialValue: false,
    }),
  ],
  orderings: [
    { title: "Start time", name: "startAsc", by: [{ field: "start", direction: "asc" }] },
  ],
  preview: {
    select: {
      day: "day",
      start: "start",
      end: "end",
      gym: "gym.name",
      type: "type",
      full: "fullyBooked",
    },
    prepare: ({ day, start, end, gym, type, full }) => ({
      title: `${DAYS.find((d) => d.key === day)?.short ?? "New"} ${start ?? "--:--"}–${end ?? "--:--"}`,
      subtitle: [gym, type, full && "Fully booked"].filter(Boolean).join(" · "),
    }),
  },
});
