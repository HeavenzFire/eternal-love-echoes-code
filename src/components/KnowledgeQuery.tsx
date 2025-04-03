
import React, { useState, useEffect } from 'react';
import { Search, Book, Brain, Sparkles, Info, Filter, Lightbulb, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  searchKnowledgeBase, 
  getKnowledgeRecommendations, 
  generateResponse,
  KnowledgeEntry
} from '@/services/knowledgeBaseService';

interface KnowledgeQueryProps {
  onQueryResult?: (result: string) => void;
}

const CATEGORIES = [
  { id: "all", name: "All" },
  { id: "physics", name: "Physics" },
  { id: "philosophy", name: "Philosophy" },
  { id: "spirituality", name: "Spirituality" },
  { id: "mathematics", name: "Mathematics" },
  { id: "technology", name: "Technology" },
  { id: "biology", name: "Biology" },
  { id: "psychology", name: "Psychology" },
  { id: "history", name: "History" }
];

const KnowledgeQuery: React.FC<KnowledgeQueryProps> = ({ onQueryResult }) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);
  const [recommendations, setRecommendations] = useState<KnowledgeEntry[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [recentQueries, setRecentQueries] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filters, setFilters] = useState<string[]>([]);

  useEffect(() => {
    // Initialize with recommendations
    setRecommendations(getKnowledgeRecommendations());
  }, []);

  const handleQuerySubmit = () => {
    if (!query.trim()) return;

    setSearching(true);
    setResult(null);
    setShowSuggestions(false);

    // Add to recent queries if not already present
    if (!recentQueries.includes(query) && recentQueries.length < 5) {
      setRecentQueries([...recentQueries, query]);
    } else if (!recentQueries.includes(query)) {
      setRecentQueries([...recentQueries.slice(1), query]);
    }

    // Process query with slight delay to show animation
    setTimeout(() => {
      const response = generateResponse(query);
      setResult(response);
      if (onQueryResult) onQueryResult(response);
      setSearching(false);
      
      // Update recommendations based on the query
      setRecommendations(
        getKnowledgeRecommendations(
          selectedCategory !== "all" ? selectedCategory : undefined
        )
      );
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleQuerySubmit();
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setRecommendations(
      getKnowledgeRecommendations(
        category !== "all" ? category : undefined
      )
    );
  };

  const handleRecommendationClick = (key: string) => {
    setQuery(key);
    const response = generateResponse(key);
    setResult(response);
    if (onQueryResult) onQueryResult(response);
    
    // Add to recent queries
    if (!recentQueries.includes(key) && recentQueries.length < 5) {
      setRecentQueries([...recentQueries, key]);
    } else if (!recentQueries.includes(key)) {
      setRecentQueries([...recentQueries.slice(1), key]);
    }
  };

  const addFilter = (filter: string) => {
    if (!filters.includes(filter)) {
      setFilters([...filters, filter]);
    }
  };

  const removeFilter = (filter: string) => {
    setFilters(filters.filter(f => f !== filter));
  };

  return (
    <div className="w-full max-w-md mt-4 p-4 rounded-lg bg-muted/20 backdrop-blur-sm">
      <div className="flex items-center mb-3">
        <Book className="h-5 w-5 mr-2 text-muted-foreground" />
        <h3 className="text-sm font-medium">Advanced Knowledge Repository</h3>
      </div>
      
      <div className="flex gap-2 mb-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Query the cosmic knowledge..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(e.target.value.length > 0);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(query.length > 0)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="pr-8 bg-muted/30"
          />
          {searching && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <Brain className="h-4 w-4 animate-pulse text-crimson" />
            </div>
          )}
          
          {showSuggestions && (
            <div className="absolute z-10 w-full mt-1 rounded-md bg-black/70 backdrop-blur-sm border border-muted/30 max-h-48 overflow-y-auto">
              {recentQueries.length > 0 && (
                <div className="p-2 border-b border-muted/30">
                  <div className="text-xs text-muted-foreground mb-1 flex items-center">
                    <Lightbulb className="h-3 w-3 mr-1" />
                    Recent Queries
                  </div>
                  {recentQueries.map((recentQuery, index) => (
                    <div 
                      key={index}
                      className="px-2 py-1 text-xs hover:bg-crimson/20 cursor-pointer rounded"
                      onClick={() => {
                        setQuery(recentQuery);
                        setShowSuggestions(false);
                        handleQuerySubmit();
                      }}
                    >
                      {recentQuery}
                    </div>
                  ))}
                </div>
              )}
              <div className="p-2">
                <div className="text-xs text-muted-foreground mb-1 flex items-center">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Popular Topics
                </div>
                {['quantum mechanics', 'consciousness', 'black hole', 'philosophy of mind', 'artificial intelligence'].map((topic, index) => (
                  <div 
                    key={index}
                    className="px-2 py-1 text-xs hover:bg-crimson/20 cursor-pointer rounded"
                    onClick={() => {
                      setQuery(topic);
                      setShowSuggestions(false);
                      handleQuerySubmit();
                    }}
                  >
                    {topic}
                  </div>
                ))}
              </div>
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
      
      {filters.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {filters.map((filter, index) => (
            <Badge key={index} variant="outline" className="text-xs px-2 py-0 h-5 bg-black/20">
              {filter}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => removeFilter(filter)} 
              />
            </Badge>
          ))}
        </div>
      )}
      
      {result && (
        <div className="mt-3 text-sm p-3 rounded bg-black/20 text-muted-foreground animate-fade-in overflow-y-auto max-h-56">
          {result}
        </div>
      )}
      
      <div className="mt-4">
        <h4 className="text-xs font-medium mb-2 flex items-center">
          <Sparkles className="h-3 w-3 mr-1 text-crimson" />
          Knowledge Categories
        </h4>
        
        <div className="overflow-x-auto pb-1">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="inline-flex h-8 min-w-full">
              {CATEGORIES.map(category => (
                <TabsTrigger 
                  key={category.id}
                  value={category.id} 
                  className="text-xs whitespace-nowrap"
                  onClick={() => handleCategorySelect(category.id)}
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {CATEGORIES.map(category => (
              <TabsContent key={category.id} value={category.id} className="mt-2">
                <div className="grid grid-cols-1 gap-1">
                  {recommendations.map((rec, index) => (
                    <div 
                      key={index}
                      className="text-xs p-2 rounded bg-black/10 hover:bg-crimson/20 cursor-pointer flex items-center"
                      onClick={() => handleRecommendationClick(rec.key[0])}
                    >
                      <Info className="h-3 w-3 mr-2 text-crimson" />
                      {rec.key[0]}
                      {rec.category && (
                        <Badge 
                          variant="outline" 
                          className="ml-auto text-[10px] h-4 px-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            addFilter(rec.category);
                          }}
                        >
                          {rec.category}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeQuery;
