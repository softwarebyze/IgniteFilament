/* eslint-env node */
// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config")

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

config.transformer.getTransformOptions = async () => ({
  transform: {
    // Inline requires are very useful for deferring loading of large dependencies/components.
    // For example, we use it in app.tsx to conditionally load Reactotron.
    // However, this comes with some gotchas.
    // Read more here: https://reactnative.dev/docs/optimizing-javascript-loading
    // And here: https://github.com/expo/expo/issues/27279#issuecomment-1971610698
    inlineRequires: true,
  },
})

// This helps support certain popular third-party libraries
// such as Firebase that use the extension cjs.
config.resolver.sourceExts.push("cjs")

// This makes it possible to import .glb files.
// React Native Filament https://margelo.github.io/react-native-filament/docs/guides#configure-metro
// config.resolver.sourceExts.push("glb") // https://youtu.be/msErROjFY08?si=JrcaH14xgnn9bbqb&t=307
config.resolver.assetExts.push("glb")

module.exports = config
