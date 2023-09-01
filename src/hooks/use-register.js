import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { auth } from "../firebase/config";

const useRegistration = () => {
  const [registrationStatus, setRegistrationStatus] = useState({
    success: false,
    error: null,
  });

  const registerUser = async (name, email, password) => {
    try {
      // Step 1: Create a new user account using Firebase authentication
      const authUser = await createUserWithEmailAndPassword(auth, email, password);

      // Step 2: Save user data in Firestore
      const db = getFirestore();
      const usersCollection = collection(db, "users");
      const newUser = {
        uid: authUser.user.uid,
        name,
        email,
      };
      await addDoc(usersCollection, newUser);

      // Registration successful
      setRegistrationStatus({ success: true, error: null });
    } catch (error) {
      // Registration failed
      setRegistrationStatus({ success: false, error: error.message });
    }
  };

  return { registerUser, registrationStatus };
};

export default useRegistration;
