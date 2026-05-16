import { Link } from "@tanstack/react-router";
import { Menu, X, Phone, Linkedin, Instagram, Facebook, Twitter, Youtube, MessageCircle } from "lucide-react";

const socials = [
  { icon: MessageCircle, href: "https://wa.me/917499815246", label: "WhatsApp", primary: true },
  { icon: Linkedin, href: "https://www.linkedin.com/company/oaksphere", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/oaksphere.in", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/oaksphere.in", label: "Facebook" },
  { icon: Twitter, href: "https://x.com/oakspherein", label: "X" },
  { icon: Youtube, href: "https://www.youtube.com/@oaksphere", label: "YouTube" },
];
import { useState } from "react";
import { Button } from "@/components/ui/button";
import logoMark from "@/assets/oaksphere-mark.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/industries", label: "Industries" },
  { to: "/jobs", label: "Jobs" },
  { to: "/employers", label: "Employers" },
  { to: "/candidates", label: "Candidates" },
  { to: "/ai-match", label: "AI Match" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl">
          <img src={logoMark} alt="OAKsphere logo" width={36} height={36} className="h-9 w-9 object-contain" />
          <span>OAK<span className="text-cta">sphere</span></span>
        </Link>
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="text-muted-foreground hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <Button asChild variant="outline" size="sm"><Link to="/candidates">Find Jobs</Link></Button>
          <Button asChild variant="cta" size="sm"><Link to="/employers">Hire Talent</Link></Button>
        </div>
        <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="flex flex-col p-4 gap-3">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="py-2 text-sm font-medium" onClick={() => setOpen(false)}>{l.label}</Link>
            ))}
            <div className="flex gap-2 pt-2">
              <Button asChild variant="outline" className="flex-1"><Link to="/candidates">Find Jobs</Link></Button>
              <Button asChild variant="cta" className="flex-1"><Link to="/employers">Hire Talent</Link></Button>
            </div>
            <a href="tel:+917499815246" className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-2">
              <Phone className="h-4 w-4" /> +91 74998 15246
            </a>
            <a href="https://wa.me/917499815246" target="_blank" rel="noreferrer" className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-[#25D366] text-white py-2.5 text-sm font-semibold">
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
            <div className="mt-3 pt-3 border-t border-border flex items-center justify-center gap-1">
              {socials.filter(s => !s.primary).map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="grid h-10 w-10 place-items-center rounded-full text-primary hover:text-[#EF9F27] transition-colors">
                  <s.icon className="h-5 w-5" strokeWidth={1.75}/>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
