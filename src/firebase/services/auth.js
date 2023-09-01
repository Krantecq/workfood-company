import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config";

export const login = (email, password) =>
  new Promise(async (resolve) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) =>
        resolve({ status: true, data: userCredential.user })
      )
      .catch((error) => resolve({ status: false, data: null, error }));
  });

export const logout = () =>
  new Promise(async (resolve) => {
    await signOut(auth)
      .then(() => resolve({ status: true }))
      .catch((error) => resolve({ status: false }));
  });

export const resetPassword = (email) =>
  new Promise(async (resolve) => {
    await sendPasswordResetEmail(auth, email)
      .then(() => resolve({ status: true, data: email }))
      .catch((error) => resolve({ status: false, data: null, error }));
  });
