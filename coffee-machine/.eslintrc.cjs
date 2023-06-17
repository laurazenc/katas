module.exports = {
  env: { browser: true, es2020: true, "jest/globals": true},
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    "eslint-config-codely",
    "prettier",
    "plugin:prettier/recommended",
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh', 'testing-library', "@typescript-eslint", "jest"],
  rules: {
    'react-refresh/only-export-components': 'warn',
  }
}