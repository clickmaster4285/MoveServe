import { useEffect, useRef, useState } from "react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const images = [hero1, hero2, hero3];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((p) => (p + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      gsap.fromTo(headingRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.3 });
      gsap.fromTo(subRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.6 });
      gsap.fromTo(btnRef.current, { y: 30, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, delay: 0.9 });
    });
  }, []);

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {images.map((img, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: current === i ? 1 : 0 }}
        >
          <img
            src={img}
            alt="Food truck scene"
            className="img-cover"
            width={1920}
            height={1080}
            {...(i === 0 ? {} : { loading: "lazy" as const })}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1
          ref={headingRef}
          className="text-5xl md:text-7xl lg:text-8xl text-primary-foreground leading-tight tracking-wider opacity-0"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Power Your Food Truck with{" "}
          <span className="gradient-text">Smart, Fast</span> Operations
        </h1>
        <p
          ref={subRef}
          className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto opacity-0"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Manage orders, track sales, and streamline your food truck business with a powerful
          all-in-one system designed for speed and mobility.
        </p>
        <button
          ref={btnRef}
          onClick={scrollToContact}
          className="btn-chili mt-10 text-xl px-10 py-5 opacity-0"
        >
          Get Started
        </button>
      </div>

      {/* Carousel dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === i ? "bg-primary scale-125" : "bg-primary-foreground/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
