'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 40 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-[3px] origin-left bg-gradient-to-r from-[#FF3F87] via-[#22F2FF] to-[#FFF4D7] shadow-[0_0_18px_rgba(34,242,255,0.55)]"
      style={{ scaleX }}
    />
  );
}
