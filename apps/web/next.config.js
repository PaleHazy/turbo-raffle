const withTM = require("next-transpile-modules")(["ui", "raffle-server"]);

module.exports = withTM({
  reactStrictMode: true,

});
