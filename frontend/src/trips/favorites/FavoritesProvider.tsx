import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../authentication/UserProvider";
import { getFavorites } from "./favorites";
import { retrieveFavorites } from "./utils";

interface FavoritesProviderProps {
  children: any;
}

interface FavoritesContextValue {
  currentUserFavorites: string[];
  setCurrentUserFavorites: React.Dispatch<React.SetStateAction<string[]>>;
}

export const FavoritesContext = React.createContext(
  {} as FavoritesContextValue,
);

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [currentUserFavorites, setCurrentUserFavorites] = useState<string[]>(
    [],
  );
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if (currentUser === null) return;
    retrieveFavorites(currentUser.userUid, setCurrentUserFavorites);
  }, [currentUser]);

  const value = { currentUserFavorites, setCurrentUserFavorites };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
