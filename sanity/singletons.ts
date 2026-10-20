/** Fixed document IDs: one of each, pinned in the desk and kept out of "Create new". */
export const SINGLETONS = [
  { type: "siteSettings", id: "siteSettings", title: "Site settings" },
  { type: "homePage", id: "homePage", title: "Home page" },
] as const;

export const singletonTypes = new Set<string>(SINGLETONS.map((s) => s.type));
