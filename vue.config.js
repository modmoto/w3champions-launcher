module.exports = {
  pluginOptions: {
    electronBuilder: {
      externals: [
        'adm-zip',
        'axios',
        'bindings',
        'send-keys-native',
        'arraybuffer-to-buffer',
        'vue-router',
        'ws',
        'sudo-prompt',
        'fs-extra',
        'electron-log',
        'electron-updater',
        'vue-markdown'
      ],
      builderOptions: {
        afterSign: "notarize.js",
        mac: {
          hardenedRuntime : true,
          gatekeeperAssess: false,
          entitlements: "build/entitlements.mac.inherit.plist",
          entitlementsInherit: "build/entitlements.mac.inherit.plist",
          type: "distribution"
        },
        dmg: {
          sign: false
        },
        publish: [{
          provider: "github",
          owner: "w3champions",
          repo: "w3champions-launcher"
        }],
      }
    }
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "development") {
      config.devtool = "eval-source-map";
      config.output.devtoolModuleFilenameTemplate = (info) =>
          info.resourcePath.match(/\.vue$/) &&
          !info.identifier.match(/type=script/) // this is change ✨
              ? `webpack-generated:///${info.resourcePath}?${info.hash}`
              : `webpack-yourCode:///${info.resourcePath}`;

      config.output.devtoolFallbackModuleFilenameTemplate =
          "webpack:///[resource-path]?[hash]";
    }
  },
}
