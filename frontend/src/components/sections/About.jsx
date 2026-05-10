import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "@/components/Reveal";

const PROFILE =
  "https://customer-assets.emergentagent.com/job_zaeem-editorial/artifacts/6b7lcq15_za1%281%29%281%29.png";

const About = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section
      id="about"
      ref={ref}
      data-testid="about-section"
      className="relative py-32 md:py-48 bg-[#050505]"
    >
      <div className="mx-auto max-w-[1480px] px-6 md:px-10">
        <Reveal className="flex items-center gap-3 mb-16 md:mb-24">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_14px_var(--accent-glow)]" />
          <span className="text-overline">[ 01 ] About</span>
        </Reveal>

        <div className="grid grid-cols-12 gap-6 md:gap-12 items-start">
          {/* Image */}
          <div className="col-span-12 md:col-span-5 md:col-start-1">
            <motion.div
              style={{ y: imgY }}
              className="relative overflow-hidden rounded-sm border border-white/5 aspect-[4/5] md:aspect-[3/4] bg-[#0d0d0d]"
              data-testid="about-image-wrap"
            >
              <img
                src={PROFILE}
                alt="Zaeem Afzal"
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 text-overline">
                Zaeem Afzal — 2026
              </div>
            </motion.div>
          </div>

          {/* Text */}
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <Reveal delay={0.05}>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.02] tracking-tight text-white">
                Crafting cinematic <br />
                interfaces and{" "}
                <span className="text-[var(--accent)]">resilient systems</span>{" "}
                for the modern web.
              </h2>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-10 text-neutral-400 text-base md:text-lg leading-relaxed font-light max-w-[560px]">
                I'm a frontend &amp; full-stack developer focused on building
                high-end digital products — from immersive marketing sites to
                scalable dashboards and e-commerce platforms. I obsess over
                detail: typography, motion timing, accessibility and
                performance.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="mt-6 text-neutral-400 text-base md:text-lg leading-relaxed font-light max-w-[560px]">
                I work with React, Next.js, TypeScript, Tailwind, Node and
                MongoDB — and pair them with motion design, smooth scrolling and
                editorial layout to make work that actually feels alive.
              </p>
            </Reveal>

            <Reveal delay={0.35}>
              <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 max-w-[520px]">
                {[
                  { k: "Years", v: "3+" },
                  { k: "Projects", v: "20+" },
                  { k: "Focus", v: "Frontend / FS" },
                  { k: "Base", v: "Lahore, PK" },
                ].map((s) => (
                  <div key={s.k} className="border-t border-white/10 pt-4">
                    <div className="text-overline mb-3">{s.k}</div>
                    <div className="font-display text-2xl md:text-3xl text-white">
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
