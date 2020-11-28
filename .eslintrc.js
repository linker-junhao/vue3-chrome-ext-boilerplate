module.exports = {
  root: true,
  env: {
    'node': true,
    'browser': true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-deprecated-scope-attribute': 'error',
    'vue/no-deprecated-slot-attribute': 'off',
    'vue/no-deprecated-slot-scope-attribute': 'error',
    'vue/no-irregular-whitespace': 'error',
    'vue/no-reserved-component-names': 'error',
    'vue/script-indent': 'error',
    'indent': [
      'error',
      2
    ],
    'quotes': ['error', 'single']
  }
};
