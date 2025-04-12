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
  citations?: Citation[]; // New field for academic citations
  dateAdded?: string; // New field for tracking when entries were added
}

export interface Citation {
  author: string;
  title: string;
  publication?: string;
  year: string;
  url?: string;
}

export interface HistoricalFigure {
  id: string;
  name: string;
  era: string;
  field: string;
  contribution: string;
  quote: string;
  keywords: string[];
}

// This is a much larger knowledge base than the previous one
export const COMPREHENSIVE_KNOWLEDGE_BASE: (KnowledgeEntry | HistoricalFigure)[] = [
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
    related: ["wormhole", "hawking radiation", "gravitational waves"],
    citations: [
      { author: "Hawking, S.", title: "Black Holes and Thermodynamics", publication: "Physical Review D", year: "1976", url: "https://doi.org/10.1103/PhysRevD.13.191" }
    ],
    dateAdded: "2023-10-15"
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
    related: ["wave-particle duality", "uncertainty principle", "quantum entanglement"],
    citations: [
      { author: "Heisenberg, W.", title: "Über den anschaulichen Inhalt der quantentheoretischen Kinematik und Mechanik", publication: "Zeitschrift für Physik", year: "1927", url: "https://doi.org/10.1007/BF01397280" }
    ],
    dateAdded: "2023-09-01"
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
    related: ["differential equations", "vector calculus", "numerical analysis"],
    citations: [
      { author: "Newton, I.", title: "Method of Fluxions", year: "1736", url: "https://en.wikipedia.org/wiki/Method_of_Fluxions" }
    ],
    dateAdded: "2023-08-15"
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
    related: ["ontology", "metaphysics", "rationalism", "empiricism"],
    dateAdded: "2023-07-22"
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
  // Adding more historical figures
  {
    id: "lao-tzu",
    name: "Lao Tzu",
    era: "6th Century BCE",
    field: "Philosophy",
    contribution: "Founder of Taoism; authored the Tao Te Ching; taught principles of simplicity, harmony with nature, and the concept of wu wei (non-action).",
    quote: "Nature does not hurry, yet everything is accomplished.",
    keywords: ["taoism", "harmony", "balance", "simplicity", "wu wei"]
  } as HistoricalFigure,
  {
    id: "hypatia",
    name: "Hypatia of Alexandria",
    era: "360-415 CE",
    field: "Mathematics & Philosophy",
    contribution: "First notable woman mathematician; made contributions to astronomy and philosophy; preserved ancient mathematical knowledge.",
    quote: "Reserve your right to think, for even to think wrongly is better than not to think at all.",
    keywords: ["mathematics", "astronomy", "neoplatonism", "education", "alexandria"]
  },
  {
    id: "rumi",
    name: "Jalal ad-Din Rumi",
    era: "1207-1273",
    field: "Poetry & Spirituality",
    contribution: "Sufi mystic and poet; founded the Mevlevi Order (Whirling Dervishes); wrote profound spiritual poetry on divine love.",
    quote: "What you seek is seeking you.",
    keywords: ["sufism", "poetry", "mysticism", "love", "spirituality"]
  },
  {
    id: "kant",
    name: "Immanuel Kant",
    era: "1724-1804",
    field: "Philosophy",
    contribution: "Developed critical philosophy; wrote the Critique of Pure Reason; formulated the categorical imperative in ethics.",
    quote: "Act only according to that maxim whereby you can, at the same time, will that it should become a universal law.",
    keywords: ["ethics", "metaphysics", "epistemology", "categorical imperative", "transcendental idealism"]
  },
  {
    id: "goethe",
    name: "Johann Wolfgang von Goethe",
    era: "1749-1832",
    field: "Literature & Science",
    contribution: "Polymath who made contributions to literature, science, and philosophy; authored Faust; developed a theory of colors.",
    quote: "Whatever you can do or dream you can, begin it. Boldness has genius, power, and magic in it.",
    keywords: ["literature", "romanticism", "color theory", "morphology", "poetry"]
  },
  {
    id: "faraday",
    name: "Michael Faraday",
    era: "1791-1867",
    field: "Physics & Chemistry",
    contribution: "Discovered electromagnetic induction; developed laws of electrolysis; pioneered the field theory concept.",
    quote: "Nothing is too wonderful to be true if it be consistent with the laws of nature.",
    keywords: ["electromagnetism", "electrochemistry", "induction", "field theory", "experimentation"]
  },
  {
    id: "maxwell",
    name: "James Clerk Maxwell",
    era: "1831-1879",
    field: "Physics",
    contribution: "Formulated classical electromagnetic theory; unified electricity, magnetism, and light; developed statistical physics.",
    quote: "The true logic of this world is in the calculus of probabilities.",
    keywords: ["electromagnetism", "thermodynamics", "kinetic theory", "field equations", "light"]
  },
  {
    id: "nietzsche",
    name: "Friedrich Nietzsche",
    era: "1844-1900",
    field: "Philosophy",
    contribution: "Critiqued traditional values and Christianity; developed concepts of the Übermensch, will to power, and eternal recurrence.",
    quote: "He who has a why to live can bear almost any how.",
    keywords: ["existentialism", "nihilism", "will to power", "perspectivism", "übermensch"]
  },
  {
    id: "freud",
    name: "Sigmund Freud",
    era: "1856-1939",
    field: "Psychology",
    contribution: "Founder of psychoanalysis; developed theories of the unconscious mind, repression, and dream interpretation.",
    quote: "The mind is like an iceberg, it floats with one-seventh of its bulk above water.",
    keywords: ["psychoanalysis", "unconscious", "repression", "dream analysis", "id-ego-superego"]
  },
  {
    id: "jung",
    name: "Carl Jung",
    era: "1875-1961",
    field: "Psychology",
    contribution: "Founded analytical psychology; developed concepts of the collective unconscious, archetypes, and personality types.",
    quote: "Your vision will become clear only when you can look into your own heart. Who looks outside, dreams; who looks inside, awakes.",
    keywords: ["analytical psychology", "archetypes", "collective unconscious", "synchronicity", "individuation"]
  },
  // Neuroscience
  {
    id: "neuroscience-consciousness",
    key: ["consciousness", "awareness", "sentience"],
    value: "Consciousness is the state of being awake and aware of one's surroundings, thoughts, and identity. It remains one of the greatest unsolved mysteries in neuroscience. Various theories attempt to explain consciousness, including Global Workspace Theory, Integrated Information Theory, and Higher-Order Thought Theory.",
    category: "neuroscience",
    source: "Modern neuroscience research",
    tags: ["brain", "mind", "awareness", "cognition"],
    importance: 10,
    related: ["qualia", "neural correlates of consciousness", "philosophy of mind", "hard problem of consciousness"],
    citations: [
      { author: "Tononi, G.", title: "Integrated Information Theory of Consciousness: An Updated Account", publication: "Archives Italiennes de Biologie", year: "2012", url: "https://doi.org/10.4449/aib.v149i5.1388" },
      { author: "Chalmers, D.", title: "Facing Up to the Problem of Consciousness", publication: "Journal of Consciousness Studies", year: "1995" }
    ],
    dateAdded: "2025-03-01"
  },
  {
    id: "neuroscience-memory",
    key: ["memory", "learning", "recall"],
    value: "Memory is the faculty of the brain by which data or information is encoded, stored, and retrieved when needed. It is fundamental to learning and thought. Memory is commonly categorized as sensory memory, short-term (working) memory, and long-term memory based on the amount of time information remains accessible.",
    category: "neuroscience",
    source: "Cognitive neuroscience research",
    tags: ["brain", "cognition", "learning"],
    importance: 9,
    related: ["hippocampus", "long-term potentiation", "amnesia", "consolidation"],
    citations: [
      { author: "Squire, L.R.", title: "Memory and Brain Systems: 1969-2009", publication: "Journal of Neuroscience", year: "2009", url: "https://doi.org/10.1523/JNEUROSCI.3575-09.2009" }
    ],
    dateAdded: "2025-03-05"
  },
  // Computer Science
  {
    id: "cs-neural-networks",
    key: ["neural networks", "deep learning", "artificial neural networks"],
    value: "Neural networks are computing systems vaguely inspired by the biological neural networks that constitute animal brains. They form the basis of deep learning, a subset of machine learning in artificial intelligence. Neural networks learn to perform tasks by considering examples, without being explicitly programmed with task-specific rules.",
    category: "computer science",
    source: "Machine learning research",
    tags: ["ai", "machine learning", "deep learning"],
    importance: 9,
    equations: ["y = σ(Σ w_i x_i + b)", "σ(z) = 1/(1+e^(-z))"],
    related: ["backpropagation", "convolutional neural networks", "recurrent neural networks", "transformers"],
    citations: [
      { author: "LeCun, Y., Bengio, Y., & Hinton, G.", title: "Deep learning", publication: "Nature", year: "2015", url: "https://doi.org/10.1038/nature14539" }
    ],
    dateAdded: "2025-03-10"
  },
  {
    id: "cs-quantum-computing",
    key: ["quantum computing", "quantum computers", "qubits"],
    value: "Quantum computing is a type of computation that harnesses the collective properties of quantum states, such as superposition, interference, and entanglement, to perform calculations. The basic unit of quantum information is the qubit, which can represent a 0, 1, or any quantum superposition of these two states.",
    category: "computer science",
    source: "Quantum information science research",
    tags: ["quantum", "computing", "information"],
    importance: 10,
    equations: ["|ψ⟩ = α|0⟩ + β|1⟩, where |α|² + |β|² = 1"],
    related: ["quantum supremacy", "quantum gates", "quantum error correction", "Shor's algorithm", "Grover's algorithm"],
    citations: [
      { author: "Shor, P.W.", title: "Polynomial-Time Algorithms for Prime Factorization and Discrete Logarithms on a Quantum Computer", publication: "SIAM Journal on Computing", year: "1997", url: "https://doi.org/10.1137/S0097539795293172" }
    ],
    dateAdded: "2025-03-12"
  },
  // Psychology
  {
    id: "psychology-cognitive-biases",
    key: ["cognitive biases", "cognitive distortions", "thinking errors"],
    value: "Cognitive biases are systematic patterns of deviation from norm or rationality in judgment. They are often studied in psychology and behavioral economics. These unconscious mental shortcuts can lead to perceptual distortion, inaccurate judgment, illogical interpretation, or irrationality.",
    category: "psychology",
    source: "Cognitive psychology research",
    tags: ["cognition", "thinking", "judgment", "decision making"],
    importance: 8,
    related: ["confirmation bias", "anchoring", "availability heuristic", "framing effect", "Dunning-Kruger effect"],
    citations: [
      { author: "Kahneman, D. & Tversky, A.", title: "Judgment under Uncertainty: Heuristics and Biases", publication: "Science", year: "1974", url: "https://doi.org/10.1126/science.185.4157.1124" }
    ],
    dateAdded: "2025-03-15"
  },
  // Sociology
  {
    id: "sociology-social-constructionism",
    key: ["social constructionism", "social construction", "constructed reality"],
    value: "Social constructionism is a theory in sociology and communication theory that examines the development of jointly constructed understandings of the world. It focuses on uncovering the ways in which individuals and groups participate in the creation of their perceived social reality. The theory centers on the notion that meanings are developed in coordination with others rather than separately within each individual.",
    category: "sociology",
    source: "Sociological theory",
    tags: ["society", "reality", "perception", "knowledge"],
    importance: 7,
    related: ["cultural relativism", "phenomenology", "symbolic interactionism", "social epistemology"],
    citations: [
      { author: "Berger, P.L. & Luckmann, T.", title: "The Social Construction of Reality: A Treatise in the Sociology of Knowledge", year: "1966" }
    ],
    dateAdded: "2025-03-20"
  },
  // Medicine
  {
    id: "medicine-immunology",
    key: ["immunology", "immune system", "immunity"],
    value: "Immunology is the branch of medicine that studies the structure and function of the immune system. It deals with the physiological functioning of the immune system in states of health and disease, as well as malfunctions of the immune system in immunological disorders like autoimmune diseases, hypersensitivities, immune deficiency, and transplant rejection.",
    category: "medicine",
    source: "Medical research",
    tags: ["health", "disease", "body", "defense"],
    importance: 8,
    related: ["antibodies", "antigens", "lymphocytes", "vaccines", "autoimmunity"],
    citations: [
      { author: "Janeway, C.A. Jr et al.", title: "Immunobiology: The Immune System in Health and Disease", year: "2001" }
    ],
    dateAdded: "2025-03-22"
  }
];

export function searchKnowledgeBase(query: string, topResults: number = 3, category?: string): KnowledgeEntry[] {
  const lowerQuery = query.toLowerCase();
  const queryWords = lowerQuery.split(/\s+/).filter(word => word.length > 2);
  
  if (queryWords.length === 0) return [];
  
  // Calculate relevance score for each entry
  const scoredEntries = COMPREHENSIVE_KNOWLEDGE_BASE
    .filter((entry): entry is KnowledgeEntry => 'key' in entry) // Filter to only include KnowledgeEntry types
    .map(entry => {
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
      
      // Check for citations (new)
      if (entry.citations) {
        queryWords.forEach(word => {
          if (entry.citations?.some(
            citation => 
              citation.author.toLowerCase().includes(word) || 
              citation.title.toLowerCase().includes(word)
          )) {
            score += 5;
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
  
  // Add citations if available (new)
  const citations = results
    .filter(entry => entry.citations && entry.citations.length > 0)
    .flatMap(entry => entry.citations || []);
    
  if (citations.length > 0) {
    response += "\n\nCitations:";
    citations.slice(0, 3).forEach(citation => {
      response += `\n- ${citation.author} (${citation.year}). ${citation.title}`;
      if (citation.publication) response += `. ${citation.publication}`;
      if (citation.url) response += `. ${citation.url}`;
    });
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

export function getAllCategories(): { id: string, name: string, count: number }[] {
  const categoryCounts: Record<string, number> = {};
  const categoryNames: Record<string, string> = {
    "physics": "Physics",
    "philosophy": "Philosophy",
    "spirituality": "Spirituality",
    "mathematics": "Mathematics",
    "technology": "Technology",
    "biology": "Biology",
    "psychology": "Psychology",
    "history": "History",
    "dictionary": "Dictionary",
    "thesaurus": "Thesaurus",
    "astronomy": "Astronomy",
    "neuroscience": "Neuroscience",
    "computer science": "Computer Science",
    "medicine": "Medicine",
    "sociology": "Sociology"
  };
  
  // Count entries by category
  COMPREHENSIVE_KNOWLEDGE_BASE.forEach(entry => {
    if (!categoryCounts[entry.category]) {
      categoryCounts[entry.category] = 0;
    }
    categoryCounts[entry.category]++;
  });
  
  // Convert to array format
  return Object.keys(categoryCounts).map(category => ({
    id: category,
    name: categoryNames[category] || category.charAt(0).toUpperCase() + category.slice(1),
    count: categoryCounts[category]
  })).sort((a, b) => b.count - a.count);
}

export function getBookmarkableEntries(): KnowledgeEntry[] {
  return COMPREHENSIVE_KNOWLEDGE_BASE
    .filter(entry => entry.importance >= 8)
    .sort((a, b) => b.importance - a.importance)
    .slice(0, 10);
}

export function getLatestEntries(count: number = 5): KnowledgeEntry[] {
  return [...COMPREHENSIVE_KNOWLEDGE_BASE]
    .filter((entry): entry is KnowledgeEntry => 'dateAdded' in entry && entry.dateAdded !== undefined)
    .sort((a, b) => {
      if (!a.dateAdded || !b.dateAdded) return 0;
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    })
    .slice(0, count);
}

export function getCitationsForTopic(topic: string): Citation[] {
  const entries = COMPREHENSIVE_KNOWLEDGE_BASE
    .filter((entry): entry is KnowledgeEntry => 
      'key' in entry && 
      'citations' in entry &&
      entry.key.some(k => k.toLowerCase().includes(topic.toLowerCase())) && 
      entry.citations !== undefined
    );
  
  if (entries.length > 0 && entries[0].citations) {
    return entries[0].citations;
  }
  
  return [];
}
