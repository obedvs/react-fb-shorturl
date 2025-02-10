import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";

import { auth } from "@/firebase.ts";
import { User, UserContextType } from "@/types/index.ts";

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  registerUser: () => Promise.resolve(),
  loginUser: () => Promise.resolve(),
  signOutUser: () => Promise.resolve(),
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, photoURL, displayName, uid } = user;
        setUser({ email, photoURL, displayName, uid });
      } else {
        setUser(null);
      }
    });

    return () => unsuscribe();
  }, []);

  const registerUser = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

  const loginUser = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  const signOutUser = () => signOut(auth);

  return (
    <UserContext.Provider
      value={{ user, setUser, registerUser, loginUser, signOutUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
