import { Globe } from "lucide-react";
import { PROJECTS } from "@/data/projects";

const SITES = PROJECTS.filter((p) => p.category === "Web Development");

export function WebsitesExperience() {
  return (
    <div className="flex h-full flex-col">
      <div className="shrink-0 px-6 pb-6 pt-16 text-center sm:pt-20">
        <Globe className="mx-auto h-9 w-9 text-orbit" />
        <h2 className="mt-4 text-3xl font-semibold text-navy-foreground sm:text-4xl">
          Websites
        </h2>
        <p className="mt-2 text-sm text-navy-foreground/60 sm:text-base">
          Conversion-focused sites we've shipped.
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-10 sm:px-8">
        <div className="mx-auto flex max-w-4xl flex-col gap-5">
          {SITES.map((site) => (
            <a
              key={site.slug}
              href={site.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-elevated transition-all duration-300 hover:border-orbit/40 hover:shadow-glow sm:flex-row"
            >
              <div className="h-44 shrink-0 overflow-hidden sm:h-auto sm:w-64">
                {site.thumbnail ? (
                  <img
                    src={site.thumbnail}
                    alt={site.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-orbit-gradient">
                    <Globe className="h-10 w-10 text-orbit-foreground/80" />
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col justify-center p-6 text-left sm:p-8">
                <span className="text-[11px] font-medium uppercase tracking-widest text-orbit">
                  {site.category}
                </span>

                <h3 className="mt-2 text-xl font-semibold text-navy-foreground sm:text-2xl">
                  {site.title}
                </h3>

                <p className="mt-2 text-sm text-navy-foreground/70">
                  {site.summary}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {site.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] text-navy-foreground/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}