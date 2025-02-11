module.exports = (api) => ({
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [api.env() !== 'esm' && 'add-module-exports'].filter(Boolean),
});
