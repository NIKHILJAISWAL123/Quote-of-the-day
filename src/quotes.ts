/**
 * Quote Manager - CRUD operations for quotes
 */

import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';
import {
  IQuote,
  IQuoteManager,
  IQuoteStorage,
  QuoteCategory,
} from './types';
import { QuoteValidator, sanitizeQuoteText, sanitizeAuthorName } from './validators';

/**
 * Quote Manager implementation
 */
export class QuoteManager implements IQuoteManager {
  private validator: QuoteValidator;
  private quotes: IQuote[] = [];
  private storageDir: string;
  private storageFile: string;

  constructor(storageDir: string = './data') {
    this.validator = new QuoteValidator();
    this.storageDir = storageDir;
    this.storageFile = path.join(storageDir, 'quotes.json');
  }

  /**
   * Initialize and load quotes from storage
   */
  async initialize(): Promise<void> {
    try {
      await fs.mkdir(this.storageDir, { recursive: true });
      const data = await this.loadFromFile();
      this.quotes = data.quotes;
    } catch (error) {
      console.warn('Creating new quote storage');
      this.quotes = [];
    }
  }

  /**
   * Add a new quote
   */
  async addQuote(quote: Omit<IQuote, 'id' | 'dateAdded'>): Promise<IQuote> {
    // Generate ID and timestamp
    const newQuote: IQuote = {
      id: uuidv4(),
      text: sanitizeQuoteText(quote.text),
      author: sanitizeAuthorName(quote.author),
      category: quote.category,
      dateAdded: new Date().toISOString(),
      source: quote.source,
      isAIGenerated: quote.isAIGenerated ?? false,
      explanation: quote.explanation,
    };

    // Validate
    const validation = this.validator.validateQuote(newQuote);
    if (!validation.isValid) {
      throw new Error(`Quote validation failed: ${validation.errors.join(', ')}`);
    }

    // Add to collection
    this.quotes.push(newQuote);

    // Save to file
    await this.saveToFile();

    return newQuote;
  }

  /**
   * Remove a quote by ID
   */
  async removeQuote(id: string): Promise<boolean> {
    const index = this.quotes.findIndex((q) => q.id === id);
    if (index === -1) {
      return false;
    }

    this.quotes.splice(index, 1);
    await this.saveToFile();
    return true;
  }

  /**
   * Get a quote by ID
   */
  async getQuote(id: string): Promise<IQuote | null> {
    return this.quotes.find((q) => q.id === id) ?? null;
  }

  /**
   * Get a random quote, optionally filtered by category
   */
  async getRandomQuote(category?: QuoteCategory): Promise<IQuote | null> {
    let filtered = this.quotes;

    if (category) {
      filtered = filtered.filter((q) => q.category === category);
    }

    if (filtered.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * filtered.length);
    return filtered[randomIndex];
  }

  /**
   * Get quote of the day (deterministic based on date)
   */
  async getQuoteOfTheDay(category?: QuoteCategory): Promise<IQuote | null> {
    let filtered = this.quotes;

    if (category) {
      filtered = filtered.filter((q) => q.category === category);
    }

    if (filtered.length === 0) {
      return null;
    }

    // Use today's date as seed for deterministic selection
    const today = new Date().toDateString();
    const seed = hashString(today);
    const index = seed % filtered.length;

    return filtered[index];
  }

  /**
   * List all quotes, optionally filtered by category
   */
  async listQuotes(category?: QuoteCategory): Promise<IQuote[]> {
    if (!category) {
      return [...this.quotes];
    }

    return this.quotes.filter((q) => q.category === category);
  }

  /**
   * Get all quotes
   */
  async getAllQuotes(): Promise<IQuote[]> {
    return [...this.quotes];
  }

  /**
   * Get count of quotes
   */
  getCount(category?: QuoteCategory): number {
    if (!category) {
      return this.quotes.length;
    }
    return this.quotes.filter((q) => q.category === category).length;
  }

  /**
   * Get category distribution
   */
  getCategoryDistribution(): Record<QuoteCategory, number> {
    const distribution: Record<QuoteCategory, number> = {
      motivation: 0,
      success: 0,
      funny: 0,
      wisdom: 0,
      leadership: 0,
      other: 0,
    };

    for (const quote of this.quotes) {
      distribution[quote.category]++;
    }

    return distribution;
  }

  /**
   * Load quotes from file
   */
  private async loadFromFile(): Promise<IQuoteStorage> {
    try {
      const data = await fs.readFile(this.storageFile, 'utf-8');
      const parsed = JSON.parse(data) as IQuoteStorage;
      return parsed;
    } catch (error) {
      return { quotes: [], metadata: { version: '1.0', totalQuotes: 0, lastUpdated: new Date().toISOString() } };
    }
  }

  /**
   * Save quotes to file
   */
  private async saveToFile(): Promise<void> {
    const storage: IQuoteStorage = {
      quotes: this.quotes,
      metadata: {
        version: '1.0',
        totalQuotes: this.quotes.length,
        lastUpdated: new Date().toISOString(),
      },
    };

    await fs.writeFile(this.storageFile, JSON.stringify(storage, null, 2), 'utf-8');
  }

  /**
   * Export quotes to CSV format
   */
  async exportToCSV(): Promise<string> {
    const header = ['ID', 'Text', 'Author', 'Category', 'Date Added', 'Source', 'Is AI Generated', 'Explanation'];
    const rows = this.quotes.map((q) => [
      q.id,
      `"${q.text.replace(/"/g, '""')}"`, // Escape quotes
      q.author,
      q.category,
      q.dateAdded,
      q.source || '',
      q.isAIGenerated ? 'yes' : 'no',
      q.explanation ? `"${q.explanation.replace(/"/g, '""')}"` : '',
    ]);

    return [header.join(','), ...rows.map((r) => r.join(','))].join('\n');
  }

  /**
   * Import quotes from CSV format
   */
  async importFromCSV(csv: string): Promise<{ imported: number; failed: number }> {
    const lines = csv.split('\n');
    let imported = 0;
    let failed = 0;

    // Skip header
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      try {
        // Simple CSV parsing (may need more robust parsing for complex data)
        const parts = line.split(',').map((p) => p.trim());

        if (parts.length < 4) {
          failed++;
          continue;
        }

        const quote: Omit<IQuote, 'id' | 'dateAdded'> = {
          text: parts[1].replace(/^"|"$/g, '').replace('""', '"'),
          author: parts[2],
          category: parts[3] as QuoteCategory,
          source: parts[5] || undefined,
          isAIGenerated: parts[6].toLowerCase() === 'yes',
          explanation: parts[7] ? parts[7].replace(/^"|"$/g, '').replace('""', '"') : undefined,
        };

        await this.addQuote(quote);
        imported++;
      } catch (error) {
        failed++;
      }
    }

    return { imported, failed };
  }
}

/**
 * Simple hash function for deterministic quote selection
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Create a quote manager instance with default settings
 */
export async function createQuoteManager(storageDir?: string): Promise<QuoteManager> {
  const manager = new QuoteManager(storageDir);
  await manager.initialize();
  return manager;
}
