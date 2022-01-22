module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current"
        }
      }
    ],
    "@babel/preset-typescript"
  ],
  assumptions: {
    "setPublicClassFields": true
  },
  plugins: [
    ["module-resolver", {
      alias: {
        "@domain": "./src/domain",
        "@infra": "./src/infra"
      }
    }],
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties"]
  ],
  ignore: [
    "**/*.spec.ts"
  ]
}
