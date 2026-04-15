import { useEffect, useRef } from "react";
import { Settings, Monitor, Users, HeadphonesIcon } from "lucide-react";
import serviceSetup from "@/assets/service-setup.jpg";

const services = [
  { icon: Settings, title: "Full System Setup", desc: "We handle everything — hardware configuration, software installation, and menu programming for your truck." },
  { icon: Monitor, title: "POS Installation", desc: "Professional POS installation and configuration tailored to your food truck's unique layout and workflow." },
  { icon: Users, title: "Staff Training", desc: "Hands-on onboarding sessions so your team can start using the system confidently from day one." },
  { icon: HeadphonesIcon, title: "Ongoing Support", desc: "24/7 technical support to keep your operations running smoothly, wherever your truck is parked." },
];

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        const cards = ref.current?.querySelectorAll(".svc-card");
        if (cards) {
          gsap.fromTo(cards, { x: -40, opacity: 0 }, {
            x: 0, opacity: 1, duration: 0.7, stagger: 0.12,
            scrollTrigger: { trigger: ref.current, start: "top 80%" },
          });
        }
      });
    });
  }, []);

  return (
    <section id="services" ref={ref} className="section-padding bg-warm-bg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm mb-4">
            SERVICES
          </span>
          <h2 className="section-title">
            We Set You Up for <span className="gradient-text">Success</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <img src={serviceSetup} alt="POS setup service" className="rounded-2xl img-cover h-80 svc-card" loading="lazy" width={640} height={512} />
          <div className="space-y-6">
            {services.map((s) => (
              <div key={s.title} className="svc-card flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <s.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.03em" }}>
                    {s.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
