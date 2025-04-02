
import React, { useState } from 'react';
import { useTypewriter } from '@/hooks/useTypewriter';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface OutputDisplayProps {
  message: string;
  typingSpeed?: number;
  generatedImageUrl?: string;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ 
  message, 
  typingSpeed = 20, 
  generatedImageUrl 
}) => {
  const { displayText } = useTypewriter(message, typingSpeed);
  const [isImageLoading, setIsImageLoading] = useState(!!generatedImageUrl);
  const [showEnhancedView, setShowEnhancedView] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleImageError = () => {
    setIsImageLoading(false);
  };

  const toggleEnhancedView = () => {
    setShowEnhancedView(!showEnhancedView);
  };

  return (
    <div 
      id="outputDisplay"
      className="w-full max-w-md mt-8 p-4 rounded-lg bg-muted/30 text-foreground font-mono text-sm animate-fade-in typewriter"
    >
      <div className="h-48 overflow-y-auto mb-4">
        {displayText}
      </div>
      
      {generatedImageUrl && (
        <div className="mt-4 relative flex flex-col items-center">
          {isImageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
              <Loader2 className="h-8 w-8 animate-spin text-crimson" />
            </div>
          )}
          <img 
            src={generatedImageUrl} 
            alt="Generated cosmic imagery" 
            className={`w-full max-h-64 object-contain rounded-lg transition-all duration-500 ${
              showEnhancedView 
                ? 'border-2 border-crimson glow scale-[1.02]' 
                : 'border border-crimson/30'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          <div className="flex gap-2 mt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs bg-muted/50 border-crimson/30 hover:bg-crimson/20"
              onClick={() => window.open(generatedImageUrl, '_blank')}
            >
              Open in New Window
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs bg-muted/50 border-crimson/30 hover:bg-crimson/20"
              onClick={toggleEnhancedView}
            >
              {showEnhancedView ? 'Standard View' : 'Enhanced View'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutputDisplay;
