
import React, { useState } from 'react';
import { Search, Book, Brain } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface KnowledgeItem {
  key: string;
  value: string;
  category: string;
}

interface KnowledgeQueryProps {
  onQueryResult?: (result: string) => void;
}

const KNOWLEDGE_BASE: KnowledgeItem[] = [
  { 
    key: "black hole", 
    value: "Black hole formation occurs when massive stars collapse under their own gravity.",
    category: "astronomy"
  },
  { 
    key: "renaissance", 
    value: "Renaissance art emphasizes realism and human emotion.",
    category: "art"
  },
  { 
    key: "blockchain", 
    value: "Blockchain technology can revolutionize renewable energy distribution.",
    category: "technology"
  },
  { 
    key: "quantum", 
    value: "Quantum computing explores the principles of quantum mechanics to perform computations.",
    category: "science"
  },
  { 
    key: "universe", 
    value: "The universe is expanding at an accelerating rate, driven by dark energy.",
    category: "astronomy"
  },
  { 
    key: "cosmic", 
    value: "Cosmic background radiation is the thermal radiation left over from the Big Bang.",
    category: "astronomy"
  },
  { 
    key: "love", 
    value: "Love is a cosmic force that connects all conscious beings across space and time.",
    category: "philosophy"
  }
];

const KnowledgeQuery: React.FC<KnowledgeQueryProps> = ({ onQueryResult }) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);

  const handleQuerySubmit = () => {
    if (!query.trim()) return;

    setSearching(true);
    setResult(null);

    // Simulate processing time
    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      const matchingItems = KNOWLEDGE_BASE.filter(
        item => item.key.toLowerCase().includes(lowerQuery) || 
               item.value.toLowerCase().includes(lowerQuery)
      );

      if (matchingItems.length > 0) {
        const foundResult = matchingItems[0].value;
        setResult(foundResult);
        if (onQueryResult) onQueryResult(foundResult);
      } else {
        const noResult = "No relevant information found in the knowledge repository.";
        setResult(noResult);
        if (onQueryResult) onQueryResult(noResult);
      }

      setSearching(false);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleQuerySubmit();
    }
  };

  return (
    <div className="w-full max-w-md mt-4 p-4 rounded-lg bg-muted/20 backdrop-blur-sm">
      <div className="flex items-center mb-3">
        <Book className="h-5 w-5 mr-2 text-muted-foreground" />
        <h3 className="text-sm font-medium">Knowledge Repository</h3>
      </div>
      
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Query the cosmic knowledge..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pr-8 bg-muted/30"
          />
          {searching && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <Brain className="h-4 w-4 animate-pulse text-crimson" />
            </div>
          )}
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={handleQuerySubmit}
          className="border-crimson/30 hover:bg-crimson/20 text-xs"
        >
          <Search className="h-4 w-4 mr-1" />
          Query
        </Button>
      </div>
      
      {result && (
        <div className="mt-3 text-sm p-3 rounded bg-black/20 text-muted-foreground animate-fade-in">
          {result}
        </div>
      )}
    </div>
  );
};

export default KnowledgeQuery;
