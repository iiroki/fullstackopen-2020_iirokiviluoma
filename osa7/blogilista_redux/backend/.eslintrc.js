module.exports = {
  'env': {
    'node': true,
    'commonjs': true,
    'es2020': true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 11
  },
  'rules': {
    'indent': [
      'error', 2
    ],
    'linebreak-style': [
      'error', 'unix'
    ],
    'quotes': [
      'off'  // Single- and backticks
    ],
    'semi': [
      'error', 'never'
    ],
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'always'
    ],
    'arrow-spacing': [
      'error', { 'before': true, 'after': true }
    ],
    'no-unused-vars': [
      'error', { 'args': 'none' }  // Express API parameters
    ],
    'no-undef': [
      'off'  // Jest/supertest global functions
    ],
    'no-console': 0
  }
}
