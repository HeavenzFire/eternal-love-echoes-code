
import React from 'react';

interface EtherealNodeProps {
  position: { x: number; y: number };
  size: number;
  active: boolean;
  delay: number;
}

const EtherealNode: React.FC<EtherealNodeProps> = ({ position, size, active, delay }) => {
  const baseClasses = "node absolute rounded-full transition-all duration-1000";
  const sizeClass = `w-${size} h-${size}`;
  const activeClasses = active 
    ? "bg-crimson/30 animate-node-harmonize" 
    : "bg-white/20";
  
  const style = {
    left: `${position.x}%`,
    top: `${position.y}%`,
    animationDelay: `${delay}s`,
  };

  return (
    <div 
      className={`${baseClasses} ${sizeClass} ${activeClasses}`}
      style={style}
    />
  );
};

export default EtherealNode;
