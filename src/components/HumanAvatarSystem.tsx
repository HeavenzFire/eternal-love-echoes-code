
import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AvatarDisplay from './human-avatar/AvatarDisplay';
import TabControls from './human-avatar/TabControls';

interface HumanAvatarSystemProps {
  onComplete: (data: any) => void;
}

const HumanAvatarSystem: React.FC<HumanAvatarSystemProps> = ({ onComplete }) => {
  const [gender, setGender] = useState<string>("male");
  const [bodyType, setBodyType] = useState<string>("mesomorph");
  const [age, setAge] = useState<number>(30);
  const [height, setHeight] = useState<number>(175); // cm
  const [weight, setWeight] = useState<number>(70); // kg
  const [activeSystem, setActiveSystem] = useState<string>("nervous");
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [stimulusType, setStimulusType] = useState<string>("electrical");
  const [stimulusIntensity, setStimulusIntensity] = useState<number>(50);
  const [showSkin, setShowSkin] = useState<boolean>(true);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const { toast } = useToast();

  // Placeholder avatar URLs
  const maleAvatarUrl = "https://assets.innovation.nejm.org/nejm/content/carousel/AR_simulator_small_384x384.webp";
  const femaleAvatarUrl = "https://medicalhealth.plus/wp-content/uploads/2022/08/3D-Anatomy-Female-Body-Parts.webp";
  
  const currentAvatarUrl = gender === "male" ? maleAvatarUrl : femaleAvatarUrl;

  const handleGenerateAvatar = () => {
    toast({
      title: "Generating 3D Avatar",
      description: `Creating ${gender} avatar with selected parameters...`,
    });
    
    setTimeout(() => {
      const avatarData = {
        gender,
        bodyType,
        age,
        height,
        weight,
        activeSystem,
        avatarUrl: currentAvatarUrl
      };
      
      onComplete(avatarData);
      
      toast({
        title: "Avatar Generated",
        description: `${gender.charAt(0).toUpperCase() + gender.slice(1)} avatar is ready for medical analysis.`,
      });
    }, 2000);
  };
  
  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
    toast({
      title: isAnimating ? "Animation Stopped" : "Animation Started",
      description: isAnimating ? 
        "Avatar simulation paused" : 
        `Simulating ${stimulusType} stimulus at ${stimulusIntensity}% intensity`,
    });
  };
  
  const applyStimulus = () => {
    toast({
      title: "Stimulus Applied",
      description: `Applied ${stimulusType} stimulus at ${stimulusIntensity}% intensity to ${activeSystem} system.`,
    });
    
    // In a real implementation, this would trigger visual changes to the avatar
    onComplete({
      action: "stimulus-applied",
      system: activeSystem,
      type: stimulusType,
      intensity: stimulusIntensity
    });
  };

  return (
    <div className="w-full max-w-2xl mt-6 p-4 rounded-lg bg-muted/30">
      <div className="mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Users className="h-5 w-5" />
          3D Human Avatar System
          <span className="ml-2 text-xs bg-red-900/40 px-2 py-0.5 rounded-full">Medical Use Only</span>
        </h3>
        <p className="text-sm text-muted-foreground">
          Digital human body simulation for medical research and education
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <AvatarDisplay 
          currentAvatarUrl={currentAvatarUrl}
          activeSystem={activeSystem}
          rotationAngle={rotationAngle}
          isAnimating={isAnimating}
          setRotationAngle={setRotationAngle}
          toggleAnimation={toggleAnimation}
        />
        
        <TabControls
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
          activeSystem={activeSystem}
          setActiveSystem={setActiveSystem}
          stimulusType={stimulusType}
          setStimulusType={setStimulusType}
          stimulusIntensity={stimulusIntensity}
          setStimulusIntensity={setStimulusIntensity}
          applyStimulus={applyStimulus}
          handleGenerateAvatar={handleGenerateAvatar}
        />
      </div>
      
      <p className="text-xs text-muted-foreground mt-2">
        Note: This system is intended for medical education and research purposes only. 
        All simulations are approximate and should not replace professional medical advice.
      </p>
    </div>
  );
};

export default HumanAvatarSystem;
