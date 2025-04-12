import React, { useState, useEffect } from 'react';
import { Search, Book, Brain, Sparkles, Info, Filter, Lightbulb, X, Calculator, BookText, Sigma, Clock, BookmarkPlus, Bookmark, BookOpen } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  searchKnowledgeBase, 
  getKnowledgeRecommendations, 
  generateResponse,
  findSimilarTerms,
  getEquations,
  getCategoryInfo,
  getAllCategories,
  getLatestEntries,
  getBookmarkableEntries,
  getCitationsForTopic,
  KnowledgeEntry,
  Citation
} from '@/services/knowledgeBaseService';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

interface KnowledgeQueryProps {
  onQueryResult?: (result: string) => void;
}

const KnowledgeQuery: React.FC<KnowledgeQueryProps> = ({ onQueryResult }) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);
  const [recommendations, setRecommendations] = useState<KnowledgeEntry[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [recentQueries, setRecentQueries] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filters, setFilters] = useState<string[]>([]);
  const [showEquations, setShowEquations] = useState(false);
  const [relatedTerms, setRelatedTerms] = useState<string[]>([]);
  const [equations, setEquations] = useState<string[]>([]);
  const [categoryInfo, setCategoryInfo] = useState<{description: string, entries: number}>({description: "", entries: 0});
  const [allCategories, setAllCategories] = useState<{id: string, name: string, count: number}[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'standard' | 'citations' | 'bookmarks'>('standard');
  const [latestEntries, setLatestEntries] = useState<KnowledgeEntry[]>([]);
  const [citations, setCitations] = useState<Citation[]>([]);
  
  const { toast } = useToast();

  useEffect(() => {
    setRecommendations(getKnowledgeRecommendations());
    setAllCategories(getAllCategories());
    setLatestEntries(getLatestEntries());
    
    if (selectedCategory !== "all") {
      setCategoryInfo(getCategoryInfo(selectedCategory));
    }
    
    const savedBookmarks = localStorage.getItem('knowledgeBookmarks');
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, [selectedCategory]);

  const handleQuerySubmit = () => {
    if (!query.trim()) return;

    setSearching(true);
    setResult(null);
    setShowSuggestions(false);

    if (!recentQueries.includes(query) && recentQueries.length < 5) {
      setRecentQueries([...recentQueries, query]);
    } else if (!recentQueries.includes(query)) {
      setRecentQueries([...recentQueries.slice(1), query]);
    }

    setTimeout(() => {
      const response = generateResponse(query);
      setResult(response);
      if (onQueryResult) onQueryResult(response);
      
      setRelatedTerms(findSimilarTerms(query));
      setEquations(getEquations(query));
      
      setCitations(getCitationsForTopic(query));
      
      setRecommendations(
        getKnowledgeRecommendations(
          selectedCategory !== "all" ? selectedCategory : undefined
        )
      );
      
      setSearching(false);
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
    
    if (category !== "all") {
      setCategoryInfo(getCategoryInfo(category));
    }
  };

  const handleRecommendationClick = (key: string) => {
    setQuery(key);
    const response = generateResponse(key);
    setResult(response);
    if (onQueryResult) onQueryResult(response);
    
    setRelatedTerms(findSimilarTerms(key));
    setEquations(getEquations(key));
    setCitations(getCitationsForTopic(key));
    
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

  const toggleEquations = () => {
    setShowEquations(!showEquations);
  };
  
  const toggleBookmark = (term: string) => {
    let newBookmarks: string[];
    
    if (bookmarks.includes(term)) {
      newBookmarks = bookmarks.filter(b => b !== term);
      toast({
        title: "Bookmark removed",
        description: `'${term}' has been removed from your bookmarks.`,
      });
    } else {
      newBookmarks = [...bookmarks, term];
      toast({
        title: "Bookmark added",
        description: `'${term}' has been added to your bookmarks.`,
      });
    }
    
    setBookmarks(newBookmarks);
    localStorage.setItem('knowledgeBookmarks', JSON.stringify(newBookmarks));
  };

  const renderCategoryInfo = () => {
    if (selectedCategory === "all") return null;
    
    return (
      <div className="text-xs text-muted-foreground mb-2 flex items-center justify-between">
        <span>{categoryInfo.description}</span>
        <Badge variant="outline" className="text-[10px]">
          {categoryInfo.entries} entries
        </Badge>
      </div>
    );
  };
  
  const renderBookmarkButton = (term: string) => {
    const isBookmarked = bookmarks.includes(term);
    
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          toggleBookmark(term);
        }}
        className="p-0 h-5 w-5 hover:bg-transparent"
        title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
      >
        {isBookmarked ? (
          <Bookmark className="h-3 w-3 text-amber-400" />
        ) : (
          <BookmarkPlus className="h-3 w-3 text-muted-foreground" />
        )}
      </Button>
    );
  };
  
  const renderViewModeControls = () => {
    return (
      <div className="flex gap-1 mb-2">
        <Button
          variant={viewMode === 'standard' ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setViewMode('standard')}
          className="text-xs px-2 h-7"
        >
          <Brain className="h-3 w-3 mr-1" />
          Standard
        </Button>
        <Button
          variant={viewMode === 'citations' ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setViewMode('citations')}
          className="text-xs px-2 h-7"
        >
          <BookOpen className="h-3 w-3 mr-1" />
          Citations
        </Button>
        <Button
          variant={viewMode === 'bookmarks' ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setViewMode('bookmarks')}
          className="text-xs px-2 h-7"
        >
          <Bookmark className="h-3 w-3 mr-1" />
          Bookmarks
        </Button>
      </div>
    );
  };
  
  const renderBookmarksView = () => {
    if (bookmarks.length === 0) {
      return (
        <div className="p-4 text-center text-muted-foreground">
          <Bookmark className="h-8 w-8 mx-auto mb-2 opacity-30" />
          <p className="text-xs">You haven't bookmarked any knowledge entries yet.</p>
          <p className="text-xs mt-1">Use the bookmark icon to save important topics for quick access.</p>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 gap-1">
        {bookmarks.map((term, idx) => (
          <div 
            key={idx}
            className="text-xs p-2 rounded bg-black/10 hover:bg-crimson/20 cursor-pointer flex items-center"
            onClick={() => handleRecommendationClick(term)}
          >
            <BookOpen className="h-3 w-3 mr-2 text-amber-400" />
            {term}
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark(term);
              }}
              className="p-0 h-5 w-5 ml-auto hover:bg-transparent"
            >
              <X className="h-3 w-3 text-muted-foreground" />
            </Button>
          </div>
        ))}
      </div>
    );
  };
  
  const renderCitationsView = () => {
    if (citations.length === 0) {
      return (
        <div className="p-4 text-center text-muted-foreground">
          <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-30" />
          <p className="text-xs">No citations available for the current query.</p>
          <p className="text-xs mt-1">Search for a topic to view related academic citations.</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-2 p-2">
        <h4 className="text-xs font-medium">Citations for "{query}"</h4>
        {citations.map((citation, idx) => (
          <div key={idx} className="text-xs p-2 rounded bg-black/10">
            <p className="font-medium">{citation.title}</p>
            <p className="text-muted-foreground">{citation.author} ({citation.year})</p>
            {citation.publication && (
              <p className="italic text-muted-foreground">{citation.publication}</p>
            )}
            {citation.url && (
              <a 
                href={citation.url} 
                target="_blank" 
                rel="noreferrer"
                className="text-crimson hover:underline text-[10px] block mt-1"
              >
                View Source
              </a>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  const renderLatestEntries = () => {
    return (
      <div className="mt-2">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-xs font-medium flex items-center">
            <Clock className="h-3 w-3 mr-1 text-blue-400" />
            Latest Additions
          </h4>
        </div>
        <div className="grid grid-cols-1 gap-1">
          {latestEntries.map((entry, idx) => (
            <div 
              key={idx} 
              className="text-xs p-2 rounded bg-black/10 hover:bg-blue-500/10 cursor-pointer flex items-center"
              onClick={() => handleRecommendationClick(entry.key[0])}
            >
              <Info className="h-3 w-3 mr-2 text-blue-400" />
              {entry.key[0]}
              <Badge 
                variant="outline" 
                className="ml-auto text-[10px] h-4 px-1"
              >
                New
              </Badge>
            </div>
          ))}
        </div>
      </div>
    );
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
                {['quantum mechanics', 'consciousness', 'black hole', 'philosophy of mind', 'artificial intelligence', 'calculus', 'stoicism', 'epistemology'].map((topic, index) => (
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
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-xs font-medium">Results for "{query}"</h4>
            {renderBookmarkButton(query)}
          </div>
          
          {result}
          
          {equations.length > 0 && (
            <div className="mt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleEquations}
                className="text-xs p-1 h-auto"
              >
                <Calculator className="h-3 w-3 mr-1" />
                {showEquations ? "Hide Equations" : "Show Equations"}
              </Button>
              
              {showEquations && (
                <div className="mt-1 p-2 bg-black/30 rounded text-xs">
                  {equations.map((eq, idx) => (
                    <div key={idx} className="my-1 font-mono">{eq}</div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {relatedTerms.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {relatedTerms.map((term, idx) => (
                <Badge 
                  key={idx} 
                  variant="outline" 
                  className="text-xs cursor-pointer bg-black/20 hover:bg-crimson/20"
                  onClick={() => {
                    setQuery(term);
                    handleQuerySubmit();
                  }}
                >
                  {term}
                </Badge>
              ))}
            </div>
          )}
        </div>
      )}
      
      {renderViewModeControls()}
      
      {viewMode === 'bookmarks' ? (
        renderBookmarksView()
      ) : viewMode === 'citations' ? (
        renderCitationsView()
      ) : (
        <>
          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-xs font-medium flex items-center">
                <Sparkles className="h-3 w-3 mr-1 text-crimson" />
                Knowledge Categories
              </h4>
              <div className="flex gap-1">
                <Badge 
                  variant="outline" 
                  className="cursor-pointer text-[10px] px-1 h-5"
                  onClick={() => setSelectedCategory("dictionary")}
                >
                  <BookText className="h-3 w-3 mr-1" />
                  Dictionary
                </Badge>
                <Badge 
                  variant="outline" 
                  className="cursor-pointer text-[10px] px-1 h-5"
                  onClick={() => setSelectedCategory("mathematics")}
                >
                  <Sigma className="h-3 w-3 mr-1" />
                  Math
                </Badge>
              </div>
            </div>
            
            {renderCategoryInfo()}
            
            <div className="overflow-x-auto pb-1">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="inline-flex h-8 min-w-full">
                  <TabsTrigger 
                    key="all"
                    value="all" 
                    className="text-xs whitespace-nowrap"
                    onClick={() => handleCategorySelect("all")}
                  >
                    All
                  </TabsTrigger>
                  {allCategories.map(category => (
                    <TabsTrigger 
                      key={category.id}
                      value={category.id} 
                      className="text-xs whitespace-nowrap"
                      onClick={() => handleCategorySelect(category.id)}
                    >
                      {category.name} ({category.count})
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                <TabsContent value="all" className="mt-2">
                  <div className="grid grid-cols-1 gap-1">
                    {recommendations.map((rec, index) => (
                      <div 
                        key={index}
                        className="text-xs p-2 rounded bg-black/10 hover:bg-crimson/20 cursor-pointer flex items-center"
                        onClick={() => handleRecommendationClick(rec.key[0])}
                      >
                        <Info className="h-3 w-3 mr-2 text-crimson" />
                        {rec.key[0]}
                        <div className="ml-auto flex items-center gap-1">
                          {renderBookmarkButton(rec.key[0])}
                          {rec.category && (
                            <Badge 
                              variant="outline" 
                              className="text-[10px] h-4 px-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                addFilter(rec.category);
                              }}
                            >
                              {rec.category}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {renderLatestEntries()}
                </TabsContent>
                
                {allCategories.map(category => (
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
                          <div className="ml-auto flex items-center gap-1">
                            {renderBookmarkButton(rec.key[0])}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default KnowledgeQuery;
