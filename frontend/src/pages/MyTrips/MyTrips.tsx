import { useContext, useState, useEffect } from "react";
import "./MyTrips.css";
import { UserContext } from "../../authentication/UserProvider";
import { Navigate } from "react-router-dom";
import { TripCollection } from "../../components/TripCollection/TripCollection";
import { Trip } from "../../trips/trip";
import { getTrips } from "../../trips/access";
import { filterTripsByFieldEquality } from "../../trips/utils";

export const MyTrips = () => {
  const { currentUser } = useContext(UserContext);
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    if (currentUser) {
      getTrips().then((trips) => {
        const userTrips = filterTripsByFieldEquality(
          trips,
          "posterUid",
          currentUser.userUid,
        );
        setTrips(userTrips);
      });
    }
  }, [currentUser]);

  if (!currentUser) return <Navigate to="/" />;

  return (
    <div className="my-trips">
      <TripCollection trips={trips} />
    </div>
  );
};
