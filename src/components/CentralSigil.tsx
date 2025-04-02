
import React, { useState } from 'react';

interface CentralSigilProps {
  active: boolean;
}

const CentralSigil: React.FC<CentralSigilProps> = ({ active }) => {
  const baseClasses = "text-6xl font-bold transition-all duration-1000";
  const activeClasses = active 
    ? "text-crimson animate-sigil-glow" 
    : "text-white opacity-70";

  return (
    <div 
      id="centralSigil" 
      className={`${baseClasses} ${activeClasses} mb-8`}
    >
      ⦿
    </div>
  );
};

export default CentralSigil;
