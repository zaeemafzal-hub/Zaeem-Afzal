import { ArrowUp } from "lucide-react";

const scrollTop = () => {
  if (window.__lenis) window.__lenis.scrollTo(0);
  else window.scrollTo({ top: 0, behavior: "smooth" });
};

const Footer = () => {
  return (
    <footer
      data-testid="site-footer"
      className="relative bg-[#050505] border-t border-white/5"
    >
      <div className="mx-auto max-w-[1480px] px-6 md:px-10 py-12 md:py-16">
        <div className="grid grid-cols-12 gap-6 md:gap-12 items-end">
          <div className="col-span-12 md:col-span-6">
            <div className="font-display text-4xl md:text-6xl text-white tracking-tight leading-[0.95]">
              Zaeem<span className="text-[var(--accent)]">.</span>
            </div>
            <p className="mt-3 text-neutral-500 text-sm font-light max-w-[420px]">
              Frontend &amp; full-stack engineer · Crafting cinematic interfaces.
            </p>
          </div>

          <div className="col-span-6 md:col-span-3">
            <div className="text-overline mb-3">Elsewhere</div>
            <ul className="space-y-2 font-display text-base text-white">
              <li>
                <a
                  href="https://github.com/zaeemafzal-hub"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--accent)] transition-colors"
                  data-testid="footer-github"
                >
                  GitHub ↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/zaeeem-afzal-333061270"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--accent)] transition-colors"
                  data-testid="footer-linkedin"
                >
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a
                  href="mailto:zaeeemafzal@gmail.com"
                  className="hover:text-[var(--accent)] transition-colors"
                  data-testid="footer-email"
                >
                  Email ↗
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-3 md:text-right">
            <button
              onClick={scrollTop}
              data-testid="footer-back-top"
              className="group inline-flex items-center gap-3 border border-white/15 hover:border-white/40 px-5 py-3 rounded-full text-[12px] uppercase tracking-[0.22em] text-white transition-colors"
            >
              Back to top
              <ArrowUp
                size={14}
                className="transition-transform group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-overline">
          <span>© 2026 Zaeem Afzal — All rights reserved</span>
          <span>
            Designed &amp; built with React, Tailwind &amp; Framer Motion
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
