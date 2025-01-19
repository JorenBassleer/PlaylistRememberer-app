module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'max-len': 'off',
    'no-underscore-dangle': 'off',
    'no-console': 'error',
    'linebreak-style': 'off',
    'quote-props': ['error', 'consistent-as-needed'],
    'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
    'func-style': ['error', 'expression', { allowArrowFunctions: true }],
    'array-bracket-newline': ['error', { multiline: true }],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['@stores', './src/stores'],
        ],
        extensions: ['.js', '.json', '.vue'],
      },
    },
  },
};
