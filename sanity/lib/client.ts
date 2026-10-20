import { createClient } from "next-sanity";
import { apiVersion, dataset, projectIdOrPlaceholder } from "../env";

export const client = createClient({
  projectId: projectIdOrPlaceholder,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  // Only needed for a private dataset. This module is imported by server code only.
  token: process.env.SANITY_API_READ_TOKEN,
});
