import { getUserTrips } from "../../users/firestore";
import { getFavorites } from "../favorites/firestore";
import { getTrips } from "../firestore";
import { Trip } from "../trip";
import config from "./config";
import { getRecommendationBasis } from "./recommendationBasis";
import recommendationScore from "./recommendationScore";

export const getRecommendedTrips = async (
  userUid: string,
  amount: number,
): Promise<Trip[]> => {
  const favorites = await getFavorites(userUid);
  const userTrips = await getUserTrips(userUid);
  const allTrips = await getTrips();
  const basis = getRecommendationBasis(favorites, userTrips);
  console.log(basis);
  const withScore = allTrips.map((trip) => ({
    trip: trip,
    score: recommendationScore(config, basis, trip),
  }));
  withScore.sort((trip1, trip2) => trip2.score - trip1.score);
  return withScore.slice(0, amount).map((scoredTrip) => scoredTrip.trip);
};
