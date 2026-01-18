import { generateSlug, formatDuration, calculateCompletionPercentage } from './index';

describe('Utility Functions', () => {
  describe('generateSlug', () => {
    it('should convert text to slug format', () => {
      expect(generateSlug('Hello World')).toBe('hello-world');
      expect(generateSlug('JavaScript & TypeScript')).toBe('javascript-typescript');
      expect(generateSlug('  Multiple   Spaces  ')).toBe('multiple-spaces');
    });
  });

  describe('formatDuration', () => {
    it('should format minutes correctly', () => {
      expect(formatDuration(30)).toBe('30m');
      expect(formatDuration(60)).toBe('1h');
      expect(formatDuration(90)).toBe('1h 30m');
      expect(formatDuration(120)).toBe('2h');
    });
  });

  describe('calculateCompletionPercentage', () => {
    it('should calculate completion percentage correctly', () => {
      expect(calculateCompletionPercentage(5, 10)).toBe(50);
      expect(calculateCompletionPercentage(0, 10)).toBe(0);
      expect(calculateCompletionPercentage(10, 10)).toBe(100);
      expect(calculateCompletionPercentage(3, 0)).toBe(0);
    });
  });
});