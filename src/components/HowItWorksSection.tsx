import { useEffect, useRef } from "react";
import { Settings2, UtensilsCrossed, Rocket } from "lucide-react";

const steps = [
  { icon: Settings2, num: "01", title: "Setup Your System", desc: "We install and configure the POS system in your food truck, customized to your workflow." },
  { icon: UtensilsCrossed, num: "02", title: "Customize Menu & Ops", desc: "Add your menu items, set pricing, configure categories, and define your operational flow." },
  { icon: Rocket, num: "03", title: "Start Taking Orders", desc: "Go live and start processing orders faster than ever. We're with you every step." },
];

export default function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        const items = ref.current?.querySelectorAll(".step-card");
        if (items) {
          gsap.fromTo(items, { x: -60, opacity: 0 }, {
            x: 0, opacity: 1, duration: 0.7, stagger: 0.2,
            scrollTrigger: { trigger: ref.current, start: "top 80%" },
          });
        }
      });
    });
  }, []);

  return (
    <section ref={ref} className="section-padding bg-warm-bg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/30 text-foreground font-bold text-sm mb-4">
            HOW IT WORKS
          </span>
          <h2 className="section-title">
            Up and Running in <span className="gradient-text">3 Simple Steps</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {steps.map((s, i) => (
            <div key={s.num} className="step-card flex-1 relative">
              <div className="card-street p-8 h-full text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <s.icon className="w-8 h-8 text-primary" />
                </div>
                <span className="text-6xl font-bold text-primary/10" style={{ fontFamily: "var(--font-display)" }}>{s.num}</span>
                <h3 className="text-2xl font-bold mt-2 mb-3" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.03em" }}>
                  {s.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/30" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
