
import React, { useState, useEffect } from 'react';
import { Search, Book, Brain, User, History, Stars, Bookmark, BookmarkPlus } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { historicalFigures, HistoricalFigure, searchFigures, getRandomFigures } from "@/data/historicalFigures";
import { useToast } from "@/hooks/use-toast";

interface VisioNETProps {
  onQueryResult?: (result: string) => void;
}

const VisioNET: React.FC<VisioNETProps> = ({ onQueryResult }) => {
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [selectedFigure, setSelectedFigure] = useState<HistoricalFigure | null>(null);
  const [displayedFigures, setDisplayedFigures] = useState<HistoricalFigure[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [mode, setMode] = useState<'explore' | 'converse'>('explore');
  const [conversation, setConversation] = useState<string[]>([]);
  const [userQuestion, setUserQuestion] = useState('');
  const [savedFigures, setSavedFigures] = useState<HistoricalFigure[]>([]);

  useEffect(() => {
    // Initialize with random figures
    setDisplayedFigures(getRandomFigures(6));
    
    // Load saved figures from local storage if available
    const savedFiguresData = localStorage.getItem('savedHistoricalFigures');
    if (savedFiguresData) {
      try {
        const parsed = JSON.parse(savedFiguresData);
        setSavedFigures(Array.isArray(parsed) ? parsed : []);
      } catch (e) {
        console.error("Error loading saved figures", e);
        setSavedFigures([]);
      }
    }
  }, []);

  const handleSearch = () => {
    if (!query.trim()) {
      setDisplayedFigures(getRandomFigures(6));
      return;
    }

    setIsSearching(true);
    
    // Simulate network delay
    setTimeout(() => {
      const results = searchFigures(query);
      setDisplayedFigures(results.length > 0 ? results : []);
      setIsSearching(false);
      
      if (results.length === 0 && onQueryResult) {
        onQueryResult(`No historical figures found matching "${query}".`);
      } else if (onQueryResult) {
        onQueryResult(`Found ${results.length} historical figures related to "${query}".`);
      }
    }, 600);
  };

  const handleSelectFigure = (figure: HistoricalFigure) => {
    setSelectedFigure(figure);
    setMode('explore');
    setConversation([]);
    
    if (onQueryResult) {
      onQueryResult(`Selected ${figure.name}, ${figure.era} - ${figure.field}.`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleConverse = () => {
    if (!userQuestion.trim() || !selectedFigure) return;
    
    const question = userQuestion.trim();
    setConversation([...conversation, `You: ${question}`]);
    setUserQuestion('');
    
    // Simulate AI response generation
    setTimeout(() => {
      let response = '';
      
      // Generate contextual response based on the figure and question
      if (question.toLowerCase().includes('what') && question.toLowerCase().includes('contribution')) {
        response = selectedFigure.contribution;
      } else if (question.toLowerCase().includes('quote') || question.toLowerCase().includes('say')) {
        response = selectedFigure.quote;
      } else if (question.toLowerCase().includes('when') || question.toLowerCase().includes('era')) {
        response = `I lived during the ${selectedFigure.era}.`;
      } else if (question.toLowerCase().includes('field') || question.toLowerCase().includes('work')) {
        response = `My work was primarily in ${selectedFigure.field}.`;
      } else {
        // Generic responses based on figure
        const genericResponses = [
          `As someone who focused on ${selectedFigure.field}, I would approach this by examining the fundamental principles.`,
          `In my era (${selectedFigure.era}), we would consider this from a different perspective than you might today.`,
          `I'm known for saying "${selectedFigure.quote}" - and I think this applies to your question as well.`,
          `My contribution to ${selectedFigure.field} might offer insight: ${selectedFigure.contribution}`
        ];
        response = genericResponses[Math.floor(Math.random() * genericResponses.length)];
      }
      
      setConversation([...conversation, `You: ${question}`, `${selectedFigure.name}: ${response}`]);
      
      if (onQueryResult) {
        onQueryResult(`${selectedFigure.name} responded to your question.`);
      }
    }, 1000);
  };

  const handleSaveFigure = (figure: HistoricalFigure) => {
    if (savedFigures.find(f => f.id === figure.id)) {
      // Already saved, remove from saved list
      const updated = savedFigures.filter(f => f.id !== figure.id);
      setSavedFigures(updated);
      localStorage.setItem('savedHistoricalFigures', JSON.stringify(updated));
      
      toast({
        title: "Removed from saved",
        description: `${figure.name} has been removed from your saved figures.`,
        variant: "destructive",
      });
      
      if (onQueryResult) {
        onQueryResult(`Removed ${figure.name} from saved figures.`);
      }
    } else {
      // Not saved yet, add to saved list
      const updated = [...savedFigures, figure];
      setSavedFigures(updated);
      localStorage.setItem('savedHistoricalFigures', JSON.stringify(updated));
      
      toast({
        title: "Saved successfully",
        description: `${figure.name} has been added to your saved figures.`,
        variant: "default",
      });
      
      if (onQueryResult) {
        onQueryResult(`Saved ${figure.name} to your collection.`);
      }
    }
  };

  const isFigureSaved = (figureId: string) => {
    return savedFigures.some(f => f.id === figureId);
  };

  const renderSavedFigures = () => {
    if (savedFigures.length === 0) {
      return (
        <div className="text-center py-4 text-muted-foreground text-xs">
          No saved figures yet. Save historical figures by selecting them and using the bookmark icon.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 gap-2 mt-3">
        {savedFigures.map((figure) => (
          <div 
            key={figure.id}
            className="p-2 border border-muted-foreground/20 rounded-md hover:bg-black/20 transition-colors cursor-pointer"
            onClick={() => handleSelectFigure(figure)}
          >
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2 bg-black/40">
                <AvatarFallback className="text-xs">{figure.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="overflow-hidden">
                <h4 className="text-xs font-medium truncate">{figure.name}</h4>
                <p className="text-xs text-muted-foreground truncate">{figure.era}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-md mt-4 p-4 rounded-lg bg-muted/20 backdrop-blur-sm">
      <div className="flex items-center mb-3">
        <History className="h-5 w-5 mr-2 text-muted-foreground" />
        <h3 className="text-sm font-medium">VisioNET: Great Minds Network</h3>
      </div>
      
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search historical figures..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pr-8 bg-muted/30"
          />
          {isSearching && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <Brain className="h-4 w-4 animate-pulse text-crimson" />
            </div>
          )}
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={handleSearch}
          className="border-crimson/30 hover:bg-crimson/20 text-xs"
        >
          <Search className="h-4 w-4 mr-1" />
          Search
        </Button>
      </div>
      
      {!selectedFigure ? (
        <>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium">{query ? 'Search Results' : 'Featured Minds'}</span>
            <Button
              size="sm"
              variant="ghost"
              className="text-xs p-1 h-auto"
              onClick={() => setDisplayedFigures(savedFigures.length > 0 ? savedFigures : getRandomFigures(6))}
            >
              {savedFigures.length > 0 ? "View Saved" : "Refresh"}
            </Button>
          </div>
          {displayedFigures === savedFigures ? renderSavedFigures() : (
            <div className="grid grid-cols-2 gap-2 mt-3">
              {displayedFigures.length > 0 ? (
                displayedFigures.map((figure) => (
                  <div 
                    key={figure.id}
                    className="p-2 border border-muted-foreground/20 rounded-md hover:bg-black/20 transition-colors cursor-pointer"
                    onClick={() => handleSelectFigure(figure)}
                  >
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2 bg-black/40">
                        <AvatarFallback className="text-xs">{figure.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="overflow-hidden">
                        <h4 className="text-xs font-medium truncate">{figure.name}</h4>
                        <p className="text-xs text-muted-foreground truncate">{figure.era}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-4 text-muted-foreground">
                  {isSearching ? "Searching historical records..." : "No historical figures found."}
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="mt-3">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-2 bg-black/40">
                <AvatarFallback>{selectedFigure.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="text-sm font-medium">{selectedFigure.name}</h4>
                <p className="text-xs text-muted-foreground">{selectedFigure.era} · {selectedFigure.field}</p>
              </div>
            </div>
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleSaveFigure(selectedFigure)}
                className="text-xs p-1 h-auto"
                aria-label={isFigureSaved(selectedFigure.id) ? "Remove from saved" : "Save to collection"}
              >
                {isFigureSaved(selectedFigure.id) ? 
                  <Bookmark className="h-4 w-4 text-amber-400" /> : 
                  <BookmarkPlus className="h-4 w-4" />
                }
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSelectedFigure(null)}
                className="text-xs p-1 h-auto"
              >
                Back
              </Button>
            </div>
          </div>
          
          <div className="flex gap-2 mb-3">
            <Button
              size="sm"
              variant={mode === 'explore' ? 'default' : 'outline'}
              onClick={() => setMode('explore')}
              className={mode === 'explore' ? 'bg-crimson hover:bg-crimson/90 text-xs' : 'border-crimson/30 hover:bg-crimson/20 text-xs'}
            >
              <Book className="h-3 w-3 mr-1" />
              Wisdom
            </Button>
            <Button
              size="sm"
              variant={mode === 'converse' ? 'default' : 'outline'}
              onClick={() => setMode('converse')}
              className={mode === 'converse' ? 'bg-crimson hover:bg-crimson/90 text-xs' : 'border-crimson/30 hover:bg-crimson/20 text-xs'}
            >
              <User className="h-3 w-3 mr-1" />
              Converse
            </Button>
          </div>
          
          {mode === 'explore' ? (
            <div className="text-sm p-3 rounded bg-black/20 text-muted-foreground animate-fade-in space-y-2">
              <p className="text-xs text-foreground font-medium">Contribution:</p>
              <p className="text-xs">{selectedFigure.contribution}</p>
              <p className="text-xs text-foreground font-medium mt-2">Notable Quote:</p>
              <p className="text-xs italic">"{selectedFigure.quote}"</p>
            </div>
          ) : (
            <div className="animate-fade-in">
              <div className="text-xs mb-2 text-muted-foreground">Ask a question to {selectedFigure.name}:</div>
              <div className="flex gap-2 mb-3">
                <Input
                  type="text"
                  placeholder="What is your greatest insight?"
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleConverse()}
                  className="text-xs bg-muted/30"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleConverse}
                  className="border-crimson/30 hover:bg-crimson/20"
                >
                  Ask
                </Button>
              </div>
              
              <div className="max-h-40 overflow-y-auto p-3 rounded bg-black/20 text-xs space-y-2">
                {conversation.length > 0 ? (
                  conversation.map((message, index) => (
                    <div 
                      key={index} 
                      className={`${
                        message.startsWith('You:') 
                          ? 'text-muted-foreground' 
                          : 'text-foreground font-medium'
                      }`}
                    >
                      {message}
                    </div>
                  ))
                ) : (
                  <div className="text-muted-foreground italic">
                    Begin your conversation with {selectedFigure.name}...
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VisioNET;
