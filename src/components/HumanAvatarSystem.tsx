
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { User, Users, Brain, Heart, Activity, Dna, View, Male, Female, UserRound, 
         Circle, ArrowDown, ArrowUp, Eye, Play, Pause } from 'lucide-react';

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
        <div className="col-span-2 relative flex justify-center items-center border border-muted-foreground/30 rounded-lg h-80 bg-background/20 overflow-hidden">
          <img 
            src={currentAvatarUrl}
            alt="3D Human Avatar" 
            className={`max-w-full max-h-full object-contain transition-all duration-500 ${isAnimating ? 'animate-pulse' : ''}`}
            style={{ transform: `rotateY(${rotationAngle}deg)` }}
          />
          
          {/* Overlay indicating active body system */}
          <div className="absolute top-2 left-2 bg-black/70 text-xs px-2 py-1 rounded-md">
            {activeSystem.charAt(0).toUpperCase() + activeSystem.slice(1)} System
          </div>
          
          {/* Rotation controls */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full bg-black/50"
              onClick={() => setRotationAngle(prev => prev - 90)}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              className="h-8 w-8 rounded-full bg-black/50"
              onClick={() => setRotationAngle(prev => prev + 90)}
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Animation control */}
          <Button 
            variant={isAnimating ? "destructive" : "default"}
            size="sm"
            className="absolute bottom-2 right-2"
            onClick={toggleAnimation}
          >
            {isAnimating ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Stop Simulation
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Start Simulation
              </>
            )}
          </Button>
        </div>
        
        <div className="flex flex-col gap-3">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="systems">Systems</TabsTrigger>
              <TabsTrigger value="stimulus">Stimulus</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="p-3 border border-muted-foreground/20 rounded-lg mt-2 space-y-3">
              <div className="flex gap-3">
                <div className="w-1/2">
                  <Label htmlFor="gender" className="text-xs">Gender</Label>
                  <Select 
                    value={gender} 
                    onValueChange={setGender}
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">
                        <div className="flex items-center">
                          <Male className="h-3 w-3 mr-2" />
                          Male
                        </div>
                      </SelectItem>
                      <SelectItem value="female">
                        <div className="flex items-center">
                          <Female className="h-3 w-3 mr-2" />
                          Female
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-1/2">
                  <Label htmlFor="body-type" className="text-xs">Body Type</Label>
                  <Select 
                    value={bodyType} 
                    onValueChange={setBodyType}
                  >
                    <SelectTrigger id="body-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ectomorph">Ectomorph</SelectItem>
                      <SelectItem value="mesomorph">Mesomorph</SelectItem>
                      <SelectItem value="endomorph">Endomorph</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label className="text-xs">Age: {age} years</Label>
                <Slider
                  value={[age]}
                  min={18}
                  max={90}
                  step={1}
                  onValueChange={(values) => setAge(values[0])}
                />
              </div>
              
              <div>
                <Label className="text-xs">Height: {height} cm</Label>
                <Slider
                  value={[height]}
                  min={150}
                  max={200}
                  step={1}
                  onValueChange={(values) => setHeight(values[0])}
                />
              </div>
              
              <div>
                <Label className="text-xs">Weight: {weight} kg</Label>
                <Slider
                  value={[weight]}
                  min={45}
                  max={120}
                  step={1}
                  onValueChange={(values) => setWeight(values[0])}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="show-skin"
                  checked={showSkin}
                  onCheckedChange={(checked) => setShowSkin(checked as boolean)} 
                />
                <Label htmlFor="show-skin" className="text-xs">
                  Show skin layer
                </Label>
              </div>
            </TabsContent>
            
            <TabsContent value="systems" className="p-3 border border-muted-foreground/20 rounded-lg mt-2">
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
            </TabsContent>
            
            <TabsContent value="stimulus" className="p-3 border border-muted-foreground/20 rounded-lg mt-2 space-y-3">
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
                  onValueChange={(values) => setStimulusIntensity(values[0])}
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
      </div>
      
      <p className="text-xs text-muted-foreground mt-2">
        Note: This system is intended for medical education and research purposes only. 
        All simulations are approximate and should not replace professional medical advice.
      </p>
    </div>
  );
};

export default HumanAvatarSystem;
