const urls = require("./urls.json");

let proxyConfig;
let proxyTarget = urls.webServices;

if (proxyTarget) {

  proxyConfig = {
    "/local": {
      "target": proxyTarget,
      "secure": true,
      "pathRewrite": {
        "^/local": ""
      },
      "changeOrigin": true,
      "logLevel": "info"
    }
  };
}
else {
  proxyConfig = {};
}

module.exports = proxyConfig;
