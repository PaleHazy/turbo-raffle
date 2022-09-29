const withTM = require("next-transpile-modules")(["ui"]);

module.exports = withTM({
  reactStrictMode: true,
  webpack: (config,  { buildId, dev, isServer, defaultLoaders, webpack, typescript }) => {

    config.experiments = {
    topLevelAwait: true,
    };
    return config
  },
});
