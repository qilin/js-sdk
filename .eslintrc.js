module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  env: {
    "browser": true,
    "node": true,
    "commonjs": true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    "ecmaVersion": 2017,
    "sourceType": "module",
  },
  plugins: [
    "@typescript-eslint/eslint-plugin",
  ],
  rules: {
    "comma-dangle": ["error", "always-multiline"],
    "semi": ["error", "always"],
    "arrow-parens": ["error", "as-needed"],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    "quotes": ["error", "single"],
    "@typescript-eslint/explicit-function-return-type": "off",
  },
};
