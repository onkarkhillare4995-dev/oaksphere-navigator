import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { MobileStickyCTA } from "@/components/site/MobileStickyCTA";
import type { ReactNode } from "react";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <Footer />
      <WhatsAppFab />
      <MobileStickyCTA />
    </div>
  );
}

export function PageHero({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <section className="bg-gradient-hero text-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cta">{eyebrow}</div>
        <h1 className="mt-3 font-display text-4xl md:text-6xl font-bold text-balance max-w-3xl">{title}</h1>
        {subtitle && <p className="mt-5 text-lg text-white/75 max-w-2xl">{subtitle}</p>}
      </div>
    </section>
  );
}
