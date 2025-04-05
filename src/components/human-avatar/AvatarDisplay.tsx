
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp, Pause, Play } from 'lucide-react';

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
  return (
    <div className="col-span-2 relative flex justify-center items-center border border-muted-foreground/30 rounded-lg h-80 bg-background/20 overflow-hidden">
      <img 
        src={currentAvatarUrl}
        alt="3D Human Avatar" 
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
