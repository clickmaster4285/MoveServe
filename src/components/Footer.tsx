import { Truck } from "lucide-react";

const links = {
  Product: ["Features", "Pricing", "Case Studies", "Blog"],
  Company: ["About Us", "Careers", "Contact", "Partners"],
  Support: ["Help Center", "Documentation", "API Status", "Community"],
};

export default function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Truck className="w-7 h-7 text-primary" />
              <span className="text-xl font-bold tracking-wider" style={{ fontFamily: "var(--font-display)" }}>
                TRUCKFLOW
              </span>
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
             The platform designed for food trucks and mobile food businesses to simplify orders, payments, and operations.
            </p>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-bold text-lg mb-4" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.05em" }}>
                {title}
              </h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-primary-foreground/60 hover:text-primary transition-colors text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/40 text-sm">
            © {new Date().getFullYear()} TruckFlow. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Twitter", "Instagram", "LinkedIn", "Facebook"].map((s) => (
              <a key={s} href="#" className="text-primary-foreground/40 hover:text-primary transition-colors text-sm">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
