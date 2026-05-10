import { useRef } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

const stack = [
  { name: "React", note: "Component architecture", category: "Frontend" },
  { name: "Next.js", note: "App router & SSR", category: "Frontend" },
  { name: "TypeScript", note: "Type-safe scale", category: "Language" },
  { name: "Tailwind CSS", note: "Design system", category: "Styling" },
  { name: "Framer Motion", note: "Motion design", category: "Motion" },
  { name: "GSAP", note: "Cinematic timelines", category: "Motion" },
  { name: "Three.js", note: "Immersive 3D", category: "3D" },
  { name: "Node.js", note: "Backend runtime", category: "Backend" },
  { name: "Express", note: "REST APIs", category: "Backend" },
  { name: "MongoDB", note: "Document data", category: "Database" },
  { name: "Vite", note: "Modern bundler", category: "Tooling" },
  { name: "Vercel", note: "Edge deploy", category: "DevOps" },
];

const TechCard = ({ t, i }) => {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      data-testid={`tech-card-${t.name.toLowerCase().replace(/[^a-z]/g, "-")}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.8,
        delay: i * 0.04,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      className="tech-card relative border border-white/10 bg-[#0a0a0a] p-6 md:p-8 rounded-sm hover:border-white/20 transition-colors duration-500"
    >
      <div className="flex items-start justify-between mb-10 md:mb-14">
        <span className="text-overline text-neutral-500">
          {String(i + 1).padStart(2, "0")}
        </span>
        <span className="text-overline text-neutral-500">{t.category}</span>
      </div>
      <div className="font-display text-2xl md:text-3xl text-white leading-tight tracking-tight">
        {t.name}
      </div>
      <div className="mt-2 text-neutral-500 text-sm font-light">{t.note}</div>
    </motion.div>
  );
};

const TechStack = () => {
  return (
    <section
      id="stack"
      data-testid="techstack-section"
      className="relative py-32 md:py-48 bg-[#070707] border-y border-white/5"
    >
      <div className="mx-auto max-w-[1480px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6 md:gap-12 mb-16 md:mb-24">
          <Reveal className="col-span-12 md:col-span-5 flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_14px_var(--accent-glow)]" />
            <span className="text-overline">[ 03 ] Toolkit</span>
          </Reveal>
          <Reveal delay={0.1} className="col-span-12 md:col-span-7">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.02] tracking-tight text-white">
              The tools I reach for, <br />
              tuned for{" "}
              <span className="text-[var(--accent)]">speed and feel</span>.
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {stack.map((t, i) => (
            <TechCard key={t.name} t={t} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
