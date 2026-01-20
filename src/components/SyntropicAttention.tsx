import { useState, useCallback, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  SyntropicAttentionLayer,
  SovereignRealityCompiler,
  FieldDynamicsMonitor,
  MatrixResolutionEngine,
  randomMatrix,
  GOLDEN_RATIO,
  SOVEREIGN_FREQUENCY,
  type FieldState,
  type CompilationResult
} from '@/lib/syntropicAttention';

interface SyntropicAttentionProps {
  onComplete?: (data: any) => void;
}

export default function SyntropicAttention({ onComplete }: SyntropicAttentionProps) {
  const [dModel] = useState(12);
  const [seqLen] = useState(12);
  const [coherenceThreshold, setCoherenceThreshold] = useState([0.7]);
  const [attentionWeights, setAttentionWeights] = useState<number[][]>([]);
  const [fieldState, setFieldState] = useState<FieldState | null>(null);
  const [compilationResult, setCompilationResult] = useState<CompilationResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [autoRun, setAutoRun] = useState(false);

  // Instant execution - zero throttling
  const runAttention = useCallback(() => {
    const Q = randomMatrix(seqLen, dModel);
    const K = randomMatrix(seqLen, dModel);
    const V = randomMatrix(seqLen, dModel);
    const layer = new SyntropicAttentionLayer(dModel, coherenceThreshold[0]);
    const result = layer.forward(Q, K, V);
    setAttentionWeights(result.attentionWeights);
    setFieldState(result.fieldState);

    if (onComplete) {
      onComplete({
        type: 'SYNTROPIC_ATTENTION',
        weights: result.attentionWeights,
        fieldState: result.fieldState,
        syntropicPotential: result.syntropicPotential
      });
    }
  }, [seqLen, dModel, coherenceThreshold, onComplete]);

  // Full reality compilation cycle
  const runCompilation = useCallback(() => {
    setIsRunning(true);
    const compiler = new SovereignRealityCompiler();
    const result = compiler.executeCycle('Proceed with evolution');
    setCompilationResult(result);
    setIsRunning(false);

    if (onComplete) {
      onComplete({
        type: 'REALITY_COMPILATION',
        result
      });
    }
  }, [onComplete]);

  // Matrix resolution
  const runMatrixResolution = useCallback(() => {
    const engine = new MatrixResolutionEngine();
    const result = engine.runConvergenceSimulation('CASE_ALPHA', 7);

    if (onComplete) {
      onComplete({
        type: 'MATRIX_RESOLUTION',
        result
      });
    }

    setFieldState(result.fieldState);
  }, [onComplete]);

  // Auto-run when enabled
  useEffect(() => {
    if (!autoRun) return;
    const interval = setInterval(runAttention, 100);
    return () => clearInterval(interval);
  }, [autoRun, runAttention]);

  const getColor = (value: number) => {
    const intensity = Math.min(Math.abs(value) * 2, 1);
    if (value > 0.5) return `hsl(280, 80%, ${40 + intensity * 30}%)`; // Violet
    if (value > 0.2) return `hsl(200, 70%, ${40 + intensity * 30}%)`; // Cyan
    if (value > 0) return `hsl(160, 60%, ${40 + intensity * 30}%)`; // Teal
    return 'hsl(0, 0%, 20%)';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPTIMAL': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'ALIGNED': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      default: return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-4">
      <Card className="p-6 bg-background/80 backdrop-blur border-primary/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Syntropic Attention Layer
            </h2>
            <p className="text-sm text-muted-foreground">
              Sovereign Reality Compiler • φ = {GOLDEN_RATIO.toFixed(6)} • {SOVEREIGN_FREQUENCY}Hz
            </p>
          </div>
          {fieldState && (
            <Badge className={getStatusColor(
              fieldState.entropyRate < 0 ? 'OPTIMAL' : 'ALIGNED'
            )}>
              {fieldState.entropyRate < 0 ? '⚡ SYNTROPIC' : '◐ ALIGNING'}
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-3">
            <label className="text-sm font-medium block">
              Coherence Threshold: {coherenceThreshold[0].toFixed(2)}
            </label>
            <Slider
              value={coherenceThreshold}
              onValueChange={setCoherenceThreshold}
              min={0}
              max={1}
              step={0.01}
              className="w-full"
            />
          </div>

          <div className="flex items-end gap-2">
            <Button onClick={runAttention} className="flex-1" variant="default">
              Run Attention
            </Button>
            <Button onClick={runCompilation} className="flex-1" variant="outline" disabled={isRunning}>
              {isRunning ? 'Compiling...' : 'Compile Reality'}
            </Button>
            <Button
              onClick={() => setAutoRun(!autoRun)}
              variant={autoRun ? 'destructive' : 'secondary'}
              size="sm"
            >
              {autoRun ? 'Stop' : 'Auto'}
            </Button>
          </div>
        </div>

        {fieldState && (
          <div className="grid grid-cols-4 gap-3 mb-4">
            <div className="p-3 rounded-lg bg-violet-500/10 border border-violet-500/20">
              <div className="text-xs text-muted-foreground">Coherence</div>
              <div className="text-lg font-mono text-violet-400">
                {fieldState.coherence.toFixed(4)}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
              <div className="text-xs text-muted-foreground">Coupling (Λ)</div>
              <div className="text-lg font-mono text-cyan-400">
                {fieldState.coupling.toFixed(4)}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="text-xs text-muted-foreground">Syntropy (Φ)</div>
              <div className="text-lg font-mono text-green-400">
                {fieldState.syntropicPotential.toFixed(4)}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="text-xs text-muted-foreground">ΔS/Δt</div>
              <div className="text-lg font-mono text-blue-400">
                {fieldState.entropyRate.toFixed(4)} J/K·s
              </div>
            </div>
          </div>
        )}

        {compilationResult && (
          <div className="mb-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Reality Compilation Result</span>
              <Badge variant={compilationResult.success ? 'default' : 'destructive'}>
                {compilationResult.success ? '✓ MANIFESTED' : '✗ BLOCKED'}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{compilationResult.manifestation}</p>
            <div className="flex gap-4 text-xs">
              <span>Φ: {compilationResult.syntropicPotential.toFixed(2)}</span>
              <span>Integrity: {compilationResult.fieldIntegrity.status}</span>
              <span>Latency: {compilationResult.executionTime.toFixed(2)}ms</span>
            </div>
          </div>
        )}

        {attentionWeights.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Attention Field Visualization</h3>
              <div className="text-xs text-muted-foreground">
                Active: {attentionWeights.flat().filter(v => v > 0).length} / {seqLen * seqLen}
              </div>
            </div>
            <div className="overflow-x-auto">
              <div className="inline-grid gap-px p-2 rounded-lg bg-black/50" style={{
                gridTemplateColumns: `repeat(${seqLen}, minmax(0, 1fr))`
              }}>
                {attentionWeights.flat().map((val, idx) => (
                  <div
                    key={idx}
                    className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-[8px] md:text-[10px] font-mono rounded-sm transition-colors"
                    style={{ backgroundColor: getColor(val) }}
                    title={`${val.toFixed(4)}`}
                  >
                    {val > 0.01 ? val.toFixed(1) : ''}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs mt-4">
              <div className="space-y-1">
                <div className="font-medium text-muted-foreground">Parameters</div>
                <div>d_model: {dModel}</div>
                <div>sequence_length: {seqLen}</div>
                <div>coherence_threshold: {coherenceThreshold[0].toFixed(2)}</div>
                <div>golden_ratio_phase: φ = {GOLDEN_RATIO.toFixed(6)}</div>
              </div>
              <div className="space-y-1">
                <div className="font-medium text-muted-foreground">Metrics</div>
                <div>Active weights: {attentionWeights.flat().filter(v => v > 0).length}</div>
                <div>Sparsity: {(1 - attentionWeights.flat().filter(v => v > 0).length / (seqLen * seqLen)).toFixed(3)}</div>
                <div>Max attention: {Math.max(...attentionWeights.flat()).toFixed(4)}</div>
                <div>Mean attention: {(attentionWeights.flat().reduce((a, b) => a + b, 0) / attentionWeights.flat().length).toFixed(4)}</div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="flex gap-2">
            <Button onClick={runMatrixResolution} size="sm" variant="ghost" className="text-xs">
              Matrix Resolution
            </Button>
            <Button onClick={() => {
              const monitor = new FieldDynamicsMonitor();
              const result = monitor.fieldIntegrityScan();
              if (onComplete) onComplete({ type: 'FIELD_SCAN', result });
            }} size="sm" variant="ghost" className="text-xs">
              Field Integrity Scan
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
