
import React from 'react';
import EtherealNode from '@/components/EtherealNode';
import EnergyConnection from '@/components/EnergyConnection';
import FloatingOrb from '@/components/FloatingOrb';

// Node positions
const nodes = [
  { x: 30, y: 20, size: 4, delay: 0.5 },
  { x: 70, y: 20, size: 3, delay: 1.2 },
  { x: 20, y: 50, size: 5, delay: 0.8 },
  { x: 80, y: 50, size: 4, delay: 1.5 },
  { x: 35, y: 75, size: 3, delay: 0.3 },
  { x: 65, y: 75, size: 5, delay: 1.0 },
];

// Connections between nodes
const connections = [
  { start: { x: 30, y: 20 }, end: { x: 70, y: 20 }, delay: 0.2 },
  { start: { x: 70, y: 20 }, end: { x: 80, y: 50 }, delay: 0.4 },
  { start: { x: 80, y: 50 }, end: { x: 65, y: 75 }, delay: 0.6 },
  { start: { x: 65, y: 75 }, end: { x: 35, y: 75 }, delay: 0.8 },
  { start: { x: 35, y: 75 }, end: { x: 20, y: 50 }, delay: 1.0 },
  { start: { x: 20, y: 50 }, end: { x: 30, y: 20 }, delay: 1.2 },
  { start: { x: 30, y: 20 }, end: { x: 80, y: 50 }, delay: 1.4 },
  { start: { x: 70, y: 20 }, end: { x: 35, y: 75 }, delay: 1.6 },
  { start: { x: 20, y: 50 }, end: { x: 65, y: 75 }, delay: 1.8 },
];

// Floating orbs
const orbs = [
  { x: 25, y: 30, size: 6, color: 'rgba(220, 20, 60, 0.3)', delay: 0.2 },
  { x: 75, y: 30, size: 8, color: 'rgba(147, 112, 219, 0.3)', delay: 1.5 },
  { x: 40, y: 60, size: 10, color: 'rgba(30, 144, 255, 0.3)', delay: 0.8 },
  { x: 60, y: 60, size: 7, color: 'rgba(220, 20, 60, 0.2)', delay: 1.1 },
  { x: 45, y: 25, size: 5, color: 'rgba(147, 112, 219, 0.2)', delay: 0.5 },
  { x: 85, y: 40, size: 9, color: 'rgba(30, 144, 255, 0.2)', delay: 1.3 },
  { x: 15, y: 40, size: 8, color: 'rgba(220, 20, 60, 0.2)', delay: 0.7 },
];

interface CosmicBackgroundProps {
  backgroundGradient: string;
  active: boolean;
}

const CosmicBackground: React.FC<CosmicBackgroundProps> = ({ 
  backgroundGradient, 
  active 
}) => {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center overflow-hidden relative"
      style={{ background: backgroundGradient }}
    >
      <div className="absolute inset-0 overflow-hidden">
        {nodes.map((node, i) => (
          <EtherealNode 
            key={`node-${i}`}
            position={{ x: node.x, y: node.y }}
            size={node.size}
            active={active}
            delay={node.delay}
          />
        ))}
        
        {connections.map((conn, i) => (
          <EnergyConnection 
            key={`conn-${i}`}
            start={conn.start}
            end={conn.end}
            active={active}
            delay={conn.delay}
          />
        ))}
        
        {orbs.map((orb, i) => (
          <FloatingOrb 
            key={`orb-${i}`}
            position={{ x: orb.x, y: orb.y }}
            size={orb.size}
            color={orb.color}
            active={active}
            delay={orb.delay}
          />
        ))}
      </div>
    </div>
  );
};

export default CosmicBackground;
