/**
 * Core type definitions for Quote of the Day Generator
 */

/**
 * Valid quote categories
 */
export type QuoteCategory =
  | 'motivation'
  | 'success'
  | 'funny'
  | 'wisdom'
  | 'leadership'
  | 'other';

/**
 * Quote interface matching the data model from steering documents
 */
export interface IQuote {
  id: string;
  text: string;
  author: string;
  category: QuoteCategory;
  dateAdded: string;
  source?: string;
  isAIGenerated?: boolean;
  explanation?: string;
}

/**
 * Quote validation result
 */
export interface IQuoteValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * AI service response
 */
export interface IAIQuoteResponse {
  text: string;
  author: string;
  explanation?: string;
}

/**
 * Quote storage structure
 */
export interface IQuoteStorage {
  quotes: IQuote[];
  metadata: {
    version: string;
    totalQuotes: number;
    lastUpdated: string;
  };
}

/**
 * Constants for validation
 */
export const QUOTE_CONSTANTS = {
  MIN_TEXT_LENGTH: 10,
  MAX_TEXT_LENGTH: 500,
  MIN_AUTHOR_LENGTH: 2,
  MAX_AUTHOR_LENGTH: 100,
  MAX_SOURCE_LENGTH: 200,
  MAX_EXPLANATION_LENGTH: 300,
  VALID_CATEGORIES: [
    'motivation',
    'success',
    'funny',
    'wisdom',
    'leadership',
    'other',
  ] as const,
  UUID_REGEX:
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  ISO_DATE_REGEX:
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
};

/**
 * Rate limiting configuration
 */
export interface IRateLimitConfig {
  maxPerMinute: number;
  maxPerHour: number;
  maxPerDay: number;
}

/**
 * AI Client interface
 */
export interface IAIClient {
  generateQuote(
    category: QuoteCategory,
    style?: string
  ): Promise<IAIQuoteResponse>;
  explainQuote(text: string): Promise<string>;
  categorizeQuote(text: string): Promise<QuoteCategory>;
  isAvailable(): Promise<boolean>;
}

/**
 * Quote Manager interface
 */
export interface IQuoteManager {
  addQuote(quote: Omit<IQuote, 'id' | 'dateAdded'>): Promise<IQuote>;
  removeQuote(id: string): Promise<boolean>;
  getQuote(id: string): Promise<IQuote | null>;
  getRandomQuote(category?: QuoteCategory): Promise<IQuote | null>;
  getQuoteOfTheDay(category?: QuoteCategory): Promise<IQuote | null>;
  listQuotes(category?: QuoteCategory): Promise<IQuote[]>;
  getAllQuotes(): Promise<IQuote[]>;
}

/**
 * Quote Validator interface
 */
export interface IQuoteValidator {
  validateQuote(quote: Partial<IQuote>): IQuoteValidationResult;
  validateText(text: string): boolean;
  validateAuthor(author: string): boolean;
  validateCategory(category: string): boolean;
  validateID(id: string): boolean;
  validateDateAdded(date: string): boolean;
}
