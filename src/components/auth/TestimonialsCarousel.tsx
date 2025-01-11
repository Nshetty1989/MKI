import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TestimonialCard } from "./TestimonialCard";

const testimonials = [
  {
    text: "MyKingdom revolutionized how we manage properties. The AI insights are incredible!",
    author: "Sarah Chen",
    role: "Property Manager",
    rating: 5
  },
  {
    text: "The automated maintenance scheduling has saved us countless hours.",
    author: "Michael Roberts",
    role: "Real Estate Investor",
    rating: 5
  },
  {
    text: "Best property management platform I've ever used. Worth every penny!",
    author: "David Thompson",
    role: "Portfolio Manager",
    rating: 5
  }
];

export const TestimonialsCarousel = () => {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {testimonials.map((testimonial, index) => (
          <CarouselItem key={index}>
            <TestimonialCard {...testimonial} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex -left-12 bg-kingdom-dark/50 hover:bg-kingdom-dark border-kingdom-primary/20" />
      <CarouselNext className="hidden md:flex -right-12 bg-kingdom-dark/50 hover:bg-kingdom-dark border-kingdom-primary/20" />
    </Carousel>
  );
};