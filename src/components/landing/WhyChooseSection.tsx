import { useNavigate } from "react-router-dom";
import { BarChart3, Clock, Shield, LineChart } from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Smart Portfolio Management",
    description: "Leverage AI-powered insights to optimize your property portfolio performance in real-time.",
    metric: "45% ROI Increase",
    bgGradient: "from-blue-600/90 via-blue-500/80 to-blue-400/70",
  },
  {
    icon: Clock,
    title: "Automated Excellence",
    description: "Save 15+ hours weekly with intelligent automation for tenant management and maintenance.",
    metric: "60% Time Saved",
    bgGradient: "from-emerald-600/90 via-emerald-500/80 to-emerald-400/70",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description: "Bank-level encryption and compliance measures to protect your valuable property data.",
    metric: "99.9% Uptime",
    bgGradient: "from-purple-600/90 via-purple-500/80 to-purple-400/70",
  },
  {
    icon: LineChart,
    title: "Revenue Maximization",
    description: "Boost property returns by 23% with predictive analytics and market insights.",
    metric: "23% Higher Returns",
    bgGradient: "from-orange-500/90 via-orange-400/80 to-orange-300/70",
  },
];

export const WhyChooseSection = () => {
  const navigate = useNavigate();

  const handleStartJourney = () => {
    navigate('/login');
  };

  return (
    <section className="py-20 bg-gradient-to-b from-kingdom-dark to-[#1a237e] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 via-blue-200 to-purple-300 bg-clip-text text-transparent mb-6">
            Why Choose Our Platform
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Experience the future of property management with our innovative features
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br p-8 transition-all duration-300 hover:scale-[1.02] group backdrop-blur-xl border border-white/20"
            >
              {/* Glassmorphic overlay with animated gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-flow"></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.bgGradient} group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/20`}>
                    <feature.icon className="w-8 h-8 text-white/90" />
                  </div>
                  <span className="text-white/90 font-semibold px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
                    {feature.metric}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-blue-100 text-lg leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Animated border glow */}
              <div className="absolute inset-0 border border-white/20 rounded-2xl group-hover:border-blue-500/50 transition-colors duration-300"></div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button 
            onClick={handleStartJourney}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
            <div className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-blue-700 group-hover:to-purple-700 shadow-lg shadow-blue-500/25">
              <span className="flex items-center">
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