import React, { useEffect, useState } from "react";
import internal from "stream";
import { auth } from "./authentication";
import { getUserData, UserData } from "./firestore";

export interface User extends UserData {
  userUid: string;
  email: string;
  creationDate: string;
}

export const UserContext = React.createContext<User | null>(null);

interface UserProviderProps {
  children: any;
}

export default ({ children }: UserProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((firebaseUser) => {
      if (
        firebaseUser === null ||
        firebaseUser.email === null ||
        firebaseUser.metadata.creationTime === undefined
      ) {
        setCurrentUser(null);
        return;
      }

      getUserData(firebaseUser.uid).then((userData: UserData) => {
        if (firebaseUser.email === null) return;
        const creationDate = firebaseUser.metadata.creationTime;
        if (creationDate === undefined) return;
        setCurrentUser({
          userUid: firebaseUser.uid,
          email: firebaseUser.email,
          creationDate: creationDate,
          ...userData,
        });
      });
    });
  }, []);

  return (
    <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
  );
};
