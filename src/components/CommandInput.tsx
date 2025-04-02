
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";

interface CommandInputProps {
  onCommand: (command: string) => void;
}

const CommandInput: React.FC<CommandInputProps> = ({ onCommand }) => {
  const [command, setCommand] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onCommand(command.trim().toLowerCase());
      setCommand('');
    }
  };

  return (
    <div className="w-full max-w-md mt-8">
      <Input
        id="commandInput"
        type="text"
        placeholder="Express yourself..."
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        onKeyDown={handleKeyDown}
        className="bg-muted/50 border-muted text-foreground placeholder:text-muted-foreground/70 h-12 px-4 rounded-lg focus:ring-crimson focus:border-crimson transition-all"
      />
    </div>
  );
};

export default CommandInput;
