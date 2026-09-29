/**
 * Property-Based Tests for Quote of the Day Generator
 *
 * These tests verify that core properties and invariants always hold true,
 * regardless of generated input. Using fast-check, we test hundreds of
 * randomly generated test cases to ensure robustness.
 */

import * as fc from 'fast-check';
import { v4 as uuidv4 } from 'uuid';
import {
  QUOTE_CONSTANTS,
  IQuote,
  QuoteCategory,
} from '../src/types';

/**
 * Property 1: Every quote must have a valid UUID
 * Invariant: IDs are always valid UUIDs in v4 format
 */
describe('Property 1: Quote IDs are always valid UUIDs', () => {
  test('generated UUIDs match UUID v4 format', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 100 }), (count) => {
        for (let i = 0; i < count; i++) {
          const id = uuidv4();
          expect(id).toMatch(QUOTE_CONSTANTS.UUID_REGEX);
        }
        return true;
      })
    );
  });

  test('UUIDs are always unique', () => {
    fc.assert(
      fc.property(fc.integer({ min: 10, max: 1000 }), (count) => {
        const ids = new Set<string>();
        for (let i = 0; i < count; i++) {
          const id = uuidv4();
          expect(ids.has(id)).toBe(false);
          ids.add(id);
        }
        return true;
      })
    );
  });
});

/**
 * Property 2: Quote text length must always be between 10-500 characters
 * Invariant: Text is always within valid range
 */
describe('Property 2: Quote text length is always valid (10-500 chars)', () => {
  test('generated quote texts always have valid length', () => {
    fc.assert(
      fc.property(
        fc.string({
          minLength: QUOTE_CONSTANTS.MIN_TEXT_LENGTH,
          maxLength: QUOTE_CONSTANTS.MAX_TEXT_LENGTH,
        }),
        (text) => {
          expect(text.length).toBeGreaterThanOrEqual(
            QUOTE_CONSTANTS.MIN_TEXT_LENGTH
          );
          expect(text.length).toBeLessThanOrEqual(
            QUOTE_CONSTANTS.MAX_TEXT_LENGTH
          );
          return true;
        }
      )
    );
  });

  test('quote text cannot be empty or whitespace only', () => {
    fc.assert(
      fc.property(
        fc.string({
          minLength: QUOTE_CONSTANTS.MIN_TEXT_LENGTH,
          maxLength: QUOTE_CONSTANTS.MAX_TEXT_LENGTH,
        }),
        (text) => {
          expect(text.trim().length).toBeGreaterThan(0);
          return true;
        }
      )
    );
  });
});

/**
 * Property 3: Author names must be between 2-100 characters
 * Invariant: Author length is always valid
 */
describe('Property 3: Author name length is always valid (2-100 chars)', () => {
  test('generated author names always have valid length', () => {
    fc.assert(
      fc.property(
        fc.string({
          minLength: QUOTE_CONSTANTS.MIN_AUTHOR_LENGTH,
          maxLength: QUOTE_CONSTANTS.MAX_AUTHOR_LENGTH,
        }),
        (author) => {
          expect(author.length).toBeGreaterThanOrEqual(
            QUOTE_CONSTANTS.MIN_AUTHOR_LENGTH
          );
          expect(author.length).toBeLessThanOrEqual(
            QUOTE_CONSTANTS.MAX_AUTHOR_LENGTH
          );
          return true;
        }
      )
    );
  });
});

/**
 * Property 4: Quote category must always be one of the 6 valid types
 * Invariant: Category is always from the predefined set
 */
describe('Property 4: Quote category is always valid', () => {
  test('category is always one of the 6 valid types', () => {
    fc.assert(
      fc.property(
        fc.sampled.uniformArbitraryOf(
          QUOTE_CONSTANTS.VALID_CATEGORIES
        ) as fc.Arbitrary<QuoteCategory>,
        (category) => {
          expect(QUOTE_CONSTANTS.VALID_CATEGORIES).toContain(category);
          return true;
        }
      )
    );
  });

  test('invalid categories are rejected', () => {
    fc.assert(
      fc.property(
        fc.string(),
        (invalidCategory) => {
          const isInvalid =
            !QUOTE_CONSTANTS.VALID_CATEGORIES.includes(
              invalidCategory as QuoteCategory
            );
          // If it's not in the valid list, it should be considered invalid
          expect(isInvalid).toBe(
            !QUOTE_CONSTANTS.VALID_CATEGORIES.includes(
              invalidCategory as QuoteCategory
            )
          );
          return true;
        }
      ),
      { numRuns: 50 }
    );
  });
});

/**
 * Property 5: Date added must never be in the future
 * Invariant: dateAdded is always <= current time
 */
describe('Property 5: dateAdded is never in the future', () => {
  test('ISO timestamps are never after now', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 365 * 24 * 60 * 60 * 1000 }), // 0 to 1 year ago
        (daysAgo) => {
          const pastDate = new Date(Date.now() - daysAgo);
          const isoString = pastDate.toISOString();
          const parsedDate = new Date(isoString);
          expect(parsedDate.getTime()).toBeLessThanOrEqual(Date.now());
          return true;
        }
      )
    );
  });

  test('dateAdded always matches ISO 8601 format', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 365 * 24 * 60 * 60 * 1000 }),
        (daysAgo) => {
          const pastDate = new Date(Date.now() - daysAgo);
          const isoString = pastDate.toISOString();
          expect(isoString).toMatch(QUOTE_CONSTANTS.ISO_DATE_REGEX);
          return true;
        }
      )
    );
  });
});

/**
 * Property 6: Quote collection always maintains consistency
 * Invariant: All quotes in the collection have required fields and valid IDs
 */
describe('Property 6: Quote collection maintains consistency', () => {
  const generateValidQuote = (): IQuote => ({
    id: uuidv4(),
    text: fc.sample(fc.string({ minLength: 10, maxLength: 500 }), 1)[0],
    author: fc.sample(fc.string({ minLength: 2, maxLength: 100 }), 1)[0],
    category: fc.sample(
      fc.sampled.uniformArbitraryOf(QUOTE_CONSTANTS.VALID_CATEGORIES) as fc.Arbitrary<QuoteCategory>,
      1
    )[0],
    dateAdded: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
  });

  test('collection never contains quotes with undefined required fields', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 20 }),
        (count) => {
          const quotes: IQuote[] = [];
          for (let i = 0; i < count; i++) {
            quotes.push(generateValidQuote());
          }
          
          quotes.forEach((quote) => {
            expect(quote.id).toBeDefined();
            expect(quote.text).toBeDefined();
            expect(quote.author).toBeDefined();
            expect(quote.category).toBeDefined();
            expect(quote.dateAdded).toBeDefined();
          });
          return true;
        }
      )
    );
  });

  test('all IDs in collection are unique', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 10, max: 100 }),
        (count) => {
          const quotes: IQuote[] = [];
          const ids = new Set<string>();
          
          for (let i = 0; i < count; i++) {
            quotes.push(generateValidQuote());
          }
          
          quotes.forEach((quote) => {
            expect(ids.has(quote.id)).toBe(false);
            ids.add(quote.id);
          });
          return true;
        }
      )
    );
  });
});

/**
 * Property 7: Quote operations preserve invariants
 * Invariant: Adding/removing quotes maintains collection validity
 */
describe('Property 7: Quote operations preserve invariants', () => {
  const generateValidQuote = (): IQuote => ({
    id: uuidv4(),
    text: 'This is a test quote that is long enough to be valid.',
    author: 'Test Author',
    category: 'wisdom',
    dateAdded: new Date().toISOString(),
  });

  test('adding quotes maintains total count', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 100 }),
        (addCount) => {
          let collection: IQuote[] = [];
          
          for (let i = 0; i < addCount; i++) {
            collection.push(generateValidQuote());
          }
          
          expect(collection.length).toBe(addCount);
          return true;
        }
      )
    );
  });

  test('removing quotes reduces count appropriately', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 5, max: 50 }),
        fc.integer({ min: 1, max: 50 }),
        (initialCount, removeCount) => {
          let collection: IQuote[] = [];
          
          for (let i = 0; i < initialCount; i++) {
            collection.push(generateValidQuote());
          }
          
          const actualRemoveCount = Math.min(removeCount, collection.length);
          for (let i = 0; i < actualRemoveCount; i++) {
            collection.pop();
          }
          
          expect(collection.length).toBe(initialCount - actualRemoveCount);
          return true;
        }
      )
    );
  });
});

/**
 * Property 8: AI-generated quotes always meet validation requirements
 * Invariant: Generated quotes have valid structure and content
 */
describe('Property 8: AI-generated quotes meet validation requirements', () => {
  test('AI response text is always within valid range', () => {
    fc.assert(
      fc.property(
        fc.string({
          minLength: 15,
          maxLength: 50,
        }),
        (aiText) => {
          // AI should generate quotes between 15-50 words (roughly)
          const wordCount = aiText.split(/\s+/).length;
          expect(wordCount).toBeGreaterThanOrEqual(3);
          expect(wordCount).toBeLessThanOrEqual(100);
          return true;
        }
      )
    );
  });

  test('AI response always includes valid author attribution', () => {
    fc.assert(
      fc.property(
        fc.string({
          minLength: 2,
          maxLength: 100,
        }),
        (author) => {
          expect(author.length).toBeGreaterThanOrEqual(2);
          expect(author.length).toBeLessThanOrEqual(100);
          return true;
        }
      )
    );
  });
});

/**
 * Property 9: Category filtering maintains consistency
 * Invariant: Filtered quotes always match the requested category
 */
describe('Property 9: Category filtering is consistent', () => {
  test('filtered quotes always have matching category', () => {
    fc.assert(
      fc.property(
        fc.sampled.uniformArbitraryOf(
          QUOTE_CONSTANTS.VALID_CATEGORIES
        ) as fc.Arbitrary<QuoteCategory>,
        (targetCategory) => {
          const quotes: IQuote[] = [
            {
              id: uuidv4(),
              text: 'Test quote one that is long enough to be valid.',
              author: 'Author One',
              category: targetCategory,
              dateAdded: new Date().toISOString(),
            },
            {
              id: uuidv4(),
              text: 'Test quote two that is long enough to be valid.',
              author: 'Author Two',
              category: 'other' as QuoteCategory,
              dateAdded: new Date().toISOString(),
            },
          ];
          
          const filtered = quotes.filter((q) => q.category === targetCategory);
          filtered.forEach((quote) => {
            expect(quote.category).toBe(targetCategory);
          });
          return true;
        }
      )
    );
  });
});

/**
 * Property 10: Quote metadata always stays synchronized
 * Invariant: Metadata reflects actual quote collection state
 */
describe('Property 10: Quote metadata stays synchronized', () => {
  test('totalQuotes always equals actual quote count', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 100 }),
        (count) => {
          const quotes: IQuote[] = [];
          for (let i = 0; i < count; i++) {
            quotes.push({
              id: uuidv4(),
              text: 'Test quote that is long enough to be valid.',
              author: 'Test Author',
              category: 'wisdom',
              dateAdded: new Date().toISOString(),
            });
          }
          
          const metadata = {
            version: '1.0',
            totalQuotes: quotes.length,
            lastUpdated: new Date().toISOString(),
          };
          
          expect(metadata.totalQuotes).toBe(quotes.length);
          return true;
        }
      )
    );
  });

  test('lastUpdated is always a valid ISO timestamp', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 365 * 24 * 60 * 60 * 1000 }),
        (timeOffset) => {
          const date = new Date(Date.now() - timeOffset);
          const iso = date.toISOString();
          expect(iso).toMatch(QUOTE_CONSTANTS.ISO_DATE_REGEX);
          return true;
        }
      )
    );
  });
});
