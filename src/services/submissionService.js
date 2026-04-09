import {
    addDoc,
    collection,
    doc,
    getDoc,
    serverTimestamp,
  } from "firebase/firestore";
  import { db } from "../Firebase";
  
  export async function saveSubmission({
    uid,
    category,
    wineId,
    rating,
    descriptors,
  }) {
    const payload = {
      uid,
      category,
      wineId: String(wineId),
      rating: Number(rating),
      descriptors,
      createdAt: serverTimestamp(),
    };
  
    const docRef = await addDoc(collection(db, "submissions"), payload);
    return docRef.id;
  }
  
  export async function getWineResultById(wineId) {
    const docRef = doc(db, "wineResults", String(wineId));
    const docSnap = await getDoc(docRef);
  
    if (!docSnap.exists()) {
      return null;
    }
  
    return {
      id: docSnap.id,
      ...docSnap.data(),
    };
  }