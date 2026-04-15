import { useEffect, useRef, useState } from "react";
import { Truck, Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Solutions", href: "#solutions" },
  { label: "Features", href: "#features" },
  { label: "Services", href: "#services" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "navbar-solid py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <Truck className="w-8 h-8 text-primary" />
          <span className="text-2xl font-bold tracking-wider text-white" style={{ fontFamily: "var(--font-display)" }}>
            TRUCKFLOW
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-sm font-semibold text-white hover:text-primary transition-colors cursor-pointer"
            >
              {l.label}
            </button>
          ))}
          <button onClick={() => scrollTo("#contact")} className="btn-chili text-base px-6 py-2.5">
            Get Started
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7 text-white" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden navbar-solid mt-2 mx-4 rounded-xl p-6 flex flex-col gap-4">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-left text-lg font-semibold text-foreground/80 hover:text-primary transition-colors"
            >
              {l.label}
            </button>
          ))}
          <button onClick={() => scrollTo("#contact")} className="btn-chili mt-2">
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
}
