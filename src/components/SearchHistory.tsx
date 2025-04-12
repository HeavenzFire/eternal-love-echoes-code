
import React from 'react';
import { History, Clock, X, ArrowUpRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SearchHistoryProps {
  history: {
    query: string;
    timestamp: Date;
    category?: string;
  }[];
  onSelectQuery: (query: string) => void;
  onClearHistory: () => void;
  onClearItem: (index: number) => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ 
  history, 
  onSelectQuery, 
  onClearHistory,
  onClearItem
}) => {
  if (history.length === 0) {
    return (
      <div className="w-full max-w-md p-4 rounded-lg bg-muted/20 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <History className="h-5 w-5 mr-2 text-muted-foreground" />
            <h3 className="text-sm font-medium">Search History</h3>
          </div>
        </div>
        
        <div className="text-center py-4 text-muted-foreground">
          <Clock className="h-8 w-8 mx-auto mb-2 opacity-30" />
          <p className="text-xs">No search history yet.</p>
          <p className="text-xs mt-1">Your searches will appear here.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-md p-4 rounded-lg bg-muted/20 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <History className="h-5 w-5 mr-2 text-muted-foreground" />
          <h3 className="text-sm font-medium">Search History</h3>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearHistory}
          className="h-8 px-2 text-xs hover:bg-red-500/20"
        >
          Clear All
        </Button>
      </div>
      
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {history.map((item, index) => {
          // Format the timestamp
          const formattedTime = new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }).format(item.timestamp);
          
          // Format the date if it's not today
          const today = new Date();
          const isToday = today.toDateString() === item.timestamp.toDateString();
          
          const formattedDate = isToday 
            ? 'Today' 
            : new Intl.DateTimeFormat('en-US', {
                month: 'short',
                day: 'numeric'
              }).format(item.timestamp);
          
          return (
            <div 
              key={index} 
              className="flex items-center justify-between p-2 rounded bg-black/10 hover:bg-crimson/10"
            >
              <div className="flex-1 min-w-0">
                <div 
                  className="text-sm font-medium truncate cursor-pointer"
                  onClick={() => onSelectQuery(item.query)}
                >
                  {item.query}
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {formattedDate}, {formattedTime}
                </div>
              </div>
              
              <div className="flex items-center gap-1 ml-2">
                {item.category && (
                  <Badge variant="outline" className="text-[10px] capitalize">
                    {item.category}
                  </Badge>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSelectQuery(item.query)}
                  className="p-0 h-7 w-7 hover:bg-black/20"
                >
                  <ArrowUpRight className="h-3 w-3" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onClearItem(index)}
                  className="p-0 h-7 w-7 hover:bg-red-500/20"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchHistory;
