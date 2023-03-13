import {
  setDoc,
  doc,
  getDoc,
  getDocs,
  collection,
  addDoc,
} from "firebase/firestore";
import firestore from "../../firestore/firestore";
import { toTrip, toTripData, Trip, TripData, TripSubmission } from "./trip";

const tripsToSend: number = 15;

export const getTripById = async (tripId: string) => {
  const tripDocument = await getDoc(doc(firestore, "trip", tripId));
  if (!tripDocument.exists()) {
    console.log("No such document exists!");
  }
  return toTrip(tripDocument.id, tripDocument.data() as TripData);
};

export const getTrips = async (): Promise<Trip[]> => {
  const tripDocuments = await getDocs(collection(firestore, "trip"));

  if (tripDocuments.empty) {
    console.log("No trips found!");
  }
  return tripDocuments.docs.map((tripDocument) =>
    toTrip(tripDocument.id, tripDocument.data() as TripData),
  );
};

export const putTrip = async (
  tripId: string,
  tripSubmission: TripSubmission,
) => {
  await setDoc(doc(firestore, "trip", tripId), tripSubmission, { merge: true });
};

export const postTrip = async (
  tripSubmission: TripSubmission,
): Promise<Trip> => {
  const tripData = toTripData(tripSubmission);
  const collectionReference = await addDoc(
    collection(firestore, "trip"),
    tripData,
  );
  return toTrip(collectionReference.id, tripData);
};

export const getTopRatedTrips = async () => {
  const trips: Trip[] = await getTrips();
  trips.sort((t1, t2) => t2.averageRating - t1.averageRating);
  return trips.slice(0, tripsToSend);
};

export const getLatestTrips = async () => {
  const trips: Trip[] = await getTrips();
  trips.sort((t1, t2) => parseInt(t2.postDate) - parseInt(t1.postDate));
  return trips.slice(0, tripsToSend);
};