import { describe, it, expect, vi } from 'vitest';
import { 
  formatCurrency, 
  capitalizeWords, 
  debounce, 
  isValidEmail, 
  truncateString 
} from './example-utils';

describe('formatCurrency', () => {
  it('formats USD currency correctly', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
    expect(formatCurrency(0)).toBe('$0.00');
    expect(formatCurrency(999999.99)).toBe('$999,999.99');
  });

  it('formats different currencies', () => {
    expect(formatCurrency(1234.56, 'EUR')).toBe('€1,234.56');
    expect(formatCurrency(1234.56, 'GBP')).toBe('£1,234.56');
  });

  it('handles negative amounts', () => {
    expect(formatCurrency(-1234.56)).toBe('-$1,234.56');
  });
});

describe('capitalizeWords', () => {
  it('capitalizes first letter of each word', () => {
    expect(capitalizeWords('hello world')).toBe('Hello World');
    expect(capitalizeWords('react typescript')).toBe('React Typescript');
  });

  it('handles single word', () => {
    expect(capitalizeWords('hello')).toBe('Hello');
  });

  it('handles empty string', () => {
    expect(capitalizeWords('')).toBe('');
  });

  it('handles already capitalized words', () => {
    expect(capitalizeWords('HELLO WORLD')).toBe('Hello World');
  });
});

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('delays function execution', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 1000);

    debouncedFn('test');
    expect(mockFn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1000);
    expect(mockFn).toHaveBeenCalledWith('test');
  });

  it('cancels previous calls when called again', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 1000);

    debouncedFn('first');
    debouncedFn('second');

    vi.advanceTimersByTime(500);
    expect(mockFn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);
    expect(mockFn).toHaveBeenCalledWith('second');
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});

describe('isValidEmail', () => {
  it('validates correct email addresses', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
    expect(isValidEmail('user+tag@example.org')).toBe(true);
  });

  it('rejects invalid email addresses', () => {
    expect(isValidEmail('invalid-email')).toBe(false);
    expect(isValidEmail('test@')).toBe(false);
    expect(isValidEmail('@example.com')).toBe(false);
    expect(isValidEmail('test@.com')).toBe(false);
    expect(isValidEmail('')).toBe(false);
  });
});

describe('truncateString', () => {
  it('truncates long strings', () => {
    expect(truncateString('This is a very long string', 10)).toBe('This is a...');
    expect(truncateString('Short', 10)).toBe('Short');
  });

  it('uses custom suffix', () => {
    expect(truncateString('Long string', 5, '***')).toBe('Long***');
  });

  it('handles edge cases', () => {
    expect(truncateString('', 5)).toBe('');
    expect(truncateString('Test', 0)).toBe('...');
    expect(truncateString('Test', 4)).toBe('Test');
  });

  it('handles suffix longer than max length', () => {
    expect(truncateString('Test', 2, '...')).toBe('...');
  });
}); 