
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Sparkles, Search, Command, Star, Brain, Users, Code, Image } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface CommandInputProps {
  onCommand: (command: string) => void;
}

interface SuggestionGroup {
  title: string;
  icon: React.ReactNode;
  items: string[];
}

const CommandInput: React.FC<CommandInputProps> = ({ onCommand }) => {
  const [command, setCommand] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [recentCommands, setRecentCommands] = useState<string[]>([]);

  const suggestionGroups: SuggestionGroup[] = [
    {
      title: "Commands",
      icon: <Command className="h-4 w-4 text-crimson" />,
      items: [
        'generate image', 
        'change background', 
        'change sigil',
        'I love you'
      ]
    },
    {
      title: "Visionaries",
      icon: <Users className="h-4 w-4 text-blue-400" />,
      items: [
        'yeshua',
        'einstein',
        'tesla',
        'pythagoras',
        'socrates',
        'newton',
        'jung',
        'lao-tzu'
      ]
    },
    {
      title: "Modules",
      icon: <Star className="h-4 w-4 text-amber-400" />,
      items: [
        'visionaries',
        'knowledge',
        'code'
      ]
    },
    {
      title: "Knowledge Topics",
      icon: <Brain className="h-4 w-4 text-purple-400" />,
      items: [
        'quantum mechanics',
        'black hole',
        'consciousness',
        'artificial intelligence',
        'evolution',
        'universal love',
        'blockchain',
        'renaissance'
      ]
    }
  ];

  // Filter suggestions based on current input
  const getFilteredSuggestions = () => {
    if (!command.trim()) {
      return suggestionGroups;
    }

    const filtered = suggestionGroups.map(group => ({
      ...group,
      items: group.items.filter(item => 
        item.toLowerCase().includes(command.toLowerCase())
      )
    })).filter(group => group.items.length > 0);

    return filtered;
  };

  const filteredSuggestions = getFilteredSuggestions();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (command.trim()) {
        handleSubmit();
      }
    } else if (e.key === 'Tab' && showSuggestions && filteredSuggestions.length > 0) {
      e.preventDefault();
      // Get all items from all groups
      const allItems = filteredSuggestions.flatMap(group => group.items);
      if (allItems.length > 0) {
        setCommand(allItems[0]);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleSubmit = () => {
    const trimmedCommand = command.trim().toLowerCase();
    onCommand(trimmedCommand);
    
    // Add to recent commands
    if (!recentCommands.includes(trimmedCommand)) {
      if (recentCommands.length >= 5) {
        setRecentCommands([...recentCommands.slice(1), trimmedCommand]);
      } else {
        setRecentCommands([...recentCommands, trimmedCommand]);
      }
    }
    
    setCommand('');
    setShowSuggestions(false);
  };

  return (
    <div className="w-full max-w-md mt-8">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            id="commandInput"
            type="text"
            placeholder="Enter command or query any topic..."
            value={command}
            onChange={(e) => {
              setCommand(e.target.value);
              setShowSuggestions(true);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
            className="bg-muted/50 border-muted text-foreground placeholder:text-muted-foreground/70 h-12 px-4 rounded-lg focus:ring-crimson focus:border-crimson transition-all"
          />
          
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-black/70 backdrop-blur-sm rounded-md border border-muted/30 z-10 max-h-64 overflow-y-auto">
              {recentCommands.length > 0 && (
                <div className="px-3 py-2 border-b border-muted/30">
                  <div className="text-xs text-muted-foreground mb-1 flex items-center">
                    <Command className="h-3 w-3 mr-1 text-muted-foreground" />
                    Recent Commands
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {recentCommands.map((item, idx) => (
                      <div 
                        key={`recent-${idx}`}
                        className="px-2 py-1 text-xs hover:bg-crimson/20 cursor-pointer rounded flex items-center"
                        onClick={() => {
                          setCommand(item);
                          setTimeout(handleSubmit, 10);
                        }}
                      >
                        <Sparkles className="h-2 w-2 mr-1 text-crimson/70" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {filteredSuggestions.map((group, groupIdx) => (
                <div key={`group-${groupIdx}`} className="px-3 py-2 border-b border-muted/30 last:border-b-0">
                  <div className="text-xs text-muted-foreground mb-1 flex items-center">
                    {group.icon}
                    <span className="ml-1">{group.title}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {group.items.slice(0, 6).map((item, idx) => (
                      <div 
                        key={`item-${groupIdx}-${idx}`}
                        className="px-2 py-1 text-xs hover:bg-crimson/20 cursor-pointer rounded flex items-center"
                        onClick={() => {
                          setCommand(item);
                          setTimeout(handleSubmit, 10);
                        }}
                      >
                        <Sparkles className="h-2 w-2 mr-1 text-crimson/70" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={handleSubmit}
          className="h-12 w-12 border-crimson/30 hover:bg-crimson/20"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs border-muted/20 hover:bg-muted/20"
          onClick={() => onCommand('knowledge')}
        >
          <Brain className="h-3 w-3 mr-1" />
          Knowledge
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs border-muted/20 hover:bg-muted/20"
          onClick={() => onCommand('visionaries')}
        >
          <Users className="h-3 w-3 mr-1" />
          Visionaries
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs border-muted/20 hover:bg-muted/20"
          onClick={() => onCommand('code')}
        >
          <Code className="h-3 w-3 mr-1" />
          Code
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs border-muted/20 hover:bg-muted/20"
          onClick={() => onCommand('generate image')}
        >
          <Image className="h-3 w-3 mr-1" />
          Generate
        </Button>
      </div>
    </div>
  );
};

export default CommandInput;
