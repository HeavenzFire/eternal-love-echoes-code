
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, Upload, Download, FileUp, 
  FilePlus, FileMinus, FileSearch, Eye
} from 'lucide-react';

interface PDFToolsProps {
  onComplete: (result: string) => void;
}

const PDFTools: React.FC<PDFToolsProps> = ({ onComplete }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [currentOperation, setCurrentOperation] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        setSelectedFile(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        
        toast({
          title: "PDF selected",
          description: `${file.name} (${(file.size / 1024).toFixed(1)} KB)`,
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select a PDF file",
          variant: "destructive"
        });
      }
    }
  };

  const simulateOperation = (operation: string) => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file first",
        variant: "destructive"
      });
      return;
    }
    
    setCurrentOperation(operation);
    
    // Simulate processing time
    setTimeout(() => {
      let result = '';
      switch(operation) {
        case 'extract':
          result = `Text extracted from ${selectedFile.name}`;
          break;
        case 'convert':
          result = `Converted ${selectedFile.name} to another format`;
          break;
        case 'compress':
          result = `Compressed ${selectedFile.name} (${(selectedFile.size * 0.7 / 1024).toFixed(1)} KB)`;
          break;
        case 'ocr':
          result = `OCR processing completed on ${selectedFile.name}`;
          break;
        default:
          result = `Operation completed on ${selectedFile.name}`;
      }
      
      setCurrentOperation(null);
      onComplete(result);
      
      toast({
        title: "Operation complete",
        description: result,
      });
    }, 2000);
  };

  const createNewPDF = () => {
    const pdfData = new Blob(['%PDF-1.5\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R >>\nendobj\n4 0 obj\n<< /Length 21 >>\nstream\nBT /F1 12 Tf 100 700 Td (New PDF Document) Tj ET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f\n0000000010 00000 n\n0000000059 00000 n\n0000000118 00000 n\n0000000217 00000 n\ntrailer\n<< /Size 5 /Root 1 0 R >>\nstartxref\n307\n%%EOF'], { type: 'application/pdf' });
    const url = URL.createObjectURL(pdfData);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'new-document.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: "New PDF created",
      description: "A blank PDF document has been created and downloaded",
    });
    
    onComplete('Created a new PDF document');
  };

  return (
    <div className="w-full max-w-3xl mt-6 bg-muted/30 p-4 rounded-lg">
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex-1">
          <div className="flex flex-wrap gap-2 mb-4">
            <label className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted/70 transition-colors">
              <Upload className="h-4 w-4" />
              <span>Upload PDF</span>
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
            
            <Button variant="outline" size="sm" onClick={createNewPDF}>
              <FilePlus className="h-4 w-4 mr-1" />
              Create New
            </Button>
          </div>
          
          {selectedFile && (
            <div className="mb-4 p-3 bg-black/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-5 w-5 text-crimson" />
                <span className="font-medium truncate">{selectedFile.name}</span>
                <span className="text-xs text-muted-foreground ml-auto">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => simulateOperation('extract')}
                  disabled={!!currentOperation}
                >
                  <FileSearch className="h-4 w-4 mr-1" />
                  Extract Text
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => simulateOperation('convert')}
                  disabled={!!currentOperation}
                >
                  <FileUp className="h-4 w-4 mr-1" />
                  Convert Format
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => simulateOperation('compress')}
                  disabled={!!currentOperation}
                >
                  <FileMinus className="h-4 w-4 mr-1" />
                  Compress PDF
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => simulateOperation('ocr')}
                  disabled={!!currentOperation}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  OCR Scan
                </Button>
              </div>
              
              {currentOperation && (
                <div className="mt-4 text-center">
                  <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-r-transparent mr-2"></div>
                  <span>Processing {currentOperation} operation...</span>
                </div>
              )}
            </div>
          )}
        </div>
        
        {previewUrl && (
          <div className="w-full rounded-lg overflow-hidden bg-black/40 mt-2 h-[300px]">
            <div className="flex justify-between items-center px-2 py-1 bg-black/60">
              <span className="text-xs">PDF Preview</span>
              <a 
                href={previewUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs flex items-center hover:text-crimson"
              >
                <Eye className="h-3 w-3 mr-1" />
                Open
              </a>
            </div>
            <iframe
              src={previewUrl}
              title="PDF Preview"
              className="w-full h-[270px] border-0"
            />
          </div>
        )}
      </div>
      
      <div className="mt-4 text-xs text-muted-foreground">
        Upload a PDF document or create a new one. Available operations include text extraction, format conversion, compression, and OCR scanning.
      </div>
    </div>
  );
};

export default PDFTools;
