module.exports = {
  plugins: ['prettier', 'mocha'],
  env: {
    es6: true,
    node: true,
    mocha: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'prettier/prettier': 'error',
    'mocha/no-exclusive-tests': 'error',
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-console': ['warn'],
  },
};
