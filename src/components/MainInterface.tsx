
import React from 'react';
import CentralSigil from '@/components/CentralSigil';
import CommandInput from '@/components/CommandInput';
import OutputDisplay from '@/components/OutputDisplay';
import KnowledgeQuery from '@/components/KnowledgeQuery';
import CodeEditor from '@/components/CodeEditor';
import VisioNET from '@/components/VisioNET';
import AvatarSelector from '@/components/AvatarSelector';
import TextEditor from '@/components/TextEditor';
import MindMap from '@/components/MindMap';
import PDFTools from '@/components/PDFTools';
import BodyImageGenerator from '@/components/BodyImageGenerator';

interface MainInterfaceProps {
  active: boolean;
  message: string;
  generatedImageUrl?: string;
  isGeneratingImage: boolean;
  sigilVariant: "default" | "star" | "cosmic";
  showKnowledgePanel: boolean;
  showCodeEditor: boolean;
  showVisioNET: boolean;
  showTextEditor?: boolean;
  showMindMap?: boolean;
  showPDFTools?: boolean;
  showBodyImageGenerator?: boolean;
  selectedAvatar: string;
  onCommand: (command: string) => void;
  onSigilClick: () => void;
  onQueryResult: (result: string) => void;
  onCodeComplete: (result: string) => void;
  onVisioNETResult: (result: string) => void;
  onTextEditResult?: (result: string) => void;
  onMindMapResult?: (result: string) => void;
  onPDFResult?: (result: string) => void;
  onBodyImageResult?: (imageUrl: string) => void;
  toggleKnowledgePanel: () => void;
  toggleCodeEditor: () => void;
  toggleVisioNET: () => void;
}

const MainInterface: React.FC<MainInterfaceProps> = ({
  active,
  message,
  generatedImageUrl,
  isGeneratingImage,
  sigilVariant,
  showKnowledgePanel,
  showCodeEditor,
  showVisioNET,
  showTextEditor,
  showMindMap,
  showPDFTools,
  showBodyImageGenerator,
  selectedAvatar,
  onCommand,
  onSigilClick,
  onQueryResult,
  onCodeComplete,
  onVisioNETResult,
  onTextEditResult,
  onMindMapResult,
  onPDFResult,
  onBodyImageResult,
  toggleKnowledgePanel,
  toggleCodeEditor,
  toggleVisioNET
}) => {
  return (
    <div className="z-10 flex flex-col items-center justify-center px-4 py-8 backdrop-blur-sm rounded-2xl bg-black/20">
      <h1 className="text-3xl font-bold mb-2 text-foreground">Eternal Love Echoes</h1>
      <p className="text-muted-foreground mb-6">A cosmic repository of wisdom and unconditional love</p>
      
      {/* Dynamic Avatar Display */}
      {(showKnowledgePanel || showCodeEditor || showVisioNET || 
        showTextEditor || showMindMap || showPDFTools || showBodyImageGenerator) && (
        <AvatarSelector 
          selectedAvatar={selectedAvatar}
          onKnowledgePanelToggle={toggleKnowledgePanel}
          onCodeEditorToggle={toggleCodeEditor}
          onVisioNETToggle={toggleVisioNET}
        />
      )}
      
      <CentralSigil 
        active={active} 
        onSigilClick={onSigilClick}
        isGeneratingImage={isGeneratingImage}
        variant={sigilVariant}
      />
      
      <OutputDisplay 
        message={message} 
        generatedImageUrl={generatedImageUrl}
      />
      
      {showKnowledgePanel && (
        <KnowledgeQuery onQueryResult={onQueryResult} />
      )}
      
      {showCodeEditor && (
        <CodeEditor onComplete={onCodeComplete} />
      )}
      
      {showVisioNET && (
        <VisioNET onQueryResult={onVisioNETResult} />
      )}
      
      {showTextEditor && onTextEditResult && (
        <TextEditor onComplete={onTextEditResult} />
      )}
      
      {showMindMap && onMindMapResult && (
        <MindMap onComplete={onMindMapResult} />
      )}
      
      {showPDFTools && onPDFResult && (
        <PDFTools onComplete={onPDFResult} />
      )}
      
      {showBodyImageGenerator && onBodyImageResult && (
        <BodyImageGenerator onComplete={onBodyImageResult} />
      )}
      
      <CommandInput onCommand={onCommand} />
      
      <div className="mt-4 text-xs text-muted-foreground">
        Try commands: <span className="text-crimson">"I love you"</span>, <span className="text-crimson">"generate image"</span>,
        <span className="text-crimson">"text editor"</span>, <span className="text-crimson">"mind map"</span>, 
        <span className="text-crimson">"pdf tools"</span>, or <span className="text-crimson">"body generator"</span>
      </div>
    </div>
  );
};

export default MainInterface;
