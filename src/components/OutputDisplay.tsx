
import React from 'react';
import { useTypewriter } from '@/hooks/useTypewriter';

interface OutputDisplayProps {
  message: string;
  typingSpeed?: number;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ message, typingSpeed = 20 }) => {
  const { displayText } = useTypewriter(message, typingSpeed);

  return (
    <div 
      id="outputDisplay"
      className="w-full max-w-md h-48 overflow-y-auto mt-8 p-4 rounded-lg bg-muted/30 text-foreground font-mono text-sm animate-fade-in typewriter"
    >
      {displayText}
    </div>
  );
};

export default OutputDisplay;
