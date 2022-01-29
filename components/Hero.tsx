import { motion } from "framer-motion";
import React from "react";
const easing = [0.6, -0.05, 0.01, 0.99];

const fadeInUp = {
  initial: {
    x: 60,
    opacity: 0
  },
  animate: {
    y:0,
    opacity: 1,
    transition: {
      duration: .8,
      ease: easing
    }
  }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.3
    }
  }
}

const Hero = () => {
  return (
    <motion.div variants={stagger} className="flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-0">
      <motion.div
        variants={fadeInUp}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        exit={{ opacity: 0 }}
        className="px-10 space-y-5"
      >
        <h1 className="text-6xl max-w-xl font-serif">
          Hi, I Am David,
          <span className="underline decoration-black decoration-4">
            Welcome
          </span>{" "}
          to my Webpage
        </h1>
        <h2>
          I've created this website to show my projects made in React, Next.js,
          Three Fiber, Web3
        </h2>
      </motion.div>

      <div>
        <img
          className="hidden md:inline-flex h-32 lg:h-full"
          src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
          alt=""
        />
      </div>
    </motion.div>
  );
};

export default Hero;
