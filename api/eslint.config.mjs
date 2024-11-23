import globals from 'globals';
import prettierConfig from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs' },
    ignores: [
      'node_modules/',
      'dist/',
      'coverage/',
      'coverage-jest/',
      'coverage',
      'logs/',
      'tmp/',
      'nginx/',
      'src/log',
      'api/coverage',
    ],
    ...prettierConfig,
  },
  {
    languageOptions: { globals: globals.browser },
    ignores: [
      'node_modules/',
      'dist/',
      'coverage/',
      'logs/',
      'tmp/',
      'nginx/',
      'src/log',
      'api/coverage',
    ],
  },
];
