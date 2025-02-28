'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var app = require('firebase/app');
var auth = require('firebase/auth');

// _src/plugins/firebase/index.ts
var prefix = "\x1B[38;5;208mFIREBASE:\x1B[0m";
var FirebaseHelper = class {
  constructor() {
  }
  init(options) {
    app.initializeApp(options);
    this.initiate();
  }
  async initiate() {
    const app$1 = await Promise.resolve().then(async () => {
      const app2 = app.getApps();
      return app2[0];
    });
    console.log(prefix, `Firebase connected successfully to ${app$1.name}`);
  }
  // private getClient() {
  //   return getApp();
  // }
  getAuth() {
    return auth.getAuth();
  }
  signInWithGoogle() {
    const auth$1 = this.getAuth();
    const provider = new auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    return auth.signInWithPopup(auth$1, provider);
  }
  async signOut() {
    const auth$1 = this.getAuth();
    return await auth.signOut(auth$1);
  }
};
var globalInstance = globalThis;
if (!globalInstance.__FIREBASE__)
  globalInstance.__FIREBASE__ = new FirebaseHelper();
var firebase = globalInstance.__FIREBASE__;
var firebase_default = FirebaseHelper;

exports.FirebaseHelper = FirebaseHelper;
exports.default = firebase_default;
exports.firebase = firebase;
Object.keys(app).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return app[k]; }
  });
});
