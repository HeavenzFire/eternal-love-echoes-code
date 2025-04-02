
import React from 'react';

interface FloatingOrbProps {
  position: { x: number; y: number };
  size: number;
  color: string;
  active: boolean;
  delay: number;
}

const FloatingOrb: React.FC<FloatingOrbProps> = ({ position, size, color, active, delay }) => {
  const baseClasses = "orb absolute rounded-full blur-sm opacity-70 transition-all duration-1000";
  const sizeClass = `w-${size} h-${size}`;
  const activeClasses = active ? "animate-gentle-drift" : "";
  
  const style = {
    left: `${position.x}%`,
    top: `${position.y}%`,
    backgroundColor: color,
    animationDelay: `${delay}s`,
  };

  return (
    <div 
      className={`${baseClasses} ${sizeClass} ${activeClasses}`}
      style={style}
    />
  );
};

export default FloatingOrb;
