import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight, Briefcase, Search, Users, Building2, MapPin, Award, CheckCircle2,
  Zap, ShieldCheck, Sparkles, Clock, Target, Headphones, Quote, GraduationCap,
  Stethoscope, Banknote, Cpu, Truck, ShoppingBag, Factory, Plane, UtensilsCrossed,
  TrendingUp, MessageCircle, Phone, Mail, FileUp, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";
import { toast } from "sonner";
import heroBg from "@/assets/hero-bg.jpg";
import founder from "@/assets/founder-onkar.jpg";
import cofounder from "@/assets/cofounder-akash.png";
import cofounderAkshay from "@/assets/cofounder-akshay.jpg";
import directorSimran from "@/assets/director-simran.png";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero text-white">
      <img src={heroBg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-screen" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-b from-primary-deep/40 via-transparent to-primary-deep/80" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-28 md:pt-28 md:pb-36">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div className="lg:col-span-7" {...fadeUp}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-cta" />
              India's 360° Recruitment Ecosystem
            </div>
            <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-balance">
              India's Trusted <span className="text-transparent bg-clip-text bg-gradient-to-r from-cta to-warning">Recruitment Partner</span> for Fast-Growing Companies
            </h1>
            <p className="mt-6 text-lg text-white/75 max-w-2xl text-balance">
              OAKsphere helps businesses hire skilled talent across IT, BPO, BFSI, Healthcare, Logistics, Retail and Manufacturing — faster, smarter, and with end-to-end recruitment support.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="xl" variant="cta">
                <Link to="/employers">Hire Talent <ArrowRight className="h-5 w-5" /></Link>
              </Button>
              <Button asChild size="xl" variant="hero">
                <Link to="/candidates">Find Jobs</Link>
              </Button>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
              {["Permanent Staffing", "Contract Hiring", "Bulk Recruitment", "Executive Search"].map((t) => (
                <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success" />{t}</span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <div className="glass rounded-2xl p-5 shadow-elegant">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-medium text-white/60 uppercase tracking-wider">Live Hiring Pipeline</div>
                  <span className="flex items-center gap-1.5 text-xs text-success"><span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" /> Active</span>
                </div>
                <div className="mt-4 space-y-3">
                  {[
                    { role: "Sr. React Developer", loc: "Bengaluru", match: 96, color: "bg-success" },
                    { role: "Customer Support Lead", loc: "Pune", match: 91, color: "bg-sky" },
                    { role: "Branch Manager – BFSI", loc: "Mumbai", match: 88, color: "bg-cta" },
                  ].map((c) => (
                    <div key={c.role} className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 p-3">
                      <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${c.color}/20 text-white`}>
                        <Users className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold truncate">{c.role}</div>
                        <div className="text-xs text-white/60 flex items-center gap-1"><MapPin className="h-3 w-3" />{c.loc}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-success">{c.match}%</div>
                        <div className="text-[10px] text-white/50">match</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  {[["Sourced", "284"], ["Shortlisted", "62"], ["Offers", "18"]].map(([l, v]) => (
                    <div key={l} className="rounded-lg bg-white/5 p-2.5">
                      <div className="text-lg font-bold">{v}</div>
                      <div className="text-[10px] uppercase tracking-wider text-white/50">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <motion.div
                className="absolute -bottom-6 -left-6 glass rounded-xl p-3 shadow-elegant hidden sm:block"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="flex items-center gap-2 text-xs">
                  <Award className="h-4 w-4 text-cta" />
                  <span className="font-semibold">21-day average TAT</span>
                </div>
              </motion.div>
              <motion.div
                className="absolute -top-4 -right-4 glass rounded-xl p-3 shadow-elegant hidden sm:block"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <div className="text-[10px] uppercase tracking-wider text-white/60">Cities</div>
                <div className="text-xl font-bold">25+</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function Stats() {
  const stats = [
    { v: "10,000+", l: "Candidates in network" },
    { v: "500+", l: "Roles closed" },
    { v: "50+", l: "Industry categories" },
    { v: "25+", l: "Cities covered" },
    { v: "95%", l: "Client satisfaction" },
  ];
  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {stats.map((s, i) => (
            <motion.div key={s.l} className="text-center" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <div className="font-display text-3xl md:text-4xl font-bold text-primary">{s.v}</div>
              <div className="mt-1 text-xs md:text-sm text-muted-foreground">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const employerServices = [
  { icon: Users, title: "Permanent Hiring", desc: "Full-time talent across functions, screened and ready to join." },
  { icon: Zap, title: "Bulk Hiring", desc: "100+ roles closed in weeks via volume hiring drives." },
  { icon: Briefcase, title: "Contract Staffing", desc: "Flexible workforce with compliant payroll management." },
  { icon: ShieldCheck, title: "Payroll Staffing", desc: "End-to-end statutory compliance and payroll outsourcing." },
  { icon: Award, title: "Executive Search", desc: "Confidential leadership hiring for CXO and senior roles." },
  { icon: GraduationCap, title: "Campus Hiring", desc: "Fresh talent pipelines from Tier-1, 2, 3 institutes." },
];

export function EmployerSolutions() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="max-w-2xl" {...fadeUp}>
          <Badge className="bg-primary/10 text-primary hover:bg-primary/10">For Employers</Badge>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold text-balance">Hiring made simple for Indian businesses</h2>
          <p className="mt-4 text-muted-foreground text-lg">Whether you're hiring 1 specialist or 1,000 frontliners, our recruiters and tech-enabled processes deliver verified talent — fast.</p>
        </motion.div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {employerServices.map((s, i) => (
            <motion.div key={s.title} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.05 }}>
              <Card className="group relative h-full overflow-hidden p-6 hover:shadow-elegant hover:-translate-y-1 transition-all border-border/60">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-hero text-white">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display font-semibold text-xl">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                <div className="mt-5 flex items-center text-sm font-medium text-cta opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ChevronRight className="h-4 w-4" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild size="lg" variant="cta"><Link to="/employers">Post Your Hiring Requirement <ArrowRight className="h-4 w-4"/></Link></Button>
        </div>
      </div>
    </section>
  );
}

export function CandidateSolutions() {
  const items = [
    { icon: FileUp, t: "Upload Resume", d: "One profile, hundreds of opportunities." },
    { icon: Search, t: "Search Jobs", d: "Filter by city, industry, salary and experience." },
    { icon: MessageCircle, t: "WhatsApp Job Updates", d: "Real-time alerts on roles that match you." },
    { icon: Headphones, t: "Career Support", d: "Free interview prep and CV guidance." },
  ];
  return (
    <section className="py-20 md:py-28 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div className="lg:col-span-5" {...fadeUp}>
            <Badge className="bg-success/15 text-success hover:bg-success/15">For Candidates</Badge>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold text-balance">Find the right job, faster.</h2>
            <p className="mt-4 text-muted-foreground text-lg">Get matched with verified employers across India. From freshers to senior leaders, we help you take the next step in your career.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="cta"><Link to="/candidates"><FileUp className="h-4 w-4"/> Upload Resume</Link></Button>
              <Button asChild size="lg" variant="outline"><Link to="/jobs">Browse Jobs</Link></Button>
            </div>
          </motion.div>
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {items.map((it, i) => (
              <motion.div key={it.t} {...fadeUp} transition={{ delay: i * 0.05 }}>
                <Card className="p-6 h-full hover:border-cta/40 hover:shadow-elegant transition-all">
                  <it.icon className="h-7 w-7 text-cta" />
                  <h3 className="mt-4 font-display font-semibold text-lg">{it.t}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{it.d}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const industries = [
  { icon: Cpu, name: "IT & Tech", roles: "Engineers · Data · DevOps" },
  { icon: Headphones, name: "BPO / KPO", roles: "Voice · Non-voice · Chat" },
  { icon: Banknote, name: "Banking & BFSI", roles: "Sales · Operations · RMs" },
  { icon: Stethoscope, name: "Healthcare", roles: "Doctors · Nurses · Allied" },
  { icon: Truck, name: "Logistics", roles: "Drivers · Warehouse · Ops" },
  { icon: ShoppingBag, name: "Retail & E-com", roles: "Store · Field · Supply" },
  { icon: Factory, name: "Manufacturing", roles: "Plant · QA · Engineers" },
  { icon: Plane, name: "Aviation", roles: "Cabin Crew · Ground Staff" },
  { icon: UtensilsCrossed, name: "Hospitality", roles: "F&B · Front Office" },
  { icon: TrendingUp, name: "Sales & Marketing", roles: "BD · Field Sales · Digital" },
];

export function Industries() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="max-w-2xl" {...fadeUp}>
          <Badge className="bg-sky/15 text-primary hover:bg-sky/15">Industries</Badge>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold text-balance">50+ industries. One recruitment partner.</h2>
          <p className="mt-4 text-muted-foreground text-lg">Specialized recruiters with deep domain expertise across India's fastest-growing sectors.</p>
        </motion.div>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {industries.map((ind, i) => (
            <motion.div key={ind.name} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
              <Link to="/industries" className="group block h-full">
                <Card className="h-full p-5 text-center hover:border-cta hover:shadow-elegant hover:-translate-y-1 transition-all">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-secondary group-hover:bg-gradient-hero group-hover:text-white transition-colors">
                    <ind.icon className="h-6 w-6" />
                  </div>
                  <div className="mt-4 font-semibold text-sm">{ind.name}</div>
                  <div className="mt-1 text-[11px] text-muted-foreground">{ind.roles}</div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  const steps = [
    { n: "01", t: "Share Hiring Requirement", d: "Tell us roles, locations, volumes and timelines." },
    { n: "02", t: "Talent Sourcing", d: "We tap into our 10,000+ candidate network instantly." },
    { n: "03", t: "Screening & Shortlisting", d: "Verified, skill-tested, culture-matched profiles." },
    { n: "04", t: "Interview Coordination", d: "We schedule, follow up and close the loop." },
    { n: "05", t: "Offer & Joining Support", d: "Post-offer engagement to ensure smooth onboarding." },
  ];
  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.4_0.15_250/_0.4),transparent_60%)]"/>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="max-w-2xl" {...fadeUp}>
          <Badge className="bg-cta/20 text-cta border-0 hover:bg-cta/20">Our Process</Badge>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold text-balance">From requirement to joining in 5 steps.</h2>
        </motion.div>
        <div className="mt-14 grid md:grid-cols-5 gap-6 relative">
          <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          {steps.map((s, i) => (
            <motion.div key={s.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="relative">
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-cta font-display text-xl font-bold text-cta-foreground shadow-cta">
                {s.n}
              </div>
              <h3 className="mt-5 font-display font-semibold text-lg">{s.t}</h3>
              <p className="mt-2 text-sm text-primary-foreground/70">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyChoose() {
  const items = [
    { icon: Clock, t: "21-day average TAT", d: "Pre-screened pipelines move fast." },
    { icon: ShieldCheck, t: "100% verified candidates", d: "Background, ID and skill verification." },
    { icon: Target, t: "Industry-specialized recruiters", d: "Domain experts across 50+ sectors." },
    { icon: MessageCircle, t: "WhatsApp-first engagement", d: "Real-time updates for clients & candidates." },
    { icon: MapPin, t: "Pan-India hiring network", d: "25+ cities, metro to Tier-3 coverage." },
    { icon: Award, t: "Transparent reporting", d: "Live dashboards & weekly hiring reviews." },
  ];
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center max-w-2xl mx-auto" {...fadeUp}>
          <Badge className="bg-cta/15 text-cta hover:bg-cta/15">Why OAKsphere</Badge>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold text-balance">Built on trust. Powered by speed.</h2>
        </motion.div>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <motion.div key={it.t} {...fadeUp} transition={{ delay: i * 0.05 }} className="flex gap-4 p-6 rounded-2xl border border-border/60 hover:border-cta/40 hover:shadow-elegant transition-all bg-card">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-success/10 text-success">
                <it.icon className="h-5 w-5"/>
              </div>
              <div>
                <h3 className="font-display font-semibold">{it.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{it.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const featuredJobs = [
  { title: "Senior React Developer", company: "Leading Fintech", loc: "Bengaluru", exp: "4–7 yrs", sal: "₹18–28 LPA", type: "Full-time", urgent: true },
  { title: "Customer Support Executive", company: "Global BPO", loc: "Pune", exp: "0–3 yrs", sal: "₹2.4–4.5 LPA", type: "Full-time", urgent: true },
  { title: "Branch Manager", company: "Private Bank", loc: "Mumbai", exp: "6–10 yrs", sal: "₹12–18 LPA", type: "Full-time", urgent: false },
  { title: "Warehouse Supervisor", company: "E-commerce", loc: "Hyderabad", exp: "2–5 yrs", sal: "₹3–5 LPA", type: "Full-time", urgent: true },
  { title: "Staff Nurse", company: "Multi-Speciality Hospital", loc: "Delhi NCR", exp: "1–4 yrs", sal: "₹2.8–4.2 LPA", type: "Full-time", urgent: false },
  { title: "Field Sales Manager", company: "FMCG Brand", loc: "Chennai", exp: "3–6 yrs", sal: "₹5–8 LPA", type: "Full-time", urgent: false },
];

export function FeaturedJobs() {
  return (
    <section className="py-20 md:py-28 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <motion.div {...fadeUp} className="max-w-xl">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/10">Featured Jobs</Badge>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold text-balance">Roles open right now.</h2>
          </motion.div>
          <Button asChild variant="outline"><Link to="/jobs">View all jobs <ArrowRight className="h-4 w-4"/></Link></Button>
        </div>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredJobs.map((j, i) => (
            <motion.div key={j.title} {...fadeUp} transition={{ delay: i * 0.04 }}>
              <Card className="p-6 h-full hover:shadow-elegant hover:-translate-y-1 transition-all border-border/60 group">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display font-semibold text-lg leading-tight">{j.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{j.company}</p>
                  </div>
                  {j.urgent && <Badge className="bg-cta text-cta-foreground hover:bg-cta shrink-0">Urgent</Badge>}
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground"><MapPin className="h-3.5 w-3.5"/>{j.loc}</div>
                  <div className="flex items-center gap-1.5 text-muted-foreground"><Briefcase className="h-3.5 w-3.5"/>{j.exp}</div>
                  <div className="flex items-center gap-1.5 text-muted-foreground"><Banknote className="h-3.5 w-3.5"/>{j.sal}</div>
                  <div className="flex items-center gap-1.5 text-muted-foreground"><Clock className="h-3.5 w-3.5"/>{j.type}</div>
                </div>
                <div className="mt-6 flex items-center gap-2">
                  <Button asChild className="flex-1" variant="cta"><Link to="/candidates">Apply Now</Link></Button>
                  <Button asChild variant="outline" size="icon" className="shrink-0"><a href="https://wa.me/917499815246" aria-label="WhatsApp"><MessageCircle className="h-4 w-4"/></a></Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  { q: "OAKsphere closed 120 customer support roles in 21 days for our Pune center. Their bulk hiring engine is unmatched.", n: "VP – Operations", c: "Leading BPO" },
  { q: "We needed niche fintech engineers fast. OAKsphere delivered shortlists within 48 hours, 3 of 5 hires made.", n: "Head of Talent", c: "Series-B Fintech" },
  { q: "Transparent process, verified profiles, and proactive WhatsApp updates. Easily our most reliable recruitment partner.", n: "HR Director", c: "Healthcare Group" },
];

export function Testimonials() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="max-w-2xl" {...fadeUp}>
          <Badge className="bg-success/15 text-success hover:bg-success/15">Testimonials</Badge>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold text-balance">Trusted by HR leaders across India.</h2>
        </motion.div>
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.08 }}>
              <Card className="p-7 h-full bg-gradient-to-br from-card to-secondary/40 border-border/60 relative overflow-hidden">
                <Quote className="absolute top-5 right-5 h-12 w-12 text-cta/15" />
                <p className="text-foreground/90 leading-relaxed">"{t.q}"</p>
                <div className="mt-6 pt-5 border-t border-border">
                  <div className="font-semibold text-sm">{t.n}</div>
                  <div className="text-xs text-muted-foreground">{t.c}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CaseStudy() {
  return (
    <section className="py-20 md:py-28 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="rounded-3xl bg-gradient-hero text-white p-8 md:p-14 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,oklch(0.7_0.19_45/_0.3),transparent_50%)]"/>
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <Badge className="bg-white/10 text-white border-0 hover:bg-white/10">Case Study</Badge>
              <h3 className="mt-4 font-display text-3xl md:text-4xl font-bold text-balance">120 customer-support roles closed in 21 days.</h3>
              <p className="mt-4 text-white/75 text-lg">A growing BPO needed massive ramp-up across 3 cities. OAKsphere built a parallel sourcing engine, ran walk-in drives, and closed every role inside 3 weeks — onboarding included.</p>
              <Button asChild className="mt-7" variant="cta" size="lg"><Link to="/contact">Get a similar plan <ArrowRight className="h-4 w-4"/></Link></Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                ["120", "Roles closed"], ["21", "Days TAT"],
                ["3", "Cities"], ["94%", "Joining ratio"]
              ].map(([v, l]) => (
                <div key={l} className="rounded-2xl glass p-6 text-center">
                  <div className="font-display text-4xl font-bold text-cta">{v}</div>
                  <div className="mt-1 text-sm text-white/70">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function WhatsAppCTA() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="rounded-3xl bg-[#0d2030] text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden border border-white/5">
          <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-[#25D366]/20 blur-3xl"/>
          <div className="relative">
            <h3 className="font-display text-2xl md:text-3xl font-bold">Need urgent hiring support?</h3>
            <p className="mt-2 text-white/70">Talk to a recruitment expert on WhatsApp — typical response in under 10 minutes.</p>
          </div>
          <div className="relative flex flex-wrap gap-3">
            <Button asChild size="lg" variant="whatsapp"><a href="https://wa.me/917499815246"><MessageCircle className="h-4 w-4"/> Chat on WhatsApp</a></Button>
            <Button asChild size="lg" variant="hero"><a href="tel:+917499815246"><Phone className="h-4 w-4"/> Call Us</a></Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Founder() {
  const leaders = [
    {
      img: founder,
      name: "Onkar Khillare",
      role: "Founder & CEO",
      quote: "We started OAKsphere with a single belief — Indian businesses deserve a recruitment partner that's fast, transparent and built on trust. We're not just filling seats — we're building teams that power India's growth story.",
      phone: "+917499815246",
      phoneLabel: "+91 74998 15246",
      email: "onkar@oaksphere.in",
    },
    {
      img: cofounder,
      name: "Akash Nadar",
      role: "Co-Founder & MD",
      quote: "Recruitment is the foundation of every great company. At OAKsphere, we're engineering a hiring ecosystem that combines deep human judgement with intelligent technology — built to scale with India's most ambitious businesses.",
      phone: "+917021686550",
      phoneLabel: "+91 70216 86550",
      email: "akash@oaksphere.in",
    },
    {
      img: cofounderAkshay,
      name: "Akshay Khillare",
      role: "Co-Founder & Director – Talent Acquisition",
      quote: "Great hiring is part craft, part science. My focus is building a talent acquisition engine that finds the right people fast — and treats every candidate with the respect they deserve.",
      phone: "+919082370765",
      phoneLabel: "+91 90823 70765",
      email: "akshay@oaksphere.in",
    },
    {
      img: directorSimran,
      name: "Simran Somkuwar",
      role: "Director – Human Resources",
      quote: "People are not resources — they are the reason businesses exist. At OAKsphere, my mission is to build a culture where every candidate feels valued, every employee feels heard, and every client feels partnered with for life.",
      phone: "+917499815246",
      phoneLabel: "+91 74998 15246",
      email: "simrank@oaksphere.in",
    },
  ];
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="max-w-2xl" {...fadeUp}>
          <Badge className="bg-primary/10 text-primary hover:bg-primary/10">Leadership</Badge>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold text-balance">Meet Our Leadership Team</h2>
          <p className="mt-4 text-muted-foreground text-lg">A passionate leadership team driven by vision, growth, innovation, and people-first values — building India's most trusted recruitment ecosystem, one hire at a time.</p>
        </motion.div>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {leaders.map((l, i) => (
            <motion.div key={l.name} {...fadeUp} transition={{ delay: i * 0.1 }}>
              <Card className="p-6 md:p-8 h-full hover:shadow-elegant transition-all border-border/60">
                <div className="flex items-start gap-5">
                  <div className="relative shrink-0">
                    <div className="absolute -inset-2 bg-gradient-cta rounded-2xl blur-xl opacity-25"/>
                    <img src={l.img} alt={`${l.name}, ${l.role} of OAKsphere`} className="relative h-28 w-28 md:h-32 md:w-32 rounded-2xl object-cover shadow-elegant"/>
                  </div>
                  <div>
                    <div className="font-display font-bold text-2xl">{l.name}</div>
                    <div className="text-sm text-cta font-medium mt-0.5">{l.role}</div>
                    <div className="mt-3 flex flex-col gap-1.5 text-sm">
                      <a href={`tel:${l.phone}`} className="flex items-center gap-2 text-foreground hover:text-cta"><Phone className="h-4 w-4 text-cta"/>{l.phoneLabel}</a>
                      <a href={`mailto:${l.email}`} className="flex items-center gap-2 text-foreground hover:text-cta"><Mail className="h-4 w-4 text-cta"/>{l.email}</a>
                    </div>
                  </div>
                </div>
                <p className="mt-6 text-muted-foreground leading-relaxed italic relative pl-4 border-l-2 border-cta/40">"{l.quote}"</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Platform() {
  const features = [
    { icon: Cpu, t: "AI Resume Matching", d: "Vector-based candidate-to-JD scoring with explainable match reasons." },
    { icon: MessageCircle, t: "WhatsApp Auto-Engagement", d: "Two-way conversational bot for screening, scheduling and updates." },
    { icon: Target, t: "Smart JD Generator", d: "Generate role-perfect JDs in seconds with built-in DEI checks." },
    { icon: ShieldCheck, t: "1-Click BGV", d: "Automated background, ID, education and employment verification." },
    { icon: TrendingUp, t: "Hiring Analytics", d: "Funnel, source-mix, TAT and offer-drop dashboards in real time." },
    { icon: Zap, t: "ATS + CRM in one", d: "Pipeline, client portal and recruiter workflows — unified." },
  ];
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background to-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="max-w-3xl" {...fadeUp}>
          <Badge className="bg-cta/15 text-cta hover:bg-cta/15">OAKsphere Platform · Coming 2026</Badge>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold text-balance">An AI-native hiring OS for India.</h2>
          <p className="mt-4 text-muted-foreground text-lg">We're building the next generation of recruitment infrastructure — combining our recruiter expertise with AI, WhatsApp and automation. Get early access.</p>
        </motion.div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div key={f.t} {...fadeUp} transition={{ delay: i * 0.05 }}>
              <Card className="p-6 h-full hover:border-cta/40 hover:shadow-elegant hover:-translate-y-1 transition-all">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-cta text-cta-foreground">
                    <f.icon className="h-5 w-5"/>
                  </div>
                  <h3 className="font-display font-semibold text-lg">{f.t}</h3>
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.d}</p>
                <Badge variant="secondary" className="mt-4 text-[10px]">Beta</Badge>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <Button asChild size="lg" variant="cta"><Link to="/contact">Request Early Access <ArrowRight className="h-4 w-4"/></Link></Button>
          <Button asChild size="lg" variant="outline"><Link to="/about">Read our vision</Link></Button>
        </div>
      </div>
    </section>
  );
}

export function Insights() {
  const posts = [
    { tag: "Hiring Trends", t: "India's 2026 hiring outlook: 8 sectors leading the demand", r: "5 min read" },
    { tag: "Salary Guide", t: "IT salary benchmarks across Bengaluru, Pune & Hyderabad", r: "7 min read" },
    { tag: "Interview Tips", t: "How candidates should prepare for HR + technical rounds", r: "4 min read" },
  ];
  return (
    <section className="py-20 md:py-28 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <motion.div {...fadeUp}>
            <Badge className="bg-sky/15 text-primary hover:bg-sky/15">Insights</Badge>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold text-balance">Hiring intelligence from our experts.</h2>
          </motion.div>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {posts.map((p, i) => (
            <motion.div key={p.t} {...fadeUp} transition={{ delay: i * 0.05 }}>
              <Card className="p-6 h-full hover:shadow-elegant hover:-translate-y-1 transition-all">
                <Badge variant="secondary" className="text-xs">{p.tag}</Badge>
                <h3 className="mt-4 font-display font-semibold text-lg leading-snug">{p.t}</h3>
                <div className="mt-4 text-xs text-muted-foreground">{p.r}</div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrustBar() {
  const items = [
    "Leading Fintech", "Global BPO", "Private Bank", "E-commerce Major",
    "Healthcare Group", "FMCG Brand", "Logistics Leader", "SaaS Unicorn",
  ];
  return (
    <section className="border-b border-border bg-background py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Trusted by 200+ growing companies across India
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {items.map((b) => (
            <div key={b} className="text-sm md:text-base font-display font-semibold text-foreground/50 hover:text-foreground transition-colors">
              {b}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function QuickInquiry() {
  const [loading, setLoading] = useState(false);
  const submit = (e: React.FormEvent<HTMLFormElement>, kind: "employer" | "candidate") => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(kind === "employer" ? "Hiring requirement received!" : "Resume submitted!", {
        description: "Our team will reach out within 1 business hour.",
      });
      (e.target as HTMLFormElement).reset();
    }, 700);
  };
  return (
    <section className="py-20 md:py-28 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-start">
        <motion.div className="lg:col-span-5" {...fadeUp}>
          <Badge className="bg-cta/15 text-cta hover:bg-cta/15">Quick Inquiry</Badge>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold text-balance">
            Get started in 60 seconds.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Whether you're hiring or job-hunting, share a few details and our team will reach out within the hour.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {[
              "Free, no-obligation consultation",
              "1-business-hour response guarantee",
              "100% confidential — your data is safe",
              "WhatsApp, call & email support",
            ].map((b) => (
              <li key={b} className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                <span className="text-foreground/80">{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="whatsapp"><a href="https://wa.me/917499815246"><MessageCircle className="h-4 w-4"/> WhatsApp</a></Button>
            <Button asChild variant="outline"><a href="tel:+917499815246"><Phone className="h-4 w-4"/> +91 74998 15246</a></Button>
          </div>
        </motion.div>
        <motion.div className="lg:col-span-7" {...fadeUp}>
          <Card className="p-6 md:p-8 shadow-elegant border-border/60">
            <Tabs defaultValue="employer" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="employer">I'm Hiring</TabsTrigger>
                <TabsTrigger value="candidate">I'm Job-Seeking</TabsTrigger>
              </TabsList>
              <TabsContent value="employer" className="mt-6">
                <form className="grid gap-4" onSubmit={(e) => submit(e, "employer")}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><Label>Company</Label><Input required className="mt-1.5"/></div>
                    <div><Label>Your Name</Label><Input required className="mt-1.5"/></div>
                    <div><Label>Phone</Label><Input required type="tel" className="mt-1.5"/></div>
                    <div><Label>Email</Label><Input required type="email" className="mt-1.5"/></div>
                    <div><Label>Role</Label><Input className="mt-1.5"/></div>
                    <div><Label>Openings</Label><Input type="number" defaultValue={1} className="mt-1.5"/></div>
                  </div>
                  <div><Label>Brief</Label><Textarea rows={3} className="mt-1.5" placeholder="Locations, timeline, must-have skills…"/></div>
                  <Button type="submit" variant="cta" size="lg" disabled={loading}>{loading ? "Sending…" : "Submit Hiring Requirement"}</Button>
                </form>
              </TabsContent>
              <TabsContent value="candidate" className="mt-6">
                <form className="grid gap-4" onSubmit={(e) => submit(e, "candidate")}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><Label>Full Name</Label><Input required className="mt-1.5"/></div>
                    <div><Label>Phone</Label><Input required type="tel" className="mt-1.5"/></div>
                    <div><Label>Email</Label><Input required type="email" className="mt-1.5"/></div>
                    <div><Label>Current City</Label><Input className="mt-1.5"/></div>
                    <div><Label>Experience</Label><Input className="mt-1.5" placeholder="e.g. 3 years"/></div>
                    <div><Label>Preferred Role</Label><Input className="mt-1.5"/></div>
                  </div>
                  <div><Label>Upload Resume (PDF/DOC)</Label><Input type="file" accept=".pdf,.doc,.docx" className="mt-1.5"/></div>
                  <Button type="submit" variant="cta" size="lg" disabled={loading}>{loading ? "Uploading…" : "Submit Resume"}</Button>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

export function FAQ() {
  const faqs = [
    { q: "How quickly can OAKsphere share shortlisted candidates?", a: "For most roles, we deliver pre-screened shortlists within 48 hours. Bulk hiring drives can mobilize 100+ candidates in under a week." },
    { q: "What is your average time-to-hire (TAT)?", a: "Our pan-India average is 21 days from requirement to joining. Niche tech and leadership roles may take 30–45 days." },
    { q: "Do you charge candidates any fees?", a: "Never. OAKsphere is 100% free for candidates. Our fees are paid by employers on successful joining." },
    { q: "How do you verify candidates?", a: "Every candidate is screened on identity, education, employment history and skill fit. We also offer optional 1-click background verification (BGV)." },
    { q: "Do you offer a replacement guarantee?", a: "Yes. For permanent placements, we offer a free replacement if a candidate exits within the agreed guarantee window (typically 60–90 days)." },
    { q: "Which cities and industries do you cover?", a: "We hire across 25+ cities (metros to Tier-3) for 50+ industries — IT, BPO, BFSI, healthcare, retail, logistics, manufacturing, hospitality and more." },
    { q: "Can you handle bulk hiring of 100+ roles?", a: "Absolutely. Bulk and volume hiring is one of our strongest verticals. We run dedicated walk-in drives, virtual assessments and parallel sourcing engines." },
    { q: "How do I get started?", a: "Submit a quick inquiry form, WhatsApp us at +91 74998 15246, or email onkar@oaksphere.in. We respond within 1 business hour." },
  ];
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12">
        <motion.div className="lg:col-span-4" {...fadeUp}>
          <Badge className="bg-primary/10 text-primary hover:bg-primary/10">FAQ</Badge>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold text-balance">Questions, answered.</h2>
          <p className="mt-4 text-muted-foreground text-lg">Everything employers and candidates ask before working with OAKsphere.</p>
          <div className="mt-8 rounded-2xl border border-border p-5 bg-secondary/40">
            <div className="font-display font-semibold">Still have questions?</div>
            <p className="text-sm text-muted-foreground mt-1">Talk to our team directly.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button asChild size="sm" variant="whatsapp"><a href="https://wa.me/917499815246"><MessageCircle className="h-4 w-4"/> WhatsApp</a></Button>
              <Button asChild size="sm" variant="outline"><a href="tel:+917499815246"><Phone className="h-4 w-4"/> Call</a></Button>
            </div>
          </div>
        </motion.div>
        <motion.div className="lg:col-span-8" {...fadeUp}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border/60">
                <AccordionTrigger className="text-left font-display font-semibold text-base md:text-lg hover:no-underline hover:text-cta">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="rounded-3xl bg-gradient-hero text-white p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(0.7_0.19_45/_0.35),transparent_60%)]"/>
          <div className="relative">
            <Badge className="bg-white/10 text-white border-0 hover:bg-white/10">Let's Build Your Team</Badge>
            <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold text-balance max-w-3xl mx-auto">
              Ready to hire faster, smarter, and with total confidence?
            </h2>
            <p className="mt-5 text-white/80 text-lg max-w-2xl mx-auto">
              Join 200+ Indian businesses who trust OAKsphere to power their growth — one great hire at a time.
            </p>
            <div className="mt-9 flex flex-wrap gap-3 justify-center">
              <Button asChild size="xl" variant="cta"><Link to="/employers">Hire Talent <ArrowRight className="h-5 w-5"/></Link></Button>
              <Button asChild size="xl" variant="hero"><Link to="/candidates">Submit Resume</Link></Button>
              <Button asChild size="xl" variant="whatsapp"><a href="https://wa.me/917499815246"><MessageCircle className="h-5 w-5"/> WhatsApp Us</a></Button>
            </div>
            <div className="mt-6 text-sm text-white/60">
              Or call <a href="tel:+917499815246" className="underline underline-offset-4 hover:text-cta">+91 74998 15246</a> · Response within 1 business hour
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
