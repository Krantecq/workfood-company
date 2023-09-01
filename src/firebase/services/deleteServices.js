import { db } from "../config";
import { doc, deleteDoc } from "firebase/firestore";

// Delete
export const deleteDocument = (docId, collectionName) =>
  new Promise((resolve, reject) => {
    deleteDoc(doc(db, collectionName, docId))
      .then(() => resolve({ status: true, data: docId }))
      .catch((error) => reject({ status: false, data: null, error: error }));
  });
