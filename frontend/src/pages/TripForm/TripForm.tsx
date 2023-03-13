import { FormEvent, useContext, useState } from "react";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import "./TripForm.css";
import { UserContext } from "../../authentication/UserProvider";
import { uploadFile } from "../../storage/util/methods";
import { postTrip } from "../../trips/access";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { LoadingIndicator } from "../../components/LoadingIndicator/LoadingIndicator";
import { TripSubmission } from "../../trips/trip";

interface CustomElements extends HTMLFormControlsCollection {
  startCity: HTMLInputElement;
  destinationCity: HTMLInputElement;
  countries: HTMLInputElement;
  price: HTMLInputElement;
  tripDurationDays: HTMLInputElement;
  degreesCelcius: HTMLInputElement;
  tripLengthKm: HTMLInputElement;
  description: HTMLInputElement;
  attractions: HTMLInputElement;
}

interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements;
}

export const TripForm = () => {
  const [imageIds, setImageIds] = useState<string[]>([]);
  const [files, setFiles] = useState<FileList | null>(null);
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const uploadFiles = async (tripId: string) => {
    for (let i = 0; i < (files?.length || 0); i++) {
      const file = files?.item(i);
      if (
        file?.type !== "image/png" &&
        file?.type !== "image/jpeg" &&
        file?.type !== "image/jpg" &&
        file?.type !== "image/jfif"
      ) {
        alert("Bildet må være av typen PNG, JPG eller JPEG");
        return;
      }

      const path = `trips/${tripId}/${imageIds[i]}`;

      await uploadFile(file, path);
    }
  };

  const onSubmit = async (event: FormEvent<CustomForm>) => {
    event.preventDefault();
    if (isLoading) return;

    const target = event.currentTarget.elements;

    const tripSubmission: TripSubmission = {
      startCity: target.startCity.value,
      destinationCity: target.destinationCity.value,
      countries: target.countries.value.split(new RegExp(", +")),
      price: parseInt(target.price.value),
      tripDurationDays: parseInt(target.tripDurationDays.value),
      degreesCelcius: parseInt(target.degreesCelcius.value),
      tripLengthKm: parseInt(target.tripLengthKm.value),
      description: target.description.value,
      attractions: target.attractions.value.split(new RegExp(", +")),
      imageIds: imageIds,
      posterUid: currentUser?.userUid!,
    };

    setIsLoading(true);
    const { tripId } = await postTrip(tripSubmission);
    await uploadFiles(tripId);
    navigate("/reiserute/" + tripId);
    setIsLoading(false);
  };

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <LoadingIndicator isLoading={isLoading} />
      <div className="trip-form-container">
        <h1>Del din reiseopplevelse med andre!</h1>
        <div
          style={{
            height: ".5vh",
            width: "70%",
            backgroundColor: "var(--accent)",
            borderRadius: "1000px",
            margin: "auto",
          }}
        />
        <div className="trip-form-top flex-row">
          <div className="trip-form-top-left">
            <h2>1. Litt generelt om reisen</h2>
            <div className="field">
              <label htmlFor="startCity">Hvor reiste du fra?</label>
              <input
                className="input-box"
                id="startCity"
                placeholder="Roma, Stavanger, Cape Town..."
                required
              />
            </div>
            <div className="field">
              <label htmlFor="destinationCity">Hvor reiste du til?</label>
              <input
                className="input-box"
                id="destinationCity"
                placeholder="Firenze, Oslo, Mubishu..."
                required
              />
            </div>
            <div className="field">
              <label htmlFor="countries">Hvilke land var du innom?</label>
              <input
                className="input-box"
                id="countries"
                placeholder="Norge, USA, Island, osv..."
                required
              />
            </div>
            <div className="field">
              <label htmlFor="price">Hva kostet reisen?</label>
              <input
                className="input-box"
                type="number"
                min="0"
                max="999999"
                id="price"
                placeholder="Eks. 4500, 15000,..."
                required
              />
            </div>
            <div className="field">
              <label htmlFor="tripDurationDays">
                Hvor lang tid brukte du på reisen?
              </label>
              <input
                className="input-box"
                type="number"
                min="0"
                max="365"
                id="tripDurationDays"
                placeholder="Eks. 2, 3, 10..."
                required
              />
            </div>
          </div>
          <div className="trip-form-top-right">
            <h2>2. Legg inn noen fine bilder fra reisen din!</h2>
            <ImageUpload {...{ setImageIds, setFiles }} />
          </div>
        </div>
        <div className="trip-form-middle flex-row">
          <div className="trip-form-middle-left">
            <h2>3. Fortell oss litt om reisen din!</h2>
            <textarea
              className="input-description"
              id="description"
              placeholder="Skriv litt om reisen din her..."
              required
            ></textarea>
          </div>
          <div className="trip-form-middle-right">
            <h2>4. Noen få reisedetaljer til</h2>
            <div className="field orange">
              <label htmlFor="degreesCelcius">Klima</label>
              <input
                className="input-box"
                type="number"
                min="-100"
                max="70"
                step="0.1"
                id="degreesCelcius"
                placeholder="Forventet temperatur..."
                required
              />
            </div>
            <div className="field orange">
              <label htmlFor="tripLengthKm">Lengde</label>
              <input
                className="input-box"
                type="number"
                min="0"
                max="40000"
                id="tripLengthKm"
                placeholder="Distanse i kilometer..."
                required
              />
            </div>
            <div className="field orange">
              <label htmlFor="attractions">Attraksjoner</label>
              <input
                className="input-box"
                id="attractions"
                placeholder="Eiffeltårnet, Sfinx, Colosseum..."
                required
              />
            </div>
          </div>
        </div>
        <div className="trip-form-container-bottom">
          <h2>5. Publiser reisen!</h2>
          <p>Har du husket på alt?</p>
          <Button
            width="30vw"
            height="4vh"
            text="Publiser reisen min!"
            styling={"secondary-fill"}
            fontSize="1.6vw"
          ></Button>
        </div>
      </div>
    </form>
  );
};
