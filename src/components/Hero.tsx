import { useEffect, useRef } from "react";
import venomImg from "@/assets/venom-hero.png";

export function Hero() {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      targetX = x * 30;
      targetY = y * 20;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      if (imgRef.current) {
        imgRef.current.style.transform = `scale(1.12) translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Background image */}
      <div className="absolute inset-0 animate-fade-in-slow">
        <img
          ref={imgRef}
          src={venomImg}
          alt="Venom"
          className="h-full w-full object-cover object-center opacity-80 will-change-transform"
          style={{ transform: "scale(1.12)" }}
        />
        {/* Vignette + side gradients for legibility */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,oklch(0.06_0_0/0.5)_55%,oklch(0.04_0_0/0.95)_100%)]" />
        <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
      </div>


      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-6 pt-32 pb-12 md:px-10">
        <div className="grid flex-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
              Marvel · Symbiote Saga
            </p>
            <h1 className="font-display animate-fade-up delay-100 mt-6 text-[18vw] leading-[0.85] tracking-tight text-foreground md:text-[10rem] lg:text-[12rem]">
              WE ARE
              <br />
              <span className="text-stroke">VENOM</span>
            </h1>

            {/* Scroll indicator */}
            <div className="animate-fade-up delay-500 mt-12 flex items-center gap-4">
              <div className="scroll-line h-16 w-px" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.5em] text-muted-foreground">
                Scroll
              </span>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-10">
            <p className="animate-fade-up delay-200 max-w-md text-base leading-relaxed text-foreground/80 lg:ml-auto lg:text-right">
              Bonded to disgraced journalist Eddie Brock, the alien Symbiote
              transforms its host into something monstrous — a lethal protector
              walking the razor's edge between hero and predator. Together,
              they are Venom.
            </p>

            {/* Stats */}
            <div className="animate-fade-up delay-300 grid grid-cols-3 divide-x divide-border lg:ml-auto lg:max-w-md">
              {[
                { v: "#300", l: "First Issue" },
                { v: "3", l: "Films" },
                { v: "$1.9B", l: "Box Office" },
              ].map((s) => (
                <div key={s.l} className="px-4 first:pl-0 last:pr-0">
                  <div className="font-display text-3xl text-foreground md:text-4xl">
                    {s.v}
                  </div>
                  <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="animate-fade-up delay-500 flex flex-wrap gap-4 lg:justify-end">
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-full bg-foreground px-7 py-3.5 text-xs font-bold uppercase tracking-[0.25em] text-background transition-transform duration-300 hover:scale-105"
              >
                Explore Universe
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-full border border-foreground/70 bg-transparent px-7 py-3.5 text-xs font-bold uppercase tracking-[0.25em] text-foreground transition-all duration-300 hover:scale-105 hover:border-foreground hover:bg-foreground/5"
              >
                Origin Story
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
