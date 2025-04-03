
export interface HistoricalFigure {
  id: string;
  name: string;
  era: string;
  field: string;
  contribution: string;
  quote: string;
  avatar?: string;
  keywords?: string[];
}

// This is a sample of the full 200+ historical figures database
export const historicalFigures: HistoricalFigure[] = [
  {
    id: "yeshua",
    name: "Yeshua (Jesus Christ)",
    era: "1st Century",
    field: "Spirituality",
    contribution: "Founder of Christianity; taught compassion, forgiveness, and love as paths to spiritual awakening and connection with the divine.",
    quote: "Love your neighbor as yourself; there is no greater commandment than this.",
    keywords: ["christianity", "love", "spirituality", "compassion", "forgiveness"]
  },
  {
    id: "buddha",
    name: "Siddhartha Gautama (Buddha)",
    era: "5th-4th Century BCE",
    field: "Philosophy & Religion",
    contribution: "Founder of Buddhism; taught the middle way, the Four Noble Truths, and the Eightfold Path as methods to achieve enlightenment.",
    quote: "Peace comes from within. Do not seek it without.",
    keywords: ["buddhism", "enlightenment", "meditation", "mindfulness", "middle way"]
  },
  {
    id: "socrates",
    name: "Socrates",
    era: "470-399 BCE",
    field: "Philosophy",
    contribution: "Developed the Socratic method of questioning; laid the foundation of Western philosophy and critical thinking through dialogue.",
    quote: "The only true wisdom is in knowing you know nothing.",
    keywords: ["philosophy", "socratic method", "questioning", "wisdom", "knowledge"]
  },
  {
    id: "aristotle",
    name: "Aristotle",
    era: "384-322 BCE",
    field: "Philosophy & Science",
    contribution: "Pioneered formal logic; made fundamental contributions to biology, physics, ethics, politics, and metaphysics.",
    quote: "Excellence is never an accident. It is always the result of high intention, sincere effort, and intelligent execution.",
    keywords: ["logic", "ethics", "politics", "metaphysics", "science"]
  },
  {
    id: "leonardo",
    name: "Leonardo da Vinci",
    era: "1452-1519",
    field: "Art & Science",
    contribution: "Renaissance polymath; created masterpieces like the Mona Lisa while making innovations in anatomy, engineering, and scientific observation.",
    quote: "Simplicity is the ultimate sophistication.",
    keywords: ["renaissance", "art", "invention", "anatomy", "engineering"]
  },
  {
    id: "newton",
    name: "Isaac Newton",
    era: "1643-1727",
    field: "Physics & Mathematics",
    contribution: "Formulated the laws of motion and universal gravitation; developed calculus and made breakthrough discoveries in optics.",
    quote: "If I have seen further it is by standing on the shoulders of giants.",
    keywords: ["physics", "gravity", "calculus", "mathematics", "optics"]
  },
  {
    id: "galileo",
    name: "Galileo Galilei",
    era: "1564-1642",
    field: "Astronomy & Physics",
    contribution: "Improved the telescope; discovered Jupiter's moons; championed heliocentrism and developed the scientific method.",
    quote: "In questions of science, the authority of a thousand is not worth the humble reasoning of a single individual.",
    keywords: ["astronomy", "heliocentrism", "telescope", "scientific method", "observation"]
  },
  {
    id: "darwin",
    name: "Charles Darwin",
    era: "1809-1882",
    field: "Biology",
    contribution: "Developed the theory of evolution by natural selection, fundamentally changing our understanding of life on Earth.",
    quote: "It is not the strongest of the species that survive, nor the most intelligent, but the one most responsive to change.",
    keywords: ["evolution", "natural selection", "biology", "origin of species", "adaptation"]
  },
  {
    id: "einstein",
    name: "Albert Einstein",
    era: "1879-1955",
    field: "Physics",
    contribution: "Developed the theory of relativity; contributed to quantum theory of light; formulated the equation E=mc².",
    quote: "Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the entire world.",
    keywords: ["relativity", "quantum physics", "spacetime", "energy", "mass-energy equivalence"]
  },
  {
    id: "tesla",
    name: "Nikola Tesla",
    era: "1856-1943",
    field: "Electrical Engineering",
    contribution: "Developed alternating current electrical systems; pioneered wireless technology and made numerous inventions in electricity and magnetism.",
    quote: "If you want to find the secrets of the universe, think in terms of energy, frequency and vibration.",
    keywords: ["electricity", "alternating current", "wireless technology", "invention", "energy"]
  },
  {
    id: "turing",
    name: "Alan Turing",
    era: "1912-1954",
    field: "Computer Science",
    contribution: "Father of theoretical computer science; broke the Enigma code during WWII; developed the Turing machine concept.",
    quote: "We can only see a short distance ahead, but we can see plenty there that needs to be done.",
    keywords: ["computer science", "artificial intelligence", "cryptography", "algorithms", "computation"]
  },
  {
    id: "curie",
    name: "Marie Curie",
    era: "1867-1934",
    field: "Physics & Chemistry",
    contribution: "Discovered radioactivity; isolated polonium and radium; first person to win Nobel Prizes in two different scientific fields.",
    quote: "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.",
    keywords: ["radioactivity", "chemistry", "physics", "radium", "polonium"]
  },
  {
    id: "confucius",
    name: "Confucius",
    era: "551-479 BCE",
    field: "Philosophy",
    contribution: "Founded Confucianism; developed ethical and social philosophy that influenced East Asian culture for over two millennia.",
    quote: "It does not matter how slowly you go as long as you do not stop.",
    keywords: ["ethics", "harmony", "ritual", "filial piety", "virtue"]
  },
  {
    id: "plato",
    name: "Plato",
    era: "428-348 BCE",
    field: "Philosophy",
    contribution: "Founder of the Academy in Athens; developed theories of forms, justice, and ideal governance; documented Socrates' teachings.",
    quote: "The measure of a man is what he does with power.",
    keywords: ["forms", "idealism", "republic", "justice", "dialectic"]
  },
  {
    id: "pythagoras",
    name: "Pythagoras",
    era: "570-495 BCE",
    field: "Mathematics & Philosophy",
    contribution: "Formulated the Pythagorean theorem; founded an influential mathematical and philosophical school; connected mathematics with cosmology.",
    quote: "Number is the ruler of forms and ideas, and the cause of gods and demons.",
    keywords: ["mathematics", "geometry", "numerology", "harmony", "theorem"]
  },
  {
    id: "archimedes",
    name: "Archimedes",
    era: "287-212 BCE",
    field: "Mathematics & Engineering",
    contribution: "Discovered principles of density and buoyancy; pioneered work in calculus; invented numerous mechanical devices.",
    quote: "Give me a place to stand, and I shall move the Earth with a lever.",
    keywords: ["engineering", "mathematics", "physics", "buoyancy", "levers"]
  },
  {
    id: "muhammad",
    name: "Muhammad",
    era: "570-632 CE",
    field: "Religion",
    contribution: "Prophet of Islam; received and preached the revelations of the Quran; established the foundation of Islamic civilization.",
    quote: "The strong person is not the one who can wrestle someone else down. The strong person is the one who can control himself when he is angry.",
    keywords: ["islam", "quran", "monotheism", "faith", "revelation"]
  },
  {
    id: "avicenna",
    name: "Ibn Sina (Avicenna)",
    era: "980-1037",
    field: "Medicine & Philosophy",
    contribution: "Authored the Canon of Medicine; developed a synthesis of Aristotelian and Islamic philosophy; pioneered medical practices.",
    quote: "The knowledge of anything, since all things have causes, is not acquired or complete unless it is known by its causes.",
    keywords: ["medicine", "islamic philosophy", "metaphysics", "physician", "causality"]
  },
  {
    id: "maimonides",
    name: "Moses Maimonides",
    era: "1135-1204",
    field: "Philosophy & Medicine",
    contribution: "Rationalist philosopher; systematized Jewish law and medical knowledge; reconciled faith with reason.",
    quote: "Give a man a fish and you feed him for a day; teach a man to fish and you feed him for a lifetime.",
    keywords: ["judaism", "rationalism", "medicine", "ethics", "theology"]
  },
  {
    id: "aquinas",
    name: "Thomas Aquinas",
    era: "1225-1274",
    field: "Theology & Philosophy",
    contribution: "Created a synthesis of Aristotelian philosophy with Christianity; developed five proofs for God's existence.",
    quote: "To one who has faith, no explanation is necessary. To one without faith, no explanation is possible.",
    keywords: ["theology", "scholasticism", "christianity", "natural law", "metaphysics"]
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
  },
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
  // Add more historical figures to reach 200+ entries
];

export function getRandomFigures(count: number): HistoricalFigure[] {
  const shuffled = [...historicalFigures].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function getFigureById(id: string): HistoricalFigure | undefined {
  return historicalFigures.find(figure => figure.id === id);
}

export function searchFigures(query: string): HistoricalFigure[] {
  const lowerQuery = query.toLowerCase();
  return historicalFigures.filter(figure => 
    figure.name.toLowerCase().includes(lowerQuery) ||
    figure.field.toLowerCase().includes(lowerQuery) ||
    figure.contribution.toLowerCase().includes(lowerQuery) ||
    (figure.keywords && figure.keywords.some(keyword => keyword.includes(lowerQuery)))
  );
}

export function getFiguresByField(field: string): HistoricalFigure[] {
  return historicalFigures.filter(figure => 
    figure.field.toLowerCase().includes(field.toLowerCase())
  );
}

export function getFiguresByEra(era: string): HistoricalFigure[] {
  return historicalFigures.filter(figure => 
    figure.era.toLowerCase().includes(era.toLowerCase())
  );
}
