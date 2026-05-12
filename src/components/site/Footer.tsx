import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook, Twitter, Youtube, MessageCircle } from "lucide-react";

const socials = [
  { icon: Linkedin, href: "https://www.linkedin.com/company/oaksphere", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/oaksphere.in", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/oaksphere.in", label: "Facebook" },
  { icon: Twitter, href: "https://x.com/oakspherein", label: "X" },
  { icon: Youtube, href: "https://www.youtube.com/@oaksphere", label: "YouTube" },
  { icon: MessageCircle, href: "https://wa.me/917499815246", label: "WhatsApp" },
];
import logoMark from "@/assets/oaksphere-mark.png";

const cols = [
  {
    title: "Services",
    links: [
      ["Permanent Staffing", "/services"],
      ["Contract Staffing", "/services"],
      ["Bulk Hiring", "/services"],
      ["Executive Search", "/services"],
      ["Campus Recruitment", "/services"],
      ["Payroll Staffing", "/services"],
    ],
  },
  {
    title: "Industries",
    links: [
      ["IT Staffing", "/industries"],
      ["BPO Recruitment", "/industries"],
      ["Banking & BFSI", "/industries"],
      ["Healthcare", "/industries"],
      ["Manufacturing", "/industries"],
      ["Retail & E-commerce", "/industries"],
    ],
  },
  {
    title: "Cities",
    links: [
      ["Mumbai", "/contact"],
      ["Pune", "/contact"],
      ["Bangalore", "/contact"],
      ["Hyderabad", "/contact"],
      ["Delhi NCR", "/contact"],
      ["Chennai", "/contact"],
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 font-display font-bold text-2xl">
              <img src={logoMark} alt="OAKsphere logo" width={40} height={40} loading="lazy" className="h-10 w-10 object-contain bg-white rounded-lg p-1" />
              OAK<span className="text-cta">sphere</span>
            </div>
            <p className="mt-4 text-sm text-primary-foreground/70 max-w-sm">
              India's trusted recruitment partner. Connecting talent, building teams, and powering growth across IT, BPO, BFSI, Healthcare, Manufacturing and more.
            </p>
            <div className="mt-6 space-y-2 text-sm text-primary-foreground/80">
              <a href="tel:+917499815246" className="flex items-center gap-2 hover:text-cta"><Phone className="h-4 w-4"/> +91 74998 15246</a>
              <a href="mailto:onkar@oaksphere.in" className="flex items-center gap-2 hover:text-cta"><Mail className="h-4 w-4"/> onkar@oaksphere.in</a>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4"/> India · Pan-India Hiring Network</div>
            </div>
            <div className="mt-5 flex gap-3">
              {[Linkedin, Instagram, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-cta transition-colors"><Icon className="h-4 w-4"/></a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4">{c.title}</h4>
              <ul className="space-y-2.5 text-sm text-primary-foreground/70">
                {c.links.map(([label, to]) => (
                  <li key={label}><Link to={to} className="hover:text-cta transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/60">
          <p>© {new Date().getFullYear()} OAKsphere. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/contact" className="hover:text-cta">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-cta">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
