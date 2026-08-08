"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1400);
    // Lock scroll while loading
    document.body.style.overflow = "hidden";
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-950"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-semibold tracking-tight text-white"
          >
            HARIOM<span className="text-accent-glow">.</span>
          </motion.div>

          <div className="mt-6 h-px w-40 overflow-hidden bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-accent-glow to-accent-violet"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-xs uppercase tracking-[0.3em] text-white/35"
          >
            Full Stack Developer
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
