import {
  setDoc,
  doc,
  getDoc,
  getDocs,
  collection,
  addDoc,
} from "firebase/firestore";
import db from "./db";
import { TripData, Trip } from "../model/TripData";

export const getTripById = async (tripId: string) => {
  const trip = await getDoc(doc(db, "trip", tripId));
  if (!trip.exists()) {
    console.log("No such document exists!");
  }
  return { tripId: trip.id, ...(trip.data() as TripData) };
};

export const getTrips = async (): Promise<Trip[]> => {
  const tripData = await getDocs(collection(db, "trip"));

  if (tripData.empty) {
    console.log("No trips found!");
  }
  return tripData.docs.map((trip) => {
    return { tripId: trip.id, ...(trip.data() as TripData) };
  });
};

export const putTrip = (trip: Trip) => {
  const { tripId, ...tripData } = trip;
  return setDoc(doc(db, "trip", tripId), tripData, { merge: true });
};

export const postTrip = (trip: Trip) => {
  const { tripId, ...tripData } = trip;
  return addDoc(collection(db, "trip"), tripData);
};
