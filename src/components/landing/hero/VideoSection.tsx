import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import { useState, useEffect } from "react";

export const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);
  const videoUrl = "https://fjdafebctoioqwqolhjk.supabase.co/storage/v1/object/public/videos/MyKingdomFinalVersion.mp4?t=2024-12-15T16%3A51%3A25.441Z";

  useEffect(() => {
    const video = document.createElement('video');
    video.preload = 'auto';
    video.src = videoUrl;
    setVideoElement(video);

    return () => {
      if (video) {
        video.src = '';
        video.load();
      }
    };
  }, [videoUrl]);

  const handlePlayClick = async () => {
    setIsPlaying(true);
    const video = document.getElementById('propertyVideo') as HTMLVideoElement;
    if (video) {
      try {
        await video.play();
      } catch (error) {
        console.error('Error playing video:', error);
      }
    }
  };

  return (
    <div className="relative mb-8 overflow-hidden rounded-lg shadow-xl">
      <AspectRatio ratio={16 / 9} className="bg-kingdom-dark/60">
        <div className="relative w-full h-full">
          {!isPlaying ? (
            <>
              {/* Dark overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-kingdom-dark/10 to-kingdom-dark/30" />
              
              {/* Thumbnail container */}
              <div className="absolute inset-0">
                <img 
                  src="/lovable-uploads/c24a9545-363f-48d1-bc29-cf7d00d45215.png"
                  alt="MyKingdom Crown"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>

              {/* Visit MyKingdom.ai text */}
              <div className="absolute top-4 left-4 z-10">
                <span className="text-lg font-semibold text-white bg-kingdom-dark/40 px-4 py-2 rounded-full backdrop-blur-sm border border-kingdom-primary/30">
                  Visit MyKingdom.ai
                </span>
              </div>

              {/* Enhanced Play button container */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="lg"
                  variant="ghost"
                  onClick={handlePlayClick}
                  className="group relative overflow-hidden text-white hover:scale-110 transition-all duration-300 p-12 rounded-full bg-gradient-to-r from-kingdom-primary/30 to-kingdom-secondary/30 backdrop-blur-md border-2 border-kingdom-primary/50 hover:border-kingdom-secondary"
                >
                  {/* Animated glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-kingdom-primary via-kingdom-secondary to-kingdom-accent opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-500"></div>
                  
                  {/* Rotating border effect */}
                  <div className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-kingdom-primary via-kingdom-secondary to-kingdom-accent opacity-30 animate-spin-slow"></div>
                  
                  <PlayCircle className="w-32 h-32 relative z-10 animate-pulse text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                </Button>
              </div>
            </>
          ) : (
            <video
              id="propertyVideo"
              className="w-full h-full object-cover"
              controls
              src={videoUrl}
              preload="auto"
              playsInline
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </AspectRatio>
    </div>
  );
};