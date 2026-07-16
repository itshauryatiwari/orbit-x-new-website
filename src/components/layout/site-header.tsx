import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/data/services";
import { SITE, whatsappLink } from "@/constants/site";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Home", to: "/" as const },
  { label: "Services", to: "/services" as const, hasDropdown: true },
  { label: "Work", to: "/work" as const },
  { label: "Pricing", to: "/pricing" as const },
  { label: "About", to: "/about" as const },
  { label: "Blog", to: "/blog" as const },
  { label: "Contact", to: "/contact" as const },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold">
          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-navy-gradient text-navy-foreground">
            <span className="absolute inset-1 rounded-full border border-white/30" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-white" />
          </span>
          <span>{SITE.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) =>
            item.hasDropdown ? (
              <div
                key={item.to}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link
                  to={item.to}
                  className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground"
                >
                  {item.label}
                  <ChevronDown className="h-4 w-4" />
                </Link>
                <div
                  className={cn(
                    "absolute left-0 top-full w-72 pt-2 transition-opacity",
                    servicesOpen ? "opacity-100" : "pointer-events-none opacity-0",
                  )}
                >
                  <div className="rounded-xl border border-border bg-popover p-2 shadow-elevated">
                    {SERVICES.map((s) => (
                      <Link
                        key={s.slug}
                        to="/services/$slug"
                        params={{ slug: s.slug }}
                        className="flex items-start gap-3 rounded-lg px-3 py-2 hover:bg-accent"
                      >
                        <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-md bg-orbit/10 text-orbit">
                          <s.icon className="h-4 w-4" />
                        </span>
                        <span>
                          <span className="block text-sm font-medium">{s.title}</span>
                          <span className="block text-xs text-muted-foreground">{s.short}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="outline" size="sm">
            <a href={whatsappLink("Hi Orbit X, I'd like to chat.")} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </Button>
          <Button asChild variant="orbit" size="sm">
            <Link to="/contact">Get Quote</Link>
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium hover:bg-accent"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Button asChild variant="outline">
                <a href={whatsappLink()} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </Button>
              <Button asChild variant="orbit">
                <Link to="/contact" onClick={() => setOpen(false)}>
                  Get Quote
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
