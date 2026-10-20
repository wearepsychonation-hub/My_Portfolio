import type { IconName } from "@/components/atoms/Icon";
import type { ContactChannel } from "@/types/content";
import type { Brand } from "@/types/schedule";

const digits = (s: string) => s.replace(/\D/g, "");

/** Contact details live once, in the brand; each card only says which channel it is. */
export const CONTACT_CHANNELS: Record<
  ContactChannel,
  { title: string; icon: IconName; resolve: (b: Brand) => { value: string; href: string } }
> = {
  phone: {
    title: "Phone",
    icon: "phone",
    resolve: (b) => ({
      value: b.phone,
      href: `tel:${b.phone.trim().startsWith("+") ? "+" : ""}${digits(b.phone)}`,
    }),
  },
  whatsapp: {
    title: "WhatsApp",
    icon: "chat",
    resolve: (b) => ({ value: b.whatsapp, href: `https://wa.me/${digits(b.whatsapp)}` }),
  },
  email: {
    title: "Email",
    icon: "mail",
    resolve: (b) => ({ value: b.email, href: `mailto:${b.email}` }),
  },
  instagram: {
    title: "Instagram",
    icon: "camera",
    resolve: (b) => ({
      value: b.instagram,
      href: `https://instagram.com/${b.instagram.replace(/^@/, "")}`,
    }),
  },
};

export function resolveContact(channel: ContactChannel, brand: Brand) {
  const { icon, resolve } = CONTACT_CHANNELS[channel];
  return { icon, ...resolve(brand) };
}
