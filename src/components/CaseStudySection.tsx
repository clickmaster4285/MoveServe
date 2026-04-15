import { useEffect, useRef } from "react";
import { ArrowUp, TrendingUp, Smile } from "lucide-react";
import caseStudy from "@/assets/case-study.jpg";

const metrics = [
  { icon: ArrowUp, label: "Order Speed", before: "4.2 min", after: "1.8 min", change: "+57%" },
  { icon: TrendingUp, label: "Daily Sales", before: "$820", after: "$1,340", change: "+63%" },
  { icon: Smile, label: "Customer Rating", before: "3.6 ★", after: "4.8 ★", change: "+33%" },
];

export default function CaseStudySection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        const items = ref.current?.querySelectorAll(".case-item");
        if (items) {
          gsap.fromTo(items, { y: 50, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.7, stagger: 0.12,
            scrollTrigger: { trigger: ref.current, start: "top 80%" },
          });
        }
      });
    });
  }, []);

  return (
    <section id="case-studies" ref={ref} className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="case-item inline-block px-4 py-1.5 rounded-full bg-accent/30 text-foreground font-bold text-sm mb-4">
            CASE STUDY
          </span>
          <h2 className="case-item section-title">
            Real Results from <span className="gradient-text">Real Trucks</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <img src={caseStudy} alt="Food truck transformation" className="case-item rounded-2xl img-cover h-80" loading="lazy" width={800} height={600} />
          <div>
            <h3 className="case-item text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.03em" }}>
              Taco Fuego — Downtown Austin
            </h3>
            <p className="case-item text-muted-foreground mb-8">
              After switching to TruckFlow, Taco Fuego saw massive improvements across all key metrics within just 30 days.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              {metrics.map((m) => (
                <div key={m.label} className="case-item card-street p-6 text-center">
                  <m.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <p className="text-xs text-muted-foreground mb-1">{m.label}</p>
                  <div className="flex justify-center gap-2 items-baseline mb-2">
                    <span className="text-sm line-through text-muted-foreground">{m.before}</span>
                    <span className="text-lg font-bold">{m.after}</span>
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full bg-accent/30 text-sm font-bold text-foreground">
                    {m.change}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
