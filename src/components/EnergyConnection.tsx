
import React from 'react';

interface EnergyConnectionProps {
  start: { x: number; y: number };
  end: { x: number; y: number };
  active: boolean;
  delay: number;
}

const EnergyConnection: React.FC<EnergyConnectionProps> = ({ start, end, active, delay }) => {
  const baseClasses = "connection absolute h-0.5 pointer-events-none transition-all duration-1000";
  const activeClasses = active 
    ? "bg-gradient-to-r from-crimson via-cosmicPurple to-celestialBlue animate-energy-flow" 
    : "bg-white/10";
  
  // Calculate the length and angle
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  
  const style = {
    left: `${start.x}%`,
    top: `${start.y}%`,
    width: `${length}%`,
    transform: `rotate(${angle}deg)`,
    transformOrigin: '0 0',
    animationDelay: `${delay}s`,
  };

  return (
    <div 
      className={`${baseClasses} ${activeClasses}`}
      style={style}
    />
  );
};

export default EnergyConnection;
