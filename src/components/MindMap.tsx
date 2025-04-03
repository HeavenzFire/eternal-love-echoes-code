
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus, Minus, Save, Download, 
  ZoomIn, ZoomOut, Move, Trash2
} from 'lucide-react';

interface Node {
  id: string;
  text: string;
  x: number;
  y: number;
  connections: string[];
}

interface MindMapProps {
  onComplete: (result: string) => void;
}

const MindMap: React.FC<MindMapProps> = ({ onComplete }) => {
  const [nodes, setNodes] = useState<Node[]>([
    { id: '1', text: 'Central Idea', x: 400, y: 250, connections: [] }
  ]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [newNodeText, setNewNodeText] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [scale, setScale] = useState(1);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectSource, setConnectSource] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleAddNode = () => {
    if (!newNodeText.trim()) {
      toast({
        title: "Empty node",
        description: "Please enter some text for the new node",
      });
      return;
    }
    
    const newId = (nodes.length + 1).toString();
    const offset = 150;
    const newX = Math.random() * 200 + 300;
    const newY = Math.random() * 200 + 150;
    
    setNodes([...nodes, {
      id: newId,
      text: newNodeText,
      x: newX,
      y: newY,
      connections: []
    }]);
    
    setNewNodeText('');
    
    toast({
      description: "New node created",
    });
  };

  const handleDeleteNode = () => {
    if (!selectedNode) return;
    
    // Remove the node and any connections to it
    const updatedNodes = nodes.filter(node => node.id !== selectedNode).map(node => ({
      ...node,
      connections: node.connections.filter(id => id !== selectedNode)
    }));
    
    setNodes(updatedNodes);
    setSelectedNode(null);
    
    toast({
      description: "Node deleted",
    });
  };

  const handleNodeClick = (id: string, e: React.MouseEvent) => {
    if (isConnecting) {
      if (connectSource && connectSource !== id) {
        // Complete connection
        setNodes(nodes.map(node => 
          node.id === connectSource 
            ? { ...node, connections: [...node.connections, id] }
            : node
        ));
        setIsConnecting(false);
        setConnectSource(null);
        toast({
          description: "Connection created",
        });
      }
    } else {
      setSelectedNode(id === selectedNode ? null : id);
    }
    e.stopPropagation();
  };

  const handleStartConnection = (id: string, e: React.MouseEvent) => {
    setIsConnecting(true);
    setConnectSource(id);
    e.stopPropagation();
  };

  const handleUpdateNodeText = (id: string, text: string) => {
    setNodes(nodes.map(node => 
      node.id === id ? { ...node, text } : node
    ));
  };

  const handleStartDrag = (id: string, e: React.MouseEvent) => {
    if (isConnecting) return;
    
    setIsDragging(true);
    setSelectedNode(id);
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      setNodes(prevNodes => prevNodes.map(node => 
        node.id === id 
          ? { 
              ...node, 
              x: node.x + moveEvent.movementX / scale, 
              y: node.y + moveEvent.movementY / scale 
            }
          : node
      ));
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    e.stopPropagation();
  };

  const handleZoom = (direction: 'in' | 'out') => {
    setScale(prevScale => {
      const newScale = direction === 'in' 
        ? Math.min(prevScale + 0.1, 2) 
        : Math.max(prevScale - 0.1, 0.5);
      return newScale;
    });
  };

  const handleSave = () => {
    onComplete(`Mind map saved with ${nodes.length} nodes and ${nodes.reduce((acc, node) => acc + node.connections.length, 0)} connections`);
    toast({
      title: "Mind map saved",
      description: `Your mind map with ${nodes.length} nodes has been saved`,
    });
  };
  
  const handleExport = () => {
    const data = JSON.stringify(nodes, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mindmap.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: "Mind map exported",
      description: "Your mind map has been exported as JSON",
    });
  };

  const handleCanvasClick = () => {
    if (isConnecting) {
      setIsConnecting(false);
      setConnectSource(null);
    }
    setSelectedNode(null);
  };

  return (
    <div className="w-full max-w-3xl mt-6 bg-muted/30 p-4 rounded-lg">
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="flex gap-2 items-center">
          <Input
            type="text"
            placeholder="Enter node text"
            value={newNodeText}
            onChange={(e) => setNewNodeText(e.target.value)}
            className="w-48 bg-muted/50"
          />
          <Button variant="outline" size="sm" onClick={handleAddNode}>
            <Plus className="h-4 w-4 mr-1" />
            Add Node
          </Button>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsConnecting(!isConnecting)}
          className={isConnecting ? "bg-muted" : ""}
        >
          <Move className="h-4 w-4 mr-1" />
          {isConnecting ? "Cancel Connect" : "Connect Nodes"}
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleDeleteNode}
          disabled={!selectedNode}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete Node
        </Button>
        
        <div className="ml-auto flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleZoom('in')}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleZoom('out')}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-1" />
            Save
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
      </div>
      
      <div 
        className="relative h-[400px] border border-muted/30 rounded-lg overflow-hidden bg-black/30"
        onClick={handleCanvasClick}
        ref={canvasRef}
      >
        <div 
          className="absolute inset-0 transform-gpu transition-transform"
          style={{ transform: `scale(${scale})` }}
        >
          {/* Draw connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {nodes.map(node => 
              node.connections.map(targetId => {
                const target = nodes.find(n => n.id === targetId);
                if (!target) return null;
                return (
                  <line
                    key={`${node.id}-${targetId}`}
                    x1={node.x}
                    y1={node.y}
                    x2={target.x}
                    y2={target.y}
                    stroke="rgba(255, 255, 255, 0.5)"
                    strokeWidth="2"
                  />
                );
              })
            )}
            {isConnecting && connectSource && selectedNode && (
              <line
                x1={nodes.find(n => n.id === connectSource)?.x || 0}
                y1={nodes.find(n => n.id === connectSource)?.y || 0}
                x2={nodes.find(n => n.id === selectedNode)?.x || 0}
                y2={nodes.find(n => n.id === selectedNode)?.y || 0}
                stroke="rgba(255, 100, 100, 0.8)"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            )}
          </svg>
          
          {/* Draw nodes */}
          {nodes.map(node => (
            <div
              key={node.id}
              className={`absolute px-4 py-2 rounded-md cursor-move
                ${node.id === selectedNode ? 'bg-crimson/30 border-crimson' : 'bg-muted/50 border-muted/30'}
                ${isConnecting ? 'cursor-pointer' : 'cursor-move'}
                border hover:bg-muted transition-colors`}
              style={{
                left: `${node.x}px`,
                top: `${node.y}px`,
                transform: 'translate(-50%, -50%)',
                maxWidth: '200px'
              }}
              onClick={(e) => handleNodeClick(node.id, e)}
              onMouseDown={(e) => handleStartDrag(node.id, e)}
            >
              {node.id === selectedNode ? (
                <Input
                  type="text"
                  value={node.text}
                  onChange={(e) => handleUpdateNodeText(node.id, e.target.value)}
                  className="bg-black/20 border-none text-center p-1"
                  autoFocus
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <div>{node.text}</div>
              )}
              
              {node.id === selectedNode && !isConnecting && (
                <div 
                  className="absolute -right-2 -bottom-2 w-4 h-4 bg-crimson rounded-full cursor-pointer border border-white"
                  onClick={(e) => handleStartConnection(node.id, e)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 text-xs text-muted-foreground">
        {isConnecting 
          ? "Click on two nodes to connect them. Click empty space to cancel." 
          : "Add nodes and drag them to position. Select a node to edit or delete."}
      </div>
    </div>
  );
};

export default MindMap;
