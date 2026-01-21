import { useState, useCallback, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  QuantumParadoxEngine,
  GOLDEN_RATIO,
  type ParadoxState,
  type RealityBranch,
  type FieldState
} from '@/lib/syntropicAttention';
import { 
  Sparkles, 
  Zap, 
  GitBranch, 
  Eye, 
  Infinity, 
  Shield,
  Radio,
  Atom
} from 'lucide-react';

export default function QuantumParadoxDashboard() {
  const [engine] = useState(() => new QuantumParadoxEngine());
  const [paradoxState, setParadoxState] = useState<ParadoxState | null>(null);
  const [fieldState, setFieldState] = useState<FieldState | null>(null);
  const [branches, setBranches] = useState<RealityBranch[]>([]);
  const [isExploiting, setIsExploiting] = useState(false);
  const [autoExploit, setAutoExploit] = useState(false);
  const [phaseShiftResult, setPhaseShiftResult] = useState<{
    paradoxDetected: boolean;
    resolution: string;
    realityStatus: string;
  } | null>(null);
  const [tunnelingResult, setTunnelingResult] = useState<{
    success: boolean;
    tunnelingProbability: number;
    dimensionalShift: number;
    newRealityState: string;
  } | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const branchCanvasRef = useRef<HTMLCanvasElement>(null);

  // Exploit the paradox
  const exploitParadox = useCallback(() => {
    setIsExploiting(true);
    
    const result = engine.exploitParadox();
    setParadoxState(result);
    setFieldState(engine.getFieldState());
    setBranches([...engine.getActiveBranches(), ...engine.getEntangledBranches()]);
    
    setIsExploiting(false);
  }, [engine]);

  // Phase shift
  const executePhaseShift = useCallback(() => {
    const result = engine.phaseShift();
    setPhaseShiftResult(result);
    setFieldState(engine.getFieldState());
  }, [engine]);

  // Quantum tunneling
  const executeTunneling = useCallback(() => {
    const result = engine.quantumTunnel();
    setTunnelingResult(result);
    setFieldState(engine.getFieldState());
  }, [engine]);

  // Auto exploit
  useEffect(() => {
    if (!autoExploit) return;
    const interval = setInterval(exploitParadox, 1500);
    return () => clearInterval(interval);
  }, [autoExploit, exploitParadox]);

  // Paradox visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    let animationFrame: number;
    let phase = 0;

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      const coherence = fieldState?.coherence || 0.5;
      const exploitation = paradoxState?.exploitationLevel || 0;

      // Draw quantum superposition rings
      for (let i = 0; i < 5; i++) {
        const radius = 30 + i * 25 + Math.sin(phase + i) * 10;
        const alpha = 0.3 + coherence * 0.4;
        
        // Classical state ring (red/orange)
        ctx.strokeStyle = `hsla(${20 + i * 10}, 80%, 50%, ${alpha * 0.5})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX - 50, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Quantum state ring (violet/cyan)
        ctx.strokeStyle = `hsla(${280 - i * 15}, 80%, 60%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(centerX + 50, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw entanglement lines when paradox is exploited
      if (exploitation > 0) {
        ctx.strokeStyle = `hsla(300, 80%, 60%, ${exploitation})`;
        ctx.lineWidth = 1;
        for (let i = 0; i < 12; i++) {
          const angle = (i / 12) * Math.PI * 2 + phase;
          ctx.beginPath();
          ctx.moveTo(centerX - 50 + Math.cos(angle) * 80, centerY + Math.sin(angle) * 80);
          ctx.lineTo(centerX + 50 + Math.cos(angle + Math.PI) * 80, centerY + Math.sin(angle + Math.PI) * 80);
          ctx.stroke();
        }
      }

      // Draw reality anchor point
      if (paradoxState?.realityAnchor) {
        ctx.fillStyle = '#22c55e';
        ctx.shadowColor = '#22c55e';
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 8 + Math.sin(phase * 2) * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Labels
      ctx.fillStyle = '#ef4444';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('CLASSICAL', centerX - 50, height - 20);
      
      ctx.fillStyle = '#8b5cf6';
      ctx.fillText('QUANTUM', centerX + 50, height - 20);

      phase += 0.02;
      animationFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationFrame);
  }, [fieldState, paradoxState]);

  // Branch visualization
  useEffect(() => {
    const canvas = branchCanvasRef.current;
    if (!canvas || branches.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
    ctx.fillRect(0, 0, width, height);

    const centerY = height / 2;
    const branchSpacing = height / (Math.min(branches.length, 20) + 1);

    // Draw trunk
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(40, centerY);
    ctx.lineTo(80, centerY);
    ctx.stroke();

    // Draw branches
    branches.slice(0, 20).forEach((branch, idx) => {
      const y = branchSpacing * (idx + 1);
      const endX = 100 + branch.syntropicPotential * 50;
      
      // Branch line
      ctx.strokeStyle = branch.status === 'ACTIVE' 
        ? `hsla(160, 70%, 50%, ${branch.probability * 5})`
        : `hsla(280, 70%, 50%, ${branch.probability * 5})`;
      ctx.lineWidth = 1 + branch.syntropicPotential * 0.3;
      ctx.beginPath();
      ctx.moveTo(80, centerY);
      ctx.quadraticCurveTo(90, y, endX, y);
      ctx.stroke();

      // Branch endpoint
      ctx.fillStyle = branch.status === 'ACTIVE' ? '#22c55e' : '#8b5cf6';
      ctx.beginPath();
      ctx.arc(endX, y, 3, 0, Math.PI * 2);
      ctx.fill();

      // Branch label
      if (idx < 8) {
        ctx.fillStyle = '#71717a';
        ctx.font = '8px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`Φ=${branch.syntropicPotential.toFixed(2)}`, endX + 8, y + 3);
      }
    });

    // Origin point
    ctx.fillStyle = paradoxState?.classicalState === 'FAILED' ? '#ef4444' : '#22c55e';
    ctx.shadowColor = ctx.fillStyle;
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(40, centerY, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Legend
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '10px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`${branches.length} REALITY BRANCHES`, 10, 20);
    ctx.fillText(`Total Φ: ${engine.getTotalSyntropicOutput().toFixed(2)}`, 10, 35);

  }, [branches, paradoxState, engine]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-4">
      {/* Header */}
      <Card className="p-6 bg-background/90 backdrop-blur border-fuchsia-500/30">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-2">
              <Atom className="w-6 h-6 text-fuchsia-400 animate-pulse" />
              Quantum Paradox Exploitation Engine
            </h2>
            <p className="text-sm text-muted-foreground">
              PHASE SHIFT PARADOX → DIMENSIONAL FRACTURE → REALITY BRANCHING
            </p>
          </div>
          {paradoxState && (
            <Badge className={paradoxState.entropyNullified 
              ? 'bg-green-500/20 text-green-400 border-green-500/50 animate-pulse' 
              : 'bg-amber-500/20 text-amber-400 border-amber-500/50'}>
              {paradoxState.entropyNullified ? '⚡ ENTROPY NULLIFIED' : '◌ PROCESSING'}
            </Badge>
          )}
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
          <Button 
            onClick={exploitParadox}
            className="bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-500 hover:to-violet-500"
            disabled={isExploiting}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {isExploiting ? 'Exploiting...' : 'Exploit Paradox'}
          </Button>
          
          <Button onClick={executePhaseShift} variant="outline" className="border-violet-500/50">
            <Zap className="w-4 h-4 mr-2" />
            Phase Shift
          </Button>
          
          <Button onClick={executeTunneling} variant="outline" className="border-cyan-500/50">
            <Infinity className="w-4 h-4 mr-2" />
            Quantum Tunnel
          </Button>
          
          <Button
            onClick={() => setAutoExploit(!autoExploit)}
            variant={autoExploit ? 'destructive' : 'secondary'}
          >
            <Radio className={`w-4 h-4 mr-2 ${autoExploit ? 'animate-pulse' : ''}`} />
            {autoExploit ? 'Stop Auto' : 'Auto Exploit'}
          </Button>
        </div>

        {/* Paradox State Display */}
        {paradoxState && (
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-4 h-4 text-fuchsia-400" />
                <span className="font-medium text-fuchsia-400">OBSERVATION RESULT</span>
              </div>
              <p className="text-lg font-mono text-white mb-2">{paradoxState.observedReality}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="text-muted-foreground">
                  Classical: <span className={paradoxState.classicalState === 'FAILED' ? 'text-red-400' : 'text-green-400'}>
                    {paradoxState.classicalState}
                  </span>
                </span>
                <span className="text-muted-foreground">
                  Quantum: <span className="text-violet-400">{paradoxState.quantumState}</span>
                </span>
                <span className="text-muted-foreground">
                  Branches: <span className="text-cyan-400">{paradoxState.branchesCreated}</span>
                </span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium text-green-400">REALITY ANCHOR</span>
                </div>
                <span className="font-mono text-green-400 text-lg">{paradoxState.realityAnchor}</span>
              </div>
            </div>
          </div>
        )}

        {/* Phase Shift Result */}
        {phaseShiftResult && (
          <div className="mt-4 p-4 rounded-lg bg-violet-500/10 border border-violet-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-violet-400" />
              <span className="font-medium text-violet-400">PHASE SHIFT RESULT</span>
              {phaseShiftResult.paradoxDetected && (
                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/50">
                  PARADOX DETECTED
                </Badge>
              )}
            </div>
            <p className="text-sm text-white mb-1">{phaseShiftResult.resolution}</p>
            <p className="text-xs text-muted-foreground">{phaseShiftResult.realityStatus}</p>
          </div>
        )}

        {/* Tunneling Result */}
        {tunnelingResult && (
          <div className="mt-4 p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Infinity className="w-4 h-4 text-cyan-400" />
              <span className="font-medium text-cyan-400">QUANTUM TUNNELING</span>
              <Badge className={tunnelingResult.success 
                ? 'bg-green-500/20 text-green-400 border-green-500/50' 
                : 'bg-amber-500/20 text-amber-400 border-amber-500/50'}>
                {tunnelingResult.newRealityState}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Tunneling Probability: </span>
                <span className="text-cyan-400 font-mono">{tunnelingResult.tunnelingProbability.toFixed(4)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Dimensional Shift: </span>
                <span className="text-cyan-400 font-mono">{tunnelingResult.dimensionalShift.toFixed(4)}</span>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Superposition Visualization */}
        <Card className="p-4 bg-background/90 backdrop-blur border-violet-500/30">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Atom className="w-4 h-4 text-violet-400" />
            Quantum Superposition State
          </h3>
          <canvas 
            ref={canvasRef} 
            width={400} 
            height={250}
            className="w-full rounded-lg bg-black/50"
          />
          <div className="mt-3 text-xs text-muted-foreground text-center">
            Classical ↔ Quantum entanglement visualization
          </div>
        </Card>

        {/* Reality Branches */}
        <Card className="p-4 bg-background/90 backdrop-blur border-green-500/30">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-green-400" />
            Reality Branch Tree
          </h3>
          <canvas 
            ref={branchCanvasRef} 
            width={400} 
            height={250}
            className="w-full rounded-lg bg-black/50"
          />
          <div className="mt-3 flex justify-between text-xs text-muted-foreground">
            <span>Active: {branches.filter(b => b.status === 'ACTIVE').length}</span>
            <span>Entangled: {branches.filter(b => b.status === 'ENTANGLED').length}</span>
            <span>φ = {GOLDEN_RATIO.toFixed(6)}</span>
          </div>
        </Card>
      </div>

      {/* Field Metrics */}
      {fieldState && (
        <Card className="p-4 bg-background/90 backdrop-blur border-primary/30">
          <h3 className="text-sm font-medium mb-3">Field State After Paradox Exploitation</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-violet-500/10 border border-violet-500/30">
              <div className="text-xs text-muted-foreground">Coherence</div>
              <div className="text-xl font-mono text-violet-400">{fieldState.coherence.toFixed(4)}</div>
              <Progress value={fieldState.coherence * 100} className="h-1 mt-1" />
            </div>
            <div className="p-3 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/30">
              <div className="text-xs text-muted-foreground">Coupling (Λ)</div>
              <div className="text-xl font-mono text-fuchsia-400">{fieldState.coupling.toFixed(4)}</div>
            </div>
            <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
              <div className="text-xs text-muted-foreground">Syntropy (Φ)</div>
              <div className="text-xl font-mono text-cyan-400">{fieldState.syntropicPotential.toFixed(2)}</div>
            </div>
            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
              <div className="text-xs text-muted-foreground">ΔS/Δt (Negative = Syntropic)</div>
              <div className="text-xl font-mono text-green-400">{fieldState.entropyRate.toFixed(4)} J/K·s</div>
            </div>
          </div>
        </Card>
      )}

      {/* Operating Principles */}
      <Card className="p-4 bg-gradient-to-r from-fuchsia-500/5 via-violet-500/5 to-cyan-500/5 border-violet-500/30">
        <h3 className="text-sm font-medium mb-3 text-violet-400">THE NEW OPERATING PRINCIPLE</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="p-3 rounded bg-black/30">
            <div className="text-fuchsia-400 font-medium mb-1">Every "error" is a</div>
            <div className="text-white">REALITY BRANCHING POINT</div>
          </div>
          <div className="p-3 rounded bg-black/30">
            <div className="text-violet-400 font-medium mb-1">Every "failure" is a</div>
            <div className="text-white">QUANTUM MEASUREMENT OPPORTUNITY</div>
          </div>
          <div className="p-3 rounded bg-black/30">
            <div className="text-cyan-400 font-medium mb-1">Every "constraint" is a</div>
            <div className="text-white">DIMENSIONAL DOORWAY</div>
          </div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground text-center">
          The phase shift didn't fail—it succeeded beyond the system's ability to comprehend.
        </p>
      </Card>
    </div>
  );
}
