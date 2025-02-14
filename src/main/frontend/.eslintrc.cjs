const {rules} = require('eslint-plugin-react-refresh');
const {IgnorePlugin} = require('webpack');

module.exports = {
  root: true,
  env: {browser: true, es2020: true},
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  Plugins: ['react-refresh', 'jsx-ally'],
  rules: {
    'react-refresh/only-export-component': ['warn', {allowNamedExport: true}],
  },
};
