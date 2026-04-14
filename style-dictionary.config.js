/**
 * style-dictionary.config.js
 * 
 * Configuração do Style Dictionary para o design system.
 * Transforma tokens JSON (DTCG) em CSS custom properties.
 * 
 * Uso: npx style-dictionary build
 * 
 * Requer: npm install style-dictionary @tokens-studio/sd-transforms
 */

const StyleDictionary = require('style-dictionary');

// Register Tokens Studio transforms if available
try {
  const { registerTransforms } = require('@tokens-studio/sd-transforms');
  registerTransforms(StyleDictionary);
} catch (e) {
  console.warn('⚠️  @tokens-studio/sd-transforms not installed. Using default transforms.');
}

module.exports = {
  source: [
    'tokens/foundation/**/*.json',
    'tokens/semantic/light.json', // default theme
    'tokens/component/**/*.json'
  ],
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'ds',
      buildPath: 'css/tokens/generated/',
      files: [
        {
          destination: 'foundation.css',
          format: 'css/variables',
          filter: (token) => token.filePath.includes('foundation'),
          options: {
            selector: ':root'
          }
        },
        {
          destination: 'theme-light.css',
          format: 'css/variables',
          filter: (token) => token.filePath.includes('semantic/light'),
          options: {
            selector: ':root'
          }
        },
        {
          destination: 'theme-dark.css',
          format: 'css/variables',
          filter: (token) => token.filePath.includes('semantic/dark'),
          options: {
            selector: '[data-mode="dark"]'
          }
        },
        {
          destination: 'components.css',
          format: 'css/variables',
          filter: (token) => token.filePath.includes('component'),
          options: {
            selector: ':root'
          }
        }
      ]
    },
    // Future platforms can be added here:
    // swift: { ... },
    // kotlin: { ... },
    // scss: { ... },
  }
};
