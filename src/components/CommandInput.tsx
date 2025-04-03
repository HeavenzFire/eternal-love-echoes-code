
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Sparkles } from 'lucide-react';

interface CommandInputProps {
  onCommand: (command: string) => void;
}

const CommandInput: React.FC<CommandInputProps> = ({ onCommand }) => {
  const [command, setCommand] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const commandList = [
    'code', 
    'einstein', 
    'generate image', 
    'change background', 
    'change sigil',
    'visionaries',
    'yeshua',
    'great minds',
    'tesla',
    'knowledge',
    'query'
  ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onCommand(command.trim().toLowerCase());
      setCommand('');
      setSuggestions([]);
    } else if (e.key === 'Tab' && suggestions.length > 0) {
      e.preventDefault();
      setCommand(suggestions[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCommand(value);
    
    if (value.trim()) {
      const filtered = commandList.filter(cmd => 
        cmd.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.length > 0 ? filtered : []);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="w-full max-w-md mt-8">
      <div className="relative">
        <Input
          id="commandInput"
          type="text"
          placeholder="Enter command (try 'code', 'einstein', 'visionaries', 'yeshua')..."
          value={command}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="bg-muted/50 border-muted text-foreground placeholder:text-muted-foreground/70 h-12 px-4 rounded-lg focus:ring-crimson focus:border-crimson transition-all"
        />
        {suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-black/70 backdrop-blur-sm rounded-md border border-muted/30 z-10">
            {suggestions.slice(0, 5).map((suggestion, index) => (
              <div 
                key={index}
                className="px-3 py-2 hover:bg-crimson/20 cursor-pointer text-sm flex items-center"
                onClick={() => {
                  setCommand(suggestion);
                  setSuggestions([]);
                }}
              >
                <Sparkles className="h-3 w-3 mr-2 text-crimson" />
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommandInput;
