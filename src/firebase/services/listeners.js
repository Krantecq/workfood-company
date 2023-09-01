import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config";

// Array of Objects : e.g [{property:'deleteDocument',operator : firebaseQueryOperators.EQUAL_TO , false}]
// property : name of field
// operator : firebase query operator (added as firebaseQueryOperators)
// value : value of field

export const listenCollectionData = (
  collectionName,
  callback,
  queryList = null
) => {
  const dataBaseQuery =
    queryList && queryList.length > 0
      ? queryList.map(({ property, operator, value, isOrder = false }) =>
          isOrder ? orderBy(property, value) : where(property, operator, value)
        )
      : null;
  const listenCollectionQuery = dataBaseQuery
    ? query(collection(db, collectionName), ...dataBaseQuery)
    : query(collection(db, collectionName));

  return onSnapshot(listenCollectionQuery, (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
    callback(data);
  });
};
