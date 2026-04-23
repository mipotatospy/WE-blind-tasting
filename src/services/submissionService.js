// import {
//     addDoc,
//     collection,
//     doc,
//     getDoc,
//     serverTimestamp,
//   } from "firebase/firestore";
//   import { db } from "../Firebase";
  
//   export async function saveSubmission({
//     uid,
//     category,
//     wineId,
//     rating,
//     descriptors,
//   }) {
//     const payload = {
//       uid,
//       category,
//       wineId: String(wineId),
//       rating: Number(rating),
//       descriptors,
//       createdAt: serverTimestamp(),
//     };
  
//     const docRef = await addDoc(collection(db, "submissions"), payload);
//     return docRef.id;
//   }
  
//   export async function getWineResultById(wineId) {
//     const docRef = doc(db, "wineResults", String(wineId));
//     const docSnap = await getDoc(docRef);
  
//     if (!docSnap.exists()) {
//       return null;
//     }
  
//     return {
//       id: docSnap.id,
//       ...docSnap.data(),
//     };
//   }


import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../Firebase";

function normalizeAnswers(rawAnswers) {
  return {
    wineIdInput: rawAnswers.wine_id ?? rawAnswers.wineId ?? rawAnswers.wineIdInput ?? "",

    overallEnjoyment: rawAnswers.overall_enjoyment ?? rawAnswers.overallEnjoyment ?? null,
    overallAroma: rawAnswers.overall_aroma ?? rawAnswers.overallAroma ?? null,
    balance: rawAnswers.balance ?? null,
    persistence: rawAnswers.persistence ?? null,
    priceRange: rawAnswers.price_range ?? rawAnswers.priceRange ?? null,
    regionGuess: rawAnswers.region_guess ?? rawAnswers.regionGuess ?? "",
    wineGuess: rawAnswers.wine_guess ?? rawAnswers.wineGuess ?? "",
    grapeVarieties: Array.isArray(rawAnswers.grape_varieties)
      ? rawAnswers.grape_varieties
      : Array.isArray(rawAnswers.grapeVarieties)
      ? rawAnswers.grapeVarieties
      : [],
    descriptors: Array.isArray(rawAnswers.descriptors)
      ? rawAnswers.descriptors
      : [],
    tastingNotes: Array.isArray(rawAnswers.tasting_notes)
      ? rawAnswers.tasting_notes
      : Array.isArray(rawAnswers.tastingNotes)
      ? rawAnswers.tastingNotes
      : [],
  };
}

export async function saveSubmission({ category, answers }) {
  const user = auth.currentUser;
  const normalizedAnswers = normalizeAnswers(answers);

  const payload = {
    userId: user?.uid || null,
    userEmail: user?.email || null,

    wineId: normalizedAnswers.wineIdInput || null,
    wineCategory: category,

    createdAt: serverTimestamp(),

    answers: normalizedAnswers,
  };

  console.log(payload);

  const docRef = await addDoc(collection(db, "submissions"), payload);

  return docRef.id;
}