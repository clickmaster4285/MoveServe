import { useEffect, useRef } from "react";
import { Zap, ListOrdered, TrendingUp, Package } from "lucide-react";
import solutionPos from "@/assets/solution-pos.jpg";
import solutionOrder from "@/assets/solution-order.jpg";
import solutionAnalytics from "@/assets/solution-analytics.jpg";
import solutionInventory from "@/assets/solution-inventory.jpg";

const solutions = [
  {
    icon: Zap,
    title: "Lightning-Fast POS",
    desc: "A POS system optimized for mobile environments — process orders in seconds, not minutes.",
    img: solutionPos,
  },
  {
    icon: ListOrdered,
    title: "Real-Time Order Management",
    desc: "Every order tracked, organized, and queued — no more missed items or confused staff.",
    img: solutionOrder,
  },
  {
    icon: TrendingUp,
    title: "Sales Tracking Dashboard",
    desc: "See what sells, when it sells, and how much you're making — all in real-time visual dashboards.",
    img: solutionAnalytics,
  },
  {
    icon: Package,
    title: "Inventory Control",
    desc: "Track stock levels on the go. Get alerts before you run out of your best-selling items.",
    img: solutionInventory,
  },
];

export default function SolutionsSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        const cards = ref.current?.querySelectorAll(".sol-card");
        if (cards) {
          gsap.fromTo(cards, { y: 60, opacity: 0, scale: 0.95 }, {
            y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12,
            scrollTrigger: { trigger: ref.current, start: "top 80%" },
          });
        }
      });
    });
  }, []);

  return (
    <section id="solutions" ref={ref} className="section-padding bg-warm-bg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/30 text-foreground font-bold text-sm mb-4">
            THE SOLUTION
          </span>
          <h2 className="section-title">
            Tools That <span className="gradient-text">Move as Fast</span> as You Do
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((s) => (
            <div key={s.title} className="sol-card card-street flex flex-col">
              <img src={s.img} alt={s.title} className="w-full h-48 object-cover" loading="lazy" width={640} height={512} />
              <div className="p-6">
                <s.icon className="w-10 h-10 text-secondary mb-4" />
                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.03em" }}>
                  {s.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
