import React, { useEffect, useMemo, useState } from "react";
import { auth } from "./authentication";
import { getUserData, UserData } from "./firestore";

export interface User extends UserData {
  userUid: string;
  email: string;
  creationDate: string;
}

interface UserContextValue {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = React.createContext<UserContextValue>(
  {} as UserContextValue,
);

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

  const value = { currentUser, setCurrentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
