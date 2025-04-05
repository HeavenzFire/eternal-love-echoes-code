
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';

interface StimulusControlsProps {
  stimulusType: string;
  setStimulusType: (type: string) => void;
  stimulusIntensity: number;
  setStimulusIntensity: (values: number[]) => void;
  applyStimulus: () => void;
}

const StimulusControls: React.FC<StimulusControlsProps> = ({
  stimulusType,
  setStimulusType,
  stimulusIntensity,
  setStimulusIntensity,
  applyStimulus
}) => {
  return (
    <div className="p-3 border border-muted-foreground/20 rounded-lg mt-2 space-y-3">
      <div>
        <Label htmlFor="stimulus-type" className="text-xs">Stimulus Type</Label>
        <Select 
          value={stimulusType} 
          onValueChange={setStimulusType}
        >
          <SelectTrigger id="stimulus-type">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="electrical">Electrical</SelectItem>
            <SelectItem value="chemical">Chemical</SelectItem>
            <SelectItem value="thermal">Thermal</SelectItem>
            <SelectItem value="mechanical">Mechanical</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label className="text-xs">Intensity: {stimulusIntensity}%</Label>
        <Slider
          value={[stimulusIntensity]}
          min={10}
          max={100}
          step={5}
          onValueChange={setStimulusIntensity}
        />
      </div>
      
      <div>
        <Label htmlFor="stimulus-target" className="text-xs mb-1">Target Point</Label>
        <Input 
          id="stimulus-target" 
          placeholder="e.g., C7 vertebra, radial nerve"
        />
      </div>
      
      <Button 
        variant="default"
        className="w-full"
        onClick={applyStimulus}
      >
        Apply Stimulus
      </Button>
    </div>
  );
};

export default StimulusControls;
