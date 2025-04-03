
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { 
  Image, Download, Rotate3D, Zap, 
  Sliders, UserCircle, Heart, Brain
} from 'lucide-react';

interface BodyImageGeneratorProps {
  onComplete: (imageUrl: string) => void;
}

const BodyImageGenerator: React.FC<BodyImageGeneratorProps> = ({ onComplete }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewMode, setViewMode] = useState<'exterior' | 'skeletal' | 'muscular' | 'organs'>('exterior');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [pose, setPose] = useState<'standing' | 'sitting' | 'running'>('standing');
  const [angle, setAngle] = useState<number>(0);
  const [focus, setFocus] = useState<string>('full body');
  const { toast } = useToast();
  
  // Sample placeholder images for demo purposes
  const placeholderImages = {
    exterior: {
      male: {
        standing: '/placeholder.svg',
        sitting: '/placeholder.svg',
        running: '/placeholder.svg'
      },
      female: {
        standing: '/placeholder.svg',
        sitting: '/placeholder.svg',
        running: '/placeholder.svg'
      }
    },
    skeletal: {
      male: {
        standing: '/placeholder.svg',
        sitting: '/placeholder.svg',
        running: '/placeholder.svg'
      },
      female: {
        standing: '/placeholder.svg',
        sitting: '/placeholder.svg',
        running: '/placeholder.svg'
      }
    },
    muscular: {
      male: {
        standing: '/placeholder.svg',
        sitting: '/placeholder.svg',
        running: '/placeholder.svg'
      },
      female: {
        standing: '/placeholder.svg',
        sitting: '/placeholder.svg',
        running: '/placeholder.svg'
      }
    },
    organs: {
      male: {
        standing: '/placeholder.svg',
        sitting: '/placeholder.svg',
        running: '/placeholder.svg'
      },
      female: {
        standing: '/placeholder.svg',
        sitting: '/placeholder.svg',
        running: '/placeholder.svg'
      }
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    
    toast({
      title: "Generating image",
      description: `Creating ${viewMode} view of ${gender} body in ${pose} position`,
    });
    
    // Simulate image generation with a delay
    setTimeout(() => {
      const generatedImageUrl = placeholderImages[viewMode][gender][pose];
      setIsGenerating(false);
      onComplete(generatedImageUrl);
      
      toast({
        title: "Image generated",
        description: "Human body visualization is ready",
      });
    }, 2500);
  };

  return (
    <div className="w-full max-w-3xl mt-6 bg-muted/30 p-4 rounded-lg">
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="w-full sm:w-1/2 lg:w-1/3">
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <UserCircle className="h-4 w-4 mr-1" />
              Body Type
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant={gender === 'male' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setGender('male')}
              >
                Male
              </Button>
              <Button 
                variant={gender === 'female' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setGender('female')}
              >
                Female
              </Button>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <Sliders className="h-4 w-4 mr-1" />
              View Mode
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant={viewMode === 'exterior' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('exterior')}
              >
                Exterior
              </Button>
              <Button 
                variant={viewMode === 'skeletal' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('skeletal')}
              >
                Skeletal
              </Button>
              <Button 
                variant={viewMode === 'muscular' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('muscular')}
              >
                Muscular
              </Button>
              <Button 
                variant={viewMode === 'organs' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('organs')}
              >
                Organs
              </Button>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <Rotate3D className="h-4 w-4 mr-1" />
              Pose
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant={pose === 'standing' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setPose('standing')}
              >
                Standing
              </Button>
              <Button 
                variant={pose === 'sitting' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setPose('sitting')}
              >
                Sitting
              </Button>
              <Button 
                variant={pose === 'running' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setPose('running')}
              >
                Running
              </Button>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <Brain className="h-4 w-4 mr-1" />
              Focus Area
            </h3>
            <Input
              type="text"
              placeholder="e.g., heart, brain, full body"
              value={focus}
              onChange={(e) => setFocus(e.target.value)}
              className="bg-muted/50"
            />
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <Rotate3D className="h-4 w-4 mr-1" />
              Viewing Angle: {angle}°
            </h3>
            <Slider
              value={[angle]}
              min={0}
              max={360}
              step={15}
              onValueChange={(value) => setAngle(value[0])}
            />
          </div>
          
          <Button 
            className="w-full mt-4 gap-2" 
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                Generating...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4" />
                Generate Body Image
              </>
            )}
          </Button>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center p-4 border border-muted/30 rounded-lg bg-black/20">
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="animate-spin h-12 w-12 border-4 border-current border-t-transparent rounded-full mb-4"></div>
              <p className="text-sm">Generating {viewMode} visualization...</p>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-4">
                Your generated body image will appear here
              </div>
              <Image className="h-32 w-32 mx-auto opacity-30" />
              <div className="mt-4 flex gap-2 justify-center">
                <div className="text-xs bg-muted/50 px-2 py-1 rounded-full">{gender}</div>
                <div className="text-xs bg-muted/50 px-2 py-1 rounded-full">{viewMode}</div>
                <div className="text-xs bg-muted/50 px-2 py-1 rounded-full">{pose}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BodyImageGenerator;
