import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyA5BIheOQ_qBTyvBvtHQ95bPWL-Xh3wm60",
//   authDomain: "dev-farmhouse.firebaseapp.com",
//   projectId: "dev-farmhouse",
//   storageBucket: "dev-farmhouse.appspot.com",
//   messagingSenderId: "203145139807",
//   appId: "1:203145139807:web:5e04a3eb188895b841edea",
//   measurementId: "G-42TVCVF37Q",
// };

const firebaseConfig = {
  apiKey: "AIzaSyD-cErJHh2wAEX_wMh0POwuRN30US_LL7o",
  authDomain: "wookfood.firebaseapp.com",
  databaseURL: "https://wookfood-default-rtdb.firebaseio.com",
  projectId: "wookfood",
  storageBucket: "wookfood.appspot.com",
  messagingSenderId: "585999414352",
  appId: "1:585999414352:web:a89d1cbce9717f3b02cd55",
  measurementId: "G-8X2ECK0C58",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };
