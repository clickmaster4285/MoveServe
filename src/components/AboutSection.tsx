import { useEffect, useRef } from "react";
import about1 from "@/assets/about-1.jpg";
import about2 from "@/assets/about-2.jpg";

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        const els = sectionRef.current?.querySelectorAll(".gsap-up");
        if (els) {
          gsap.fromTo(els, { y: 60, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.15,
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
          });
        }
      });
    });
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-padding bg-warm-bg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="gsap-up inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm mb-4">
            WHO WE ARE
          </span>
          <h2 className="gsap-up section-title">
            Built for the <span className="gradient-text">Street Food</span> Hustle
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="gsap-up text-lg text-muted-foreground leading-relaxed">
              We build modern digital systems designed specifically for food trucks and mobile food businesses.
              Our platform helps you manage fast-moving orders, track sales in real-time, and simplify daily operations.
            </p>
            <p className="gsap-up text-lg text-muted-foreground leading-relaxed">
              From single trucks to growing food truck fleets, we empower businesses with tools that improve speed,
              accuracy, and customer satisfaction — so you can focus on what you do best: serving amazing food.
            </p>
            <button
              className="gsap-up btn-chili"
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Learn More
            </button>
          </div>

          <div className="gsap-up grid grid-cols-2 gap-4">
            <img src={about1} alt="POS system in food truck" className="rounded-xl img-cover h-64" loading="lazy" width={800} height={600} />
            <img src={about2} alt="Food truck festival" className="rounded-xl img-cover h-64 mt-8" loading="lazy" width={800} height={600} />
          </div>
        </div>
      </div>
    </section>
  );
}
