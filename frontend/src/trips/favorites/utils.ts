import { deleteFavorite, addFavorite, getFavorites } from "./favorites";

type setStateFunction = React.Dispatch<React.SetStateAction<string[]>>;

export const removeFavorite = async (
  userUid: string,
  tripId: string,
  setStateFunction: setStateFunction,
) =>
  await deleteFavorite(userUid, tripId).then(() =>
    setStateFunction((prev) => {
      return prev.filter((id) => id !== tripId);
    }),
  );

export const appendFavorite = async (
  userUid: string,
  tripId: string,
  setStateFunction: setStateFunction,
) => {
  await addFavorite(userUid, tripId).then(() => {
    setStateFunction((prev) => {
      return [...prev, tripId];
    });
  });
};

export const retrieveFavorites = async (
  userUid: string,
  setStateFunction: setStateFunction,
) => {
  await getFavorites(userUid).then((favorites) => {
    setStateFunction(
      favorites.map((favorite: { tripId: string }) => favorite.tripId),
    );
  });
};

export const isFavorite = (favorites: string[], tripId: string) =>
  favorites.includes(tripId);
