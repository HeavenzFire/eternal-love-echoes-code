
import React from 'react';
import { Loader2, Star, CircleDot } from 'lucide-react';

interface CentralSigilProps {
  active: boolean;
  onSigilClick?: () => void;
  isGeneratingImage?: boolean;
  variant?: 'default' | 'star' | 'cosmic';
}

const CentralSigil: React.FC<CentralSigilProps> = ({ 
  active, 
  onSigilClick,
  isGeneratingImage = false,
  variant = 'default'
}) => {
  const baseClasses = "transition-all duration-1000 cursor-pointer";
  const activeClasses = active 
    ? "text-crimson animate-sigil-glow" 
    : "text-white opacity-70 hover:opacity-100";

  const renderSigil = () => {
    switch (variant) {
      case 'star':
        return <Star className={`h-14 w-14 ${baseClasses} ${activeClasses}`} />;
      case 'cosmic':
        return <CircleDot className={`h-14 w-14 ${baseClasses} ${activeClasses}`} />;
      case 'default':
      default:
        return <div className={`text-6xl font-bold ${baseClasses} ${activeClasses}`}>⦿</div>;
    }
  };

  return (
    <div className="relative flex items-center justify-center mb-8">
      <div 
        id="centralSigil" 
        onClick={onSigilClick}
        title="Click to generate cosmic imagery"
      >
        {renderSigil()}
      </div>
      
      {isGeneratingImage && (
        <div className="absolute -right-6 -top-1">
          <Loader2 className="h-5 w-5 animate-spin text-crimson" />
        </div>
      )}
      
      {active && !isGeneratingImage && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground animate-fade-in">
          Click to generate cosmic imagery
        </div>
      )}
    </div>
  );
};

export default CentralSigil;
