module.exports = {
  pluginOptions: {
    electronBuilder: {
      externals: ['adm-zip', 'axios', 'robotjs', 'arraybuffer-to-buffer', 'vue-router', 'ws', 'sudo-prompt'],
      builderOptions: {
        afterSign: "notarize.js",
        mac: {
          hardenedRuntime : true,
          gatekeeperAssess: false,
          entitlements: "build/entitlements.mac.inherit.plist",
          type: "distribution" ,
          entitlementsInherit: "build/entitlements.mac.inherit.plist"
        },
        dmg: {
          sign: false
        }
      }
    }
  }
}
