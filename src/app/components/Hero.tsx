'use client';

import UnicornScene from 'unicornstudio-react/next';

export default function Hero() {
  return (
    <>
      {/* Fixed WebGL Background - stays behind everything */}
      <div className="fixed inset-0 z-0">
        <UnicornScene
          projectId="jzoNdJpxFUstjYPvZrvk"
          sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js"
          width="100%"
          height="100%"
          production={true}
        />
      </div>

      {/* Hero Content Section */}
      <section className="relative z-10 flex min-h-[100svh] w-full flex-col">
        {/* Main Content - vertically centered */}
        <div className="flex flex-1 flex-col justify-center px-5 py-20 sm:px-8 md:px-12 lg:px-24">
          {/* Name */}
          <div className="mb-4 sm:mb-6">
            <h1 className="text-[clamp(2.5rem,15vw,10rem)] font-medium leading-[0.9] tracking-tight text-white">
              Billy
            </h1>
            <h1 className="text-[clamp(2.5rem,15vw,10rem)] font-medium leading-[0.9] tracking-tight text-white sm:ml-[0.4em]">
              Riley
            </h1>
          </div>

          {/* Tagline */}
          <p className="max-w-xs text-base font-light leading-relaxed text-white/70 sm:max-w-md sm:text-lg md:max-w-xl md:text-xl md:text-white/80">
            Design Engineer crafting polished digital experiences — 
            where thoughtful design meets production-ready code.
          </p>
        </div>

        {/* Scroll indicator - bottom of viewport */}
        <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-2 sm:bottom-8">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 sm:text-xs">
            Scroll
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent sm:h-12" />
        </div>
      </section>
    </>
  );
}