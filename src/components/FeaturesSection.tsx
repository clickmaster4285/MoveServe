import { useEffect, useRef } from "react";
import { Smartphone, WifiOff, CreditCard, BarChart2 } from "lucide-react";
import featureMobile from "@/assets/feature-mobile.jpg";
import solutionPos from "@/assets/solution-pos.jpg";
import solutionAnalytics from "@/assets/solution-analytics.jpg";
import solutionOrder from "@/assets/solution-order.jpg";

const features = [
  { icon: Smartphone, title: "Mobile-Friendly POS", desc: "Runs on any tablet or phone. No bulky hardware needed.", img: featureMobile },
  { icon: WifiOff, title: "Offline Mode", desc: "Keep serving even without internet. Data syncs when you reconnect.", img: solutionPos },
  { icon: CreditCard, title: "Fast Checkout", desc: "Accept cards, digital wallets, and cash — all processed instantly.", img: solutionOrder },
  { icon: BarChart2, title: "Real-Time Analytics", desc: "Live dashboard with sales, trends, and performance insights.", img: solutionAnalytics },
];

export default function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        const cards = ref.current?.querySelectorAll(".feat-card");
        if (cards) {
          gsap.fromTo(cards, { y: 60, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.7, stagger: 0.12,
            scrollTrigger: { trigger: ref.current, start: "top 80%" },
          });
        }
      });
    });
  }, []);

  return (
    <section id="features" ref={ref} className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary font-bold text-sm mb-4">
            FEATURES
          </span>
          <h2 className="section-title">
            Everything Your <span className="gradient-text">Truck Needs</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          {features.map((f) => (
            <div key={f.title} className="feat-card card-street flex overflow-hidden group">
              <img src={f.img} alt={f.title} className="w-36 md:w-48 h-auto object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={640} height={512} />
              <div className="p-6 flex flex-col justify-center">
                <f.icon className="w-9 h-9 text-primary mb-3" />
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.03em" }}>
                  {f.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
