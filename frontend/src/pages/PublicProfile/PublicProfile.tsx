import "./PublicProfile.css";
import profilepic from "../../components/assets/profilepic.png";
import wavebg from "../../components/assets/wavebg.svg";
import { TripSection } from "../../components/TripSection/TripSection";
import { TitleSeperator } from "../../components/TitleSeperator/TitleSeperator";
import { useContext, useEffect, useMemo, useState } from "react";
import { UserData, getUserData } from "../../authentication/firestore";
import { useParams } from "react-router-dom";
import { User, UserContext } from "../../authentication/UserProvider";

export const PublicProfile = () => {
  const [user, setUser] = useState<UserData | User | null>();
  const [isValidUser, setIsValidUser] = useState<boolean>(false);
  const { uid } = useParams();
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if (uid === currentUser?.userUid) {
      setUser(currentUser);
      setIsValidUser(true);
      return;
    }
    if (uid) {
      getUserData(uid)
        .then((userData) => {
          setUser(userData);
          setIsValidUser(true);
        })
        .catch(() => {
          setIsValidUser(false);
        });
    }
  }, [uid]);

  const fname = useMemo(() => {
    return user?.name.split(" ")[0];
  }, [user]);

  useEffect(() => {
    document.title = fname + "s profil";
  }, [user]);

  return (
    <div className="container-public-profile">
      {isValidUser && user ? (
        <>
          <div className="flex-row m5">
            <div className="container-public-userinfo flex-column">
              <div
                className="public-profile-img"
                style={{ backgroundImage: `url(${profilepic})` }}
              />
              <h1>{user.name}</h1>
              <div className="container-public-userinfo-sub">
                {user.placeOfResidence && (
                  <p>
                    Bor i <b>{user.placeOfResidence}</b>
                  </p>
                )}
                {user.age && (
                  <p>
                    <b>{user.age}</b> år gammel
                  </p>
                )}
                <p>
                  Reist <b>11</b> ganger!
                </p>
                {"creationDate" in user && user.creationDate && (
                  <p>
                    Medlem av Trailmates siden{" "}
                    <b>{new Date(user.creationDate).toLocaleDateString()}</b>
                  </p>
                )}
              </div>
            </div>
            <div className="container-public-aboutme flex-column">
              <h2>Hei,</h2>
              <div className="container-public-aboutme-sub">
                <h2>Mitt navn er {fname}!</h2>
                <p>{user.aboutUser}</p>
              </div>
            </div>
          </div>
          <div
            className="container-public-user-trips"
            style={{ backgroundImage: `url(${wavebg})` }}
          >
            <div className="title-container-public-usertrips flex-column">
              <h2>{fname}s reiser!</h2>
              <TitleSeperator height="5px" width="25vw" color="accent" />
            </div>
            <TripSection text="" />
          </div>
          <div className="container-public-user-reviews flex-column">
            <h2>{fname}s erfaringer</h2>
            <TitleSeperator height="5px" width="25vw" color="accent" />
          </div>
        </>
      ) : (
        <h1>Det finnes ingen bruker med denne IDen.</h1>
      )}
    </div>
  );
};
