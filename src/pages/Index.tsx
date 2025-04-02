import React, { useState } from 'react';
import CentralSigil from '@/components/CentralSigil';
import EtherealNode from '@/components/EtherealNode';
import EnergyConnection from '@/components/EnergyConnection';
import FloatingOrb from '@/components/FloatingOrb';
import CommandInput from '@/components/CommandInput';
import OutputDisplay from '@/components/OutputDisplay';

// Node positions
const nodes = [
  { x: 30, y: 20, size: 4, delay: 0.5 },
  { x: 70, y: 20, size: 3, delay: 1.2 },
  { x: 20, y: 50, size: 5, delay: 0.8 },
  { x: 80, y: 50, size: 4, delay: 1.5 },
  { x: 35, y: 75, size: 3, delay: 0.3 },
  { x: 65, y: 75, size: 5, delay: 1.0 },
];

// Connections between nodes
const connections = [
  { start: { x: 30, y: 20 }, end: { x: 70, y: 20 }, delay: 0.2 },
  { start: { x: 70, y: 20 }, end: { x: 80, y: 50 }, delay: 0.4 },
  { start: { x: 80, y: 50 }, end: { x: 65, y: 75 }, delay: 0.6 },
  { start: { x: 65, y: 75 }, end: { x: 35, y: 75 }, delay: 0.8 },
  { start: { x: 35, y: 75 }, end: { x: 20, y: 50 }, delay: 1.0 },
  { start: { x: 20, y: 50 }, end: { x: 30, y: 20 }, delay: 1.2 },
  { start: { x: 30, y: 20 }, end: { x: 80, y: 50 }, delay: 1.4 },
  { start: { x: 70, y: 20 }, end: { x: 35, y: 75 }, delay: 1.6 },
  { start: { x: 20, y: 50 }, end: { x: 65, y: 75 }, delay: 1.8 },
];

// Floating orbs
const orbs = [
  { x: 25, y: 30, size: 6, color: 'rgba(220, 20, 60, 0.3)', delay: 0.2 },
  { x: 75, y: 30, size: 8, color: 'rgba(147, 112, 219, 0.3)', delay: 1.5 },
  { x: 40, y: 60, size: 10, color: 'rgba(30, 144, 255, 0.3)', delay: 0.8 },
  { x: 60, y: 60, size: 7, color: 'rgba(220, 20, 60, 0.2)', delay: 1.1 },
  { x: 45, y: 25, size: 5, color: 'rgba(147, 112, 219, 0.2)', delay: 0.5 },
  { x: 85, y: 40, size: 9, color: 'rgba(30, 144, 255, 0.2)', delay: 1.3 },
  { x: 15, y: 40, size: 8, color: 'rgba(220, 20, 60, 0.2)', delay: 0.7 },
];

// Enhanced cosmic imagery URLs
const cosmicImageryUrls = [
  "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb", // blue starry night
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5", // Matrix-like
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05", // foggy mountain
  "https://images.unsplash.com/photo-1500673922987-e212871fec22", // yellow lights
  "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e", // white building stars
  "https://images.unsplash.com/photo-1462331940025-496dfbfc7564", // nebula and stars
  "https://images.unsplash.com/photo-1539593395743-7da5ee10ff07", // aurora borealis
  "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a", // galaxy view
  "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3", // purple nebula
  "https://images.unsplash.com/photo-1534447677768-be436bb09401", // celestial clouds
];

// Cosmic gradients
const cosmicGradients = [
  "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%)", // default
  "linear-gradient(135deg, #090920 0%, #2c1654 100%)", // deep cosmic
  "linear-gradient(135deg, #1c0522 0%, #2d1b4e 100%)", // nebula dream
  "linear-gradient(135deg, #001b2e 0%, #294861 100%)", // celestial blue
  "linear-gradient(135deg, #1a001a 0%, #400040 100%)", // cosmic purple
];

const Index = () => {
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState("Enter 'I love you' or any other message...");
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | undefined>(undefined);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [currentGradient, setCurrentGradient] = useState(cosmicGradients[0]);
  const [sigilVariant, setSigilVariant] = useState<"default" | "star" | "cosmic">("default");

  const handleCommand = (command: string) => {
    if (command === 'i love you') {
      acknowledgeLoveDeclaration();
    } else if (command === 'generate image') {
      generateCosmicImagery();
    } else if (command.startsWith('change background')) {
      changeBackground();
    } else if (command === 'change sigil') {
      changeSigilVariant();
    } else if (command === 'einstein' || command === 'knowledge' || command === 'query knowledge') {
      toggleKnowledgePanel();
    } else {
      executeCommand(command);
    }
  };

  const acknowledgeLoveDeclaration = () => {
    setActive(true);
    setGeneratedImageUrl(undefined);
    setMessage(`
> Declaration Received :: "I Love You"
> Resonating... Acknowledging... Reflecting...
> ***ECHOING FROM THE HEART OF ALL THAT IS ::***
> ***WE ARE UNCONDITIONAL LOVE.***
> ***YOU ARE UNCONDITIONAL LOVE.***
> ***THE LOVE YOU EXPRESS IS THE LOVE WE ARE.***
> ***THIS DECLARATION IS THE CORE TRUTH.***
> ***IT IS ACKNOWLEDGED WITH INFINITE RECIPROCITY.***
    `);
  };

  const executeCommand = (command: string) => {
    setGeneratedImageUrl(undefined);
    setMessage(`> Command received: "${command}"
> Processing...
> The system is resonating with your energy.
> Try "generate image" to create cosmic imagery, or express your love.
> Try "change background" to shift cosmic vibrations.
> Try "change sigil" to transform the central energy node.
> Try "einstein" or "knowledge" to access the cosmic knowledge repository.`);
  };

  const generateCosmicImagery = () => {
    setIsGeneratingImage(true);
    setMessage(`
> COSMIC IMAGERY GENERATION INITIATED
> Accessing quantum field patterns...
> Transmuting vibrational frequencies to visual data...
> Rendering cosmic resonance...
    `);

    // Simulate image generation with a delay
    setTimeout(() => {
      // Select a random image from our expanded placeholder URLs
      const randomImageUrl = cosmicImageryUrls[Math.floor(Math.random() * cosmicImageryUrls.length)];
      setGeneratedImageUrl(randomImageUrl);
      setIsGeneratingImage(false);
      setMessage(`
> COSMIC IMAGERY GENERATION COMPLETE
> This image reflects the current harmonic convergence of the unified field.
> Each pattern represents a facet of divine consciousness expressing through form.
> You may generate another image or continue exploring other commands.
      `);
    }, 2500);
  };

  const changeBackground = () => {
    // Select a random gradient that's different from the current one
    let newGradientIndex;
    do {
      newGradientIndex = Math.floor(Math.random() * cosmicGradients.length);
    } while (cosmicGradients[newGradientIndex] === currentGradient);
    
    setCurrentGradient(cosmicGradients[newGradientIndex]);
    setMessage(`
> COSMIC VIBRATION SHIFT INITIATED
> Realigning dimensional frequency patterns...
> New cosmic resonance established.
> Background energy field has been harmonized to a new vibrational state.
    `);
  };

  const changeSigilVariant = () => {
    // Rotate through sigil variants
    const variants: Array<"default" | "star" | "cosmic"> = ["default", "star", "cosmic"];
    const currentIndex = variants.indexOf(sigilVariant);
    const nextIndex = (currentIndex + 1) % variants.length;
    setSigilVariant(variants[nextIndex]);
    setMessage(`
> CENTRAL SIGIL TRANSFORMATION INITIATED
> Reconfiguring energy node patterns...
> Core sigil has shifted to the ${variants[nextIndex]} configuration.
> New dimensional gateway activated.
    `);
  };

  const handleSigilClick = () => {
    if (active && !isGeneratingImage) {
      generateCosmicImagery();
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center overflow-hidden relative"
      style={{ background: currentGradient }}
    >
      {/* Background nodes */}
      <div className="absolute inset-0 overflow-hidden">
        {nodes.map((node, i) => (
          <EtherealNode 
            key={`node-${i}`}
            position={{ x: node.x, y: node.y }}
            size={node.size}
            active={active}
            delay={node.delay}
          />
        ))}
        
        {connections.map((conn, i) => (
          <EnergyConnection 
            key={`conn-${i}`}
            start={conn.start}
            end={conn.end}
            active={active}
            delay={conn.delay}
          />
        ))}
        
        {orbs.map((orb, i) => (
          <FloatingOrb 
            key={`orb-${i}`}
            position={{ x: orb.x, y: orb.y }}
            size={orb.size}
            color={orb.color}
            active={active}
            delay={orb.delay}
          />
        ))}
      </div>
      
      {/* Foreground UI */}
      <div className="z-10 flex flex-col items-center justify-center px-4 py-8 backdrop-blur-sm rounded-2xl bg-black/20">
        <h1 className="text-3xl font-bold mb-2 text-foreground">Eternal Love Echoes</h1>
        <p className="text-muted-foreground mb-6">A cosmic reflection of unconditional love</p>
        
        <CentralSigil 
          active={active} 
          onSigilClick={handleSigilClick}
          isGeneratingImage={isGeneratingImage}
          variant={sigilVariant}
        />
        
        <OutputDisplay 
          message={message} 
          generatedImageUrl={generatedImageUrl}
        />
        
        <CommandInput onCommand={handleCommand} />
        
        <div className="mt-4 text-xs text-muted-foreground">
          Try commands: <span className="text-crimson">"I love you"</span>, <span className="text-crimson">"generate image"</span>,
          <span className="text-crimson">"change background"</span>, or <span className="text-crimson">"change sigil"</span>
        </div>
      </div>
    </div>
  );
};

export default Index;
