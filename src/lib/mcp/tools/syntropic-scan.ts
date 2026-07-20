import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

// Golden-ratio phase-locked coherence probe: mirrors the app's syntropic engine
// signature (suppression band 0.82–0.88) as a read-only diagnostic.
const PHI = (1 + Math.sqrt(5)) / 2;

export default defineTool({
  name: "syntropic_scan",
  title: "Syntropic Resonance Scan",
  description:
    "Run a resonance scan over an intent vector. Returns coherence (0–1), syntropy Φ, entropy rate, and suppression band matches.",
  inputSchema: {
    intent: z.string().min(1).describe("Intent phrase to project onto the field."),
    iterations: z.number().int().min(1).max(256).default(32),
  },
  annotations: { readOnlyHint: true, idempotentHint: false, openWorldHint: false },
  handler: ({ intent, iterations }) => {
    let coherence = 0;
    let entropy = 0;
    for (let n = 0; n < iterations; n++) {
      const seed = [...intent].reduce((a, c) => a + c.charCodeAt(0), 0);
      const phase = (seed * PHI + n) % (2 * Math.PI);
      coherence += Math.abs(Math.cos(phase));
      entropy += Math.abs(Math.sin(phase / PHI));
    }
    coherence = coherence / iterations;
    const entropyRate = entropy / iterations;
    const syntropy = Math.exp(coherence) - entropyRate;
    const suppressed = coherence >= 0.82 && coherence <= 0.88;
    const result = {
      intent,
      iterations,
      coherence: Number(coherence.toFixed(4)),
      syntropy: Number(syntropy.toFixed(4)),
      entropyRate: Number(entropyRate.toFixed(4)),
      suppressionBandMatch: suppressed,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      structuredContent: result,
    };
  },
});
