import { Brain, Users, LineChart, Shield } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description: "Get real-time property valuations and market predictions with 99% accuracy",
    bgColor: "bg-blue-500/20",
    iconColor: "text-blue-400"
  },
  {
    icon: Users,
    title: "Smart Tenant Matching",
    description: "Find perfect tenants with our AI screening system that reduces vacancy rates by 45%",
    bgColor: "bg-purple-500/20",
    iconColor: "text-purple-400"
  },
  {
    icon: LineChart,
    title: "Predictive Analytics",
    description: "Forecast maintenance needs and optimize rental pricing with machine learning",
    bgColor: "bg-pink-500/20",
    iconColor: "text-pink-400"
  },
  {
    icon: Shield,
    title: "Automated Compliance",
    description: "Stay compliant with automated updates and real-time regulation tracking",
    bgColor: "bg-emerald-500/20",
    iconColor: "text-emerald-400"
  }
];

const steps = [
  {
    number: "01",
    title: "Quick Setup",
    description: "Create your account and import your properties in under 5 minutes.",
    bgGradient: "from-blue-600/90 via-blue-500/80 to-blue-400/70"
  },
  {
    number: "02",
    title: "AI Configuration",
    description: "Our AI analyzes your portfolio and customizes automation settings",
    bgGradient: "from-purple-600/90 via-purple-500/80 to-purple-400/70"
  },
  {
    number: "03",
    title: "Start Growing",
    description: "Watch your portfolio thrive with automated management and insights",
    bgGradient: "from-pink-600/90 via-pink-500/80 to-pink-400/70"
  }
];

export const ExperienceFutureSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#0d47a1] to-[#1565c0] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-300 via-blue-200 to-purple-300 bg-clip-text text-transparent">
            Experience the Future of Property Management
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Transform your property portfolio with AI-powered automation and insights
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card p-8 rounded-2xl flex flex-col items-center text-center group hover:scale-105 transition-transform duration-300 border border-white/10 backdrop-blur-lg relative overflow-hidden"
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className={`${feature.bgColor} p-4 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 relative`}>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl animate-pulse"></div>
                <feature.icon className={`w-8 h-8 ${feature.iconColor} relative z-10`} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-blue-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                {feature.description}
              </p>
              
              {/* Animated border */}
              <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-blue-500/30 transition-colors duration-300"></div>
            </div>
          ))}
        </div>

        {/* Steps Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 bg-gradient-to-br ${step.bgGradient} relative overflow-hidden group hover:scale-105 transition-transform duration-300 border border-white/20`}
            >
              {/* Glassmorphic overlay */}
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
              
              <div className="relative z-10">
                <span className="text-4xl font-bold text-white/30 mb-4 block font-mono">
                  {step.number}
                </span>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                  {step.title}
                </h3>
                <p className="text-blue-100 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Animated gradient border */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-flow"></div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-12">
          <button 
            onClick={() => window.location.href = '/login'} 
            className="relative group"
          >
            {/* Animated glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
            {/* Button content */}
            <div className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/25 overflow-hidden">
              <span className="relative z-10 flex items-center">
                Start Your Journey
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
