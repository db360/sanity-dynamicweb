import React from "react";

const Hero = () => {
  return (
    <div className="flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-0">
      <div className="px-10 space-y-5">
        <h1 className="text-6xl max-w-xl font-serif">Hi, I Am David,<span className="underline decoration-black decoration-4">Welcome</span> to my Webpage</h1>
        <h2>
          I've created this website to show my projects made in React, Next.js,
          Three Fiber, Web3
        </h2>
      </div>

      <div>
          <img className="hidden md:inline-flex h-32 lg:h-full" src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png" alt="" />
      </div>
    </div>
  );
};

export default Hero;
