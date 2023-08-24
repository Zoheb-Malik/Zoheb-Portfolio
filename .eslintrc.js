import { path } from 'path';

const aliasMap = Object.keys(alias).map((a) => [a, alias[a]]);

module.exports = {
  root: true,
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'airbnb-typescript-prettier',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],parser: '@typescript-eslint/parser',
  parserOptions: {
    project: [
      path.join(__dirname, './tsconfig.json'),
      path.join(__dirname, 'test', './tsconfig.json'),
    ],
    tsconfigRootDir: './src',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      alias: {
        map: [
          // upstream boilerplate default path aliases
          ...aliasMap,
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
      typescript: {
        project: path.join(__dirname, './tsconfig.json'),
      },
    },
  },
  rules: {
    // upstream boilerplate default eslint rules
    ...rules,
  },
};
