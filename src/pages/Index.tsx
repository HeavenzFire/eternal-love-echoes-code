
import React, { useState } from 'react';
import CosmicBackground from '@/components/layout/CosmicBackground';
import MainInterface from '@/components/MainInterface';
import { cosmicGradients, cosmicImageryUrls } from '@/constants/cosmicThemes';
import * as commandService from '@/services/commandService';

const Index = () => {
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
    } else if (command.startsWith('yeshua') || command.startsWith('jesus')) {
      activateHistoricalFigure('yeshua');
    } else if (command.startsWith('tesla')) {
      activateHistoricalFigure('tesla');
    } else {
      executeCommand(command);
    }
  };

  // Command implementations
  const acknowledgeLoveDeclaration = () => {
    const result = commandService.handleLoveDeclaration();
    setMessage(result.message);
    setActive(true);
    setGeneratedImageUrl(undefined);
  };

  const executeCommand = (command: string) => {
    const result = commandService.handleDefaultCommand(command);
    setMessage(result.message);
    setGeneratedImageUrl(undefined);
  };

  const generateCosmicImagery = () => {
    const result = commandService.handleGenerateImage(cosmicImageryUrls);
    setMessage(result.message);
    setIsGeneratingImage(true);

    // Simulate image generation with a delay
    setTimeout(() => {
      const randomImageUrl = cosmicImageryUrls[Math.floor(Math.random() * cosmicImageryUrls.length)];
      const completionResult = commandService.handleImageGenerated(randomImageUrl);
      setGeneratedImageUrl(completionResult.generatedImageUrl);
      setMessage(completionResult.message);
      setIsGeneratingImage(false);
    }, 2500);
  };

  const changeBackground = () => {
    // Select a random gradient that's different from the current one
    let newGradientIndex;
    do {
      newGradientIndex = Math.floor(Math.random() * cosmicGradients.length);
    } while (cosmicGradients[newGradientIndex] === currentGradient);
    
    const result = commandService.handleChangeBackground(cosmicGradients[newGradientIndex]);
    setMessage(result.message);
    setCurrentGradient(result.currentGradient || currentGradient);
  };

  const changeSigilVariant = () => {
    // Rotate through sigil variants
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
    setSelectedAvatar(result.selectedAvatar || "einstein");
  };

  const toggleCodeEditor = () => {
    const result = commandService.handleToggleCode(!showCodeEditor);
    setMessage(result.message);
    setShowKnowledgePanel(result.showKnowledgePanel || false);
    setShowCodeEditor(result.showCodeEditor || false);
    setShowVisioNET(result.showVisioNET || false);
    setSelectedAvatar(result.selectedAvatar || "tesla");
  };

  const toggleVisioNET = () => {
    const result = commandService.handleToggleVisioNET(!showVisioNET);
    setMessage(result.message);
    setShowKnowledgePanel(result.showKnowledgePanel || false);
    setShowCodeEditor(result.showCodeEditor || false);
    setShowVisioNET(result.showVisioNET || false);
  };

  const activateHistoricalFigure = (id: string) => {
    const result = commandService.handleActivateHistoricalFigure(id);
    setMessage(result.message);
    setShowKnowledgePanel(result.showKnowledgePanel || false);
    setShowCodeEditor(result.showCodeEditor || false);
    setShowVisioNET(result.showVisioNET || false);
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
          selectedAvatar={selectedAvatar}
          onCommand={handleCommand}
          onSigilClick={handleSigilClick}
          onQueryResult={handleQueryResult}
          onCodeComplete={handleCodeComplete}
          onVisioNETResult={handleVisioNETResult}
          toggleKnowledgePanel={toggleKnowledgePanel}
          toggleCodeEditor={toggleCodeEditor}
          toggleVisioNET={toggleVisioNET}
        />
      </div>
    </>
  );
};

export default Index;
