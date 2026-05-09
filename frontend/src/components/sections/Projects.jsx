import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Reveal from "@/components/Reveal";

const projects = [
  {
    id: "react-ecommerce",
    index: "01",
    title: "React E-Commerce",
    role: "Frontend / Full-stack",
    year: "2025",
    tags: ["React", "Tailwind", "Cart Logic", "Vercel"],
    description:
      "A modern, responsive e-commerce front built with React and Tailwind — animated product grid, cart state, and a polished checkout-ready UI.",
    image:
      "https://static.prod-images.emergentagent.com/jobs/9da37acc-7b06-49a2-a627-164c81d03ee9/images/45cb5588268f385c7255c702a2fab1d3d769e40ddf1371fffcc1e0fc20d6c466.png",
    live: "https://react-web-ecommerce-app.vercel.app/",
    github: null,
    span: "lg",
  },
  {
    id: "travel-dashboard",
    index: "02",
    title: "Travel Agency Dashboard",
    role: "Full-stack Dashboard",
    year: "2025",
    tags: ["React", "Charts", "Admin UI", "Routing"],
    description:
      "An analytics-first dashboard for a travel agency: trip metrics, customer flows and a clean editorial admin UI built for clarity at a glance.",
    image:
      "https://images.unsplash.com/photo-1775178120154-0ee95586bfb1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNTl8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmFsJTIwYnVpbGRpbmclMjBleHRlcmlvciUyMG5pZ2h0fGVufDB8fHx8MTc3ODMyMTQyM3ww&ixlib=rb-4.1.0&q=85",
    live: "https://travel-agency-dashboard-cyan-three.vercel.app/",
    github: "https://github.com/zaeemafzal-hub/travel-agency-dashboard",
    span: "md",
  },
  {
    id: "learning-center",
    index: "03",
    title: "Online Learning Center",
    role: "Frontend",
    year: "2024",
    tags: ["React", "Course UI", "Responsive"],
    description:
      "A learning platform interface — course cards, structured lessons and a calm reading layout built around content hierarchy.",
    image:
      "https://static.prod-images.emergentagent.com/jobs/9da37acc-7b06-49a2-a627-164c81d03ee9/images/75eb7d912a815c6f7eb87d7ecede070c041bcfcf52a8239b61d1530c6f386eff.png",
    live: null,
    github: "https://github.com/zaeemafzal-hub/Online-Learnning-center-",
    span: "md",
  },
  {
    id: "todo-task-list",
    index: "04",
    title: "Todo Task List",
    role: "Frontend",
    year: "2024",
    tags: ["React", "State", "LocalStorage"],
    description:
      "A focused, minimal task manager — keyboard-first, persistent storage and small thoughtful interactions where it counts.",
    image:
      "https://images.unsplash.com/photo-1772408186777-7bbc603c4fb3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzN8MHwxfHNlYXJjaHwyfHxtaW5pbWFsaXN0JTIwbm90ZWJvb2slMjBkZXNrJTIwZGFya3xlbnwwfHx8fDE3NzgzMjE0MjN8MA&ixlib=rb-4.1.0&q=85",
    live: null,
    github: "https://github.com/zaeemafzal-hub/Todo-Task-list-Project",
    span: "md",
  },
  {
    id: "phone-ecommerce",
    index: "05",
    title: "Phone E-Commerce",
    role: "Frontend",
    year: "2025",
    tags: ["React", "Catalog", "Filtering"],
    description:
      "A device-focused storefront with rich product galleries, category filtering and a confident product detail layout.",
    image:
      "https://images.unsplash.com/photo-1611255680670-3164d238e164?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNDR8MHwxfHNlYXJjaHwzfHxzbWFydHBob25lJTIwZmxvYXRpbmclMjBkYXJrJTIwYmFja2dyb3VuZHxlbnwwfHx8fDE3NzgzMjE0MjN8MA&ixlib=rb-4.1.0&q=85",
    live: null,
    github: "https://github.com/zaeemafzal-hub/react-phone-ecomerce-project",
    span: "md",
  },
  {
    id: "property-hub",
    index: "06",
    title: "Property Hub",
    role: "Full-stack",
    year: "2025",
    tags: ["React", "Listings", "Search"],
    description:
      "A real-estate browsing experience — listings, filters and detail views composed as a clean editorial product.",
    image:
      "https://images.unsplash.com/photo-1774261583415-f4b6200bd1b5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNTl8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmFsJTIwYnVpbGRpbmclMjBleHRlcmlvciUyMG5pZ2h0fGVufDB8fHx8MTc3ODMyMTQyM3ww&ixlib=rb-4.1.0&q=85",
    live: null,
    github: "https://github.com/zaeemafzal-hub/property_hub-",
    span: "lg",
  },
];

const ProjectCard = ({ p, layout }) => {
  return (
    <motion.article
      data-testid={`project-card-${p.id}`}
      className={`project-card group relative flex flex-col ${
        layout === "full" ? "col-span-12" : "col-span-12 md:col-span-6"
      }`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {/* Image */}
      <div
        className={`relative w-full overflow-hidden bg-[#0d0d0d] border border-white/5 rounded-sm ${
          layout === "full"
            ? "aspect-[16/9] md:aspect-[21/9]"
            : "aspect-[4/3] md:aspect-[5/4]"
        }`}
      >
        <img
          src={p.image}
          alt={p.title}
          className="project-image w-full h-full object-cover"
          draggable={false}
        />
        <div className="project-overlay absolute inset-0 bg-black/30" />
        <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
          <span className="text-overline text-white/80">[ {p.index} ]</span>
          <span className="text-overline text-white/60">{p.year}</span>
        </div>
      </div>

      {/* Meta */}
      <div className="pt-6 md:pt-8 grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 md:col-span-7">
          <h3 className="font-display text-3xl md:text-4xl text-white tracking-tight leading-[1.05]">
            {p.title}
          </h3>
          <p className="text-overline mt-3">{p.role}</p>
        </div>
        <div className="col-span-12 md:col-span-5">
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-light">
            {p.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span
                key={t}
                className="text-[11px] uppercase tracking-[0.18em] text-neutral-400 border border-white/10 rounded-full px-3 py-1"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-5">
            {p.live && (
              <a
                href={p.live}
                target="_blank"
                rel="noreferrer"
                data-testid={`project-live-${p.id}`}
                className="group/btn inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-white border-b border-white/30 hover:border-[var(--accent)] hover:text-[var(--accent)] pb-1 transition-colors"
              >
                Visit live
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                />
              </a>
            )}
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                data-testid={`project-github-${p.id}`}
                className="group/btn inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-neutral-400 hover:text-white transition-colors"
              >
                <Github size={14} />
                Source
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const Projects = () => {
  return (
    <section
      id="work"
      data-testid="projects-section"
      className="relative py-32 md:py-48 bg-[#050505]"
    >
      <div className="mx-auto max-w-[1480px] px-6 md:px-10">
        <Reveal className="flex items-center gap-3 mb-12 md:mb-16">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_14px_var(--accent-glow)]" />
          <span className="text-overline">[ 02 ] Selected Work</span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl leading-[0.95] tracking-tight text-white max-w-[14ch]">
            A small set of projects, <br />
            built with{" "}
            <span className="italic font-light text-neutral-300">
              intention.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-8 max-w-[520px] text-neutral-400 text-base md:text-lg font-light leading-relaxed">
            A selection of frontend and full-stack work — from cinematic
            interfaces to dashboards and e-commerce systems.
          </p>
        </Reveal>

        <div className="mt-20 md:mt-28 grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-24 md:gap-y-32">
          <ProjectCard p={projects[0]} layout="full" />
          <ProjectCard p={projects[1]} layout="half" />
          <ProjectCard p={projects[2]} layout="half" />
          <ProjectCard p={projects[3]} layout="half" />
          <ProjectCard p={projects[4]} layout="half" />
          <ProjectCard p={projects[5]} layout="full" />
        </div>
      </div>
    </section>
  );
};

export default Projects;
