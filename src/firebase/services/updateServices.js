import { db } from "../config";
import { doc, updateDoc } from "firebase/firestore";

// Edit Course
export const updateDocument = (documentData, collectionName) =>
  new Promise((resolve, reject) => {
    updateDoc(doc(db, collectionName, documentData?.id), {
      ...documentData,
    })
      .then(() => resolve({ status: true, data: documentData?.id }))
      .catch((error) => reject({ status: false, data: null, error }));
  });
