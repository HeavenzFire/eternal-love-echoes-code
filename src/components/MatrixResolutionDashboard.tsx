import { useState, useCallback, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import {
  MatrixResolutionEngine,
  FieldDynamicsMonitor,
  SyntropicMath,
  GOLDEN_RATIO,
  SOVEREIGN_FREQUENCY,
  type FieldState,
  type ResolutionResult
} from '@/lib/syntropicAttention';
import { Activity, Zap, Target, TrendingUp, Radio, Shield } from 'lucide-react';

interface TimelinePoint {
  timestamp: number;
  iteration: number;
  amplification: number;
  coherence: number;
  syntropicPotential: number;
  entropyRate: number;
}

export default function MatrixResolutionDashboard() {
  const [iterations, setIterations] = useState([7]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentIteration, setCurrentIteration] = useState(0);
  const [timeline, setTimeline] = useState<TimelinePoint[]>([]);
  const [resolutionResult, setResolutionResult] = useState<ResolutionResult | null>(null);
  const [liveFieldState, setLiveFieldState] = useState<FieldState | null>(null);
  const [autoSimulate, setAutoSimulate] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const waveformRef = useRef<HTMLCanvasElement>(null);

  // Run full convergence simulation with timeline tracking
  const runConvergence = useCallback(() => {
    setIsRunning(true);
    setTimeline([]);
    setCurrentIteration(0);

    const engine = new MatrixResolutionEngine();
    const monitor = new FieldDynamicsMonitor();
    const maxIterations = iterations[0];
    const newTimeline: TimelinePoint[] = [];

    // Instant execution - simulate all iterations
    for (let n = 1; n <= maxIterations; n++) {
      const amplification = Math.exp(n);
      const coherence = Math.min(1.0, 0.6 + (n / maxIterations) * 0.4);
      const syntropicPotential = coherence * amplification * GOLDEN_RATIO;
      const entropyRate = -0.031 * n;

      newTimeline.push({
        timestamp: Date.now() + n,
        iteration: n,
        amplification,
        coherence,
        syntropicPotential,
        entropyRate
      });

      monitor.updateField({
        coherence,
        syntropicPotential,
        entropyRate,
        coupling: GOLDEN_RATIO * amplification
      });
    }

    setTimeline(newTimeline);
    setCurrentIteration(maxIterations);

    // Get final result
    const result = engine.runConvergenceSimulation('MATRIX_ALPHA', maxIterations);
    setResolutionResult(result);
    setLiveFieldState(result.fieldState);
    setIsRunning(false);
  }, [iterations]);

  // Auto simulation mode
  useEffect(() => {
    if (!autoSimulate) return;
    const interval = setInterval(runConvergence, 2000);
    return () => clearInterval(interval);
  }, [autoSimulate, runConvergence]);

  // Draw amplification graph
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || timeline.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;

    // Clear
    ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
    ctx.fillRect(0, 0, width, height);

    // Find max values
    const maxAmp = Math.max(...timeline.map(t => t.amplification));
    const maxPhi = Math.max(...timeline.map(t => t.syntropicPotential));

    // Draw grid
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding + (height - padding * 2) * (i / 5);
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw e^n amplification curve
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#8b5cf6';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    timeline.forEach((point, idx) => {
      const x = padding + (width - padding * 2) * (idx / (timeline.length - 1 || 1));
      const y = height - padding - (height - padding * 2) * (point.amplification / maxAmp);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Draw syntropic potential curve
    ctx.strokeStyle = '#06b6d4';
    ctx.shadowColor = '#06b6d4';
    ctx.beginPath();
    timeline.forEach((point, idx) => {
      const x = padding + (width - padding * 2) * (idx / (timeline.length - 1 || 1));
      const y = height - padding - (height - padding * 2) * (point.syntropicPotential / maxPhi);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Draw coherence curve
    ctx.strokeStyle = '#22c55e';
    ctx.shadowColor = '#22c55e';
    ctx.lineWidth = 2;
    ctx.beginPath();
    timeline.forEach((point, idx) => {
      const x = padding + (width - padding * 2) * (idx / (timeline.length - 1 || 1));
      const y = height - padding - (height - padding * 2) * point.coherence;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    ctx.shadowBlur = 0;

    // Draw data points
    timeline.forEach((point, idx) => {
      const x = padding + (width - padding * 2) * (idx / (timeline.length - 1 || 1));
      const yAmp = height - padding - (height - padding * 2) * (point.amplification / maxAmp);

      ctx.beginPath();
      ctx.arc(x, yAmp, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#8b5cf6';
      ctx.fill();
    });

    // Labels
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '10px monospace';
    ctx.textAlign = 'center';
    timeline.forEach((point, idx) => {
      const x = padding + (width - padding * 2) * (idx / (timeline.length - 1 || 1));
      ctx.fillText(`n=${point.iteration}`, x, height - 10);
    });

    // Y-axis labels
    ctx.textAlign = 'right';
    ctx.fillText(`e^${iterations[0]}`, padding - 5, padding + 10);
    ctx.fillText('0', padding - 5, height - padding);

    // Legend
    ctx.textAlign = 'left';
    ctx.fillStyle = '#8b5cf6';
    ctx.fillText('● e^n Amplification', width - 130, 20);
    ctx.fillStyle = '#06b6d4';
    ctx.fillText('● Φ Syntropy', width - 130, 35);
    ctx.fillStyle = '#22c55e';
    ctx.fillText('● Coherence', width - 130, 50);

  }, [timeline, iterations]);

  // Draw waveform visualization
  useEffect(() => {
    const canvas = waveformRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerY = height / 2;

    let animationFrame: number;
    let phase = 0;

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);

      const coherence = liveFieldState?.coherence || 0.8;
      const amplitude = 30 * coherence;

      // Main syntropic waveform
      ctx.strokeStyle = `hsla(280, 80%, 60%, ${coherence})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const freq = GOLDEN_RATIO * 0.05;
        const y = centerY + Math.sin(x * freq + phase) * amplitude * Math.cos(x * 0.01 + phase * 0.5);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Secondary resonance wave
      ctx.strokeStyle = `hsla(200, 70%, 50%, ${coherence * 0.6})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const freq = GOLDEN_RATIO * 0.08;
        const y = centerY + Math.sin(x * freq - phase * 1.618) * amplitude * 0.5;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      phase += 0.05;
      animationFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationFrame);
  }, [liveFieldState]);

  const formatExponential = (n: number): string => {
    if (n > 1000) return n.toExponential(2);
    return n.toFixed(2);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-4">
      {/* Header */}
      <Card className="p-6 bg-background/90 backdrop-blur border-primary/30">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-2">
              <Target className="w-6 h-6 text-violet-400" />
              Matrix Resolution Dashboard
            </h2>
            <p className="text-sm text-muted-foreground">
              Convergence Simulation • Amplification e^n • Field State Timeline
            </p>
          </div>
          <div className="flex items-center gap-2">
            {resolutionResult && (
              <Badge className={resolutionResult.convergenceAchieved 
                ? 'bg-green-500/20 text-green-400 border-green-500/50' 
                : 'bg-red-500/20 text-red-400 border-red-500/50'}>
                {resolutionResult.convergenceAchieved ? '⚡ CONVERGED' : '◌ PENDING'}
              </Badge>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Zap className="w-4 h-4 text-violet-400" />
              Iterations (n): {iterations[0]}
            </label>
            <Slider
              value={iterations}
              onValueChange={setIterations}
              min={1}
              max={12}
              step={1}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Max amplification: e^{iterations[0]} = {formatExponential(Math.exp(iterations[0]))}
            </p>
          </div>

          <div className="flex items-end gap-2">
            <Button 
              onClick={runConvergence} 
              className="flex-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500"
              disabled={isRunning}
            >
              <Activity className="w-4 h-4 mr-2" />
              {isRunning ? 'Resolving...' : 'Run Convergence'}
            </Button>
          </div>

          <div className="flex items-end gap-2">
            <Button
              onClick={() => setAutoSimulate(!autoSimulate)}
              variant={autoSimulate ? 'destructive' : 'outline'}
              className="flex-1"
            >
              <Radio className={`w-4 h-4 mr-2 ${autoSimulate ? 'animate-pulse' : ''}`} />
              {autoSimulate ? 'Stop Auto' : 'Auto Simulate'}
            </Button>
          </div>
        </div>

        {/* Live Metrics */}
        {liveFieldState && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            <div className="p-3 rounded-lg bg-violet-500/10 border border-violet-500/30">
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Shield className="w-3 h-3" /> Coherence (C)
              </div>
              <div className="text-xl font-mono text-violet-400">
                {liveFieldState.coherence.toFixed(4)}
              </div>
              <Progress value={liveFieldState.coherence * 100} className="h-1 mt-1" />
            </div>
            <div className="p-3 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/30">
              <div className="text-xs text-muted-foreground">Coupling (Λ)</div>
              <div className="text-xl font-mono text-fuchsia-400">
                {formatExponential(liveFieldState.coupling)}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
              <div className="text-xs text-muted-foreground">Syntropy (Φ)</div>
              <div className="text-xl font-mono text-cyan-400">
                {formatExponential(liveFieldState.syntropicPotential)}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
              <div className="text-xs text-muted-foreground">ΔS/Δt</div>
              <div className="text-xl font-mono text-green-400">
                {liveFieldState.entropyRate.toFixed(4)}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <div className="text-xs text-muted-foreground">e^n Factor</div>
              <div className="text-xl font-mono text-amber-400">
                {resolutionResult ? formatExponential(resolutionResult.amplificationFactor) : '—'}
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Amplification Graph */}
        <Card className="p-4 bg-background/90 backdrop-blur border-primary/30">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-violet-400" />
            Exponential Amplification Timeline
          </h3>
          <canvas 
            ref={canvasRef} 
            width={500} 
            height={250}
            className="w-full rounded-lg"
          />
          {timeline.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <div className="text-center p-2 rounded bg-violet-500/10">
                <div className="text-muted-foreground">Start</div>
                <div className="font-mono text-violet-400">e^1 = {Math.exp(1).toFixed(2)}</div>
              </div>
              <div className="text-center p-2 rounded bg-fuchsia-500/10">
                <div className="text-muted-foreground">Peak</div>
                <div className="font-mono text-fuchsia-400">e^{iterations[0]} = {formatExponential(Math.exp(iterations[0]))}</div>
              </div>
              <div className="text-center p-2 rounded bg-cyan-500/10">
                <div className="text-muted-foreground">Φ Output</div>
                <div className="font-mono text-cyan-400">{formatExponential(timeline[timeline.length - 1]?.syntropicPotential || 0)}</div>
              </div>
            </div>
          )}
        </Card>

        {/* Waveform Visualization */}
        <Card className="p-4 bg-background/90 backdrop-blur border-primary/30">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            Field Resonance Waveform
          </h3>
          <canvas 
            ref={waveformRef} 
            width={500} 
            height={250}
            className="w-full rounded-lg bg-black/50"
          />
          <div className="mt-3 flex justify-between text-xs text-muted-foreground">
            <span>φ-locked: {GOLDEN_RATIO.toFixed(6)} rad</span>
            <span>{SOVEREIGN_FREQUENCY}Hz carrier</span>
          </div>
        </Card>
      </div>

      {/* Resonance Scans */}
      {resolutionResult && resolutionResult.resonanceScans.length > 0 && (
        <Card className="p-4 bg-background/90 backdrop-blur border-primary/30">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Radio className="w-4 h-4 text-green-400" />
            Resonance Suppression Matrix
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {resolutionResult.resonanceScans.map((scan, idx) => (
              <div 
                key={idx}
                className="p-3 rounded-lg bg-black/30 border border-green-500/20"
              >
                <div className="text-xs text-muted-foreground mb-1">{scan.pattern}</div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-green-400">{scan.suppressionValue.toFixed(6)}</span>
                  <Badge variant="outline" className="text-xs border-green-500/50 text-green-400">
                    SUPPRESSED
                  </Badge>
                </div>
                <Progress 
                  value={scan.suppressionValue * 100} 
                  className="h-1 mt-2"
                />
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Timeline Table */}
      {timeline.length > 0 && (
        <Card className="p-4 bg-background/90 backdrop-blur border-primary/30">
          <h3 className="text-sm font-medium mb-3">Field State Timeline</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left p-2 text-muted-foreground">Iteration</th>
                  <th className="text-right p-2 text-violet-400">e^n</th>
                  <th className="text-right p-2 text-green-400">Coherence</th>
                  <th className="text-right p-2 text-cyan-400">Φ (Syntropy)</th>
                  <th className="text-right p-2 text-blue-400">ΔS/Δt</th>
                </tr>
              </thead>
              <tbody>
                {timeline.map((point, idx) => (
                  <tr key={idx} className="border-b border-border/20 hover:bg-primary/5">
                    <td className="p-2 font-mono">n = {point.iteration}</td>
                    <td className="p-2 text-right font-mono text-violet-400">{formatExponential(point.amplification)}</td>
                    <td className="p-2 text-right font-mono text-green-400">{point.coherence.toFixed(4)}</td>
                    <td className="p-2 text-right font-mono text-cyan-400">{formatExponential(point.syntropicPotential)}</td>
                    <td className="p-2 text-right font-mono text-blue-400">{point.entropyRate.toFixed(4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
