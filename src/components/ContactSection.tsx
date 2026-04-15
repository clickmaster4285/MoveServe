import { useEffect, useRef, useState } from "react";
import { Send, MapPin, Mail, Phone } from "lucide-react";

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        const items = ref.current?.querySelectorAll(".contact-item");
        if (items) {
          gsap.fromTo(items, { y: 40, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.7, stagger: 0.1,
            scrollTrigger: { trigger: ref.current, start: "top 80%" },
          });
        }
      });
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! We'll be in touch soon.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="contact" ref={ref} className="section-padding bg-warm-bg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="contact-item inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm mb-4">
            GET IN TOUCH
          </span>
          <h2 className="contact-item section-title">
            Ready to <span className="gradient-text">Power Up</span> Your Truck?
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <p className="contact-item text-lg text-muted-foreground">
              Drop us a message and we'll get back to you within 24 hours with a custom plan for your food truck business.
            </p>
            {[
              { icon: MapPin, text: "123 Street Food Ave, Austin, TX 78701" },
              { icon: Mail, text: "hello@truckflow.io" },
              { icon: Phone, text: "+1 (555) 123-4567" },
            ].map((c) => (
              <div key={c.text} className="contact-item flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <c.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-foreground font-medium">{c.text}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="contact-item card-street p-8 space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3.5 rounded-lg bg-input border border-border focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3.5 rounded-lg bg-input border border-border focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-3.5 rounded-lg bg-input border border-border focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3.5 rounded-lg bg-input border border-border focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all resize-none"
            />
            <button type="submit" className="btn-chili w-full flex items-center justify-center gap-2">
              <Send className="w-5 h-5" /> Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
