import { Brain, Users, Globe, Wallet, Leaf } from "lucide-react";

const coreFeatures = [
  {
    icon: Brain,
    title: "AI-powered Predictive Maintenance",
    description: "Proactively manage maintenance to save costs and avoid disruptions."
  },
  {
    icon: Users,
    title: "Tenant Behavior & Credit Scoring",
    description: "Choose the right tenants and retain them longer with AI-driven insights."
  },
  {
    icon: Globe,
    title: "Cross-Border Management",
    description: "Manage properties globally with localized insights and compliance tracking."
  },
  {
    icon: Wallet,
    title: "Digital Wallet",
    description: "Streamlined and secure transactions for all your property-related finances."
  },
  {
    icon: Leaf,
    title: "Green Property Management",
    description: "Optimize energy efficiency and reduce environmental impact while saving costs."
  }
];

export const CoreFeaturesSection = () => {
  return (
    <section className="py-20 px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-kingdom-text mb-12 text-center">
          Core Platform Features
        </h2>
        
        <div className="space-y-8">
          {coreFeatures.map((feature, index) => (
            <div key={index} className="flex items-center gap-8 p-6 rounded-lg hover:bg-kingdom-light transition-colors">
              <feature.icon className="w-16 h-16 text-kingdom-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-kingdom-muted">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};