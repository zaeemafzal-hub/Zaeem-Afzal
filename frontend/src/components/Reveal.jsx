import { motion } from "framer-motion";

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const stagger = (delay = 0.08) => ({
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: delay } },
});

const Reveal = ({
  children,
  className = "",
  delay = 0,
  y = 32,
  once = true,
  amount = 0.2,
  as = "div",
  ...rest
}) => {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.9, delay, ease: [0.2, 0.8, 0.2, 1] }}
      {...rest}
    >
      {children}
    </Comp>
  );
};

export default Reveal;
