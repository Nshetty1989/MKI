import { Clock, DollarSign, AlertTriangle, FileWarning } from "lucide-react";

const challenges = [
  {
    icon: Clock,
    title: "Time-Consuming Management",
    description: "Hours spent on tenant screening, maintenance coordination, and paperwork."
  },
  {
    icon: DollarSign,
    title: "Revenue Leakage",
    description: "Missed opportunities and inefficient operations leading to reduced profits."
  },
  {
    icon: AlertTriangle,
    title: "Maintenance Surprises",
    description: "Unexpected repairs and maintenance issues causing disruptions."
  },
  {
    icon: FileWarning,
    title: "Compliance Complexity",
    description: "Keeping up with varying regulations across different regions."
  }
];

export const ProblemSection = () => {
  return (
    <section className="py-20 px-8 bg-kingdom-dark relative">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-kingdom-dark/50 to-kingdom-dark opacity-50"></div>
      
      <div className="max-w-6xl mx-auto relative">
        <h2 className="text-4xl md:text-5xl font-bold text-kingdom-primary mb-8 text-center">
          Why Choose MyKingdom.ai?
        </h2>
        <p className="text-xl text-kingdom-text/80 mb-16 text-center max-w-3xl mx-auto leading-relaxed">
          Property management shouldn't be a full-time job. Traditional methods are
          time-consuming, prone to errors, and lack the intelligence needed for
          optimal decision-making in today's dynamic market.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          {challenges.map((challenge, index) => (
            <div 
              key={index}
              className="relative p-8 rounded-2xl bg-gradient-to-br from-kingdom-dark/90 to-kingdom-dark border border-kingdom-primary/20 backdrop-blur-lg transition-all duration-500 hover:border-kingdom-primary/40 hover:shadow-lg hover:shadow-kingdom-primary/5"
            >
              <challenge.icon className="w-12 h-12 text-kingdom-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-kingdom-text">
                {challenge.title}
              </h3>
              <p className="text-lg text-kingdom-text/70 leading-relaxed">
                {challenge.description}
              </p>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-kingdom-primary/5 to-kingdom-secondary/5 opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};