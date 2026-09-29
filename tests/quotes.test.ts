/**
 * Unit tests for Quote Manager
 */

import { QuoteManager, createQuoteManager } from '../src/quotes';
import { QuoteValidator } from '../src/validators';
import { IQuote, QuoteCategory } from '../src/types';
import fs from 'fs/promises';
import path from 'path';

describe('QuoteManager', () => {
  let manager: QuoteManager;
  const testDir = './test-data';

  beforeEach(async () => {
    manager = new QuoteManager(testDir);
    await manager.initialize();
  });

  afterEach(async () => {
    try {
      await fs.rm(testDir, { recursive: true, force: true });
    } catch {
      // Ignore cleanup errors
    }
  });

  describe('addQuote', () => {
    test('should add a valid quote', async () => {
      const quote = await manager.addQuote({
        text: 'The only way to do great work is to love what you do.',
        author: 'Steve Jobs',
        category: 'motivation' as QuoteCategory,
      });

      expect(quote.id).toBeDefined();
      expect(quote.text).toBe('The only way to do great work is to love what you do.');
      expect(quote.author).toBe('Steve Jobs');
      expect(quote.category).toBe('motivation');
      expect(quote.dateAdded).toBeDefined();
    });

    test('should sanitize quote text and author', async () => {
      const quote = await manager.addQuote({
        text: '  "The only way to do great work is to love what you do."  ',
        author: '  Steve Jobs  ',
        category: 'motivation' as QuoteCategory,
      });

      expect(quote.text).toBe('The only way to do great work is to love what you do.');
      expect(quote.author).toBe('Steve Jobs');
    });

    test('should reject invalid quote (too short)', async () => {
      await expect(
        manager.addQuote({
          text: 'Short',
          author: 'Someone',
          category: 'motivation' as QuoteCategory,
        })
      ).rejects.toThrow();
    });

    test('should set isAIGenerated flag', async () => {
      const quote = await manager.addQuote({
        text: 'This is an AI-generated quote that is long enough to be valid.',
        author: 'AI Generator',
        category: 'other' as QuoteCategory,
        isAIGenerated: true,
      });

      expect(quote.isAIGenerated).toBe(true);
    });
  });

  describe('removeQuote', () => {
    test('should remove an existing quote', async () => {
      const quote = await manager.addQuote({
        text: 'The only way to do great work is to love what you do.',
        author: 'Steve Jobs',
        category: 'motivation' as QuoteCategory,
      });

      const removed = await manager.removeQuote(quote.id);
      expect(removed).toBe(true);

      const found = await manager.getQuote(quote.id);
      expect(found).toBeNull();
    });

    test('should return false for non-existent quote', async () => {
      const removed = await manager.removeQuote('non-existent-id');
      expect(removed).toBe(false);
    });
  });

  describe('getQuote', () => {
    test('should retrieve an existing quote', async () => {
      const added = await manager.addQuote({
        text: 'The only way to do great work is to love what you do.',
        author: 'Steve Jobs',
        category: 'motivation' as QuoteCategory,
      });

      const found = await manager.getQuote(added.id);
      expect(found).toEqual(added);
    });

    test('should return null for non-existent quote', async () => {
      const found = await manager.getQuote('non-existent-id');
      expect(found).toBeNull();
    });
  });

  describe('getRandomQuote', () => {
    test('should return a random quote', async () => {
      await manager.addQuote({
        text: 'The only way to do great work is to love what you do.',
        author: 'Steve Jobs',
        category: 'motivation' as QuoteCategory,
      });

      const quote = await manager.getRandomQuote();
      expect(quote).toBeDefined();
      expect(quote?.id).toBeDefined();
    });

    test('should return null when no quotes exist', async () => {
      const quote = await manager.getRandomQuote();
      expect(quote).toBeNull();
    });

    test('should filter by category', async () => {
      await manager.addQuote({
        text: 'The only way to do great work is to love what you do.',
        author: 'Steve Jobs',
        category: 'motivation' as QuoteCategory,
      });

      await manager.addQuote({
        text: 'Why did the programmer quit his job? Because he did not get arrays.',
        author: 'Unknown Author',
        category: 'funny' as QuoteCategory,
      });

      const quote = await manager.getRandomQuote('motivation');
      expect(quote?.category).toBe('motivation');
    });
  });

  describe('getQuoteOfTheDay', () => {
    test('should return deterministic quote for same day', async () => {
      await manager.addQuote({
        text: 'The only way to do great work is to love what you do.',
        author: 'Steve Jobs',
        category: 'motivation' as QuoteCategory,
      });

      const quote1 = await manager.getQuoteOfTheDay();
      const quote2 = await manager.getQuoteOfTheDay();

      expect(quote1?.id).toBe(quote2?.id);
    });

    test('should filter by category for QOTD', async () => {
      await manager.addQuote({
        text: 'The only way to do great work is to love what you do.',
        author: 'Steve Jobs',
        category: 'motivation' as QuoteCategory,
      });

      const quote = await manager.getQuoteOfTheDay('motivation');
      expect(quote?.category).toBe('motivation');
    });
  });

  describe('listQuotes', () => {
    test('should list all quotes', async () => {
      const q1 = await manager.addQuote({
        text: 'The only way to do great work is to love what you do.',
        author: 'Steve Jobs',
        category: 'motivation' as QuoteCategory,
      });

      const q2 = await manager.addQuote({
        text: 'Innovation distinguishes between a leader and a follower.',
        author: 'Steve Jobs',
        category: 'leadership' as QuoteCategory,
      });

      const quotes = await manager.listQuotes();
      expect(quotes).toHaveLength(2);
      expect(quotes).toContainEqual(q1);
      expect(quotes).toContainEqual(q2);
    });

    test('should filter by category', async () => {
      await manager.addQuote({
        text: 'The only way to do great work is to love what you do.',
        author: 'Steve Jobs',
        category: 'motivation' as QuoteCategory,
      });

      await manager.addQuote({
        text: 'Innovation distinguishes between a leader and a follower.',
        author: 'Steve Jobs',
        category: 'leadership' as QuoteCategory,
      });

      const quotes = await manager.listQuotes('motivation');
      expect(quotes).toHaveLength(1);
      expect(quotes[0].category).toBe('motivation');
    });
  });

  describe('getCategoryDistribution', () => {
    test('should return distribution of quotes by category', async () => {
      await manager.addQuote({
        text: 'The only way to do great work is to love what you do.',
        author: 'Steve Jobs',
        category: 'motivation' as QuoteCategory,
      });

      await manager.addQuote({
        text: 'Innovation distinguishes between a leader and a follower.',
        author: 'Steve Jobs',
        category: 'leadership' as QuoteCategory,
      });

      const distribution = manager.getCategoryDistribution();
      expect(distribution.motivation).toBe(1);
      expect(distribution.leadership).toBe(1);
      expect(distribution.success).toBe(0);
    });
  });

  describe('exportToCSV', () => {
    test('should export quotes to CSV format', async () => {
      await manager.addQuote({
        text: 'The only way to do great work is to love what you do.',
        author: 'Steve Jobs',
        category: 'motivation' as QuoteCategory,
      });

      const csv = await manager.exportToCSV();
      expect(csv).toContain('ID,Text,Author,Category');
      expect(csv).toContain('Steve Jobs');
      expect(csv).toContain('motivation');
    });
  });
});

describe('QuoteValidator', () => {
  let validator: QuoteValidator;

  beforeEach(() => {
    validator = new QuoteValidator();
  });

  describe('validateQuote', () => {
    test('should validate a correct quote', () => {
      const quote: IQuote = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        text: 'The only way to do great work is to love what you do.',
        author: 'Steve Jobs',
        category: 'motivation',
        dateAdded: '2026-09-29T10:30:00.000Z',
      };

      const result = validator.validateQuote(quote);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should reject quote with short text', () => {
      const quote: IQuote = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        text: 'Short',
        author: 'Steve Jobs',
        category: 'motivation',
        dateAdded: '2026-09-29T10:30:00.000Z',
      };

      const result = validator.validateQuote(quote);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    test('should reject quote with invalid category', () => {
      const quote: any = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        text: 'The only way to do great work is to love what you do.',
        author: 'Steve Jobs',
        category: 'INVALID',
        dateAdded: '2026-09-29T10:30:00.000Z',
      };

      const result = validator.validateQuote(quote);
      expect(result.isValid).toBe(false);
    });
  });

  describe('validateText', () => {
    test('should accept valid text', () => {
      expect(validator.validateText('This is a valid quote text.')).toBe(true);
    });

    test('should reject text that is too short', () => {
      expect(validator.validateText('Short')).toBe(false);
    });

    test('should reject empty text', () => {
      expect(validator.validateText('   ')).toBe(false);
    });
  });

  describe('validateAuthor', () => {
    test('should accept valid author', () => {
      expect(validator.validateAuthor('Steve Jobs')).toBe(true);
    });

    test('should reject author that is too short', () => {
      expect(validator.validateAuthor('S')).toBe(false);
    });

    test('should reject empty author', () => {
      expect(validator.validateAuthor('   ')).toBe(false);
    });
  });

  describe('validateCategory', () => {
    test('should accept valid categories', () => {
      expect(validator.validateCategory('motivation')).toBe(true);
      expect(validator.validateCategory('success')).toBe(true);
      expect(validator.validateCategory('funny')).toBe(true);
    });

    test('should reject invalid categories', () => {
      expect(validator.validateCategory('invalid')).toBe(false);
      expect(validator.validateCategory('MOTIVATION')).toBe(false);
    });
  });
});
