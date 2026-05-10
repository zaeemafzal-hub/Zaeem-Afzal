import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

const HERO_BG =
  "https://static.prod-images.emergentagent.com/jobs/9da37acc-7b06-49a2-a627-164c81d03ee9/images/c7245a92fc6f7a930f55d33cb132bfacc3da2b325f99fb7c4bdd5e3e6a647e7a.png";

const easeOut = [0.2, 0.8, 0.2, 1];

const scrollTo = (hash) => {
  const el = document.querySelector(hash);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -40 });
  else el.scrollIntoView({ behavior: "smooth" });
};

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section
      ref={ref}
      id="hero"
      data-testid="hero-section"
      className="relative min-h-[100svh] w-full overflow-hidden flex flex-col justify-end pb-16 md:pb-24"
    >
      {/* Background image w/ parallax */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 z-0"
      >
        <img
          src={HERO_BG}
          alt=""
          className="w-full h-full object-cover opacity-60"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-[#050505]/40 to-[#050505]" />
        <div className="absolute inset-0 hero-grid opacity-60" />
      </motion.div>

      <div className="grain absolute inset-0 z-[2]" />

      {/* Top tagline row */}
      <div className="relative z-10 mx-auto w-full max-w-[1480px] px-6 md:px-10 pt-32 md:pt-40">
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: easeOut }}
            className="col-span-12 md:col-span-4 flex items-start gap-3"
          >
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_14px_var(--accent-glow)]" />
            <p className="text-overline">
              Available for select <br className="hidden md:block" />
              freelance &amp; full-time roles · 2026
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: easeOut }}
            className="col-span-12 md:col-span-4 md:col-start-9 md:text-right"
          >
            <p className="text-overline">
              Frontend &amp; Full-stack <br className="hidden md:block" />
              Lahore, Pakistan
            </p>
          </motion.div>
        </div>
      </div>

      {/* Massive name */}
      <motion.div
        style={{ y: titleY }}
        className="relative z-10 mx-auto w-full max-w-[1480px] px-6 md:px-10 mt-24 md:mt-32"
      >
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.4, delay: 0.3, ease: easeOut }}
            className="font-display font-medium text-white leading-[0.85] tracking-[-0.04em] text-[clamp(3.5rem,14vw,15rem)]"
            data-testid="hero-name"
          >
            Zaeem
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.4, delay: 0.5, ease: easeOut }}
            className="font-display font-medium text-white leading-[0.85] tracking-[-0.04em] text-[clamp(3.5rem,14vw,15rem)] flex items-end gap-4 md:gap-8"
          >
            <span>Afzal</span>
            <span className="hidden md:inline-block translate-y-[-0.4em] text-[var(--accent)] text-[clamp(1rem,1.4vw,1.4rem)] font-body uppercase tracking-[0.32em] font-normal">
              ★ Frontend / Full-stack Engineer
            </span>
          </motion.h1>
        </div>
      </motion.div>

      {/* Bottom row: intro + cta */}
      <div className="relative z-10 mx-auto w-full max-w-[1480px] px-6 md:px-10 mt-16 md:mt-20">
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: easeOut }}
            className="col-span-12 md:col-span-5 md:col-start-7"
          >
            <p
              className="text-neutral-300 text-base md:text-lg leading-relaxed font-light max-w-[480px]"
              data-testid="hero-tagline"
            >
              I design and build immersive, performance-driven web experiences —
              cinematic frontends, modern interfaces, and scalable full-stack
              systems with React, Next.js and Node.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <button
                data-testid="hero-cta-work"
                onClick={() => scrollTo("#work")}
                className="btn-magnetic group inline-flex items-center gap-3 border border-white/20 hover:border-white/40 px-6 py-3.5 rounded-full text-[13px] uppercase tracking-[0.22em] text-white transition-colors"
              >
                See selected work
                <ArrowDownRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1"
                />
              </button>
              <button
                data-testid="hero-cta-contact"
                onClick={() => scrollTo("#contact")}
                className="group inline-flex items-center gap-3 px-2 py-3.5 text-[13px] uppercase tracking-[0.22em] text-neutral-400 hover:text-white transition-colors"
              >
                Get in touch
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="relative z-10 mx-auto w-full max-w-[1480px] px-6 md:px-10 mt-20 md:mt-28 flex items-center justify-between text-overline"
      >
        <div className="flex items-center gap-3">
          <span className="block h-px w-10 bg-white/20" />
          Scroll
        </div>
        <div className="hidden md:block">© 2026 — Selected works</div>
      </motion.div>
    </section>
  );
};

export default Hero;
