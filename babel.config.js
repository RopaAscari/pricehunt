module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          "@data/*": ["./data/*"],
          "@store/*": ["./store/*"],
          "@theme/*": ["./theme/*"],
          "@router/*": ["./router/*"],
          "@actions/*": ["./actions/*"],
          "@screens/*": ["./screens/*"],
          "@reducers/*": ["./reducers/*"],
          "@services/*": ["./services/*"],
          "@constants/*": ["./constants/*"],
          "@components/*": ["./components/*"],
          "@icons/*": ["./components/svg/icons/*"],
          "@svgcomponents/*": ["./components/svg/components/*"]
        },
      },
    ],
  ],
};
