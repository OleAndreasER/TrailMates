import { useContext, useState, useEffect } from "react";
import "./MyTrips.css";
import { UserContext } from "../../authentication/UserProvider";
import { Navigate } from "react-router-dom";
import { TripCollection } from "../../components/TripCollection/TripCollection";
import { Trip } from "../../trips/trip";
import { getUserTrips } from "../../trips/access";

export const MyTrips = () => {
  const { currentUser } = useContext(UserContext);
  const [userTrips, setUserTrips] = useState<Trip[]>([]);

  useEffect(() => {
    if (currentUser) {
      getUserTrips(currentUser.userUid).then(setUserTrips);
    }
  }, [currentUser]);

  if (!currentUser) return <Navigate to="/" />;

  return (
    <div className="my-trips">
      <TripCollection trips={userTrips} />
    </div>
  );
};
