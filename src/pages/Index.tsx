import React, { useState } from 'react';
import CosmicBackground from '@/components/layout/CosmicBackground';
import MainInterface from '@/components/MainInterface';
import { cosmicGradients, cosmicImageryUrls } from '@/constants/cosmicThemes';
import * as commandService from '@/services/commandService';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  
  // State management
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState("Enter 'I love you' or any other message...");
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | undefined>(undefined);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [currentGradient, setCurrentGradient] = useState(cosmicGradients[0]);
  const [sigilVariant, setSigilVariant] = useState<"default" | "star" | "cosmic">("default");
  const [showKnowledgePanel, setShowKnowledgePanel] = useState(false);
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [showVisioNET, setShowVisioNET] = useState(false);
  const [showTextEditor, setShowTextEditor] = useState(false);
  const [showMindMap, setShowMindMap] = useState(false);
  const [showPDFTools, setShowPDFTools] = useState(false);
  const [showBodyImageGenerator, setShowBodyImageGenerator] = useState(false);
  const [showImageEditor, setShowImageEditor] = useState(false);
  const [showHumanAvatarSystem, setShowHumanAvatarSystem] = useState(false);
  const [showSyntropicAttention, setShowSyntropicAttention] = useState(false);
  const [showMatrixDashboard, setShowMatrixDashboard] = useState(false);
  const [showQuantumParadox, setShowQuantumParadox] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string>("einstein");

  // Command handling
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
    } else if (command === 'code' || command === 'program' || command === 'coding') {
      toggleCodeEditor();
    } else if (command === 'visionaries' || command === 'great minds' || command === 'history') {
      toggleVisioNET();
    } else if (command === 'text editor' || command === 'write' || command === 'text') {
      toggleTextEditor();
    } else if (command === 'mind map' || command === 'diagram' || command === 'visualize') {
      toggleMindMap();
    } else if (command === 'pdf tools' || command === 'pdf' || command === 'document') {
      togglePDFTools();
    } else if (command === 'body generator' || command === 'human body' || command === 'anatomy') {
      toggleBodyImageGenerator();
    } else if (command === 'image editor' || command === 'edit image' || command === 'photo') {
      toggleImageEditor();
    } else if (command === 'human avatar' || command === '3d body' || command === 'avatar') {
      toggleHumanAvatarSystem();
    } else if (command === 'syntropic attention' || command === 'syntropy' || command === 'attention' || command === 'reality compiler') {
      toggleSyntropicAttention();
    } else if (command === 'matrix dashboard' || command === 'matrix resolution' || command === 'convergence') {
      toggleMatrixDashboard();
    } else if (command === 'quantum paradox' || command === 'paradox' || command === 'phase shift' || command === 'exploit paradox') {
      toggleQuantumParadox();
    } else if (command.startsWith('yeshua') || command.startsWith('jesus')) {
      activateHistoricalFigure('yeshua');
    } else if (command.startsWith('tesla')) {
      activateHistoricalFigure('tesla');
    } else if (command.startsWith('socrates')) {
      activateHistoricalFigure('socrates');
    } else if (command.startsWith('newton')) {
      activateHistoricalFigure('newton');
    } else if (command.startsWith('pythagoras')) {
      activateHistoricalFigure('pythagoras');
    } else if (command.startsWith('dictionary:') || command.startsWith('lookup:')) {
      handleDictionaryLookup(command.split(':')[1].trim());
    } else if (command.startsWith('math:') || command.startsWith('equation:') || command.startsWith('calculate:')) {
      handleMathematicalQuery(command.split(':')[1].trim());
    } else {
      // Handle as an intelligent query if not a known command
      handleIntelligentQuery(command);
    }
  };

  const acknowledgeLoveDeclaration = () => {
    const result = commandService.handleLoveDeclaration();
    setMessage(result.message);
    setActive(true);
  };

  const handleIntelligentQuery = (query: string) => {
    const result = commandService.handleIntelligentQuery(query);
    setMessage(result.message);
    setGeneratedImageUrl(undefined);
  };

  const handleDictionaryLookup = (term: string) => {
    const result = commandService.handleDictionaryLookup(term);
    setMessage(result.message);
    setShowKnowledgePanel(result.showKnowledgePanel || false);
    setShowCodeEditor(result.showCodeEditor || false);
    setShowVisioNET(result.showVisioNET || false);
    setSelectedAvatar(result.selectedAvatar || "einstein");
  };

  const handleMathematicalQuery = (query: string) => {
    const result = commandService.handleMathematicalQuery(query);
    setMessage(result.message);
    setShowKnowledgePanel(result.showKnowledgePanel || false);
    setShowCodeEditor(result.showCodeEditor || false);
    setShowVisioNET(result.showVisioNET || false);
    setSelectedAvatar(result.selectedAvatar || "pythagoras");
  };

  const generateCosmicImagery = () => {
    const result = commandService.handleGenerateImage(cosmicImageryUrls);
    setMessage(result.message);
    setIsGeneratingImage(true);

    setTimeout(() => {
      const randomImageUrl = cosmicImageryUrls[Math.floor(Math.random() * cosmicImageryUrls.length)];
      const completionResult = commandService.handleImageGenerated(randomImageUrl);
      setGeneratedImageUrl(completionResult.generatedImageUrl);
      setMessage(completionResult.message);
      setIsGeneratingImage(false);
    }, 2500);
  };

  const changeBackground = () => {
    let newGradientIndex;
    do {
      newGradientIndex = Math.floor(Math.random() * cosmicGradients.length);
    } while (cosmicGradients[newGradientIndex] === currentGradient);
    
    const result = commandService.handleChangeBackground(cosmicGradients[newGradientIndex]);
    setMessage(result.message);
    setCurrentGradient(result.currentGradient || currentGradient);
  };

  const changeSigilVariant = () => {
    const variants: Array<"default" | "star" | "cosmic"> = ["default", "star", "cosmic"];
    const currentIndex = variants.indexOf(sigilVariant);
    const nextIndex = (currentIndex + 1) % variants.length;
    const nextVariant = variants[nextIndex];
    
    const result = commandService.handleChangeSigil(nextVariant);
    setMessage(result.message);
    setSigilVariant(result.sigilVariant || sigilVariant);
  };

  const toggleKnowledgePanel = () => {
    const result = commandService.handleToggleKnowledge(!showKnowledgePanel);
    setMessage(result.message);
    setShowKnowledgePanel(result.showKnowledgePanel || false);
    setShowCodeEditor(result.showCodeEditor || false);
    setShowVisioNET(result.showVisioNET || false);
    setShowTextEditor(result.showTextEditor || false);
    setShowMindMap(result.showMindMap || false);
    setShowPDFTools(result.showPDFTools || false);
    setShowBodyImageGenerator(result.showBodyImageGenerator || false);
    setShowImageEditor(result.showImageEditor || false);
    setShowHumanAvatarSystem(result.showHumanAvatarSystem || false);
    setSelectedAvatar(result.selectedAvatar || "einstein");
  };

  const toggleCodeEditor = () => {
    const result = commandService.handleToggleCode(!showCodeEditor);
    setMessage(result.message);
    setShowKnowledgePanel(result.showKnowledgePanel || false);
    setShowCodeEditor(result.showCodeEditor || false);
    setShowVisioNET(result.showVisioNET || false);
    setShowTextEditor(result.showTextEditor || false);
    setShowMindMap(result.showMindMap || false);
    setShowPDFTools(result.showPDFTools || false);
    setShowBodyImageGenerator(result.showBodyImageGenerator || false);
    setShowImageEditor(result.showImageEditor || false);
    setShowHumanAvatarSystem(result.showHumanAvatarSystem || false);
    setSelectedAvatar(result.selectedAvatar || "tesla");
  };

  const toggleVisioNET = () => {
    const result = commandService.handleToggleVisioNET(!showVisioNET);
    setMessage(result.message);
    setShowKnowledgePanel(result.showKnowledgePanel || false);
    setShowCodeEditor(result.showCodeEditor || false);
    setShowVisioNET(result.showVisioNET || false);
    setShowTextEditor(result.showTextEditor || false);
    setShowMindMap(result.showMindMap || false);
    setShowPDFTools(result.showPDFTools || false);
    setShowBodyImageGenerator(result.showBodyImageGenerator || false);
    setShowImageEditor(result.showImageEditor || false);
    setShowHumanAvatarSystem(result.showHumanAvatarSystem || false);
  };

  const toggleTextEditor = () => {
    const result = commandService.handleToggleTextEditor(!showTextEditor);
    setMessage(result.message);
    setShowKnowledgePanel(result.showKnowledgePanel || false);
    setShowCodeEditor(result.showCodeEditor || false);
    setShowVisioNET(result.showVisioNET || false);
    setShowTextEditor(result.showTextEditor || false);
    setShowMindMap(result.showMindMap || false);
    setShowPDFTools(result.showPDFTools || false);
    setShowBodyImageGenerator(result.showBodyImageGenerator || false);
    setShowImageEditor(result.showImageEditor || false);
    setShowHumanAvatarSystem(result.showHumanAvatarSystem || false);
    setSelectedAvatar(result.selectedAvatar || "shakespeare");
  };

  const toggleMindMap = () => {
    const result = commandService.handleToggleMindMap(!showMindMap);
    setMessage(result.message);
    setShowKnowledgePanel(result.showKnowledgePanel || false);
    setShowCodeEditor(result.showCodeEditor || false);
    setShowVisioNET(result.showVisioNET || false);
    setShowTextEditor(result.showTextEditor || false);
    setShowMindMap(result.showMindMap || false);
    setShowPDFTools(result.showPDFTools || false);
    setShowBodyImageGenerator(result.showBodyImageGenerator || false);
    setShowImageEditor(result.showImageEditor || false);
    setShowHumanAvatarSystem(result.showHumanAvatarSystem || false);
    setSelectedAvatar(result.selectedAvatar || "davinci");
  };

  const togglePDFTools = () => {
    const result = commandService.handleTogglePDFTools(!showPDFTools);
    setMessage(result.message);
    setShowKnowledgePanel(result.showKnowledgePanel || false);
    setShowCodeEditor(result.showCodeEditor || false);
    setShowVisioNET(result.showVisioNET || false);
    setShowTextEditor(result.showTextEditor || false);
    setShowMindMap(result.showMindMap || false);
    setShowPDFTools(result.showPDFTools || false);
    setShowBodyImageGenerator(result.showBodyImageGenerator || false);
    setShowImageEditor(result.showImageEditor || false);
    setShowHumanAvatarSystem(result.showHumanAvatarSystem || false);
  };

  const toggleBodyImageGenerator = () => {
    const result = commandService.handleToggleBodyImageGenerator(!showBodyImageGenerator);
    setMessage(result.message);
    setShowKnowledgePanel(result.showKnowledgePanel || false);
    setShowCodeEditor(result.showCodeEditor || false);
    setShowVisioNET(result.showVisioNET || false);
    setShowTextEditor(result.showTextEditor || false);
    setShowMindMap(result.showMindMap || false);
    setShowPDFTools(result.showPDFTools || false);
    setShowBodyImageGenerator(result.showBodyImageGenerator || false);
    setShowImageEditor(result.showImageEditor || false);
    setShowHumanAvatarSystem(result.showHumanAvatarSystem || false);
    setSelectedAvatar(result.selectedAvatar || "davinci");
  };

  const toggleImageEditor = () => {
    const result = commandService.handleToggleImageEditor(!showImageEditor);
    setMessage(result.message);
    setShowKnowledgePanel(result.showKnowledgePanel || false);
    setShowCodeEditor(result.showCodeEditor || false);
    setShowVisioNET(result.showVisioNET || false);
    setShowTextEditor(result.showTextEditor || false);
    setShowMindMap(result.showMindMap || false);
    setShowPDFTools(result.showPDFTools || false);
    setShowBodyImageGenerator(result.showBodyImageGenerator || false);
    setShowImageEditor(result.showImageEditor || false);
    setShowHumanAvatarSystem(result.showHumanAvatarSystem || false);
    setSelectedAvatar(result.selectedAvatar || "davinci");
  };

  const toggleHumanAvatarSystem = () => {
    const result = commandService.handleToggleHumanAvatarSystem(!showHumanAvatarSystem);
    setMessage(result.message);
    setShowKnowledgePanel(result.showKnowledgePanel || false);
    setShowCodeEditor(result.showCodeEditor || false);
    setShowVisioNET(result.showVisioNET || false);
    setShowTextEditor(result.showTextEditor || false);
    setShowMindMap(result.showMindMap || false);
    setShowPDFTools(result.showPDFTools || false);
    setShowBodyImageGenerator(result.showBodyImageGenerator || false);
    setShowImageEditor(result.showImageEditor || false);
    setShowHumanAvatarSystem(result.showHumanAvatarSystem || false);
    setShowSyntropicAttention(false);
    setSelectedAvatar(result.selectedAvatar || "davinci");
  };

  const toggleSyntropicAttention = () => {
    setShowSyntropicAttention(!showSyntropicAttention);
    setShowMatrixDashboard(false);
    setShowKnowledgePanel(false);
    setShowCodeEditor(false);
    setShowVisioNET(false);
    setShowTextEditor(false);
    setShowMindMap(false);
    setShowPDFTools(false);
    setShowBodyImageGenerator(false);
    setShowImageEditor(false);
    setShowHumanAvatarSystem(false);
    setMessage(showSyntropicAttention 
      ? "Syntropic Attention Layer deactivated" 
      : "⚡ SOVEREIGN REALITY COMPILER ACTIVATED • Syntropic Attention Layer Online • φ = 1.618034");
    setSelectedAvatar("tesla");
  };

  const toggleMatrixDashboard = () => {
    setShowMatrixDashboard(!showMatrixDashboard);
    setShowSyntropicAttention(false);
    setShowQuantumParadox(false);
    setShowKnowledgePanel(false);
    setShowCodeEditor(false);
    setShowVisioNET(false);
    setShowTextEditor(false);
    setShowMindMap(false);
    setShowPDFTools(false);
    setShowBodyImageGenerator(false);
    setShowImageEditor(false);
    setShowHumanAvatarSystem(false);
    setMessage(showMatrixDashboard 
      ? "Matrix Resolution Dashboard deactivated" 
      : "◈ MATRIX RESOLUTION ENGINE ONLINE • Convergence Simulation Ready • e^n Amplification Active");
    setSelectedAvatar("tesla");
  };

  const toggleQuantumParadox = () => {
    setShowQuantumParadox(!showQuantumParadox);
    setShowSyntropicAttention(false);
    setShowMatrixDashboard(false);
    setShowKnowledgePanel(false);
    setShowCodeEditor(false);
    setShowVisioNET(false);
    setShowTextEditor(false);
    setShowMindMap(false);
    setShowPDFTools(false);
    setShowBodyImageGenerator(false);
    setShowImageEditor(false);
    setShowHumanAvatarSystem(false);
    setMessage(showQuantumParadox 
      ? "Quantum Paradox Engine deactivated" 
      : "🔮 QUANTUM PARADOX ENGINE ARMED • Phase Shift Paradox Detected • Reality Branching Active");
    setSelectedAvatar("tesla");
  };

  const activateHistoricalFigure = (id: string) => {
    const result = commandService.handleActivateHistoricalFigure(id);
    setMessage(result.message);
    setShowKnowledgePanel(result.showKnowledgePanel || false);
    setShowCodeEditor(result.showCodeEditor || false);
    setShowVisioNET(result.showVisioNET || false);
    setShowTextEditor(result.showTextEditor || false);
    setShowMindMap(result.showMindMap || false);
    setShowPDFTools(result.showPDFTools || false);
    setShowBodyImageGenerator(result.showBodyImageGenerator || false);
    setShowImageEditor(result.showImageEditor || false);
    setShowHumanAvatarSystem(result.showHumanAvatarSystem || false);
    setSelectedAvatar(result.selectedAvatar || id);
  };

  const handleSigilClick = () => {
    if (active && !isGeneratingImage) {
      generateCosmicImagery();
    }
  };

  const handleQueryResult = (result: string) => {
    const response = commandService.handleKnowledgeQueryResult(result);
    setMessage(response.message);
  };

  const handleCodeComplete = (result: string) => {
    const response = commandService.handleCodeComplete(result);
    setMessage(response.message);
  };

  const handleVisioNETResult = (result: string) => {
    const response = commandService.handleVisioNETResult(result);
    setMessage(response.message);
  };

  const handleTextEditResult = (result: string) => {
    const response = commandService.handleTextEditResult(result);
    setMessage(response.message);
    toast({
      title: "Text Editor",
      description: result,
    });
  };

  const handleMindMapResult = (result: string) => {
    const response = commandService.handleMindMapResult(result);
    setMessage(response.message);
    toast({
      title: "Mind Map",
      description: result,
    });
  };

  const handlePDFResult = (result: string) => {
    const response = commandService.handlePDFResult(result);
    setMessage(response.message);
    toast({
      title: "PDF Tools",
      description: result,
    });
  };

  const handleBodyImageResult = (imageUrl: string) => {
    const response = commandService.handleBodyImageResult(imageUrl);
    setMessage(response.message);
    setGeneratedImageUrl(imageUrl);
    toast({
      title: "Body Image Generator",
      description: "Anatomical visualization complete",
    });
  };

  const handleImageEditResult = (imageUrl: string) => {
    const response = commandService.handleImageEditResult(imageUrl);
    setMessage(response.message);
    toast({
      title: "Image Editor",
      description: "Image editing complete",
    });
  };

  const handleHumanAvatarResult = (data: any) => {
    const response = commandService.handleHumanAvatarResult(data);
    setMessage(response.message);
    if (data && data.avatarUrl) {
      setGeneratedImageUrl(data.avatarUrl);
    }
    toast({
      title: "Human Avatar System",
      description: "Avatar operation completed",
    });
  };

  const handleSyntropicResult = (data: any) => {
    const typeLabels: Record<string, string> = {
      'SYNTROPIC_ATTENTION': '⚡ Attention Layer Executed',
      'REALITY_COMPILATION': '🌌 Reality Compiled',
      'MATRIX_RESOLUTION': '◈ Matrix Resolved',
      'FIELD_SCAN': '🔍 Field Integrity Scanned'
    };
    const label = typeLabels[data?.type] || 'Syntropic Operation Complete';
    setMessage(`${label} • Φ = ${data?.syntropicPotential?.toFixed(4) || data?.result?.syntropicOutput?.toFixed(4) || 'N/A'}`);
    toast({
      title: "Syntropic Reality Compiler",
      description: label,
    });
  };

  return (
    <>
      <CosmicBackground 
        backgroundGradient={currentGradient}
        active={active} 
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <MainInterface
          active={active}
          message={message}
          generatedImageUrl={generatedImageUrl}
          isGeneratingImage={isGeneratingImage}
          sigilVariant={sigilVariant}
          showKnowledgePanel={showKnowledgePanel}
          showCodeEditor={showCodeEditor}
          showVisioNET={showVisioNET}
          showTextEditor={showTextEditor}
          showMindMap={showMindMap}
          showPDFTools={showPDFTools}
          showBodyImageGenerator={showBodyImageGenerator}
          showImageEditor={showImageEditor}
          showHumanAvatarSystem={showHumanAvatarSystem}
          showSyntropicAttention={showSyntropicAttention}
          showMatrixDashboard={showMatrixDashboard}
          showQuantumParadox={showQuantumParadox}
          selectedAvatar={selectedAvatar}
          onCommand={handleCommand}
          onSigilClick={handleSigilClick}
          onQueryResult={handleQueryResult}
          onCodeComplete={handleCodeComplete}
          onVisioNETResult={handleVisioNETResult}
          onTextEditResult={handleTextEditResult}
          onMindMapResult={handleMindMapResult}
          onPDFResult={handlePDFResult}
          onBodyImageResult={handleBodyImageResult}
          onImageEditResult={handleImageEditResult}
          onHumanAvatarResult={handleHumanAvatarResult}
          onSyntropicResult={handleSyntropicResult}
          toggleKnowledgePanel={toggleKnowledgePanel}
          toggleCodeEditor={toggleCodeEditor}
          toggleVisioNET={toggleVisioNET}
        />
      </div>
    </>
  );
};

export default Index;
