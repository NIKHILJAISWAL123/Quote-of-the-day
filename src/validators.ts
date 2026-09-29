/**
 * Quote validation logic
 */

import {
  IQuote,
  IQuoteValidationResult,
  IQuoteValidator,
  QUOTE_CONSTANTS,
  QuoteCategory,
} from './types';

/**
 * Quote validator implementation
 */
export class QuoteValidator implements IQuoteValidator {
  /**
   * Validate a complete quote
   */
  validateQuote(quote: Partial<IQuote>): IQuoteValidationResult {
    const errors: string[] = [];

    // Check required fields
    if (!quote.id) errors.push('Quote ID is required');
    if (!quote.text) errors.push('Quote text is required');
    if (!quote.author) errors.push('Quote author is required');
    if (!quote.category) errors.push('Quote category is required');
    if (!quote.dateAdded) errors.push('Quote dateAdded is required');

    // Validate individual fields
    if (quote.id && !this.validateID(quote.id)) {
      errors.push('Quote ID must be a valid UUID v4');
    }

    if (quote.text && !this.validateText(quote.text)) {
      errors.push(
        `Quote text must be between ${QUOTE_CONSTANTS.MIN_TEXT_LENGTH} and ${QUOTE_CONSTANTS.MAX_TEXT_LENGTH} characters`
      );
    }

    if (quote.author && !this.validateAuthor(quote.author)) {
      errors.push(
        `Quote author must be between ${QUOTE_CONSTANTS.MIN_AUTHOR_LENGTH} and ${QUOTE_CONSTANTS.MAX_AUTHOR_LENGTH} characters`
      );
    }

    if (quote.category && !this.validateCategory(quote.category as string)) {
      errors.push(
        `Quote category must be one of: ${QUOTE_CONSTANTS.VALID_CATEGORIES.join(', ')}`
      );
    }

    if (quote.dateAdded && !this.validateDateAdded(quote.dateAdded)) {
      errors.push('Quote dateAdded must be a valid ISO 8601 timestamp and not in the future');
    }

    if (quote.source && quote.source.length > QUOTE_CONSTANTS.MAX_SOURCE_LENGTH) {
      errors.push(
        `Quote source must not exceed ${QUOTE_CONSTANTS.MAX_SOURCE_LENGTH} characters`
      );
    }

    if (quote.explanation && quote.explanation.length > QUOTE_CONSTANTS.MAX_EXPLANATION_LENGTH) {
      errors.push(
        `Quote explanation must not exceed ${QUOTE_CONSTANTS.MAX_EXPLANATION_LENGTH} characters`
      );
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate quote text
   */
  validateText(text: string): boolean {
    if (typeof text !== 'string') return false;
    if (text.trim().length === 0) return false;
    if (text.length < QUOTE_CONSTANTS.MIN_TEXT_LENGTH) return false;
    if (text.length > QUOTE_CONSTANTS.MAX_TEXT_LENGTH) return false;
    return true;
  }

  /**
   * Validate quote author
   */
  validateAuthor(author: string): boolean {
    if (typeof author !== 'string') return false;
    if (author.trim().length === 0) return false;
    if (author.length < QUOTE_CONSTANTS.MIN_AUTHOR_LENGTH) return false;
    if (author.length > QUOTE_CONSTANTS.MAX_AUTHOR_LENGTH) return false;
    return true;
  }

  /**
   * Validate quote category
   */
  validateCategory(category: string): boolean {
    if (typeof category !== 'string') return false;
    return QUOTE_CONSTANTS.VALID_CATEGORIES.includes(category as QuoteCategory);
  }

  /**
   * Validate quote ID (UUID v4)
   */
  validateID(id: string): boolean {
    if (typeof id !== 'string') return false;
    return QUOTE_CONSTANTS.UUID_REGEX.test(id);
  }

  /**
   * Validate dateAdded (ISO 8601, not future)
   */
  validateDateAdded(date: string): boolean {
    if (typeof date !== 'string') return false;
    if (!QUOTE_CONSTANTS.ISO_DATE_REGEX.test(date)) return false;

    try {
      const parsedDate = new Date(date);
      const now = new Date();
      // Cannot be in the future
      return parsedDate.getTime() <= now.getTime();
    } catch {
      return false;
    }
  }
}

/**
 * Validate multiple quotes
 */
export function validateQuotes(quotes: IQuote[]): {
  valid: IQuote[];
  invalid: Array<{ quote: Partial<IQuote>; errors: string[] }>;
} {
  const validator = new QuoteValidator();
  const valid: IQuote[] = [];
  const invalid: Array<{ quote: Partial<IQuote>; errors: string[] }> = [];

  for (const quote of quotes) {
    const result = validator.validateQuote(quote);
    if (result.isValid) {
      valid.push(quote);
    } else {
      invalid.push({ quote, errors: result.errors });
    }
  }

  return { valid, invalid };
}

/**
 * Check for duplicate IDs
 */
export function findDuplicateIds(quotes: IQuote[]): string[] {
  const seen = new Set<string>();
  const duplicates: string[] = [];

  for (const quote of quotes) {
    if (seen.has(quote.id)) {
      if (!duplicates.includes(quote.id)) {
        duplicates.push(quote.id);
      }
    }
    seen.add(quote.id);
  }

  return duplicates;
}

/**
 * Check for duplicate text (case-insensitive)
 */
export function findDuplicateText(quotes: IQuote[]): Array<{ text: string; count: number }> {
  const textMap = new Map<string, number>();
  const normalizedQuotes = new Map<string, string>();

  for (const quote of quotes) {
    const normalized = quote.text.toLowerCase().trim();
    normalizedQuotes.set(quote.id, normalized);
  }

  for (const normalized of normalizedQuotes.values()) {
    textMap.set(normalized, (textMap.get(normalized) ?? 0) + 1);
  }

  return Array.from(textMap.entries())
    .filter(([_, count]) => count > 1)
    .map(([text, count]) => ({ text, count }));
}

/**
 * Sanitize quote text
 */
export function sanitizeQuoteText(text: string): string {
  return text
    .trim()
    .replace(/\s+/g, ' ') // Normalize whitespace
    .replace(/^["']|["']$/g, ''); // Remove leading/trailing quotes
}

/**
 * Sanitize author name
 */
export function sanitizeAuthorName(author: string): string {
  return author
    .trim()
    .replace(/\s+/g, ' ') // Normalize whitespace
    .replace(/^(Anonymous|Unknown|N\/A)$/i, 'Unknown Author'); // Normalize unknown
}

/**
 * Create custom error class
 */
export class QuoteValidationError extends Error {
  constructor(
    public errors: string[],
    public quote?: Partial<IQuote>
  ) {
    super(`Quote validation failed: ${errors.join(', ')}`);
    this.name = 'QuoteValidationError';
  }
}
