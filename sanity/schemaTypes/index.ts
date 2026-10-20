import { gym } from "./documents/gym";
import { session } from "./documents/session";
import { testimonial } from "./documents/testimonial";
import { contactCard } from "./objects/contactCard";
import { navLink } from "./objects/navLink";
import { photo } from "./objects/photo";
import { seo } from "./objects/seo";
import { homePage } from "./singletons/homePage";
import { siteSettings } from "./singletons/siteSettings";

export const schemaTypes = [
  // Singletons
  siteSettings,
  homePage,
  // Documents
  gym,
  session,
  testimonial,
  // Objects
  photo,
  seo,
  navLink,
  contactCard,
];
