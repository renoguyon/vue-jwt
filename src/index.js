(function () {

  const cookie = require('tiny-cookie');
  const jwt = require('jsonwebtoken');

  const supportedStorages = ['cookie', 'localStorage'];

  const defaults = {
    storage: 'localStorage',
    keyName: 'auth_token',
    signKey: null,
    audience: null,
    issuer: null,
    ignoreExpiration: false,
    ignoreNotBefore: false,
    subject: null,
    clockTolerance: 0
  };

  const VueJWT = {
    options: {},

    setOptions (opts) {
      this.options = Object.assign({}, defaults, opts);

      if (opts && opts.storage && supportedStorages.indexOf(opts.storage) === -1) {
        console.warn('[Vue JWT] suppored storages are \'cookie\' and \'localStorage\'. Using localStorage as default.');
      }

      return this;
    },

    hasToken () {
      const token = this.getToken();
      return token && token.length > 0;
    },

    getToken () {
      if (this.options.storage === 'cookie') {
        return cookie.get(this.options.keyName);
      } else {
        return localStorage.getItem(this.options.keyName);
      }
    },

    decode (token = null, signKey = null) {
      const tokenToDecode = token ? token : this.getToken();
      const secretOrKey = signKey ? signKey : this.options.signKey;

      try {
        const params = {
          audience: this.options.audience,
          issuer: this.options.issuer,
          ignoreExpiration: this.options.ignoreExpiration,
          ignoreNotBefore: this.options.ignoreNotBefore,
          subject: this.options.subject,
          clockTolerance: this.options.clockTolerance
        };

        if (secretOrKey === null) {
          return jwt.decode(tokenToDecode, params);
        }

        return jwt.verify(tokenToDecode, secretOrKey, params);
      } catch (err) {
        console.error(`[Vue JWT] Can not decode token: ${err.message}`);
        return null;
      }
    }
  };

  const VuePlugin = {
    install: function (Vue, opts) {
      const jwtPlugin = VueJWT.setOptions(opts);
      Vue.prototype.$jwt = jwtPlugin;
      Vue.$jwt = jwtPlugin;
    }
  };

  if (typeof exports === 'object') {
    module.exports = VuePlugin;
  } else if (typeof define === 'function' && define.amd) {
    define([], function(){ return VuePlugin; });
  } else if (window.Vue) {
    window.VueJWT = VuePlugin;
    Vue.use(VuePlugin);
  }

})();
