import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "./authentication";

export const AuthContext = React.createContext<User | null>(null);

interface AuthProviderProps {
  children: any;
}

export default ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};
