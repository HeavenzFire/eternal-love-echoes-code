// Syntropic Attention Layer Implementation
export class SyntropicAttentionLayer {
  dModel: number;
  coherenceThreshold: number;
  goldenRatio: number = 1.618;

  constructor(dModel: number, coherenceThreshold: number = 0.7) {
    this.dModel = dModel;
    this.coherenceThreshold = coherenceThreshold;
  }

  matmul(a: number[][], b: number[][]): number[][] {
    const result: number[][] = [];
    for (let i = 0; i < a.length; i++) {
      result[i] = [];
      for (let j = 0; j < b[0].length; j++) {
        let sum = 0;
        for (let k = 0; k < b.length; k++) {
          sum += a[i][k] * b[k][j];
        }
        result[i][j] = sum;
      }
    }
    return result;
  }

  transpose(matrix: number[][]): number[][] {
    return matrix[0].map((_, i) => matrix.map(row => row[i]));
  }

  applyPhase(scores: number[][]): number[][] {
    const phase = Math.cos(2 * Math.PI * this.goldenRatio);
    return scores.map(row => row.map(val => val * phase));
  }

  applyCoherence(scores: number[][]): number[][] {
    return scores.map(row => 
      row.map(val => val > this.coherenceThreshold ? val : 0)
    );
  }

  normalize(scores: number[][]): number[][] {
    return scores.map(row => {
      const sum = row.reduce((a, b) => a + Math.abs(b), 0) + 1e-9;
      return row.map(val => val / sum);
    });
  }

  forward(Q: number[][], K: number[][], V: number[][]): {
    output: number[][];
    attentionWeights: number[][];
  } {
    const KT = this.transpose(K);
    let scores = this.matmul(Q, KT);
    scores = this.applyPhase(scores);
    const scale = 1 / Math.sqrt(this.dModel);
    scores = scores.map(row => row.map(val => val * scale));
    scores = this.applyCoherence(scores);
    const attentionWeights = this.normalize(scores);
    const output = this.matmul(attentionWeights, V);
    return { output, attentionWeights };
  }
}

export function randomMatrix(rows: number, cols: number): number[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => Math.random() * 2 - 1)
  );
}
