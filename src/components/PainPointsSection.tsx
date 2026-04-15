import { useEffect, useRef } from "react";
import { Clock, ShoppingCart, FileText, BarChart3 } from "lucide-react";
import painQueue from "@/assets/pain-queue.jpg";
import painOrders from "@/assets/pain-orders.jpg";
import painBilling from "@/assets/pain-billing.jpg";
import painTracking from "@/assets/pain-tracking.jpg";

const pains = [
  {
    icon: Clock,
    title: "Long Queues During Peak Hours",
    desc: "Customers leave when lines get too long, costing you sales during your busiest and most profitable times.",
    img: painQueue,
  },
  {
    icon: ShoppingCart,
    title: "Mobile Order Chaos",
    desc: "Managing multiple orders on paper leads to mistakes, missed items, and frustrated customers who won't return.",
    img: painOrders,
  },
  {
    icon: FileText,
    title: "Slow Manual Billing",
    desc: "Cash-only operations and manual receipts slow down your service speed when every second counts.",
    img: painBilling,
  },
  {
    icon: BarChart3,
    title: "Zero Sales Visibility",
    desc: "Without real-time tracking, you're guessing your best sellers, peak hours, and actual profit margins.",
    img: painTracking,
  },
];

export default function PainPointsSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        const cards = ref.current?.querySelectorAll(".pain-card");
        if (cards) {
          gsap.fromTo(cards, { y: 80, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.7, stagger: 0.15,
            scrollTrigger: { trigger: ref.current, start: "top 80%" },
          });
        }
      });
    });
  }, []);

  return (
    <section ref={ref} className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-destructive/10 text-destructive font-bold text-sm mb-4">
            THE PROBLEM
          </span>
          <h2 className="section-title">
            Running a Food Truck <span className="gradient-text">Shouldn't Be This Hard</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {pains.map((p) => (
            <div key={p.title} className="pain-card card-street flex overflow-hidden">
              <img src={p.img} alt={p.title} className="w-40 h-auto object-cover hidden sm:block" loading="lazy" width={640} height={512} />
              <div className="p-6 flex flex-col justify-center">
                <p.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.03em" }}>
                  {p.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
