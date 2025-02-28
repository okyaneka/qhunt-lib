import { initializeApp, getApps } from 'firebase/app';
export * from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

// _src/plugins/firebase/index.ts
var prefix = "\x1B[38;5;208mFIREBASE:\x1B[0m";
var FirebaseHelper = class {
  constructor() {
  }
  init(options) {
    initializeApp(options);
    this.initiate();
  }
  async initiate() {
    const app = await Promise.resolve().then(() => {
      const app2 = getApps();
      return app2[0];
    });
    console.log(prefix, `Firebase connected successfully to ${app.name}`);
  }
  // private getClient() {
  //   return getApp();
  // }
  getAuth() {
    return getAuth();
  }
  signInWithGoogle() {
    const auth = this.getAuth();
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }
  async signOut() {
    const auth = this.getAuth();
    return await signOut(auth);
  }
};
var globalInstance = globalThis;
if (!globalInstance.__FIREBASE__)
  globalInstance.__FIREBASE__ = new FirebaseHelper();
var firebase = globalInstance.__FIREBASE__;
var firebase_default = FirebaseHelper;

export { FirebaseHelper, firebase_default as default, firebase };
