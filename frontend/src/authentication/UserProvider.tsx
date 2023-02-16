import React, { useEffect, useState } from "react";
import internal from "stream";
import { auth } from "./authentication";
import { getUserData, UserData } from "./firestore";

export interface User extends UserData{
  userUid: string;
  email: string;
}

export const UserContext = React.createContext<User | null>(null);

interface UserProviderProps {
  children: any;
}

export default ({ children }: UserProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser === null || firebaseUser.email === null) {
        setCurrentUser(null);
        return;
      }

      getUserData(firebaseUser.uid).then((userData: UserData) => {
        if (firebaseUser.email === null) return;
        setCurrentUser({
          userUid: firebaseUser.uid,
          email: firebaseUser.email,
          ...userData,
        });
      });
    });
  }, []);

  return (
    <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
  );
};
