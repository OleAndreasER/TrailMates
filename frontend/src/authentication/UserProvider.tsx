import React, { useEffect, useState } from "react";
import { auth, getUserData } from "./authentication";

export interface User {
  userUid: string;
  email: string;
  name: string;
  type: string;
}

export const UserContext = React.createContext<User | null>(null);

interface UserProviderProps {
  children: any;
}

export default ({ children }: UserProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser === null) return;
      getUserData(firebaseUser.uid).then((userData) => {
        if (firebaseUser.email === null) return;
        setCurrentUser({
          userUid: firebaseUser.uid,
          email: firebaseUser.email,
          name: userData.name,
          type: userData.type,
        });
      });
    });
  }, []);

  return (
    <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
  );
};
