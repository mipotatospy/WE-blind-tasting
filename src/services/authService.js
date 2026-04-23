// import { auth } from "../Firebase";
// import {
//   GoogleAuthProvider,
//   browserLocalPersistence,
//   isSignInWithEmailLink,
//   sendSignInLinkToEmail,
//   setPersistence,
//   signInWithEmailLink,
//   signInWithPopup,
//   signOut,
// } from "firebase/auth";

// const googleProvider = new GoogleAuthProvider();

// const actionCodeSettings = {
//   url: `${window.location.origin}/auth/finish`,
//   handleCodeInApp: true,
// };

// export async function sendEmailLink(email) {
//   const normalizedEmail = email.trim().toLowerCase();

//   await setPersistence(auth, browserLocalPersistence);

//   // Helpful when the same browser/device is used
//   window.localStorage.setItem("emailForSignIn", normalizedEmail);

//   await sendSignInLinkToEmail(auth, normalizedEmail, actionCodeSettings);
// }

// export function isEmailLinkFlow() {
//   return isSignInWithEmailLink(auth, window.location.href);
// }

// export async function completeEmailLinkSignIn(emailFromForm) {
//   if (!isSignInWithEmailLink(auth, window.location.href)) {
//     throw new Error("This sign-in link is invalid or expired.");
//   }

//   await setPersistence(auth, browserLocalPersistence);

//   const storedEmail = window.localStorage.getItem("emailForSignIn");
//   const email = (emailFromForm || storedEmail || "").trim().toLowerCase();

//   if (!email) {
//     throw new Error("Please enter the same email address used to request the sign-in link.");
//   }

//   const result = await signInWithEmailLink(auth, email, window.location.href);

//   window.localStorage.removeItem("emailForSignIn");

//   return result.user;
// }

// export async function signInWithGoogle() {
//   await setPersistence(auth, browserLocalPersistence);
//   const result = await signInWithPopup(auth, googleProvider);
//   return result.user;
// }

// export async function logoutUser() {
//   await signOut(auth);
//   window.localStorage.removeItem("emailForSignIn");
// }

// export function getCurrentUser() {
//   return auth.currentUser;
// }

// export function getStoredEmailForSignIn() {
//   return window.localStorage.getItem("emailForSignIn") || "";
// }

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
  url: "https://we-blind-tasting.web.app/auth/finish",
  handleCodeInApp: true,
};

export async function sendEmailLink(email) {
  const normalizedEmail = email.trim().toLowerCase();

  await setPersistence(auth, browserLocalPersistence);
  window.localStorage.setItem("emailForSignIn", normalizedEmail);

  await sendSignInLinkToEmail(auth, normalizedEmail, actionCodeSettings);
}

export function isEmailLinkFlow() {
  return isSignInWithEmailLink(auth, window.location.href);
}

export function getStoredEmailForSignIn() {
  return (window.localStorage.getItem("emailForSignIn") || "").trim().toLowerCase();
}

export async function completeEmailLinkSignIn(emailFromForm) {
  if (!isSignInWithEmailLink(auth, window.location.href)) {
    throw new Error("This sign-in link is invalid or expired.");
  }

  const email = (emailFromForm || getStoredEmailForSignIn()).trim().toLowerCase();

  if (!email) {
    throw new Error("Please enter the same email address used to request the sign-in link.");
  }

  await setPersistence(auth, browserLocalPersistence);

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