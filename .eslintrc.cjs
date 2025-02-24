module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue'],
    ecmaVersion: 'latest',
    project: './tsconfig.eslint.json',
  },
  ignorePatterns: ['*.config.*'],
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  rules: {
    'max-len': 'off',
    'no-console': 'error',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['@stores', './src/stores'],
        ],
        extensions: ['.js', '.json', '.vue', '.ts'],
      },
    },
  },
};
