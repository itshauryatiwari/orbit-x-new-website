import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/constants/site";

export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink("Hi Orbit X, I'd like to chat about a project.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-elevated transition-transform hover:scale-105"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
