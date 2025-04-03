
import React, { useState } from 'react';
import { Code, Play, Download, Copy } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface CodeEditorProps {
  onComplete: (result: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onComplete }) => {
  const [code, setCode] = useState('');
  const [outputCode, setOutputCode] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [language, setLanguage] = useState('javascript');

  const handleCodeSubmit = () => {
    if (!code.trim()) return;

    setIsProcessing(true);
    setOutputCode(null);
    
    // Simulate code processing time
    setTimeout(() => {
      const result = processCode(code, language);
      setOutputCode(result);
      if (onComplete) onComplete(result);
      setIsProcessing(false);
    }, 1200);
  };

  const processCode = (inputCode: string, lang: string): string => {
    // Basic code completion simulation
    let result = inputCode;
    
    if (lang === 'javascript') {
      // Check for common patterns and complete them
      if (inputCode.includes('function') && !inputCode.includes('return')) {
        result += '\n  return result;';
      }
      
      if (inputCode.includes('console.log') && !inputCode.includes(';')) {
        result = result.replace('console.log', 'console.log;');
      }
      
      // Add missing closing brackets
      const openBrackets = (inputCode.match(/\{/g) || []).length;
      const closeBrackets = (inputCode.match(/\}/g) || []).length;
      if (openBrackets > closeBrackets) {
        for (let i = 0; i < openBrackets - closeBrackets; i++) {
          result += '\n}';
        }
      }
      
      // Add function completion for incomplete functions
      if (inputCode.includes('function') && !inputCode.includes('{')) {
        result += ' {\n  // Function implementation\n}';
      }
      
      // Basic error checking
      if (inputCode.includes('if (') && !inputCode.includes('{')) {
        result = result.replace('if (', 'if (') + ' {\n  // Conditional implementation\n}';
      }
    } else if (lang === 'python') {
      // Python specific completions
      if (inputCode.includes('def ') && !inputCode.includes('return')) {
        result += '\n    return result';
      }
      
      if (inputCode.includes('for ') && !inputCode.includes(':')) {
        result += ':';
      }
      
      if (inputCode.includes('if ') && !inputCode.includes(':')) {
        result += ':';
      }
    }
    
    return result;
  };

  const copyToClipboard = () => {
    if (outputCode) {
      navigator.clipboard.writeText(outputCode);
    }
  };

  const downloadCode = () => {
    if (outputCode) {
      const element = document.createElement('a');
      const file = new Blob([outputCode], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `completed_code.${language === 'javascript' ? 'js' : 'py'}`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  return (
    <div className="w-full max-w-md mt-4 p-4 rounded-lg bg-muted/20 backdrop-blur-sm">
      <div className="flex items-center mb-3">
        <Code className="h-5 w-5 mr-2 text-muted-foreground" />
        <h3 className="text-sm font-medium">Cosmic Code Editor</h3>
      </div>
      
      <div className="flex gap-2 mb-2">
        <Button
          size="sm"
          variant={language === 'javascript' ? 'default' : 'outline'}
          onClick={() => setLanguage('javascript')}
          className={language === 'javascript' ? 'bg-crimson hover:bg-crimson/90' : 'border-crimson/30 hover:bg-crimson/20'}
        >
          JavaScript
        </Button>
        <Button
          size="sm"
          variant={language === 'python' ? 'default' : 'outline'}
          onClick={() => setLanguage('python')}
          className={language === 'python' ? 'bg-crimson hover:bg-crimson/90' : 'border-crimson/30 hover:bg-crimson/20'}
        >
          Python
        </Button>
      </div>
      
      <Textarea
        placeholder="Enter your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="min-h-[150px] mb-2 bg-black/30 border-crimson/30 font-mono text-sm"
      />
      
      <div className="flex gap-2 mb-3">
        <Button
          size="sm"
          variant="outline"
          onClick={handleCodeSubmit}
          className="border-crimson/30 hover:bg-crimson/20 flex-1"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <span className="mr-2">Processing</span>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-crimson border-t-transparent" />
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-1" />
              Complete Code
            </>
          )}
        </Button>
      </div>
      
      {outputCode && (
        <div className="mt-3">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-xs font-medium">Completed Code:</h4>
            <div className="flex gap-1">
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={copyToClipboard} 
                className="h-6 w-6 p-0 hover:bg-crimson/10"
              >
                <Copy className="h-3 w-3" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={downloadCode} 
                className="h-6 w-6 p-0 hover:bg-crimson/10"
              >
                <Download className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <div className="p-3 rounded bg-black/30 font-mono text-xs text-muted-foreground animate-fade-in whitespace-pre overflow-x-auto">
            {outputCode}
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
