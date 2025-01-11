import { Star } from "lucide-react";

interface TestimonialCardProps {
  text: string;
  author: string;
  role: string;
  rating: number;
}

export const TestimonialCard = ({ text, author, role, rating }: TestimonialCardProps) => {
  return (
    <div className="p-6">
      <div className="glass-card p-8 rounded-xl relative group hover:scale-[1.02] transition-all duration-300">
        <div className="flex mb-4">
          {[...Array(rating)].map((_, i) => (
            <Star
              key={i}
              className="w-5 h-5 text-kingdom-accent fill-kingdom-accent"
            />
          ))}
        </div>
        <p className="text-lg text-kingdom-text mb-6 italic">
          "{text}"
        </p>
        <div className="flex items-center">
          <div className="flex flex-col">
            <span className="font-semibold text-kingdom-text">
              {author}
            </span>
            <span className="text-sm text-kingdom-muted">
              {role}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};