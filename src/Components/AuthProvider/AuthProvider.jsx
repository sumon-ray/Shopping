import axios from "axios";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import {toast} from "react-toastify";
import auth from "../../Firebase/Firebase";
// import auth from "../firebase/firebase";
export const UserContext = createContext();

//loginWithGoogle

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  console.log(user) 
  const [loading, setLoading] = useState(true);

  //registerUser==>
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // tysylyn@mailinator.com
  //loginUser==>
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // Google Login ==>
  const googleProvider = new GoogleAuthProvider();
  // Google Login ==>
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // setLoading(true)
      toast("Logged in successfully");
    } catch (error) {
      // Handle errors if any
      console.error("Google login error:", error.message);
    }
  };

  //updateProfile==>
  const updateProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
  // onAuthStateChanged==>
  useEffect(() => {
    const unsubscriber = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      return unsubscriber;
    };
  }, []);
  // rs
  // logOut user==>
  const logOutUser = async () => {
    // setLoading(true)
    return signOut(auth).then(() => {
      toast.success("Log out successfully");
    });
  };
  const info = {
    user,
    setUser,
    loading,
    setLoading,
    registerUser,
    loginUser,
    updateProfile,
    logOutUser,
    loginWithGoogle,
  };
  return <UserContext.Provider value={info}>{children}</UserContext.Provider>;
};

export default AuthProvider;
