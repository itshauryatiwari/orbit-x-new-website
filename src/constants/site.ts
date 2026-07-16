export const SITE = {
  name: "The Orbit X",
  tagline: "Grow your brand with strategic web, social, design & video.",
  email: "theorbitxgrowthwithus@gmail.com",
  // TODO: replace with the real WhatsApp number in international format, digits only.
  whatsappNumber: "919350006474",
  url: "https://theorbitx.example",
  description:
    "The Orbit X is a digital agency helping small and growing businesses build web, social, design and video presence that converts.",
} as const;

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${SITE.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
