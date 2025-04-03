
export interface HistoricalFigure {
  id: string;
  name: string;
  era: string;
  field: string;
  contribution: string;
  quote: string;
  avatar?: string;
}

// This is a sample of the full 200+ historical figures database
export const historicalFigures: HistoricalFigure[] = [
  {
    id: "yeshua",
    name: "Yeshua (Jesus Christ)",
    era: "1st Century",
    field: "Spirituality",
    contribution: "Founder of Christianity; taught compassion, forgiveness, and love.",
    quote: "Love your neighbor as yourself."
  },
  {
    id: "buddha",
    name: "Siddhartha Gautama (Buddha)",
    era: "5th-4th Century BCE",
    field: "Philosophy & Religion",
    contribution: "Founder of Buddhism; taught the middle way and paths to enlightenment.",
    quote: "Peace comes from within. Do not seek it without."
  },
  {
    id: "socrates",
    name: "Socrates",
    era: "470-399 BCE",
    field: "Philosophy",
    contribution: "Developed the Socratic method of questioning; foundation of Western philosophy.",
    quote: "The only true wisdom is in knowing you know nothing."
  },
  {
    id: "aristotle",
    name: "Aristotle",
    era: "384-322 BCE",
    field: "Philosophy & Science",
    contribution: "Pioneered formal logic; made contributions to biology, physics, ethics.",
    quote: "Excellence is never an accident. It is always the result of high intention, sincere effort, and intelligent execution."
  },
  {
    id: "leonardo",
    name: "Leonardo da Vinci",
    era: "1452-1519",
    field: "Art & Science",
    contribution: "Renaissance polymath; pioneered innovations in anatomy, engineering, art.",
    quote: "Simplicity is the ultimate sophistication."
  },
  {
    id: "newton",
    name: "Isaac Newton",
    era: "1643-1727",
    field: "Physics & Mathematics",
    contribution: "Laws of motion and universal gravitation; calculus; optics.",
    quote: "If I have seen further it is by standing on the shoulders of giants."
  },
  {
    id: "galileo",
    name: "Galileo Galilei",
    era: "1564-1642",
    field: "Astronomy & Physics",
    contribution: "Improved the telescope; discovered Jupiter's moons; supported heliocentrism.",
    quote: "In questions of science, the authority of a thousand is not worth the humble reasoning of a single individual."
  },
  {
    id: "darwin",
    name: "Charles Darwin",
    era: "1809-1882",
    field: "Biology",
    contribution: "Theory of evolution by natural selection.",
    quote: "It is not the strongest of the species that survive, nor the most intelligent, but the one most responsive to change."
  },
  {
    id: "einstein",
    name: "Albert Einstein",
    era: "1879-1955",
    field: "Physics",
    contribution: "Theory of relativity; quantum theory of light; mass-energy equivalence (E=mc²).",
    quote: "Imagination is more important than knowledge."
  },
  {
    id: "tesla",
    name: "Nikola Tesla",
    era: "1856-1943",
    field: "Electrical Engineering",
    contribution: "Developed alternating current; pioneered wireless technology.",
    quote: "If you want to find the secrets of the universe, think in terms of energy, frequency and vibration."
  },
  {
    id: "turing",
    name: "Alan Turing",
    era: "1912-1954",
    field: "Computer Science",
    contribution: "Father of computer science; broke the Enigma code during WWII.",
    quote: "We can only see a short distance ahead, but we can see plenty there that needs to be done."
  },
  {
    id: "curie",
    name: "Marie Curie",
    era: "1867-1934",
    field: "Physics & Chemistry",
    contribution: "Discovered radioactivity; isolated polonium and radium.",
    quote: "Nothing in life is to be feared, it is only to be understood."
  },
  {
    id: "confucius",
    name: "Confucius",
    era: "551-479 BCE",
    field: "Philosophy",
    contribution: "Founded Confucianism; ethical and social philosophy influential in East Asia.",
    quote: "It does not matter how slowly you go as long as you do not stop."
  },
  {
    id: "plato",
    name: "Plato",
    era: "428-348 BCE",
    field: "Philosophy",
    contribution: "Founder of the Academy in Athens; works on justice, beauty, and equality.",
    quote: "The measure of a man is what he does with power."
  },
  {
    id: "pythagoras",
    name: "Pythagoras",
    era: "570-495 BCE",
    field: "Mathematics & Philosophy",
    contribution: "Pythagorean theorem; founded influential mathematical and philosophical school.",
    quote: "Number is the ruler of forms and ideas, and the cause of gods and demons."
  },
  {
    id: "archimedes",
    name: "Archimedes",
    era: "287-212 BCE",
    field: "Mathematics & Engineering",
    contribution: "Discovered principles of density and buoyancy; pioneering work in calculus.",
    quote: "Give me a place to stand, and I shall move the Earth with a lever."
  },
  {
    id: "muhammad",
    name: "Muhammad",
    era: "570-632 CE",
    field: "Religion",
    contribution: "Prophet of Islam; received and preached the revelations of the Quran.",
    quote: "The strong person is not the one who can wrestle someone else down. The strong person is the one who can control himself when he is angry."
  },
  {
    id: "avicenna",
    name: "Ibn Sina (Avicenna)",
    era: "980-1037",
    field: "Medicine & Philosophy",
    contribution: "Canon of Medicine; synthesis of Aristotelian and Islamic philosophy.",
    quote: "The knowledge of anything, since all things have causes, is not acquired or complete unless it is known by its causes."
  },
  {
    id: "maimonides",
    name: "Moses Maimonides",
    era: "1135-1204",
    field: "Philosophy & Medicine",
    contribution: "Rationalist philosopher; systematized Jewish law and medical knowledge.",
    quote: "Give a man a fish and you feed him for a day; teach a man to fish and you feed him for a lifetime."
  },
  {
    id: "aquinas",
    name: "Thomas Aquinas",
    era: "1225-1274",
    field: "Theology & Philosophy",
    contribution: "Synthesis of Aristotelian philosophy with Christianity.",
    quote: "To one who has faith, no explanation is necessary. To one without faith, no explanation is possible."
  }
  // ... This would continue with all 200+ historical figures
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
    figure.contribution.toLowerCase().includes(lowerQuery)
  );
}
