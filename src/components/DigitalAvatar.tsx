
import React, { useEffect, useState } from 'react';
import { Brain, Stars, Sparkles } from 'lucide-react';

interface DigitalAvatarProps {
  name: string;
  greeting: string;
  backgroundColor?: string;
  foregroundColor?: string;
  animation?: 'pulse' | 'spin' | 'sparkle';
  onInteract?: () => void;
  icon?: React.ReactNode;
}

const DigitalAvatar: React.FC<DigitalAvatarProps> = ({
  name,
  greeting,
  backgroundColor = "bg-slate-900",
  foregroundColor = "text-slate-50",
  animation = "pulse",
  onInteract,
  icon
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleAvatarClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 2000);
    if (onInteract) onInteract();
  };

  const renderIcon = () => {
    if (icon) {
      return icon;
    }
    if (name.toLowerCase().includes("einstein")) {
      return <Brain className="h-8 w-8" />;
    }
    return <Stars className="h-8 w-8" />;
  };

  const getAnimationClass = () => {
    switch (animation) {
      case 'pulse': return 'animate-pulse';
      case 'spin': return 'animate-spin';
      case 'sparkle': return 'animate-fade-in';
      default: return 'animate-pulse';
    }
  };

  return (
    <div 
      className={`flex flex-col items-center justify-center cursor-pointer transition-all duration-500 ${isAnimating ? getAnimationClass() : ''}`}
      onClick={handleAvatarClick}
    >
      <div className={`${backgroundColor} ${foregroundColor} p-4 rounded-full shadow-lg relative`}>
        {renderIcon()}
        {isAnimating && (
          <div className="absolute -inset-1 opacity-75">
            <Sparkles className="absolute top-0 right-0 h-4 w-4 text-yellow-300" />
            <Sparkles className="absolute bottom-0 left-0 h-4 w-4 text-yellow-300" />
          </div>
        )}
      </div>
      
      <div className="mt-2 flex flex-col items-center">
        <div className={`font-bold text-sm ${foregroundColor}`}>{name}</div>
        <div className="text-xs text-muted-foreground mt-1 max-w-[200px] text-center">{greeting}</div>
      </div>
    </div>
  );
};

export default DigitalAvatar;
