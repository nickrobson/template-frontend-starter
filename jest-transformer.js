// eslint-disable-next-line no-undef,@typescript-eslint/no-var-requires
module.exports = require('babel-jest').default.createTransformer?.({
  presets: [
    '@babel/preset-env',
    '@babel/preset-typescript',
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  plugins: ['@compiled/babel-plugin'],
});
