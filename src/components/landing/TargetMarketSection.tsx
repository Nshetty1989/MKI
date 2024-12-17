import { Building, Users, Globe } from "lucide-react";

const personas = [
  {
    icon: Building,
    title: "Property Owners",
    description: "Individual investors managing multiple residential or commercial units"
  },
  {
    icon: Users,
    title: "Property Managers",
    description: "Professional managers handling large portfolios and multiple clients"
  },
  {
    icon: Globe,
    title: "Global Investors",
    description: "Cross-border investors managing properties across different countries"
  }
];

export const TargetMarketSection = () => {
  return (
    <section className="py-20 px-8 bg-gradient-to-b from-kingdom-dark to-kingdom-dark/90">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12 gradient-text">
          Who Is MyKingdom For?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {personas.map((persona, index) => (
            <div 
              key={index}
              className="p-6 rounded-lg glass-card glow-effect hover:transform hover:scale-105 transition-all duration-300"
            >
              <persona.icon className="w-16 h-16 text-kingdom-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-kingdom-text">
                {persona.title}
              </h3>
              <p className="text-kingdom-text/70">
                {persona.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};