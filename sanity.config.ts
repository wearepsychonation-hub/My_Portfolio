"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectIdOrPlaceholder } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { singletonTypes } from "./sanity/singletons";
import { structure } from "./sanity/structure";

const SINGLETON_ACTIONS = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
  name: "default",
  title: "Personal training",
  basePath: "/studio",
  // The Studio route renders a setup notice instead of mounting without a project.
  projectId: projectIdOrPlaceholder,
  dataset,
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev.filter((t) => !singletonTypes.has(t.schemaType)),
      {
        id: "session-on-day",
        title: "Session on day",
        schemaType: "session",
        parameters: [{ name: "day", type: "string" }],
        value: (params: { day: string }) => ({ day: params.day, type: "1-1", fullyBooked: false }),
      },
    ],
  },
  document: {
    // Singletons can only be edited and published; never duplicated, deleted or unpublished.
    actions: (prev, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? prev.filter((a) => a.action && SINGLETON_ACTIONS.has(a.action))
        : prev,
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === "global"
        ? prev.filter((t) => !singletonTypes.has(t.templateId) && t.templateId !== "session-on-day")
        : prev,
  },
});
