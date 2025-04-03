export interface KnowledgeEntry {
  id: string;
  key: string[];
  value: string;
  category: string;
  source?: string;
  tags?: string[];
  importance: number; // 1-10 scale
  equations?: string[]; // For mathematical equations
  related?: string[]; // For related concepts/thesaurus-like functionality
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
    importance: 9,
    equations: ["S = (kc³A)/(4Għ)", "R_s = 2GM/c²"],
    related: ["wormhole", "hawking radiation", "gravitational waves"]
  },
  { 
    id: "physics-quantum",
    key: ["quantum mechanics", "quantum physics", "quantum theory"],
    value: "Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles. It is the foundation of all quantum physics including quantum chemistry, quantum field theory, quantum technology, and quantum information science.",
    category: "physics",
    source: "Works of Planck, Bohr, Schrödinger, Heisenberg",
    tags: ["physics", "science", "particles"],
    importance: 10,
    equations: ["E = hν", "ΔxΔp ≥ ħ/2", "Ψ(x,t) = Ae^(i(kx-ωt))"],
    related: ["wave-particle duality", "uncertainty principle", "quantum entanglement"]
  },
  // Mathematics
  { 
    id: "math-calculus",
    key: ["calculus", "differential calculus", "integral calculus"],
    value: "Calculus is the mathematical study of continuous change, in the same way that geometry is the study of shape and algebra is the study of generalizations of arithmetic operations. It has two major branches: differential calculus (concerning rates of change and slopes of curves) and integral calculus (concerning accumulation of quantities and the areas under and between curves).",
    category: "mathematics",
    source: "Works of Newton and Leibniz",
    tags: ["mathematics", "continuous", "change"],
    importance: 10,
    equations: ["f'(x) = lim_{h→0} [f(x+h) - f(x)]/h", "∫f(x)dx = F(x) + C"],
    related: ["differential equations", "vector calculus", "numerical analysis"]
  },
  { 
    id: "math-number-theory",
    key: ["number theory", "prime numbers", "number systems"],
    value: "Number theory is a branch of pure mathematics devoted primarily to the study of the integers and integer-valued functions. It focuses on properties of numbers, particularly prime numbers, divisibility, and solving equations in integers.",
    category: "mathematics",
    source: "Works of Gauss, Euler, Riemann",
    tags: ["mathematics", "integers", "primes"],
    importance: 9,
    equations: ["π(n) ~ n/ln(n)", "ζ(s) = ∑(1/n^s)", "a^n ≡ 1 (mod n)"],
    related: ["cryptography", "algebra", "discrete mathematics"]
  },
  // Dictionary entries
  { 
    id: "dictionary-epistemology",
    key: ["epistemology", "knowledge", "knowing"],
    value: "Epistemology is the branch of philosophy concerned with the theory of knowledge. It studies the nature of knowledge, justification, and the rationality of belief.",
    category: "dictionary",
    source: "Philosophical dictionaries",
    tags: ["philosophy", "knowledge", "belief"],
    importance: 8,
    related: ["ontology", "metaphysics", "rationalism", "empiricism"]
  },
  { 
    id: "dictionary-paradigm",
    key: ["paradigm", "framework", "model"],
    value: "A paradigm is a standard, perspective, or set of ideas. A paradigm is a way of looking at something. The word paradigm comes from Greek and Latin roots that mean 'pattern' or 'example.'",
    category: "dictionary",
    source: "Oxford Dictionary, works of Thomas Kuhn",
    tags: ["linguistics", "concepts", "framework"],
    importance: 7,
    related: ["worldview", "framework", "model", "example"]
  },
  // Thesaurus-like entries
  { 
    id: "thesaurus-intelligence",
    key: ["intelligence", "smart", "intellect"],
    value: "Intelligence: the ability to learn, understand, and make judgments or have opinions that are based on reason.",
    category: "thesaurus",
    source: "Linguistic resources",
    tags: ["linguistics", "cognition", "mind"],
    importance: 8,
    related: ["acumen", "aptitude", "brilliance", "cognition", "comprehension", "insight", "intellect", "knowledge", "reason", "understanding", "wisdom"]
  },
  { 
    id: "thesaurus-beautiful",
    key: ["beautiful", "beauty", "attractive"],
    value: "Beautiful: having qualities of beauty; pleasing to the senses or to the mind.",
    category: "thesaurus",
    source: "Linguistic resources",
    tags: ["linguistics", "aesthetics", "perception"],
    importance: 7,
    related: ["attractive", "lovely", "gorgeous", "stunning", "magnificent", "exquisite", "handsome", "pretty", "alluring", "elegant", "graceful", "radiant"]
  },
  // Advanced mathematics
  { 
    id: "math-topology",
    key: ["topology", "topological space", "manifold"],
    value: "Topology is the mathematical study of the properties that are preserved through deformations, twistings, and stretchings of objects. Topology emerged through the development of concepts from geometry and set theory, such as space, dimension, and transformation.",
    category: "mathematics",
    source: "Works of Poincaré, Euler, Gauss",
    tags: ["mathematics", "spaces", "geometry"],
    importance: 9,
    equations: ["χ(S) = V - E + F", "∮C ω = ∫∫S dω"],
    related: ["differential geometry", "algebraic topology", "knot theory"]
  },
  // Quantum advanced
  { 
    id: "physics-quantum-entanglement",
    key: ["quantum entanglement", "spooky action", "quantum correlation"],
    value: "Quantum entanglement is a physical phenomenon that occurs when a group of particles interact in such a way that the quantum state of each particle cannot be described independently of the state of the others, including when the particles are separated by a large distance. This phenomenon was referred to by Einstein as 'spooky action at a distance.'",
    category: "physics",
    source: "Works of Einstein, Podolsky, Rosen, Bell",
    tags: ["quantum", "physics", "correlation"],
    importance: 10,
    equations: ["|Ψ⟩ = (|0⟩|1⟩ - |1⟩|0⟩)/√2", "S = 2√2 > 2"],
    related: ["quantum computing", "bell inequality", "quantum teleportation"]
  },
  // Classical humanities
  { 
    id: "philosophy-stoicism",
    key: ["stoicism", "stoic philosophy", "stoic virtues"],
    value: "Stoicism is a school of Hellenistic philosophy founded by Zeno of Citium in Athens in the early 3rd century BC. It is a philosophy of personal ethics informed by its system of logic and views on the natural world. According to its teachings, as social beings, the path to eudaimonia (happiness, or blessedness) is found in accepting the moment as it presents itself, by not allowing oneself to be controlled by the desire for pleasure or by the fear of pain.",
    category: "philosophy",
    source: "Works of Zeno, Seneca, Marcus Aurelius, Epictetus",
    tags: ["philosophy", "ethics", "virtue"],
    importance: 8,
    related: ["virtue ethics", "logos", "apatheia", "eudaimonia"]
  },
  // ... keep existing code (additional knowledge entries)
];

export function searchKnowledgeBase(query: string, topResults: number = 3, category?: string): KnowledgeEntry[] {
  const lowerQuery = query.toLowerCase();
  const queryWords = lowerQuery.split(/\s+/).filter(word => word.length > 2);
  
  if (queryWords.length === 0) return [];
  
  // Calculate relevance score for each entry
  const scoredEntries = COMPREHENSIVE_KNOWLEDGE_BASE.map(entry => {
    let score = 0;
    
    // Filter by category if provided
    if (category && entry.category !== category) {
      return { entry, score: 0 };
    }
    
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
    
    // Check for related terms matches
    if (entry.related) {
      queryWords.forEach(word => {
        if (entry.related?.some(related => related.toLowerCase().includes(word))) {
          score += 6;
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

export function findSimilarTerms(term: string, count: number = 5): string[] {
  // Find thesaurus entries that match the term
  const thesaurusEntries = COMPREHENSIVE_KNOWLEDGE_BASE
    .filter(entry => 
      entry.category === 'thesaurus' && 
      entry.key.some(k => k.toLowerCase().includes(term.toLowerCase()))
    );
  
  if (thesaurusEntries.length > 0 && thesaurusEntries[0].related) {
    return thesaurusEntries[0].related.slice(0, count);
  }
  
  // If no thesaurus entry found, look for related terms in other entries
  const relatedEntries = COMPREHENSIVE_KNOWLEDGE_BASE
    .filter(entry => 
      entry.key.some(k => k.toLowerCase().includes(term.toLowerCase())) && 
      entry.related
    );
  
  if (relatedEntries.length > 0 && relatedEntries[0].related) {
    return relatedEntries[0].related.slice(0, count);
  }
  
  return [];
}

export function getEquations(topic: string): string[] {
  const entries = COMPREHENSIVE_KNOWLEDGE_BASE
    .filter(entry => 
      entry.key.some(k => k.toLowerCase().includes(topic.toLowerCase())) && 
      entry.equations
    );
  
  if (entries.length > 0 && entries[0].equations) {
    return entries[0].equations;
  }
  
  return [];
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
  
  // Add equations if available
  const allEquations = results
    .filter(entry => entry.equations && entry.equations.length > 0)
    .flatMap(entry => entry.equations || []);
  
  if (allEquations.length > 0) {
    response += "\n\nRelevant equations: " + allEquations.join(", ");
  }
  
  // Add related terms if available
  const allRelated = results
    .filter(entry => entry.related && entry.related.length > 0)
    .flatMap(entry => entry.related || []);
  
  if (allRelated.length > 0) {
    const uniqueRelated = [...new Set(allRelated)].slice(0, 5);
    response += "\n\nRelated concepts: " + uniqueRelated.join(", ");
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

export function getCategoryInfo(category: string): { description: string, entries: number } {
  const categoryCounts: Record<string, number> = {};
  const categoryDescriptions: Record<string, string> = {
    "physics": "The study of matter, energy, and the interaction between them",
    "philosophy": "The study of fundamental questions about existence, knowledge, ethics, and reality",
    "mathematics": "The abstract science of number, quantity, and space",
    "spirituality": "Practices and beliefs related to the transcendent or sacred",
    "technology": "Application of scientific knowledge for practical purposes",
    "biology": "The study of living organisms and their vital processes",
    "psychology": "The scientific study of the mind and behavior",
    "history": "The study of past events and human affairs",
    "dictionary": "Definitions and explanations of words and concepts",
    "thesaurus": "Collections of words and their synonyms and related concepts",
    "astronomy": "The study of celestial objects and phenomena beyond Earth's atmosphere"
  };
  
  // Count entries by category
  COMPREHENSIVE_KNOWLEDGE_BASE.forEach(entry => {
    if (!categoryCounts[entry.category]) {
      categoryCounts[entry.category] = 0;
    }
    categoryCounts[entry.category]++;
  });
  
  return {
    description: categoryDescriptions[category] || `Entries related to ${category}`,
    entries: categoryCounts[category] || 0
  };
}
