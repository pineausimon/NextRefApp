import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.mts'],
        },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'off'
      ],
      '@typescript-eslint/no-explicit-any': 'off'
    },
  },
)