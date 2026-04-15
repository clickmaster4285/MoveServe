import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

const posts = [
  {
    img: blog1,
    tag: "Growth",
    title: "7 Proven Strategies to Boost Your Food Truck Revenue",
    excerpt: "Learn the tactics top-performing food truck owners use to increase daily sales and build loyal customer bases.",
  },
  {
    img: blog2,
    tag: "Marketing",
    title: "Social Media Marketing for Street Food Brands",
    excerpt: "How to leverage Instagram, TikTok, and local food communities to drive foot traffic to your truck.",
  },
  {
    img: blog3,
    tag: "Operations",
    title: "Scaling from One Truck to a Food Truck Fleet",
    excerpt: "The operational playbook for expanding your mobile food business without losing quality or control.",
  },
];

export default function BlogSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        const cards = ref.current?.querySelectorAll(".blog-card");
        if (cards) {
          gsap.fromTo(cards, { y: 60, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.7, stagger: 0.15,
            scrollTrigger: { trigger: ref.current, start: "top 80%" },
          });
        }
      });
    });
  }, []);

  return (
    <section id="blog" ref={ref} className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary font-bold text-sm mb-4">
            BLOG
          </span>
          <h2 className="section-title">
            Tips & Insights for <span className="gradient-text">Food Truck Owners</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((p) => (
            <div key={p.title} className="blog-card card-street group cursor-pointer">
              <div className="overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" width={640} height={512} />
              </div>
              <div className="p-6">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">{p.tag}</span>
                <h3 className="text-lg font-bold mt-2 mb-2 group-hover:text-primary transition-colors" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em" }}>
                  {p.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{p.excerpt}</p>
                <span className="text-primary font-bold text-sm flex items-center gap-1">
                  Read More <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
