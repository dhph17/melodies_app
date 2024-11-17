const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, {
    input: './global.css',
    resolver: {
        assetExts: config.resolver.assetExts.filter(ext => ext !== 'svg'),
        sourceExts: [...config.resolver.sourceExts, 'svg'],
    },
});