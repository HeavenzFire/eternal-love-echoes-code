
import React, { useState, useEffect } from 'react';
import { Citation } from "@/services/knowledgeBaseService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Citation as CitationIcon, Copy, Download, Search, Filter, X, BookOpen, ExternalLink } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface CitationManagerProps {
  initialCitations?: Citation[];
  onCitationSelect?: (citation: Citation) => void;
}

const CitationManager: React.FC<CitationManagerProps> = ({ initialCitations = [], onCitationSelect }) => {
  const [citations, setCitations] = useState<Citation[]>(initialCitations);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState<'all' | 'author' | 'title' | 'year'>('all');
  const [editingCitation, setEditingCitation] = useState<Citation | null>(null);
  const [citationFormat, setCitationFormat] = useState<'apa' | 'mla' | 'chicago'>('apa');
  
  const { toast } = useToast();
  
  useEffect(() => {
    setCitations(initialCitations);
  }, [initialCitations]);
  
  // Filter citations based on search term and filter type
  const filteredCitations = citations.filter(citation => {
    const searchLower = searchTerm.toLowerCase();
    
    switch (filterBy) {
      case 'author':
        return citation.author.toLowerCase().includes(searchLower);
      case 'title':
        return citation.title.toLowerCase().includes(searchLower);
      case 'year':
        return citation.year.includes(searchTerm);
      case 'all':
      default:
        return (
          citation.author.toLowerCase().includes(searchLower) ||
          citation.title.toLowerCase().includes(searchLower) ||
          citation.year.includes(searchTerm) ||
          (citation.publication && citation.publication.toLowerCase().includes(searchLower))
        );
    }
  });
  
  // Format citation according to selected style
  const formatCitation = (citation: Citation, format: 'apa' | 'mla' | 'chicago'): string => {
    const { author, title, publication, year, url } = citation;
    
    switch (format) {
      case 'apa':
        return `${author} (${year}). ${title}${publication ? `. ${publication}` : ''}.${url ? ` Retrieved from ${url}` : ''}`;
      
      case 'mla':
        return `${author}. "${title}."${publication ? ` ${publication}` : ''} ${year}.${url ? ` Web. Accessed ${new Date().toLocaleDateString()}.` : ''}`;
      
      case 'chicago':
        return `${author}. "${title}."${publication ? ` ${publication}` : ''} (${year}).${url ? ` ${url}.` : ''}`;
        
      default:
        return `${author} (${year}). ${title}.`;
    }
  };
  
  // Copy citation to clipboard
  const handleCopyCitation = (citation: Citation) => {
    const formattedCitation = formatCitation(citation, citationFormat);
    navigator.clipboard.writeText(formattedCitation);
    
    toast({
      title: "Citation copied",
      description: "The citation has been copied to your clipboard.",
    });
  };
  
  // Generate citation list as plain text
  const generateCitationList = () => {
    return filteredCitations
      .map(citation => formatCitation(citation, citationFormat))
      .join('\n\n');
  };
  
  // Download citations as text file
  const handleDownloadCitations = () => {
    const citationText = generateCitationList();
    const blob = new Blob([citationText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `citations-${citationFormat}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Citations downloaded",
      description: `${filteredCitations.length} citations downloaded in ${citationFormat.toUpperCase()} format.`,
    });
  };
  
  return (
    <div className="w-full max-w-md p-4 bg-muted/20 backdrop-blur-sm rounded-lg">
      <div className="flex items-center mb-3">
        <CitationIcon className="h-5 w-5 mr-2 text-muted-foreground" />
        <h3 className="text-sm font-medium">Citation Manager</h3>
      </div>
      
      <div className="space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search citations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-7 bg-muted/30 text-xs"
            />
            {searchTerm && (
              <button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setSearchTerm('')}
              >
                <X className="h-3 w-3 text-muted-foreground" />
              </button>
            )}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            className="border-muted/30 hover:bg-muted/20"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        <Tabs defaultValue="apa" onValueChange={(v) => setCitationFormat(v as any)}>
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="apa" className="text-xs">APA</TabsTrigger>
            <TabsTrigger value="mla" className="text-xs">MLA</TabsTrigger>
            <TabsTrigger value="chicago" className="text-xs">Chicago</TabsTrigger>
          </TabsList>
          
          <div className="mt-2">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs">
                {filteredCitations.length} citation{filteredCitations.length !== 1 ? 's' : ''}
              </Label>
              
              <div className="space-x-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 px-2 text-xs"
                  onClick={handleDownloadCitations}
                  disabled={filteredCitations.length === 0}
                >
                  <Download className="h-3 w-3 mr-1" />
                  Export
                </Button>
              </div>
            </div>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredCitations.length > 0 ? (
                filteredCitations.map((citation, index) => (
                  <div 
                    key={index} 
                    className="p-2 bg-muted/30 rounded text-xs"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-1 mb-1">
                        <BookOpen className="h-3 w-3 text-blue-400" />
                        <span className="font-medium">{citation.title}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-5 w-5 p-0"
                        onClick={() => handleCopyCitation(citation)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <p className="text-muted-foreground">
                      {citation.author} ({citation.year})
                    </p>
                    
                    {citation.publication && (
                      <p className="text-muted-foreground italic">
                        {citation.publication}
                      </p>
                    )}
                    
                    {citation.url && (
                      <a
                        href={citation.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-400 hover:underline text-[10px] flex items-center mt-1"
                      >
                        <ExternalLink className="h-2 w-2 mr-1" />
                        View source
                      </a>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center p-4 text-muted-foreground">
                  <CitationIcon className="h-8 w-8 mx-auto mb-2 opacity-30" />
                  <p className="text-xs">No citations match your search.</p>
                </div>
              )}
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default CitationManager;
