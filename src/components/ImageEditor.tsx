
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Image, Upload, Download, Wand2, Brush, Eraser, Layers, Crop } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageEditorProps {
  onComplete: (result: string) => void;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ onComplete }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        toast({
          title: "Image loaded",
          description: "Your image has been uploaded successfully.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const applyAiEdit = () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a prompt to guide the AI editing.",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate AI processing with setTimeout
    setTimeout(() => {
      // In a real implementation, this would call an AI image editing API
      setIsProcessing(false);
      toast({
        title: "AI edit applied",
        description: `Applied edit: ${prompt}`,
      });
      onComplete(`Image edited using AI with prompt: "${prompt}"`);
    }, 2000);
  };

  const applyFilters = () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please upload an image first.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real implementation, this would apply CSS filters to the image
    toast({
      title: "Filters applied",
      description: `Brightness: ${brightness}%, Contrast: ${contrast}%, Saturation: ${saturation}%`,
    });
    
    onComplete(`Image filters applied: Brightness: ${brightness}%, Contrast: ${contrast}%, Saturation: ${saturation}%`);
  };

  const handleDownload = () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please upload and edit an image first.",
        variant: "destructive",
      });
      return;
    }
    
    const a = document.createElement('a');
    a.href = selectedImage;
    a.download = 'edited-image.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: "Image downloaded",
      description: "Your edited image has been downloaded.",
    });
  };

  return (
    <div className="w-full max-w-2xl mt-6 p-4 rounded-lg bg-muted/30">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Image className="h-5 w-5" />
          AI Image Editor
        </h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleDownload}
          disabled={!selectedImage}
        >
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="col-span-2 flex justify-center items-center border border-dashed border-muted-foreground/50 rounded-lg h-64 bg-background/20 overflow-hidden">
          {selectedImage ? (
            <img 
              src={selectedImage} 
              alt="Uploaded for editing" 
              className="max-w-full max-h-full object-contain"
              style={{
                filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`
              }}
            />
          ) : (
            <div className="text-center p-4">
              <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">Upload an image to begin editing</p>
            </div>
          )}
        </div>
        
        <div className="flex flex-col gap-2">
          <div className="p-2 border border-muted-foreground/20 rounded-lg">
            <p className="text-sm font-medium mb-2">Upload Image</p>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="text-xs"
            />
          </div>
          
          <Tabs defaultValue="ai" className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="ai">AI Edit</TabsTrigger>
              <TabsTrigger value="filters">Filters</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
            </TabsList>
            
            <TabsContent value="ai" className="p-2 border border-muted-foreground/20 rounded-lg mt-2">
              <p className="text-sm font-medium mb-2">AI Prompt</p>
              <Input
                placeholder="Describe the edit you want..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="mb-2"
              />
              <Button 
                onClick={applyAiEdit} 
                className="w-full"
                disabled={isProcessing || !selectedImage}
              >
                {isProcessing ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Processing...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Apply AI Edit
                  </>
                )}
              </Button>
            </TabsContent>
            
            <TabsContent value="filters" className="p-2 border border-muted-foreground/20 rounded-lg mt-2">
              <div className="space-y-4">
                <div>
                  <p className="text-xs mb-1">Brightness: {brightness}%</p>
                  <Slider
                    value={[brightness]} 
                    min={0} 
                    max={200} 
                    step={5}
                    onValueChange={(values) => setBrightness(values[0])}
                  />
                </div>
                <div>
                  <p className="text-xs mb-1">Contrast: {contrast}%</p>
                  <Slider
                    value={[contrast]} 
                    min={0} 
                    max={200} 
                    step={5}
                    onValueChange={(values) => setContrast(values[0])}
                  />
                </div>
                <div>
                  <p className="text-xs mb-1">Saturation: {saturation}%</p>
                  <Slider
                    value={[saturation]} 
                    min={0} 
                    max={200} 
                    step={5}
                    onValueChange={(values) => setSaturation(values[0])}
                  />
                </div>
                <Button 
                  onClick={applyFilters} 
                  variant="secondary" 
                  className="w-full"
                  disabled={!selectedImage}
                >
                  Apply Filters
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="tools" className="p-2 border border-muted-foreground/20 rounded-lg mt-2">
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="h-auto py-2 flex flex-col" disabled={!selectedImage}>
                  <Crop className="h-4 w-4 mb-1" />
                  <span className="text-xs">Crop</span>
                </Button>
                <Button variant="outline" className="h-auto py-2 flex flex-col" disabled={!selectedImage}>
                  <Brush className="h-4 w-4 mb-1" />
                  <span className="text-xs">Draw</span>
                </Button>
                <Button variant="outline" className="h-auto py-2 flex flex-col" disabled={!selectedImage}>
                  <Eraser className="h-4 w-4 mb-1" />
                  <span className="text-xs">Erase</span>
                </Button>
                <Button variant="outline" className="h-auto py-2 flex flex-col" disabled={!selectedImage}>
                  <Layers className="h-4 w-4 mb-1" />
                  <span className="text-xs">Layers</span>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
