import { Trip, TripSubmission } from "../types/types";
import { get, post, put } from "../utils/fetchMethods";

export const getTrips = (): Promise<Trip[]> => get("trips/");

export const getTripById = (tripId: string): Promise<Trip> =>
  get("trips/" + tripId);

export const putTrip = (tripId: string, trip: TripSubmission) => {
  put("trips/" + tripId, trip);
};

export const postTrip = (trip: TripSubmission): Promise<Trip> =>
  post("trips/", trip);

export const getTopRatedTrips = (): Promise<Trip[]> =>
  get("trips/highestRated");

export const getLatestTrips = (): Promise<Trip[]> => get("trips/latest");
