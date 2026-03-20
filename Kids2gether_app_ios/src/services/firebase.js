import Constants from "expo-constants";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const extraFirebase =
  Constants.expoConfig?.extra?.firebase ||
  Constants.manifest?.extra?.firebase ||
  {};

const firebaseConfig = {
  apiKey:
    extraFirebase.apiKey || process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain:
    extraFirebase.authDomain || process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:
    extraFirebase.projectId || process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:
    extraFirebase.storageBucket ||
    process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    extraFirebase.messagingSenderId ||
    process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: extraFirebase.appId || process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

if (!firebaseConfig.apiKey) {
  console.warn("Firebase config ausente. Defina as variaveis EXPO_PUBLIC_FIREBASE_*");
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

const signInWithEmailAndPassword = (_auth, email, password) =>
  _auth.signInWithEmailAndPassword(email, password);

const createUserWithEmailAndPassword = (_auth, email, password) =>
  _auth.createUserWithEmailAndPassword(email, password);

const sendPasswordResetEmail = (_auth, email) =>
  _auth.sendPasswordResetEmail(email);

const getIdTokenResult = async (user, forceRefresh) => {
  const tokenResult = await user.getIdTokenResult(forceRefresh);
  return {
    token: tokenResult.token,
    expirationTime: tokenResult.expirationTime,
    authTime: tokenResult.authTime,
    issuedAtTime: tokenResult.issuedAtTime,
    signInProvider: tokenResult.signInProvider,
    signInSecondFactor: tokenResult.signInSecondFactor,
    claims: tokenResult.claims,
  };
};

const updateProfile = (user, profile) => user.updateProfile(profile);

export { auth };
export {
  createUserWithEmailAndPassword,
  getIdTokenResult,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
};
