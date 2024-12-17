import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const properties = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    title: "Modern Office Complex",
    location: "Silicon Valley, CA",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
    title: "Luxury Corporate Hub",
    location: "Downtown Manhattan, NY",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833",
    title: "Glass Tower Offices",
    location: "Chicago Loop, IL",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2",
    title: "Sky Business Center",
    location: "Seattle, WA",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e",
    title: "Tech Park Plaza",
    location: "Austin, TX",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511",
    title: "Innovation Hub",
    location: "Boston, MA",
  },
];

export const PropertyCarousel = () => {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

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
        {properties.map((property) => (
          <CarouselItem key={property.id} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <div className="group relative overflow-hidden rounded-lg">
                <AspectRatio ratio={4 / 3}>
                  <img
                    src={property.image}
                    alt={property.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Property details */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-lg font-semibold text-white">
                      {property.title}
                    </h3>
                    <p className="text-sm text-kingdom-text/80">
                      {property.location}
                    </p>
                  </div>
                </AspectRatio>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0" />
      <CarouselNext className="right-0" />
    </Carousel>
  );
};