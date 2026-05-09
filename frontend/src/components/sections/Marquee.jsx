const items = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Tailwind",
  "Framer Motion",
  "MongoDB",
  "Three.js",
  "Vite",
  "Express",
  "GSAP",
  "REST / API",
];

const Marquee = () => {
  const row = items.concat(items);
  return (
    <section
      data-testid="marquee-section"
      className="relative py-10 md:py-14 border-y border-white/5 bg-[#070707] overflow-hidden"
    >
      <div className="marquee-track">
        {row.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-12 md:gap-20 px-6 md:px-10 shrink-0"
          >
            <span className="font-display text-3xl md:text-5xl text-neutral-200 tracking-tight">
              {item}
            </span>
            <span className="text-[var(--accent)] text-2xl md:text-3xl">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Marquee;
