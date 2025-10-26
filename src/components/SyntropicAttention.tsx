import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { SyntropicAttentionLayer, randomMatrix } from '@/lib/syntropicAttention';

export default function SyntropicAttention() {
  const [dModel] = useState(8);
  const [seqLen] = useState(10);
  const [coherenceThreshold, setCoherenceThreshold] = useState([0.7]);
  const [attentionWeights, setAttentionWeights] = useState<number[][]>([]);

  const runAttention = () => {
    const Q = randomMatrix(seqLen, dModel);
    const K = randomMatrix(seqLen, dModel);
    const V = randomMatrix(seqLen, dModel);
    const layer = new SyntropicAttentionLayer(dModel, coherenceThreshold[0]);
    const result = layer.forward(Q, K, V);
    setAttentionWeights(result.attentionWeights);
  };

  const getColor = (value: number) => {
    const intensity = Math.abs(value);
    const hue = value > 0 ? 280 : 180;
    return `hsl(${hue}, 70%, ${50 + intensity * 30}%)`;
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <Card className="max-w-4xl mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Syntropic Attention Layer</h1>
          <p className="text-muted-foreground">
            Interactive prototype with golden ratio phase modulation and coherence masking
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Coherence Threshold: {coherenceThreshold[0].toFixed(2)}
            </label>
            <Slider
              value={coherenceThreshold}
              onValueChange={setCoherenceThreshold}
              min={0}
              max={1}
              step={0.05}
              className="w-full"
            />
          </div>

          <Button onClick={runAttention} className="w-full">
            Run Syntropic Attention
          </Button>
        </div>

        {attentionWeights.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Attention Weights Visualization</h2>
            <div className="overflow-x-auto">
              <div className="inline-block border border-border rounded-lg p-2">
                {attentionWeights.map((row, i) => (
                  <div key={i} className="flex">
                    {row.map((val, j) => (
                      <div
                        key={j}
                        className="w-12 h-12 flex items-center justify-center text-xs font-mono border border-border"
                        style={{ backgroundColor: getColor(val) }}
                        title={`[${i},${j}]: ${val.toFixed(3)}`}
                      >
                        {val.toFixed(2)}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Parameters:</strong>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  <li>d_model: {dModel}</li>
                  <li>sequence_length: {seqLen}</li>
                  <li>coherence_threshold: {coherenceThreshold[0].toFixed(2)}</li>
                  <li>golden_ratio_phase: φ = 1.618</li>
                </ul>
              </div>
              <div>
                <strong>Metrics:</strong>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  <li>Active weights: {attentionWeights.flat().filter(v => v > 0).length}</li>
                  <li>Sparsity: {(1 - attentionWeights.flat().filter(v => v > 0).length / (seqLen * seqLen)).toFixed(2)}</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="text-sm text-muted-foreground space-y-2">
          <p><strong>Algorithm:</strong></p>
          <ol className="list-decimal list-inside space-y-1 ml-2">
            <li>Compute attention scores: Q @ K^T</li>
            <li>Apply golden ratio phase twist: scores × cos(2π × φ)</li>
            <li>Scale by 1/√d_model</li>
            <li>Apply coherence mask: keep only values &