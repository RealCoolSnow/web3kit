const isProd = process.env.NODE_ENV === 'production'
module.exports = {
  extends: ['@antfu/eslint-config'],
  rules: {
    'no-console': isProd ? 'warn' : 'off',
    'no-debugger': isProd ? 'warn' : 'off',
  },
}
