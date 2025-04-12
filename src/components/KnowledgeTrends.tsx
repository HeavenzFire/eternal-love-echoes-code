
import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, BarChart, PieChart, Award, Calendar } from 'lucide-react';
import { getKnowledgeStatistics, getRelatedTopics } from '@/services/knowledgeBaseService';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface KnowledgeTrendsProps {
  selectedTopic?: string;
}

const KnowledgeTrends: React.FC<KnowledgeTrendsProps> = ({ selectedTopic }) => {
  const [stats, setStats] = useState<{
    totalEntries: number;
    entriesByCategory: Record<string, number>;
    recentlyAdded: number;
    averageImportance: number;
    topCategories: string[];
  } | null>(null);
  
  const [relatedTopics, setRelatedTopics] = useState<{category: string, topics: string[]}[]>([]);
  const [activeView, setActiveView] = useState<'trends' | 'related'>('trends');
  
  useEffect(() => {
    // Get overall knowledge statistics
    const statistics = getKnowledgeStatistics();
    setStats(statistics);
    
    // Get related topics if a topic is selected
    if (selectedTopic) {
      const related = getRelatedTopics(selectedTopic);
      setRelatedTopics(related);
      setActiveView('related');
    }
  }, [selectedTopic]);
  
  const renderCategoryDistribution = () => {
    if (!stats) return null;
    
    const totalCategories = Object.keys(stats.entriesByCategory).length;
    const topCategoriesData = Object.entries(stats.entriesByCategory)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);
    
    const maxEntries = Math.max(...topCategoriesData.map(([, count]) => count));
    
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Category Distribution (Top 5 of {totalCategories})</span>
          <span>Count</span>
        </div>
        
        {topCategoriesData.map(([category, count]) => (
          <div key={category} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="capitalize">{category}</span>
              <span>{count}</span>
            </div>
            <Progress value={(count / maxEntries) * 100} className="h-1" />
          </div>
        ))}
      </div>
    );
  };
  
  const renderStatistics = () => {
    if (!stats) return <div className="text-center py-4">Loading statistics...</div>;
    
    return (
      <div className="space-y-4 p-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 bg-black/20 rounded">
            <div className="flex items-center">
              <BarChart className="h-4 w-4 mr-2 text-blue-400" />
              <span className="text-xs font-medium">Total Entries</span>
            </div>
            <p className="text-lg font-bold">{stats.totalEntries}</p>
          </div>
          
          <div className="p-2 bg-black/20 rounded">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-green-400" />
              <span className="text-xs font-medium">Recently Added</span>
            </div>
            <p className="text-lg font-bold">{stats.recentlyAdded}</p>
          </div>
          
          <div className="p-2 bg-black/20 rounded">
            <div className="flex items-center">
              <PieChart className="h-4 w-4 mr-2 text-purple-400" />
              <span className="text-xs font-medium">Categories</span>
            </div>
            <p className="text-lg font-bold">{Object.keys(stats.entriesByCategory).length}</p>
          </div>
          
          <div className="p-2 bg-black/20 rounded">
            <div className="flex items-center">
              <Award className="h-4 w-4 mr-2 text-amber-400" />
              <span className="text-xs font-medium">Avg. Importance</span>
            </div>
            <p className="text-lg font-bold">{stats.averageImportance.toFixed(1)}</p>
          </div>
        </div>
        
        <div className="mt-4">
          {renderCategoryDistribution()}
        </div>
        
        <div className="mt-4">
          <div className="text-xs font-medium mb-2">Top Categories</div>
          <div className="flex flex-wrap gap-1">
            {stats.topCategories.map(category => (
              <Badge key={category} variant="outline" className="text-xs capitalize">
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  const renderRelatedTopics = () => {
    if (!selectedTopic) {
      return (
        <div className="text-center py-4 text-muted-foreground">
          <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-30" />
          <p className="text-xs">Select a topic to see related concepts.</p>
        </div>
      );
    }
    
    if (relatedTopics.length === 0) {
      return (
        <div className="text-center py-4 text-muted-foreground">
          <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-30" />
          <p className="text-xs">No related topics found for "{selectedTopic}".</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-3 p-2">
        <div className="text-xs font-medium">Related topics for "{selectedTopic}"</div>
        
        {relatedTopics.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="text-xs font-medium capitalize">{item.category}</div>
            <div className="flex flex-wrap gap-1">
              {item.topics.map((topic, idx) => (
                <Badge 
                  key={idx} 
                  variant="outline" 
                  className="text-xs hover:bg-crimson/20 cursor-pointer"
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="w-full max-w-md p-4 rounded-lg bg-muted/20 backdrop-blur-sm">
      <div className="flex items-center mb-3">
        <TrendingUp className="h-5 w-5 mr-2 text-muted-foreground" />
        <h3 className="text-sm font-medium">Knowledge Trends & Insights</h3>
      </div>
      
      <div className="flex gap-2 mb-3">
        <Button
          size="sm"
          variant={activeView === 'trends' ? 'default' : 'outline'}
          onClick={() => setActiveView('trends')}
          className={activeView === 'trends' ? 'bg-crimson hover:bg-crimson/90 text-xs' : 'text-xs'}
        >
          <BarChart className="h-3 w-3 mr-1" />
          Statistics
        </Button>
        <Button
          size="sm"
          variant={activeView === 'related' ? 'default' : 'outline'}
          onClick={() => setActiveView('related')}
          className={activeView === 'related' ? 'bg-crimson hover:bg-crimson/90 text-xs' : 'text-xs'}
        >
          <Sparkles className="h-3 w-3 mr-1" />
          Related Topics
        </Button>
      </div>
      
      {activeView === 'trends' ? renderStatistics() : renderRelatedTopics()}
    </div>
  );
};

export default KnowledgeTrends;
