import { useContext, useEffect, useRef, useState } from "react";
import "./TripPage.css";
import { Button } from "../../components/Button/Button";
import { TripDetailsItem } from "../../components/TripDetailsItem/TripDetailsItem";
import { ReviewBox } from "../../components/ReviewBox/ReviewBox";
import { TripAuthor } from "../../components/TripAuthor/TripAuthor";
import { PopupImageCarousel } from "../../components/PopupImageCarousel/PopupImageCarousel";
import { useParams } from "react-router-dom";
import { getTripById } from "../../trips/access";
import { getUserData, UserData } from "../../authentication/firestore";
import { getImgUrl } from "../../storage/util/methods";
import { Trip } from "../../trips/trip";
import { UserContext } from "../../authentication/UserProvider";
import {
  appendFavorite,
  isFavorite,
  removeFavorite,
} from "../../trips/favorites/utils";
import { FavoritesContext } from "../../trips/favorites/FavoritesProvider";
import { CommentForm } from "../../components/CommentForm/CommentForm";

const defaultProfilePicUrl =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

const maybe = (string: string | undefined): string =>
  string !== undefined ? string : "N/A";

export const TripPage = () => {
  const { tripId } = useParams();
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [trip, setTrip] = useState<Trip | undefined>();
  const [user, setUser] = useState<UserData | undefined>();
  const [profilePictureUrl, setProfilePicUrl] =
    useState<string>(defaultProfilePicUrl);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const { currentUser } = useContext(UserContext);
  const { currentUserFavorites, setCurrentUserFavorites } =
    useContext(FavoritesContext);

  const scrolldown = () => {
    window.scrollTo({
      top: window.innerHeight - 10,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    document.title = "Trailmates - Reiseinformajon";
  }, []);

  useEffect(() => {
    if (!tripId) return;
    getTripById(tripId).then(setTrip);
  }, [tripId]);

  useEffect(() => {
    if (!currentUserFavorites || !tripId) return;
    setLiked(isFavorite(currentUserFavorites, tripId));
  }, [currentUserFavorites, tripId, trip]);

  useEffect(() => {
    const updateImageUrls = async () => {
      if (!trip) return;
      const newUrls: string[] = await Promise.all(
        trip.imageIds.map((imageId) =>
          getImgUrl(`trips/${trip.tripId}/${imageId}`),
        ),
      );
      setImageUrls(newUrls);
    };

    if (!trip) return;
    updateImageUrls();
    getUserData(trip.posterUid).then(setUser);
  }, [trip]);

  useEffect(() => {
    if (!trip) return;
    getImgUrl(`profilepics/${trip.posterUid}`).then(setProfilePicUrl);
  }, [user, trip]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isCommentPopupOpen, setIsCommentPopupOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleOpenCommentPopup = () => {
    setIsCommentPopupOpen(true);
  };

  const handleCloseCommentPopup = () => {
    setIsCommentPopupOpen(false);
  };

  const scrollHandlerReviews = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOnFavoriteClick = () => {
    if (!currentUser || !trip) return;
    const toggle = async () => {
      const uid = currentUser.userUid;
      const tripId = trip.tripId;

      if (isLoading || !uid || !tripId) return;
      setIsLoading(true);

      if (liked) {
        setLiked(false);
        await removeFavorite(uid, tripId, setCurrentUserFavorites).catch(
          (err) => {
            console.warn(err);
            setLiked(true);
          },
        );
      } else {
        setLiked(true);
        await appendFavorite(uid, tripId, setCurrentUserFavorites).catch(
          (err) => {
            console.warn(err);
            setLiked(false);
          },
        );
      }
      setIsLoading(false);
    };
    toggle();
  };

  return (
    <>
      <div
        className="cover-TripPage flex-column"
        style={{ backgroundImage: `url(${imageUrls[0]})` }}
      >
        <div className="cover-info-container">
          <div className="flex-column cover-TripPage-info">
            <p> Av {user && user.name}</p>
            <h1>
              {` ${maybe(trip?.startCity)} - ${maybe(trip?.destinationCity)}`}
            </h1>
            <h2>
              {` ${maybe(trip?.startCity)} - ${maybe(trip?.destinationCity)}`}
            </h2>
          </div>
          <div className="trippage-scrolldown-indicator">
            <p onClick={scrolldown}>╲╱</p>
          </div>
          <div className="flex-row cover-TripPage-buttons">
            <Button
              text={"Kommentarer"}
              styling={"accent-fill"}
              width={"28%"}
              height={"2.5vh"}
              icon={"comment"}
              fontSize={"1vw"}
              onClick={scrollHandlerReviews}
            ></Button>
            <Button
              text={"# Bilder"}
              styling={"accent-fill"}
              width={"28%"}
              height={"2.5vh"}
              icon={"images"}
              fontSize={"1vw"}
              onClick={handleOpenPopup}
            ></Button>
            <Button
              text={"Lagre reise"}
              styling={"accent-fill"}
              width={"28%"}
              height={"2.5vh"}
              icon={liked ? "filledHeart" : "heart"}
              fontSize={"1vw"}
              onClick={handleOnFavoriteClick}
            ></Button>
          </div>
        </div>
      </div>
      <div className="container-general-info flex-row">
        <div className="trippage-general-info-left flex-column">
          <div className="trippage-general-info-row flex-row">
            <TripDetailsItem
              title={"Startdestinasjon"}
              content={maybe(trip?.startCity)}
            />
            <TripDetailsItem
              title={"Reisemål"}
              content={maybe(trip?.destinationCity)}
            />
            <TripDetailsItem
              title={"Land"}
              content={maybe(trip?.countries.join(", "))}
            />
          </div>
          <div className="trippage-general-info-row flex-row">
            <TripDetailsItem
              title={"Pris"}
              content={maybe(trip?.price.toString())}
            />
            <TripDetailsItem
              title={"Reisetid"}
              content={maybe(`${trip?.tripDurationDays} dager`)}
            />
            <TripDetailsItem
              title={"Vurderinger"}
              content={maybe(trip?.averageRating.toString())}
            />
          </div>
        </div>
        <div className="trippage-general-info-right">
          <TripAuthor
            author={maybe(user?.name)}
            trips={11}
            profilePic={profilePictureUrl ? profilePictureUrl : ""}
            authorUID={maybe(trip?.posterUid)}
            trip={trip}
          />
        </div>
      </div>
      <div className="trippage-main-container flex-row">
        <div className="trippage-main-l flex-column">
          <img
            src={imageUrls[1]}
            onClick={handleOpenPopup}
            alt="Bilde fra turen"
          ></img>
          <PopupImageCarousel
            images={imageUrls}
            titles={
              [
                //"City of Rioja",
                //"Celementines in Rioja",
                //"City of Prague",
                //"Streets in Sicily",
              ]
            }
            dates={
              [
                //"09.Januar.2022",
                //"11.Januar.2022",
                //"10.Januar.2022",
                //"12.Januar.2022",
              ]
            }
            isOpen={isPopupOpen}
            onClose={handleClosePopup}
          />
          <div
            className="flex-row"
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              width: "80%",
            }}
          >
            <h2>Beskrivelse</h2>
            <div
              style={{
                width: "68%",
                height: ".3vh",
                borderRadius: "100px",
                backgroundColor: "var(--accent)",
              }}
            />
          </div>
          <div className="text-wrapper">
            <p>{maybe(trip?.description)}</p>
          </div>
        </div>
        <div className="trippage-main-r flex-column">
          <img src={imageUrls[2]} alt="bilde fra turen"></img>
          <div
            className="flex-row"
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              width: "80%",
            }}
          >
            <h2>Detaljer</h2>
            <div
              style={{
                width: "68%",
                height: ".3vh",
                borderRadius: "100px",
                backgroundColor: "var(--accent)",
              }}
            ></div>
          </div>
          <div className="trippage-extra-info"></div>
          <div className="trippage-extra-itemwrapper">
            <h3>Klima</h3>
            <p>{maybe(`${trip?.degreesCelcius} grader celcius`)}</p>
          </div>
          <div className="trippage-extra-itemwrapper">
            <h3>Reiselengde</h3>
            <p>{maybe(`${trip?.tripLengthKm} km`)}</p>
          </div>
          <div className="trippage-extra-itemwrapper">
            <h3>Attraksjoner</h3>
            <p>{maybe(trip?.attractions.join(", "))}</p>
          </div>
          <div
            style={{
              width: "80%",
              height: ".3vh",
              borderRadius: "100px",
              backgroundColor: "var(--accent)",
            }}
          />
        </div>
      </div>
      <div className="trippage-review-container flex-column" ref={sectionRef}>
        <h1>Omtaler</h1>
        <div className="review-sep" />
        <ReviewBox
          title={"En fantastisk reise! - Reiste 10. Januar 2022"}
          content={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "
          }
          author={"Krisitan Holgren"}
          rating={"3/5"}
          travels={"11 Reiser"}
          profilePic={defaultProfilePicUrl}
        />
        <ReviewBox
          title={"En helt OK reise! - Reiste 12. September 2021"}
          content={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "
          }
          author={"Krisitan Holgren"}
          rating={"5/5"}
          travels={"10 Reiser"}
          profilePic={defaultProfilePicUrl}
        />
      </div>
      <CommentForm
        isOpen={isCommentPopupOpen}
        onClose={handleCloseCommentPopup}
      ></CommentForm>
      <div className="trippage-write-review flex-column">
        <h2>Har du vært på denne reisen?</h2>
        <Button
          text={"Skriv en omtale"}
          styling={"secondary-outline"}
          width="25%"
          height="5vh"
          onClick={handleOpenCommentPopup}
        />
      </div>
    </>
  );
};
