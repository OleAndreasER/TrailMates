export interface TripData {
  startCity: string;
  destinationCity: string;
  countries: string[];
  postDate: string;
  posterUID: string;
  price: number;
  tripDurationDays: number;
  description: string;
  degreesCelcius: number;
  tripLengthKm: number;
  attractions: string[];
  imageURLs: string[];
}

export interface Trip extends TripData {
  tripId: string;
}
