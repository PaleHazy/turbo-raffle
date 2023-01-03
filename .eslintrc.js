module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`
  extends: ["custom"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
  rules: {

    // This rule is disabled because it is not compatible with Next.js
    "turbo/no-undeclared-env-vars": "warn",
  }
};
