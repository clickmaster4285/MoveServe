import { useEffect, useRef } from "react";
import { Truck, Bolt, HandMetal, Expand } from "lucide-react";

const reasons = [
  { icon: Truck, title: "Built for Mobile Food", desc: "Every feature designed specifically for the unique challenges of food truck operations." },
  { icon: Bolt, title: "Fast & Reliable", desc: "Lightweight system that won't slow down during your busiest rush hours." },
  { icon: HandMetal, title: "Dead Simple UI", desc: "Your team will learn it in minutes, not days. Designed for speed and simplicity." },
  { icon: Expand, title: "Scales With You", desc: "Running one truck or ten? Our platform grows with your business seamlessly." },
];

export default function WhyChooseUsSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        const items = ref.current?.querySelectorAll(".why-item");
        if (items) {
          gsap.fromTo(items, { y: 50, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.6, stagger: 0.1,
            scrollTrigger: { trigger: ref.current, start: "top 80%" },
          });
        }
      });
    });
  }, []);

  return (
    <section ref={ref} className="section-padding" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="why-item section-title text-primary-foreground mb-4">
          Why Food Trucks Choose Us
        </h2>
        <p className="why-item text-primary-foreground/70 text-lg mb-16 max-w-2xl mx-auto">
          We don't build generic POS systems. We build solutions that understand the street food grind.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((r) => (
            <div key={r.title} className="why-item bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-8 text-center border border-primary-foreground/10">
              <r.icon className="w-12 h-12 text-mustard mx-auto mb-4" />
              <h3 className="text-xl font-bold text-primary-foreground mb-2" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.03em" }}>
                {r.title}
              </h3>
              <p className="text-primary-foreground/70 text-sm">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
