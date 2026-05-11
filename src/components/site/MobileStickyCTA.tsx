import { Link } from "@tanstack/react-router";
import { Briefcase, Search } from "lucide-react";

export function MobileStickyCTA() {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-background/95 backdrop-blur-md p-2 grid grid-cols-2 gap-2">
      <Link to="/candidates" className="flex items-center justify-center gap-2 h-11 rounded-lg border border-border text-sm font-semibold">
        <Search className="h-4 w-4"/> Find Jobs
      </Link>
      <Link to="/employers" className="flex items-center justify-center gap-2 h-11 rounded-lg bg-gradient-cta text-cta-foreground text-sm font-semibold">
        <Briefcase className="h-4 w-4"/> Hire Talent
      </Link>
    </div>
  );
}
