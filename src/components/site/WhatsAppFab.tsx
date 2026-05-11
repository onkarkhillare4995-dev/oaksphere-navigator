import { MessageCircle } from "lucide-react";

export function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/917499815246?text=Hi%20OAKsphere%2C%20I%27d%20like%20to%20discuss%20hiring."
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-20 right-5 md:bottom-6 md:right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-cta hover:scale-110 transition-transform"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366] opacity-30" />
    </a>
  );
}
