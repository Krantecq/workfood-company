import { db } from "../config";
import { collection, doc, setDoc } from "firebase/firestore";

// ADD
export const addDocument = (documentData, collectionName, customId = "") =>
  new Promise((resolve, reject) => {
    const newCourseRef = customId
      ? doc(db, collectionName, `${customId}`)
      : doc(collection(db, collectionName));
    setDoc(newCourseRef, {
      ...documentData,
      id: customId || newCourseRef?.id,
    })
      .then(() => resolve({ status: true, data: customId || newCourseRef?.id }))
      .catch((error) => reject({ status: false, data: null, error }));
  });
