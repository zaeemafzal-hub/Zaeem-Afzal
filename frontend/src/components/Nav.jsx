import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

const scrollTo = (hash) => {
  const el = document.querySelector(hash);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -40 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      data-testid="site-nav"
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1], delay: 0.2 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#050505]/70 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1480px] px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <button
          data-testid="nav-logo"
          onClick={() => scrollTo("#hero")}
          className="font-display text-base md:text-lg tracking-tight text-white"
        >
          Zaeem<span className="text-[var(--accent)]">.</span>
        </button>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <button
              key={l.href}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              onClick={() => scrollTo(l.href)}
              className="group relative font-body text-[13px] uppercase tracking-[0.22em] text-neutral-400 hover:text-white transition-colors duration-300"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-500 group-hover:w-full" />
            </button>
          ))}
        </nav>

        <div className="hidden md:block">
          <button
            data-testid="nav-cta-talk"
            onClick={() => scrollTo("#contact")}
            className="btn-magnetic relative inline-flex items-center gap-2 border border-white/15 px-5 py-2.5 rounded-full text-[12px] uppercase tracking-[0.22em] text-white hover:border-white/40 transition-colors"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_12px_var(--accent-glow)]" />
            Let's Talk
          </button>
        </div>

        <button
          data-testid="nav-mobile-toggle"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 text-white"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="nav-mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#050505]/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {links.map((l) => (
                <button
                  key={l.href}
                  data-testid={`nav-mobile-link-${l.label.toLowerCase()}`}
                  onClick={() => {
                    setOpen(false);
                    setTimeout(() => scrollTo(l.href), 50);
                  }}
                  className="text-left font-display text-2xl text-white"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Nav;
