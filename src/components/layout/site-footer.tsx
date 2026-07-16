import { Link } from "@tanstack/react-router";
import { Mail, MessageCircle } from "lucide-react";
import { SITE, whatsappLink } from "@/constants/site";
import { SERVICES } from "@/data/services";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-navy-gradient text-navy-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 font-display text-lg font-semibold">
              <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              <span>{SITE.name}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-white/70">
              Web, social, design and video for growing businesses. Based in India, working
              worldwide.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/60">
              Services
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="text-white/80 hover:text-white"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/60">
              Company
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/work" className="text-white/80 hover:text-white">
                  Work
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-white/80 hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-white/80 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/60">
              Get in touch
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white"
                >
                  <Mail className="h-4 w-4" /> {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
