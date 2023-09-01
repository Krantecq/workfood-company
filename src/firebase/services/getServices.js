import { db } from "../config";
import { collection, query, where, getDocs } from "firebase/firestore";

// GET
export const getDocument = (collectionName, queryList = null) => {
  const dataBaseQuery = queryList
    ? queryList.map(({ property, operator, value }) =>
        where(property, operator, value)
      )
    : null;
  return new Promise((resolve) => {
    const getQuery = dataBaseQuery
      ? query(collection(db, collectionName), ...dataBaseQuery)
      : query(collection(db, collectionName));
    let fetchedDocs = [];
    getDocs(getQuery)
      .then((response) => {
        response.docs.forEach((doc) => {
          fetchedDocs.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        resolve({ data: fetchedDocs, status: true });
      })
      .catch((error) => resolve({ error: error, status: false }));
  });
};
