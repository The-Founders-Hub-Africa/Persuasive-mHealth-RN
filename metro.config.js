const { getDefaultConfig } = require("@expo/metro-config");
const { mergeConfig } = require("metro-config");

const config = getDefaultConfig(__dirname);

module.exports = mergeConfig(config, {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    assetExts: config.resolver.assetExts.concat(["svg"]),
  },
});
