import { afterEach, describe, expect, it, vi } from 'vitest';
import { load, t } from './translate'; // Adjust the import path as necessary
import i18next from './i18n';

// Mock the entire i18next module
vi.mock('./i18n', () => ({
  default: {
    init: vi.fn(),
    use: vi.fn().mockReturnThis(), // Chainable methods
    t: vi.fn(),
  },
}));

describe('translate.ts', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('load function', () => {
    it('should initialize i18next with the correct config', async () => {
      const config = {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
        crossDomain: true,
      };

      await load(config);

      expect(i18next.init).toHaveBeenCalledWith({
        fallbackLng: 'en',
        load: 'languageOnly',
        interpolation: {
          escapeValue: false,
        },
        debug: false,
        backend: config,
      });
    });
  });

  describe('t function', () => {
    it('should translate a key with options', () => {
      const key = 'hello';
      const options = { name: 'John' };
      const translation = 'Hello, John';

      //@ts-expect-error - We are mocking the entire i18next module
      i18next.t.mockReturnValue(translation);

      const result = t(key, options);

      expect(result).toEqual(translation);
      expect(i18next.t).toHaveBeenCalledWith(key, options);
    });

    it('should translate a key without options', () => {
      const key = 'greeting';
      const translation = 'Hello';

      //@ts-expect-error - We are mocking the entire i18next module
      i18next.t.mockReturnValue(translation);

      const result = t(key);

      expect(result).toEqual(translation);
      expect(i18next.t).toHaveBeenCalledWith(key, undefined);
    });
  });
});
