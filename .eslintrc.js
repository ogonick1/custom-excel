module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint-config-airbnb',
  ],
  parser: '@babel/eslint-parser',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-return-assign': 'off',
    'no-use-before-define': 'off',
    'no-console': 'off',
    'no-unused-vars': 'warn',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
    'linebreak-style': 'off',
    'arrow-body-style': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
  },
};
