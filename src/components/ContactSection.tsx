import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Mail, Phone, MapPin, Clock, Navigation, MessageSquare } from "lucide-react";
import { toast } from "sonner";

gsap.registerPlugin(ScrollTrigger);

// Location data
const LOCATION = {
  fullAddress:
    "Paris Shopping Mall, 4th floor, Main PWD Rd, PWD Housing Society Sector A, Islamabad, Punjab 45700, Pakistan",
};

const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  LOCATION.fullAddress
)}&output=embed`;

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-content", { 
        opacity: 0, 
        y: 30, 
        duration: 0.8, 
        stagger: 0.1,
        scrollTrigger: { 
          trigger: ref.current, 
          start: "top 80%" 
        } 
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Button animation
    if (btnRef.current) {
      gsap.fromTo(btnRef.current, { scale: 1 }, { scale: 1.05, duration: 0.15, yoyo: true, repeat: 1 });
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          phone: form.phone,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();

      if (data.success) {
        toast.success("Message sent successfully!");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to send. Please try again or email marketing@clickmasters.pk");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="contact-content inline-block text-sm uppercase tracking-widest text-primary font-bold bg-primary/10 px-4 py-1.5 rounded-full">
            Get In Touch
          </span>
          <h2 className="contact-content text-3xl md:text-5xl font-bold font-[var(--font-heading)] text-foreground mt-6 mb-4">
            Let's Talk 
          </h2>
          <p className="contact-content text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to transform your buisness? Drop us a message and we'll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left side - Contact Info */}
          <div className="space-y-6">
            {/* Address */}
            <div className="contact-content flex items-start gap-4 bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Visit Us</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{LOCATION.fullAddress}</p>
              </div>
            </div>

            {/* Email */}
            <div className="contact-content flex items-start gap-4 bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Email Us</p>
                <p className="text-muted-foreground text-sm">marketing@clickmasters.pk</p>
                <p className="text-muted-foreground text-sm">info@clickmasters.pk</p>
              </div>
            </div>

            {/* Phone */}
            <div className="contact-content flex items-start gap-4 bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Call Us</p>
                <p className="text-muted-foreground text-sm">+92 333-1116842</p>
                <p className="text-muted-foreground text-sm">+92 332-5394285</p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="contact-content flex items-start gap-4 bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Business Hours</p>
                <p className="text-muted-foreground text-sm">Monday - Saturday: 9AM - 6PM</p>
                <p className="text-muted-foreground text-sm">Sunday: Closed</p>
              </div>
            </div>

            {/* Map */}
            <div className="contact-content rounded-2xl overflow-hidden border border-border shadow-md">
              <iframe
                src={MAP_EMBED_URL}
                width="100%"
                height="200"
                style={{ border: 0 }}
                loading="lazy"
                title="Location"
                className="w-full h-full"
              />
            </div>

            {/* Directions Link */}
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                LOCATION.fullAddress
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-content inline-flex items-center gap-2 text-primary text-sm hover:underline"
            >
              <Navigation className="w-4 h-4" />
              Get Directions
            </a>
          </div>

          {/* Right side - Form */}
          <div className="contact-content">
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-xl border border-border space-y-5">
              <div className="flex gap-2 items-center mb-4 pb-3 border-b border-border">
                <MessageSquare className="w-5 h-5 text-primary" />
                <h3 className="font-[var(--font-heading)] font-semibold text-foreground text-lg">Send us a message</h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address <span className="text-primary">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone Number <span className="text-muted-foreground text-xs">(Optional)</span>
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  placeholder="+92 XXX XXXXXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Message <span className="text-primary">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                  placeholder="Tell us about your buisness and requirements..."
                />
              </div>

              <button
                ref={btnRef}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-70"
              >
                {isSubmitting ? "Sending Message..." : "Send Message"}
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}