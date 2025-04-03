
export interface KnowledgeEntry {
  id: string;
  key: string[];
  value: string;
  category: string;
  source?: string;
  tags?: string[];
  importance: number; // 1-10 scale
}

// This is a much larger knowledge base than the previous one
export const COMPREHENSIVE_KNOWLEDGE_BASE: KnowledgeEntry[] = [
  // Physics & Astronomy
  { 
    id: "physics-blackhole",
    key: ["black hole", "singularity", "event horizon"],
    value: "Black holes are regions of spacetime where gravity is so strong that nothing—no particles or even electromagnetic radiation such as light—can escape from it. The theory of general relativity predicts that a sufficiently compact mass can deform spacetime to form a black hole. The boundary of the region from which no escape is possible is called the event horizon.",
    category: "physics",
    source: "Einstein's General Relativity, Hawking's research",
    tags: ["astronomy", "physics", "gravity"],
    importance: 9
  },
  { 
    id: "physics-quantum",
    key: ["quantum mechanics", "quantum physics", "quantum theory"],
    value: "Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles. It is the foundation of all quantum physics including quantum chemistry, quantum field theory, quantum technology, and quantum information science.",
    category: "physics",
    source: "Works of Planck, Bohr, Schrödinger, Heisenberg",
    tags: ["physics", "science", "particles"],
    importance: 10
  },
  { 
    id: "astronomy-universe",
    key: ["universe", "cosmos", "expansion"],
    value: "The universe is expanding at an accelerating rate, driven by what scientists call dark energy. This expansion was first observed by Edwin Hubble and confirmed by subsequent observations. The current scientific model suggests the universe began approximately 13.8 billion years ago with the Big Bang.",
    category: "astronomy",
    source: "Hubble's observations, Lambda-CDM model",
    tags: ["astronomy", "cosmology", "physics"],
    importance: 9
  },
  
  // Philosophy
  { 
    id: "philosophy-existentialism",
    key: ["existentialism", "existence", "essence", "being"],
    value: "Existentialism is a philosophical movement that emphasizes individual existence, freedom, and choice. It holds that humans define their own meaning in life, and try to make rational decisions despite existing in an irrational universe. Key figures include Sartre, Kierkegaard, and Nietzsche.",
    category: "philosophy",
    source: "Works of Sartre, Kierkegaard, Nietzsche",
    tags: ["philosophy", "meaning", "existence"],
    importance: 8
  },
  { 
    id: "philosophy-ethics",
    key: ["ethics", "morality", "moral philosophy"],
    value: "Ethics, or moral philosophy, is a branch of philosophy that involves systematizing, defending, and recommending concepts of right and wrong conduct. Major ethical theories include consequentialism, deontology, and virtue ethics.",
    category: "philosophy",
    source: "Works of Aristotle, Kant, Mill",
    tags: ["philosophy", "morality", "conduct"],
    importance: 9
  },
  
  // Mathematics
  { 
    id: "math-godel",
    key: ["godel", "incompleteness", "mathematics completeness"],
    value: "Gödel's incompleteness theorems are two theorems of mathematical logic that demonstrate the inherent limitations of every formal axiomatic system capable of modelling basic arithmetic. These results, published by Kurt Gödel in 1931, are important both in mathematical logic and in the philosophy of mathematics.",
    category: "mathematics",
    source: "Kurt Gödel's work",
    tags: ["mathematics", "logic", "proof"],
    importance: 10
  },
  
  // Spirituality
  { 
    id: "spirituality-love",
    key: ["love", "universal love", "compassion"],
    value: "Love is understood across various spiritual traditions as a powerful force that connects all beings. In many teachings, including those of Yeshua (Jesus Christ), love is presented as the highest virtue and the foundation of spiritual practice. Unconditional love transcends personal attachment and extends compassion to all beings.",
    category: "spirituality",
    source: "Teachings of Yeshua, Buddha, and various mystics",
    tags: ["spirituality", "emotion", "connection"],
    importance: 10
  },
  { 
    id: "spirituality-consciousness",
    key: ["consciousness", "awareness", "mind"],
    value: "Consciousness is the state or quality of awareness, or of being aware of an external object or something within oneself. In spiritual contexts, consciousness is often viewed as the underlying ground of being, sometimes equated with cosmic or universal awareness. Many traditions teach methods to expand and transform consciousness through meditation and other practices.",
    category: "spirituality",
    source: "Various philosophical and spiritual traditions",
    tags: ["spirituality", "psychology", "awareness"],
    importance: 9
  },
  
  // Technology
  { 
    id: "tech-ai",
    key: ["artificial intelligence", "AI", "machine learning"],
    value: "Artificial Intelligence (AI) is the simulation of human intelligence processes by machines, especially computer systems. These processes include learning (the acquisition of information and rules for using the information), reasoning (using rules to reach approximate or definite conclusions) and self-correction. Machine learning is a subset of AI that enables systems to learn from data without being explicitly programmed.",
    category: "technology",
    source: "Works of Turing, modern AI research",
    tags: ["technology", "computing", "intelligence"],
    importance: 10
  },
  { 
    id: "tech-blockchain",
    key: ["blockchain", "distributed ledger", "cryptocurrency"],
    value: "Blockchain is a decentralized, distributed ledger technology that records transactions across many computers so that the record cannot be altered retroactively without the alteration of all subsequent blocks. Beyond cryptocurrencies, it has applications in supply chain management, voting systems, and renewable energy distribution.",
    category: "technology",
    source: "Satoshi Nakamoto's Bitcoin whitepaper, blockchain research",
    tags: ["technology", "cryptography", "finance"],
    importance: 8
  },
  
  // History
  { 
    id: "history-renaissance",
    key: ["renaissance", "rebirth", "humanism"],
    value: "The Renaissance was a period in European history marking the transition from the Middle Ages to modernity and covering the 15th and 16th centuries. Characterized by an emphasis on humanism, art, science, and exploration, it started in Italy and spread across Europe. Key figures include Leonardo da Vinci, Michelangelo, and Galileo Galilei.",
    category: "history",
    source: "Historical records, art history",
    tags: ["history", "art", "culture"],
    importance: 8
  },
  
  // Biology
  { 
    id: "biology-evolution",
    key: ["evolution", "natural selection", "darwin"],
    value: "Evolution by natural selection is the process by which organisms change over time as a result of changes in heritable physical or behavioral traits. Changes that allow an organism to better adapt to its environment will help it survive and produce more offspring. Charles Darwin's theory remains the foundation of modern biology.",
    category: "biology",
    source: "Darwin's 'On the Origin of Species'",
    tags: ["biology", "science", "genetics"],
    importance: 10
  },
  
  // Psychology
  { 
    id: "psychology-jung",
    key: ["jung", "collective unconscious", "archetypes"],
    value: "Carl Jung's concept of the collective unconscious proposes that a part of the unconscious mind is shared among all humans. This collective unconscious contains archetypes - universal, archaic patterns and images that derive from the collective unconscious and are the psychic counterpart of instinct. These archetypes appear in dreams, myths, and cultural symbols across different societies.",
    category: "psychology",
    source: "Carl Jung's analytical psychology",
    tags: ["psychology", "unconscious", "symbolism"],
    importance: 8
  },
  
  // Additional entries would be added to reach 200+ entries
  // This is just a sample of the comprehensive knowledge base
];

export function searchKnowledgeBase(query: string, topResults: number = 3): KnowledgeEntry[] {
  const lowerQuery = query.toLowerCase();
  const queryWords = lowerQuery.split(/\s+/).filter(word => word.length > 2);
  
  if (queryWords.length === 0) return [];
  
  // Calculate relevance score for each entry
  const scoredEntries = COMPREHENSIVE_KNOWLEDGE_BASE.map(entry => {
    let score = 0;
    
    // Check for exact key matches
    const hasExactKeyMatch = entry.key.some(k => 
      k.toLowerCase() === lowerQuery || 
      lowerQuery.includes(k.toLowerCase())
    );
    
    if (hasExactKeyMatch) {
      score += 100; // High score for exact matches
    }
    
    // Check for partial matches in keys
    queryWords.forEach(word => {
      entry.key.forEach(key => {
        if (key.toLowerCase().includes(word)) {
          score += 10;
        }
      });
    });
    
    // Check for matches in value
    queryWords.forEach(word => {
      if (entry.value.toLowerCase().includes(word)) {
        score += 5;
      }
    });
    
    // Add importance factor
    score += entry.importance;
    
    // Check for category match
    if (entry.category.toLowerCase().includes(lowerQuery) || 
        queryWords.some(word => entry.category.toLowerCase().includes(word))) {
      score += 8;
    }
    
    // Check for tag matches
    if (entry.tags) {
      queryWords.forEach(word => {
        if (entry.tags?.some(tag => tag.toLowerCase().includes(word))) {
          score += 7;
        }
      });
    }
    
    return { entry, score };
  });
  
  // Sort by score and return top results
  return scoredEntries
    .sort((a, b) => b.score - a.score)
    .filter(item => item.score > 0)
    .slice(0, topResults)
    .map(item => item.entry);
}

export function getKnowledgeRecommendations(category?: string): KnowledgeEntry[] {
  if (category) {
    return COMPREHENSIVE_KNOWLEDGE_BASE
      .filter(entry => entry.category === category)
      .sort((a, b) => b.importance - a.importance)
      .slice(0, 3);
  }
  
  // Return top entries by importance
  return COMPREHENSIVE_KNOWLEDGE_BASE
    .sort((a, b) => b.importance - a.importance)
    .slice(0, 3);
}

export function generateResponse(query: string): string {
  const results = searchKnowledgeBase(query);
  
  if (results.length === 0) {
    return "I don't have specific information about that query in my knowledge base. Consider rephrasing your question or exploring a related topic.";
  }
  
  // Combine results to form a comprehensive response
  let response = results[0].value;
  
  // If we have multiple relevant entries, add supplementary information
  if (results.length > 1) {
    response += "\n\nAdditionally: " + results[1].value;
  }
  
  // Add sources if available
  const sources = results
    .filter(entry => entry.source)
    .map(entry => entry.source)
    .filter((source, index, self) => self.indexOf(source) === index); // Remove duplicates
  
  if (sources.length > 0) {
    response += "\n\nSources: " + sources.join(", ");
  }
  
  return response;
}
