
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp, Pause, Play, Layers } from 'lucide-react';

interface AvatarDisplayProps {
  currentAvatarUrl: string;
  activeSystem: string;
  rotationAngle: number;
  isAnimating: boolean;
  setRotationAngle: (fn: (prev: number) => number) => void;
  toggleAnimation: () => void;
}

const AvatarDisplay: React.FC<AvatarDisplayProps> = ({
  currentAvatarUrl,
  activeSystem,
  rotationAngle,
  isAnimating,
  setRotationAngle,
  toggleAnimation,
}) => {
  // Anatomical model URLs based on system and gender
  const getAnatomicalImageUrl = () => {
    // These URLs should be replaced with actual anatomical model URLs in production
    const anatomyURLs = {
      male: {
        nervous: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Blausen_0657_MultipleSclerosisBrain.png",
        cardiovascular: "https://cdn.britannica.com/51/64951-050-CECE3C7C/Human-heart.jpg",
        muscular: "https://cdn.britannica.com/13/125313-050-18554CDD/human-muscular-system.jpg",
        skeletal: "https://mymedicalscore.com/wp-content/uploads/2022/07/1_Human-Skeleton.jpg",
        endocrine: "https://cdn.britannica.com/13/97813-050-3021AFC2/endocrine-system-arrangements-hormones-humans-organ-systems.jpg",
        lymphatic: "https://cdn.britannica.com/87/117087-050-F061F890/lymphatic-system-primary-organs-humans.jpg"
      },
      female: {
        nervous: "https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41593-021-00832-6/MediaObjects/41593_2021_832_Fig1_HTML.png",
        cardiovascular: "https://www.ahajournals.org/cms/asset/5e13f15c-d094-41e4-917f-c0942e8a83fa/e013.fig.002.jpeg",
        muscular: "https://cdn.britannica.com/13/125313-050-18554CDD/human-muscular-system.jpg",
        skeletal: "https://thumbs.dreamstime.com/b/female-skeletal-system-d-rendered-illustration-79011802.jpg",
        endocrine: "https://media.istockphoto.com/id/1393615344/vector/female-endocrine-system-diagram.jpg?s=612x612&w=0&k=20&c=ff2x7uZh3Rq7th8y_ogFBrvZBDCt-TW_4U_lOPcuiBc=",
        lymphatic: "https://media.istockphoto.com/id/1334641355/vector/lymphatic-system-medical-educational-scheme.jpg?s=612x612&w=0&k=20&c=le2mOn5Qx2sFesDVxxJicUJ1yhWbtySDnvyeOAgZtRY="
      }
    };

    // Get gender from URL, default to male
    const gender = currentAvatarUrl.includes('female') ? 'female' : 'male';
    return anatomyURLs[gender][activeSystem];
  };

  return (
    <div className="col-span-2 relative flex justify-center items-center border border-muted-foreground/30 rounded-lg h-80 bg-background/20 overflow-hidden">
      <img 
        src={getAnatomicalImageUrl()}
        alt={`3D Human Avatar - ${activeSystem} system`} 
        className={`max-w-full max-h-full object-contain transition-all duration-500 ${isAnimating ? 'animate-pulse' : ''}`}
        style={{ transform: `rotateY(${rotationAngle}deg)` }}
      />
      
      {/* Overlay indicating active body system */}
      <div className="absolute top-2 left-2 bg-black/70 text-xs px-2 py-1 rounded-md">
        {activeSystem.charAt(0).toUpperCase() + activeSystem.slice(1)} System
      </div>
      
      {/* Rotation controls */}
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 rounded-full bg-black/50"
          onClick={() => setRotationAngle(prev => prev - 90)}
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          className="h-8 w-8 rounded-full bg-black/50"
          onClick={() => setRotationAngle(prev => prev + 90)}
        >
          <ArrowDown className="h-4 w-4" />
        </Button>
      </div>

      {/* Animation control */}
      <Button 
        variant={isAnimating ? "destructive" : "default"}
        size="sm"
        className="absolute bottom-2 right-2"
        onClick={toggleAnimation}
      >
        {isAnimating ? (
          <>
            <Pause className="h-4 w-4 mr-2" />
            Stop Simulation
          </>
        ) : (
          <>
            <Play className="h-4 w-4 mr-2" />
            Start Simulation
          </>
        )}
      </Button>
    </div>
  );
};

export default AvatarDisplay;
