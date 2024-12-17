import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LoginForm } from "@/components/auth/LoginForm";
import { TestimonialsCarousel } from "@/components/auth/TestimonialsCarousel";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/home");
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-12 bg-gradient-dark relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-kingdom-primary/5 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-kingdom-secondary/5 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="w-full max-w-md space-y-8 relative z-10">
          <div className="glass-card p-8 rounded-xl shadow-xl backdrop-blur-lg border border-kingdom-primary/20">
            <LoginForm />
          </div>
        </div>
      </div>

      {/* Right side - Testimonials */}
      <div className="hidden lg:flex w-1/2 bg-gradient-dark flex-col items-center justify-center p-12 relative">
        {/* Decorative background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-kingdom-primary/20 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-kingdom-secondary/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Welcome Text and Testimonials */}
        <div className="relative z-10 w-full max-w-2xl space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold gradient-text animate-glow">
              Welcome to MyKingdom
            </h2>
            <p className="text-xl text-kingdom-text/90 leading-relaxed">
              Join thousands of property managers who have transformed their business with our AI-powered platform. Experience the future of property management today.
            </p>
            <div className="flex items-center justify-center space-x-2 text-kingdom-text/80">
              <span className="flex items-center">
                <span className="inline-block w-2 h-2 bg-kingdom-primary rounded-full mr-2 animate-pulse"></span>
                Smart Analytics
              </span>
              <span className="text-kingdom-primary/50">•</span>
              <span className="flex items-center">
                <span className="inline-block w-2 h-2 bg-kingdom-secondary rounded-full mr-2 animate-pulse"></span>
                AI Insights
              </span>
              <span className="text-kingdom-primary/50">•</span>
              <span className="flex items-center">
                <span className="inline-block w-2 h-2 bg-kingdom-accent rounded-full mr-2 animate-pulse"></span>
                24/7 Support
              </span>
            </div>
          </div>

          {/* Testimonials Carousel */}
          <TestimonialsCarousel />
        </div>
      </div>
    </div>
  );
}