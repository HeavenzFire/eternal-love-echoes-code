
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { 
  Bold, Italic, Underline, AlignLeft, AlignCenter, 
  AlignRight, List, ListOrdered, Save, FileText, Download
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface TextEditorProps {
  onComplete: (result: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ onComplete }) => {
  const [text, setText] = useState('');
  const [format, setFormat] = useState('markdown');
  const { toast } = useToast();

  const handleFormatText = (formatType: string) => {
    let newText = text;
    const selection = {
      start: (document.getElementById('editor') as HTMLTextAreaElement)?.selectionStart || 0,
      end: (document.getElementById('editor') as HTMLTextAreaElement)?.selectionEnd || 0
    };
    
    const selectedText = text.substring(selection.start, selection.end);
    
    if (selection.start !== selection.end) {
      let formattedText = '';
      switch (formatType) {
        case 'bold':
          formattedText = format === 'markdown' ? `**${selectedText}**` : `<strong>${selectedText}</strong>`;
          break;
        case 'italic':
          formattedText = format === 'markdown' ? `*${selectedText}*` : `<em>${selectedText}</em>`;
          break;
        case 'underline':
          formattedText = format === 'markdown' ? `__${selectedText}__` : `<u>${selectedText}</u>`;
          break;
        case 'list':
          formattedText = format === 'markdown' 
            ? selectedText.split('\n').map(line => `- ${line}`).join('\n')
            : `<ul>${selectedText.split('\n').map(line => `<li>${line}</li>`).join('')}</ul>`;
          break;
        case 'ordered-list':
          formattedText = format === 'markdown'
            ? selectedText.split('\n').map((line, i) => `${i+1}. ${line}`).join('\n')
            : `<ol>${selectedText.split('\n').map(line => `<li>${line}</li>`).join('')}</ol>`;
          break;
        default:
          formattedText = selectedText;
      }
      
      newText = text.substring(0, selection.start) + formattedText + text.substring(selection.end);
      setText(newText);
    } else {
      toast({
        title: "No text selected",
        description: "Please select some text to format",
      });
    }
  };
  
  const handleSave = () => {
    onComplete(`Text document saved: ${text.substring(0, 50)}${text.length > 50 ? '...' : ''}`);
    toast({
      title: "Document saved",
      description: "Your text has been saved successfully",
    });
  };
  
  const handleExport = () => {
    const element = document.createElement('a');
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `document.${format === 'markdown' ? 'md' : 'txt'}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Document exported",
      description: `Your text has been exported as ${format === 'markdown' ? 'markdown' : 'plain text'}`,
    });
  };

  return (
    <div className="w-full max-w-3xl mt-6 bg-muted/30 p-4 rounded-lg">
      <div className="flex flex-wrap gap-2 mb-4">
        <Button variant="outline" size="sm" onClick={() => handleFormatText('bold')}>
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleFormatText('italic')}>
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleFormatText('underline')}>
          <Underline className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleFormatText('list')}>
          <List className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleFormatText('ordered-list')}>
          <ListOrdered className="h-4 w-4" />
        </Button>
        <div className="ml-auto flex gap-2">
          <Button variant="outline" size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-1" />
            Save
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
          <select 
            className="bg-muted/50 border rounded px-2 text-sm"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            <option value="markdown">Markdown</option>
            <option value="html">HTML</option>
            <option value="plain">Plain Text</option>
          </select>
        </div>
      </div>
      
      <Textarea
        id="editor"
        className="min-h-[200px] bg-black/20 font-mono"
        placeholder="Enter your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      
      <div className="mt-4 text-xs text-muted-foreground">
        Format with the controls above or use {format === 'markdown' ? 'Markdown' : format === 'html' ? 'HTML' : 'plain text'} syntax directly in the editor.
      </div>
    </div>
  );
};

export default TextEditor;
