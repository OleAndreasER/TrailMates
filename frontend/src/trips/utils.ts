import { Trip } from "./trip";

/**
 * Removes duplicate trips from an array of trips.
 *
 * @param trips An array of trips.
 * @returns An array of trips with no duplicates.
 */
export const removeDuplicates = (trips: Trip[]): Trip[] => {
  const uniqueTrips: Trip[] = [];
  trips.forEach((trip) => {
    if (
      !uniqueTrips.some((uniqueTrip) => {
        return (
          uniqueTrip.startCity === trip.startCity &&
          uniqueTrip.destinationCity === trip.destinationCity &&
          uniqueTrip.countries.length === trip.countries.length &&
          uniqueTrip.countries.every(
            (country, index) => country === trip.countries[index],
          ) &&
          uniqueTrip.posterUid === trip.posterUid &&
          uniqueTrip.price === trip.price &&
          uniqueTrip.tripDurationDays === trip.tripDurationDays &&
          uniqueTrip.description === trip.description &&
          uniqueTrip.degreesCelcius === trip.degreesCelcius
        );
      })
    ) {
      uniqueTrips.push(trip);
    }
  });
  return uniqueTrips;
};

export const filterTripsByFieldEquality = (
  trips: Trip[],
  field: keyof Trip,
  value: string | number,
): Trip[] => {
  return trips.filter((trip) => {
    return trip[field] === value;
  });
};

export const sortTripsByDate = (trips: Trip[], asc: boolean = true): Trip[] => {
  return trips.sort((a, b) => {
    const dateA = parseInt(a.postDate);
    const dateB = parseInt(b.postDate);
    return asc ? dateA - dateB : dateB - dateA;
  });
};
