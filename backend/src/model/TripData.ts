export interface TripData {
  startDestination: string;
  endDestination: string;
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
  averageRating: number;
}
