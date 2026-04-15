import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import t1 from "@/assets/testimonial-1.jpg";
import t2 from "@/assets/testimonial-2.jpg";
import t3 from "@/assets/testimonial-3.jpg";

const testimonials = [
  {
    name: "Marco Rivera",
    role: "Owner, Street Bites Co.",
    img: t1,
    text: "TruckFlow completely transformed our operations. We serve 40% more customers during lunch rush and our order accuracy went through the roof. Best investment we've made.",
  },
  {
    name: "Priya Sharma",
    role: "Founder, Spice Route Truck",
    img: t2,
    text: "The offline mode is a lifesaver at outdoor festivals. We never miss a sale anymore. The analytics dashboard helps me plan my menu based on real data instead of guesswork.",
  },
  {
    name: "Jake Thompson",
    role: "Chef, Griddle Kings",
    img: t3,
    text: "Setup was incredibly easy and the support team is amazing. Within a week, our average order time dropped from 5 minutes to under 2. Our customers love the speed.",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        if (ref.current) {
          gsap.fromTo(ref.current, { y: 40, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.8,
            scrollTrigger: { trigger: ref.current, start: "top 85%" },
          });
        }
      });
    });
  }, []);

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);

    // Cleanup interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const prev = () => {
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
    // Reset interval timer when manually navigating
    resetInterval();
  };
  
  const next = () => {
    setCurrent((c) => (c + 1) % testimonials.length);
    // Reset interval timer when manually navigating
    resetInterval();
  };

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCurrent((c) => (c + 1) % testimonials.length);
      }, 5000);
    }
  };

  const t = testimonials[current];

  return (
    <section ref={ref} className="section-padding bg-warm-bg">
      <div className="max-w-4xl mx-auto text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm mb-4">
          TESTIMONIALS
        </span>
        <h2 className="section-title mb-12">
          Trusted by <span className="gradient-text">Truck Owners</span>
        </h2>

        <div className="card-street p-8 md:p-12">
          <img src={t.img} alt={t.name} className="w-20 h-20 rounded-full mx-auto mb-6 object-cover" loading="lazy" width={512} height={512} />
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-mustard text-mustard" />
            ))}
          </div>
          <p className="text-lg text-muted-foreground italic mb-6 leading-relaxed">"{t.text}"</p>
          <p className="font-bold text-lg">{t.name}</p>
          <p className="text-sm text-muted-foreground">{t.role}</p>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button onClick={prev} className="w-12 h-12 rounded-full bg-card flex items-center justify-center hover:bg-primary/10 transition-colors cursor-pointer" style={{ boxShadow: "var(--shadow-card)" }}>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={next} className="w-12 h-12 rounded-full bg-card flex items-center justify-center hover:bg-primary/10 transition-colors cursor-pointer" style={{ boxShadow: "var(--shadow-card)" }}>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}