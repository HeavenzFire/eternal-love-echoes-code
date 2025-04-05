
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { User, UserRound } from 'lucide-react';

interface BasicSettingsProps {
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
}

const BasicSettings: React.FC<BasicSettingsProps> = ({
  gender, setGender,
  bodyType, setBodyType,
  age, setAge,
  height, setHeight,
  weight, setWeight,
  showSkin, setShowSkin
}) => {
  return (
    <div className="p-3 border border-muted-foreground/20 rounded-lg mt-2 space-y-3">
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
                  <User className="h-3 w-3 mr-2" />
                  Male
                </div>
              </SelectItem>
              <SelectItem value="female">
                <div className="flex items-center">
                  <UserRound className="h-3 w-3 mr-2" />
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
          onValueChange={setAge}
        />
      </div>
      
      <div>
        <Label className="text-xs">Height: {height} cm</Label>
        <Slider
          value={[height]}
          min={150}
          max={200}
          step={1}
          onValueChange={setHeight}
        />
      </div>
      
      <div>
        <Label className="text-xs">Weight: {weight} kg</Label>
        <Slider
          value={[weight]}
          min={45}
          max={120}
          step={1}
          onValueChange={setWeight}
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
    </div>
  );
};

export default BasicSettings;
