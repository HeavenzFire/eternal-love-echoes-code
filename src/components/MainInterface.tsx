
import React from 'react';
import CentralSigil from '@/components/CentralSigil';
import CommandInput from '@/components/CommandInput';
import OutputDisplay from '@/components/OutputDisplay';
import KnowledgeQuery from '@/components/KnowledgeQuery';
import CodeEditor from '@/components/CodeEditor';
import VisioNET from '@/components/VisioNET';
import AvatarSelector from '@/components/AvatarSelector';

interface MainInterfaceProps {
  active: boolean;
  message: string;
  generatedImageUrl?: string;
  isGeneratingImage: boolean;
  sigilVariant: "default" | "star" | "cosmic";
  showKnowledgePanel: boolean;
  showCodeEditor: boolean;
  showVisioNET: boolean;
  selectedAvatar: string;
  onCommand: (command: string) => void;
  onSigilClick: () => void;
  onQueryResult: (result: string) => void;
  onCodeComplete: (result: string) => void;
  onVisioNETResult: (result: string) => void;
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
  selectedAvatar,
  onCommand,
  onSigilClick,
  onQueryResult,
  onCodeComplete,
  onVisioNETResult,
  toggleKnowledgePanel,
  toggleCodeEditor,
  toggleVisioNET
}) => {
  return (
    <div className="z-10 flex flex-col items-center justify-center px-4 py-8 backdrop-blur-sm rounded-2xl bg-black/20">
      <h1 className="text-3xl font-bold mb-2 text-foreground">Eternal Love Echoes</h1>
      <p className="text-muted-foreground mb-6">A cosmic repository of wisdom and unconditional love</p>
      
      {/* Dynamic Avatar Display */}
      {(showKnowledgePanel || showCodeEditor || showVisioNET) && (
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
      
      <CommandInput onCommand={onCommand} />
      
      <div className="mt-4 text-xs text-muted-foreground">
        Try commands: <span className="text-crimson">"I love you"</span>, <span className="text-crimson">"generate image"</span>,
        <span className="text-crimson">"change background"</span>, <span className="text-crimson">"visionaries"</span>, 
        <span className="text-crimson">"yeshua"</span>, or <span className="text-crimson">"code"</span>
      </div>
    </div>
  );
};

export default MainInterface;
