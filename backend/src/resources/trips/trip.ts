export interface TripSubmission {
  startCity: string;
  destinationCity: string;
  countries: string[];
  posterUid: string;
  price: number;
  tripDurationDays: number;
  description: string;
  degreesCelcius: number;
  tripLengthKm: number;
  attractions: string[];
  imageIds: string[];
}

// Data stored in firestore
export interface TripData extends TripSubmission {
  postDate: string;
}

export interface Trip extends TripData {
  tripId: string;
  averageRating: number;
}

export const toTripData = (tripSubmission: TripSubmission): TripData => ({
  postDate: Date.now().toString(),
  ...tripSubmission,
});

export const toTrip = (tripId: string, tripData: TripData): Trip => ({
  tripId: tripId,
  averageRating: randomIntUpTo(5), //TODO: Calculate average rating
  ...tripData,
});

const randomIntUpTo = (max: number) => Math.floor(Math.random() * (max + 1));
