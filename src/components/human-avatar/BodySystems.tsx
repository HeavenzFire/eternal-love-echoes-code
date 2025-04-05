
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Brain, Heart, Activity, UserRound, Dna, Circle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BodySystemsProps {
  activeSystem: string;
  setActiveSystem: (system: string) => void;
}

const BodySystems: React.FC<BodySystemsProps> = ({ activeSystem, setActiveSystem }) => {
  const { toast } = useToast();

  return (
    <div className="p-3 border border-muted-foreground/20 rounded-lg mt-2">
      <div className="grid grid-cols-2 gap-2">
        <Button 
          variant={activeSystem === "nervous" ? "default" : "outline"} 
          className="h-auto py-2 flex flex-col"
          onClick={() => setActiveSystem("nervous")}
        >
          <Brain className="h-4 w-4 mb-1" />
          <span className="text-xs">Nervous</span>
        </Button>
        <Button 
          variant={activeSystem === "cardiovascular" ? "default" : "outline"} 
          className="h-auto py-2 flex flex-col"
          onClick={() => setActiveSystem("cardiovascular")}
        >
          <Heart className="h-4 w-4 mb-1" />
          <span className="text-xs">Cardiovascular</span>
        </Button>
        <Button 
          variant={activeSystem === "muscular" ? "default" : "outline"} 
          className="h-auto py-2 flex flex-col"
          onClick={() => setActiveSystem("muscular")}
        >
          <Activity className="h-4 w-4 mb-1" />
          <span className="text-xs">Muscular</span>
        </Button>
        <Button 
          variant={activeSystem === "skeletal" ? "default" : "outline"} 
          className="h-auto py-2 flex flex-col"
          onClick={() => setActiveSystem("skeletal")}
        >
          <UserRound className="h-4 w-4 mb-1" />
          <span className="text-xs">Skeletal</span>
        </Button>
        <Button 
          variant={activeSystem === "endocrine" ? "default" : "outline"} 
          className="h-auto py-2 flex flex-col"
          onClick={() => setActiveSystem("endocrine")}
        >
          <Dna className="h-4 w-4 mb-1" />
          <span className="text-xs">Endocrine</span>
        </Button>
        <Button 
          variant={activeSystem === "lymphatic" ? "default" : "outline"} 
          className="h-auto py-2 flex flex-col"
          onClick={() => setActiveSystem("lymphatic")}
        >
          <Circle className="h-4 w-4 mb-1" />
          <span className="text-xs">Lymphatic</span>
        </Button>
      </div>
      
      <div className="mt-3">
        <Button 
          variant="secondary"
          className="w-full"
          onClick={() => {
            toast({
              title: "System Activated",
              description: `Now viewing the ${activeSystem} system`
            });
          }}
        >
          <Eye className="h-4 w-4 mr-2" />
          View Selected System
        </Button>
      </div>
    </div>
  );
};

export default BodySystems;
