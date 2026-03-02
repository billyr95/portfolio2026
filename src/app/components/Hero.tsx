'use client';

import UnicornScene from 'unicornstudio-react/next';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0a0a0a]">
      {/* Unicorn Studio WebGL Background */}
      <div className="absolute inset-0 z-0">
        <UnicornScene
          projectId="e9Y09LGe2QNS9g4pD3bN"
          sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js"
          width="100%"
          height="100%"
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-12 lg:px-24">
        {/* Name */}
        <div className="mb-6">
          <h1 className="text-[clamp(3rem,12vw,10rem)] font-medium leading-[0.85] tracking-tight text-white">
            Billy
          </h1>
          <h1 className="ml-[0.4em] text-[clamp(3rem,12vw,10rem)] font-medium leading-[0.85] tracking-tight text-white">
            Riley
          </h1>
        </div>

        {/* Tagline */}
        <p className="max-w-xl text-lg font-light leading-relaxed text-white/80 md:text-xl">
          Design Engineer crafting polished digital experiences — 
          where thoughtful design meets production-ready code.
        </p>
      </div>
    </section>
  );
}