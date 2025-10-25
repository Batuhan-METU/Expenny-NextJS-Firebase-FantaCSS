"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { subscriptions } from "@/utils";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props) {
  const { children } = props;

  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = (email, password) => {
    setCurrentUser(null);
    setUserData(null);
    return signOut(auth);
  };

  async function saveToFirebase(data) {
    try {
      const userRef = doc(db, "users", currentUser.uid);
      const res = await setDoc(
        userRef,
        { subscriptions: data },
        { merge: true }
      );
    } catch (err) {
      console.log(err.message);
    }
  }

  async function handleAddSub(newSubscription) {
    if (userData.subscriptions.length > 30) {
      return;
    }

    const newSubs = [...userData.subscriptions, newSubscription];

    setUserData({ subscriptions: newSubs });
    await saveToFirebase(newSubs);
  }

  async function handleDeleteSub(index) {
    const newSubs = userData.subscriptions.filter((val, valIndex) => {
      return valIndex !== index;
    });
    setUserData({ subscriptions: newSubs });
    await saveToFirebase(newSubs);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        setCurrentUser(user);

        if (!user) {
          return;
        }

        setLoading(true);

        //we found a user, lets check the database

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        console.log("Fetching user data");

        /*         let firebaseData = { subscriptions };
         */ let firebaseData = { subscriptions: [] };
        if (docSnap.exists()) {
          // oh we found the data.
          console.log("Found user data");
          firebaseData = docSnap.data();
        }
        setUserData(firebaseData);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    loading,
    signup,
    login,
    logout,
    handleAddSub,
    handleDeleteSub,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
