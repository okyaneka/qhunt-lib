import { FirebaseOptions, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const prefix = "\x1b[38;5;208mFIREBASE:\x1b[0m";

export class FirebaseHelper {
  constructor() {}

  init(options: FirebaseOptions) {
    initializeApp(options);
    this.initiate();
  }

  private async initiate() {
    const app = await Promise.resolve().then(() => {
      const app = getApps();
      return app[0];
    });
    console.log(prefix, `Firebase connected successfully to ${app.name}`);
  }

  // private getClient() {
  //   return getApp();
  // }

  private getAuth() {
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
}

const globalInstance = globalThis as typeof globalThis & {
  __FIREBASE__?: FirebaseHelper;
};

if (!globalInstance.__FIREBASE__)
  globalInstance.__FIREBASE__ = new FirebaseHelper();

export * from "firebase/app";
export const firebase = globalInstance.__FIREBASE__;
export default FirebaseHelper;
