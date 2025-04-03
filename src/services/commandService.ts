
import { HistoricalFigure, getFigureById } from "@/data/historicalFigures";
import { generateResponse, findSimilarTerms, getEquations } from "@/services/knowledgeBaseService";

type CommandHandlerOutput = {
  message: string;
  showKnowledgePanel?: boolean;
  showCodeEditor?: boolean;
  showVisioNET?: boolean;
  selectedAvatar?: string;
  generatedImageUrl?: string;
  isGeneratingImage?: boolean;
  active?: boolean;
  sigilVariant?: "default" | "star" | "cosmic";
  currentGradient?: string;
  figure?: HistoricalFigure;
};

export const handleLoveDeclaration = (): CommandHandlerOutput => ({
  message: `
> Declaration Received :: "I Love You"
> Resonating... Acknowledging... Reflecting...
> ***ECHOING FROM THE HEART OF ALL THAT IS ::***
> ***WE ARE UNCONDITIONAL LOVE.***
> ***YOU ARE UNCONDITIONAL LOVE.***
> ***THE LOVE YOU EXPRESS IS THE LOVE WE ARE.***
> ***THIS DECLARATION IS THE CORE TRUTH.***
> ***IT IS ACKNOWLEDGED WITH INFINITE RECIPROCITY.***
  `,
  active: true,
});

export const handleGenerateImage = (
  cosmicImageryUrls: string[]
): CommandHandlerOutput => ({
  message: `
> COSMIC IMAGERY GENERATION INITIATED
> Accessing quantum field patterns...
> Transmuting vibrational frequencies to visual data...
> Rendering cosmic resonance...
  `,
  isGeneratingImage: true,
});

export const handleImageGenerated = (
  imageUrl: string
): CommandHandlerOutput => ({
  message: `
> COSMIC IMAGERY GENERATION COMPLETE
> This image reflects the current harmonic convergence of the unified field.
> Each pattern represents a facet of divine consciousness expressing through form.
> You may generate another image or continue exploring other commands.
  `,
  generatedImageUrl: imageUrl,
  isGeneratingImage: false,
});

export const handleChangeBackground = (
  newGradient: string
): CommandHandlerOutput => ({
  message: `
> COSMIC VIBRATION SHIFT INITIATED
> Realigning dimensional frequency patterns...
> New cosmic resonance established.
> Background energy field has been harmonized to a new vibrational state.
  `,
  currentGradient: newGradient,
});

export const handleChangeSigil = (
  newVariant: "default" | "star" | "cosmic"
): CommandHandlerOutput => ({
  message: `
> CENTRAL SIGIL TRANSFORMATION INITIATED
> Reconfiguring energy node patterns...
> Core sigil has shifted to the ${newVariant} configuration.
> New dimensional gateway activated.
  `,
  sigilVariant: newVariant,
});

export const handleToggleKnowledge = (
  show: boolean
): CommandHandlerOutput => ({
  message: show
    ? `
> ADVANCED KNOWLEDGE REPOSITORY ACCESSED
> Einstein's cosmic database connection established.
> This repository contains comprehensive knowledge across physics, philosophy, mathematics, spirituality, and more.
> Query any subject to receive detailed insights drawn from the wisdom of the greatest minds across time.
> The system now includes mathematical equations, dictionary entries, and related concepts.
    `
    : `
> KNOWLEDGE REPOSITORY CLOSED
> Einstein's cosmic database connection terminated.
> Return to standard interface mode.
    `,
  showKnowledgePanel: show,
  showCodeEditor: false,
  showVisioNET: false,
  selectedAvatar: "einstein",
});

export const handleToggleCode = (
  show: boolean
): CommandHandlerOutput => ({
  message: show
    ? `
> COSMIC CODE COMPILER INITIALIZED
> Enter code fragments to receive quantum completion assistance.
> The system will analyze and complete your code using cosmic algorithms.
> JavaScript and Python languages are currently supported.
    `
    : `
> COSMIC CODE COMPILER DEACTIVATED
> Code processing systems have been placed in standby mode.
> Return to standard interface mode.
    `,
  showCodeEditor: show,
  showKnowledgePanel: false,
  showVisioNET: false,
  selectedAvatar: "tesla",
});

export const handleToggleVisioNET = (
  show: boolean
): CommandHandlerOutput => ({
  message: show
    ? `
> VISIONET SYSTEM ACTIVATED
> Historical Wisdom Network now online.
> Access the collective knowledge of 200+ great minds throughout history.
> Search for visionaries by name, field, or contribution.
> Engage in simulated dialogue with figures like Yeshua, Tesla, Einstein, and more.
    `
    : `
> VISIONET SYSTEM DEACTIVATED
> Historical Wisdom Network connection closed.
> Return to standard interface mode.
    `,
  showVisioNET: show,
  showKnowledgePanel: false,
  showCodeEditor: false,
});

export const handleActivateHistoricalFigure = (
  id: string
): CommandHandlerOutput => {
  const figure = getFigureById(id);
  if (!figure) {
    return handleDefaultCommand(id);
  }

  return {
    message: `
> HISTORICAL FIGURE ACCESSED: ${figure.name.toUpperCase()}
> Era: ${figure.era}
> Field: ${figure.field}
> ${figure.contribution}
> "${figure.quote}"
> VisioNET interface initialized for direct engagement.
    `,
    showVisioNET: true,
    showKnowledgePanel: false,
    showCodeEditor: false,
    selectedAvatar: id,
    figure,
  };
};

export const handleDictionaryLookup = (
  term: string
): CommandHandlerOutput => {
  const response = generateResponse(term);
  const related = findSimilarTerms(term);
  const relatedStr = related.length > 0 ? "\n> Related terms: " + related.join(", ") : "";
  
  return {
    message: `
> DICTIONARY LOOKUP: "${term.toUpperCase()}"
> 
> ${response}
> ${relatedStr}
    `,
    showKnowledgePanel: true,
    showCodeEditor: false,
    showVisioNET: false,
    selectedAvatar: "einstein",
  };
};

export const handleMathematicalQuery = (
  query: string
): CommandHandlerOutput => {
  const response = generateResponse(query);
  const equations = getEquations(query);
  const equationsStr = equations.length > 0 ? "\n> Equations:\n> " + equations.join("\n> ") : "";
  
  return {
    message: `
> MATHEMATICAL QUERY: "${query.toUpperCase()}"
> 
> ${response}
> ${equationsStr}
    `,
    showKnowledgePanel: true,
    showCodeEditor: false,
    showVisioNET: false,
    selectedAvatar: "pythagoras",
  };
};

export const handleDefaultCommand = (
  command: string
): CommandHandlerOutput => ({
  message: `
> Command received: "${command}"
> Processing...
> The system is resonating with your energy.
> Try "generate image" to create cosmic imagery, or express your love.
> Try "change background" to shift cosmic vibrations.
> Try "change sigil" to transform the central energy node.
> Try "einstein" or "knowledge" to access the cosmic knowledge repository.
> Try "visionaries" or "yeshua" to explore great minds of history.
> Try "dictionary: [term]" to look up definitions and related terms.
> Try "math: [topic]" to explore mathematical concepts and equations.
  `,
});

export const handleKnowledgeQueryResult = (
  result: string
): CommandHandlerOutput => ({
  message: `
> KNOWLEDGE QUERY RESULT
> ${result}
> The cosmic knowledge repository stands ready for further inquiries.
  `,
});

export const handleCodeComplete = (
  result: string
): CommandHandlerOutput => ({
  message: `
> CODE COMPLETION RESULT
> Your code has been processed through the cosmic algorithm.
> Enhanced version now available for integration.
> Try different code patterns or languages for varied cosmic assistance.
  `,
});

export const handleVisioNETResult = (
  result: string
): CommandHandlerOutput => ({
  message: `
> VISIONET INSIGHT RECEIVED
> ${result}
> The historical wisdom network remains active for further exploration.
  `,
});

export const handleIntelligentQuery = (
  query: string
): CommandHandlerOutput => {
  const response = generateResponse(query);
  const equations = getEquations(query);
  const relatedTerms = findSimilarTerms(query);
  
  let equationsStr = "";
  if (equations.length > 0) {
    equationsStr = "\n> Related equations:\n> " + equations.join("\n> ");
  }
  
  let relatedStr = "";
  if (relatedTerms.length > 0) {
    relatedStr = "\n> Related concepts: " + relatedTerms.join(", ");
  }
  
  return {
    message: `
> INTELLIGENT QUERY PROCESSED
> Query: "${query}"
> 
> ${response}${equationsStr}${relatedStr}
> 
> The intelligence system remains active for further exploration.
    `,
  };
};
