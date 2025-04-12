import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Activity, Zap, ThermometerSnowflake, Hammer } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface StimulusControlsProps {
  stimulusType: string;
  setStimulusType: (type: string) => void;
  stimulusIntensity: number;
  setStimulusIntensity: (value: number) => void;
  applyStimulus: () => void;
}

interface StimulusDetail {
  icon: React.ReactNode;
  description: string;
  examples: string[];
  risks: string[];
  maxSafe: number;
}

const stimulusDetails: Record<string, StimulusDetail> = {
  electrical: {
    icon: <Zap className="h-4 w-4 text-yellow-400" />,
    description: "Electrical stimulation activates nerves and muscles through controlled electrical current.",
    examples: ["Transcutaneous electrical nerve stimulation (TENS)", "Neuromuscular electrical stimulation", "Deep brain stimulation"],
    risks: ["Skin irritation", "Muscle fatigue", "Disruption of cardiac rhythm at high intensities"],
    maxSafe: 65
  },
  chemical: {
    icon: <Activity className="h-4 w-4 text-green-400" />,
    description: "Chemical stimulation involves introducing substances that interact with receptors or neural pathways.",
    examples: ["Neurotransmitters", "Hormones", "Pharmaceutical agents"],
    risks: ["Allergic reactions", "Toxicity at high concentrations", "Unintended systemic effects"],
    maxSafe: 75
  },
  thermal: {
    icon: <ThermometerSnowflake className="h-4 w-4 text-blue-400" />,
    description: "Thermal stimulation uses temperature changes to activate temperature-sensitive receptors.",
    examples: ["Heat therapy", "Cold therapy", "Contrast therapy"],
    risks: ["Burns or frostbite at extreme levels", "Vasodilation or vasoconstriction", "Tissue damage"],
    maxSafe: 70
  },
  mechanical: {
    icon: <Hammer className="h-4 w-4 text-purple-400" />,
    description: "Mechanical stimulation applies physical force or pressure to activate mechanoreceptors.",
    examples: ["Percussion", "Vibration", "Compression"],
    risks: ["Tissue damage", "Bruising", "Nerve compression"],
    maxSafe: 80
  }
};

const anatomicalTargets = {
  "nervous": ["C7 vertebra", "Median nerve", "Sciatic nerve", "Vagus nerve", "Trigeminal nerve"],
  "cardiovascular": ["Carotid sinus", "Brachial artery", "Femoral artery", "Popliteal artery"],
  "respiratory": ["Phrenic nerve", "Intercostal muscles", "Diaphragm"],
  "muscular": ["Biceps brachii", "Quadriceps femoris", "Gastrocnemius", "Latissimus dorsi"],
  "skeletal": ["T12 vertebra", "Femoral head", "Radius", "Calcaneus", "Scapula"],
  "digestive": ["Vagus nerve", "Celiac plexus", "Splanchnic nerve"]
};

const StimulusControls: React.FC<StimulusControlsProps> = ({
  stimulusType,
  setStimulusType,
  stimulusIntensity,
  setStimulusIntensity,
  applyStimulus
}) => {
  const [targetSystem, setTargetSystem] = useState<string>("nervous");
  const [targetPoint, setTargetPoint] = useState<string>("");
  const [customTarget, setCustomTarget] = useState<string>("");
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(5);
  
  const handleIntensityChange = (values: number[]) => {
    setStimulusIntensity(values[0]);
  };
  
  const handleTargetChange = (value: string) => {
    if (value === "custom") {
      setTargetPoint("custom");
    } else {
      setTargetPoint(value);
      setCustomTarget("");
    }
  };
  
  const currentDetails = stimulusDetails[stimulusType] || stimulusDetails.electrical;
  const isHighIntensity = stimulusIntensity > currentDetails.maxSafe;
  
  const handleApply = () => {
    // Apply the stimulus with all parameters
    applyStimulus();
    
    // Show caution for high intensity
    if (isHighIntensity) {
      // In a real implementation, this would trigger a warning toast or alert
      console.warn("Caution: High intensity stimulus applied");
    }
  };

  return (
    <div className="p-3 border border-muted-foreground/20 rounded-lg mt-2 space-y-3">
      <div className="flex items-center justify-between">
        <Label htmlFor="stimulus-type" className="text-xs">Stimulus Type</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0"
                onClick={() => setShowDetails(!showDetails)}
              >
                <AlertCircle className="h-3 w-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Show/hide stimulus details</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Select 
        value={stimulusType} 
        onValueChange={setStimulusType}
      >
        <SelectTrigger id="stimulus-type" className="flex items-center">
          {stimulusType && stimulusDetails[stimulusType]?.icon}
          <SelectValue placeholder="Select type" className="ml-2" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="electrical" className="flex items-center">
            <Zap className="h-4 w-4 text-yellow-400 mr-2" />
            <span>Electrical</span>
          </SelectItem>
          <SelectItem value="chemical">
            <div className="flex items-center">
              <Activity className="h-4 w-4 text-green-400 mr-2" />
              <span>Chemical</span>
            </div>
          </SelectItem>
          <SelectItem value="thermal">
            <div className="flex items-center">
              <ThermometerSnowflake className="h-4 w-4 text-blue-400 mr-2" />
              <span>Thermal</span>
            </div>
          </SelectItem>
          <SelectItem value="mechanical">
            <div className="flex items-center">
              <Hammer className="h-4 w-4 text-purple-400 mr-2" />
              <span>Mechanical</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      {showDetails && (
        <div className="text-xs bg-muted/20 p-2 rounded">
          <p>{currentDetails.description}</p>
          <p className="mt-1"><span className="font-medium">Examples:</span> {currentDetails.examples.join(", ")}</p>
          <p className="mt-1 text-amber-400/70"><span className="font-medium">Risks:</span> {currentDetails.risks.join(", ")}</p>
        </div>
      )}
      
      <div>
        <div className="flex items-center justify-between">
          <Label className="text-xs">
            Intensity: {stimulusIntensity}%
            {isHighIntensity && (
              <span className="ml-1 text-amber-400">⚠️</span>
            )}
          </Label>
          <span className="text-[10px] text-muted-foreground">
            Safe max: {currentDetails.maxSafe}%
          </span>
        </div>
        <Slider
          value={[stimulusIntensity]}
          min={5}
          max={100}
          step={5}
          onValueChange={handleIntensityChange}
          className={isHighIntensity ? "mt-2 has-warning" : "mt-2"}
        />
        {isHighIntensity && (
          <p className="text-[10px] text-amber-400 mt-1">
            Warning: Intensity exceeds recommended safe levels
          </p>
        )}
      </div>
      
      <div>
        <Label htmlFor="target-system" className="text-xs">Target System</Label>
        <Select
          value={targetSystem}
          onValueChange={setTargetSystem}
        >
          <SelectTrigger id="target-system">
            <SelectValue placeholder="Select system" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nervous">Nervous System</SelectItem>
            <SelectItem value="cardiovascular">Cardiovascular System</SelectItem>
            <SelectItem value="respiratory">Respiratory System</SelectItem>
            <SelectItem value="muscular">Muscular System</SelectItem>
            <SelectItem value="skeletal">Skeletal System</SelectItem>
            <SelectItem value="digestive">Digestive System</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="target-point" className="text-xs">Target Point</Label>
        <Select
          value={targetPoint}
          onValueChange={handleTargetChange}
        >
          <SelectTrigger id="target-point">
            <SelectValue placeholder="Select target point" />
          </SelectTrigger>
          <SelectContent>
            {anatomicalTargets[targetSystem as keyof typeof anatomicalTargets]?.map((target) => (
              <SelectItem key={target} value={target}>{target}</SelectItem>
            ))}
            <SelectItem value="custom">Custom Target...</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {targetPoint === "custom" && (
        <div>
          <Label htmlFor="custom-target" className="text-xs">Custom Target</Label>
          <Input 
            id="custom-target" 
            value={customTarget}
            onChange={(e) => setCustomTarget(e.target.value)}
            placeholder="Enter specific anatomical point"
            className="text-xs"
          />
        </div>
      )}
      
      <div>
        <Label htmlFor="stimulus-duration" className="text-xs">
          Duration: {duration} seconds
        </Label>
        <Slider
          id="stimulus-duration"
          value={[duration]}
          min={1}
          max={30}
          step={1}
          onValueChange={(values) => setDuration(values[0])}
          className="mt-2"
        />
      </div>
      
      <Button 
        variant="default"
        className="w-full flex items-center gap-2"
        onClick={handleApply}
      >
        {currentDetails.icon}
        Apply {stimulusType.charAt(0).toUpperCase() + stimulusType.slice(1)} Stimulus
      </Button>
      
      {isHighIntensity && (
        <Alert variant="default" className="p-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs ml-2">
            High-intensity stimulus may cause unexpected physiological responses.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default StimulusControls;
