import { FirebaseOptions } from "firebase/app";
export declare class FirebaseHelper {
    constructor();
    init(options: FirebaseOptions): void;
    private initiate;
    private getAuth;
    signInWithGoogle(): Promise<import("firebase/auth").UserCredential>;
    signOut(): Promise<void>;
}
export * from "firebase/app";
export declare const firebase: FirebaseHelper;
export default FirebaseHelper;
//# sourceMappingURL=index.d.ts.map