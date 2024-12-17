import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import confetti from 'canvas-confetti';

export const WaitlistForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "",
    mobileNumber: "",
  });

  const triggerSuccessAnimation = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4E9FFF', '#1CE5E5', '#FFD700']
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.from("waitlist").insert([
        {
          full_name: formData.fullName,
          email: formData.email,
          country: formData.country,
          mobile_number: formData.mobileNumber,
        },
      ]);

      if (error) throw error;

      triggerSuccessAnimation();
      toast({
        title: "Welcome to MyKingdom! 🎉",
        description: "You've successfully joined our waitlist. We'll be in touch soon!",
        className: "bg-gradient-to-r from-kingdom-primary to-kingdom-secondary text-white",
      });
      setIsOpen(false);
      setFormData({
        fullName: "",
        email: "",
        country: "",
        mobileNumber: "",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            size="lg" 
            className="relative bg-gradient-to-r from-kingdom-accent via-kingdom-primary to-kingdom-secondary text-white font-bold py-6 px-8 text-lg shadow-xl hover:shadow-kingdom-primary/50 transition-all duration-300 animate-gradient-flow glow-effect overflow-hidden"
          >
            Join the Waitlist
            <div className="absolute inset-0 bg-gradient-to-r from-kingdom-accent/20 via-kingdom-primary/20 to-kingdom-secondary/20 animate-pulse"></div>
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-b from-kingdom-dark/95 to-kingdom-dark/90 backdrop-blur-xl border border-kingdom-primary/20">
        <DialogHeader className="space-y-4">
          <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-r from-kingdom-primary to-kingdom-secondary p-[2px]">
            <div className="w-full h-full rounded-full bg-kingdom-dark flex items-center justify-center">
              <span className="text-2xl font-bold text-kingdom-text">MK</span>
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-center">
            <span className="bg-gradient-to-r from-kingdom-primary to-kingdom-secondary bg-clip-text text-transparent">
              Join MyKingdom Waitlist
            </span>
          </DialogTitle>
          <p className="text-center text-kingdom-text/80">
            Be among the first to experience the future of property management
          </p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-kingdom-text">Full Name</Label>
            <Input
              id="fullName"
              required
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="bg-kingdom-dark/50 border-kingdom-primary/30 text-kingdom-text placeholder:text-kingdom-text/50 focus:border-kingdom-primary focus:ring-kingdom-primary/30"
              placeholder="Enter your full name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-kingdom-text">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="bg-kingdom-dark/50 border-kingdom-primary/30 text-kingdom-text placeholder:text-kingdom-text/50 focus:border-kingdom-primary focus:ring-kingdom-primary/30"
              placeholder="Enter your email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country" className="text-kingdom-text">Country</Label>
            <Input
              id="country"
              required
              value={formData.country}
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
              className="bg-kingdom-dark/50 border-kingdom-primary/30 text-kingdom-text placeholder:text-kingdom-text/50 focus:border-kingdom-primary focus:ring-kingdom-primary/30"
              placeholder="Enter your country"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mobileNumber" className="text-kingdom-text">Mobile Number</Label>
            <Input
              id="mobileNumber"
              required
              value={formData.mobileNumber}
              onChange={(e) =>
                setFormData({ ...formData, mobileNumber: e.target.value })
              }
              className="bg-kingdom-dark/50 border-kingdom-primary/30 text-kingdom-text placeholder:text-kingdom-text/50 focus:border-kingdom-primary focus:ring-kingdom-primary/30"
              placeholder="Enter your mobile number"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-kingdom-accent via-kingdom-primary to-kingdom-secondary text-white font-semibold py-6 hover:shadow-lg hover:shadow-kingdom-primary/30 transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Join Waitlist"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};