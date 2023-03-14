import {
  alreadyVisitedAttractions,
  alreadyVisitedCountries,
  averageRating,
  Consideration,
  differentPriceFromFavorites,
  differentPriceFromUserTrips,
  likedAttractions,
  likedCountries,
} from "./considerations";

export interface RecommendationConfig {
  considerations: Consideration[];
}

export default {
  // Each consideration alters the recommendation score
  considerations: [
    // (weight)
    // weight * averageRating
    averageRating(1),
    // weight * amount of already visited attractions
    alreadyVisitedAttractions(-1),
    // weight * amount of liked attractions
    likedAttractions(1),
    // weight * amount of already visited countries
    alreadyVisitedCountries(-0.5),
    // weight * amount of liked countries
    likedCountries(0.5),

    // (moreExpensiveWeight, cheaperWeight)
    differentPriceFromFavorites(0, 0),
    differentPriceFromUserTrips(-0.5, 0.1),
  ],
};
