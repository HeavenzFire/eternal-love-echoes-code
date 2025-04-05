
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import BasicSettings from './BasicSettings';
import BodySystems from './BodySystems';
import StimulusControls from './StimulusControls';

interface TabControlsProps {
  gender: string;
  setGender: (value: string) => void;
  bodyType: string;
  setBodyType: (value: string) => void;
  age: number;
  setAge: (values: number[]) => void;
  height: number;
  setHeight: (values: number[]) => void;
  weight: number;
  setWeight: (values: number[]) => void;
  showSkin: boolean;
  setShowSkin: (value: boolean) => void;
  activeSystem: string;
  setActiveSystem: (system: string) => void;
  stimulusType: string;
  setStimulusType: (type: string) => void;
  stimulusIntensity: number;
  setStimulusIntensity: (values: number[]) => void;
  applyStimulus: () => void;
  handleGenerateAvatar: () => void;
}

const TabControls: React.FC<TabControlsProps> = ({
  gender, setGender,
  bodyType, setBodyType,
  age, setAge,
  height, setHeight,
  weight, setWeight,
  showSkin, setShowSkin,
  activeSystem, setActiveSystem,
  stimulusType, setStimulusType,
  stimulusIntensity, setStimulusIntensity,
  applyStimulus,
  handleGenerateAvatar
}) => {
  return (
    <div className="flex flex-col gap-3">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="systems">Systems</TabsTrigger>
          <TabsTrigger value="stimulus">Stimulus</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic">
          <BasicSettings 
            gender={gender} 
            setGender={setGender}
            bodyType={bodyType}
            setBodyType={setBodyType}
            age={age}
            setAge={setAge}
            height={height}
            setHeight={setHeight}
            weight={weight}
            setWeight={setWeight}
            showSkin={showSkin}
            setShowSkin={setShowSkin}
          />
        </TabsContent>
        
        <TabsContent value="systems">
          <BodySystems 
            activeSystem={activeSystem} 
            setActiveSystem={setActiveSystem} 
          />
        </TabsContent>
        
        <TabsContent value="stimulus">
          <StimulusControls 
            stimulusType={stimulusType}
            setStimulusType={setStimulusType}
            stimulusIntensity={stimulusIntensity}
            setStimulusIntensity={setStimulusIntensity}
            applyStimulus={applyStimulus}
          />
        </TabsContent>
      </Tabs>

      <Button 
        onClick={handleGenerateAvatar}
        className="mt-auto"
      >
        <User className="h-4 w-4 mr-2" />
        Generate Avatar
      </Button>
    </div>
  );
};

export default TabControls;
