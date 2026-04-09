// import {
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,
//     signOut,
//   } from "firebase/auth";
//   import { auth } from "../Firebase";
  
//   export async function signupUser(email, password) {
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     return userCredential.user;
//   }
  
//   export async function loginUser(email, password) {
//     const userCredential = await signInWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     return userCredential.user;
//   }
  
//   export async function logoutUser() {
//     await signOut(auth);
//   }
  
//   export function getCurrentUser() {
//     return auth.currentUser;
//   }


import { auth } from "../Firebase";
import {
  GoogleAuthProvider,
  browserLocalPersistence,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  setPersistence,
  signInWithEmailLink,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

const actionCodeSettings = {
  url: window.location.origin + "/auth/finish",
  handleCodeInApp: true,
};

export async function sendEmailLink(email) {
  window.localStorage.setItem("emailForSignIn", email);
  await sendSignInLinkToEmail(auth, email, actionCodeSettings);
}

export async function completeEmailLinkSignIn() {
  if (!isSignInWithEmailLink(auth, window.location.href)) {
    return null;
  }

  await setPersistence(auth, browserLocalPersistence);

  let email = window.localStorage.getItem("emailForSignIn");

  if (!email) {
    email = window.prompt("Please confirm your email address");
  }

  if (!email) {
    throw new Error("Email is required to complete sign-in.");
  }

  const result = await signInWithEmailLink(auth, email, window.location.href);
  window.localStorage.removeItem("emailForSignIn");
  return result.user;
}

export async function signInWithGoogle() {
  await setPersistence(auth, browserLocalPersistence);
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

export async function logoutUser() {
  await signOut(auth);
  window.localStorage.removeItem("emailForSignIn");
}

export function getCurrentUser() {
  return auth.currentUser;
}