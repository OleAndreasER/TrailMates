import { FormEvent, useContext, useState } from "react";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import "./TripForm.css";
import { UserContext } from "../../authentication/UserProvider";
import { uploadFile } from "../../storage/util/methods";
import { postTrip, TripSubmission } from "../../trips/trip";
import { Navigate, useNavigate } from "react-router-dom";
import { TitleSeperator } from "../../components/TitleSeperator/TitleSeperator";

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
    <div className="trip-form-container">
      <h1>Del din reiseopplevelse med andre!</h1>
      <TitleSeperator
        width={"70%"}
        color={"accent"}
        height={"0.5vh"}
      ></TitleSeperator>
      <div className="trip-form-top flex-row">
        <div className="trip-form-top-left">
          <h2>1. Litt generelt om reisen</h2>
          <div className="field">
            <label htmlFor="startCity">Start By</label>
            <input
              className="input-box"
              id="startCity"
              placeholder="Roma, Stavanger, Cape Town..."
              required
            />
          </div>
          <div className="field">
            <label htmlFor="destinationCity">Slutt By</label>
            <input
              className="input-box"
              id="destinationCity"
              placeholder="Firenze, Oslo, Mubishu..."
              required
            />
          </div>
          <div className="field">
            <label htmlFor="countries">Land</label>
            <input
              className="input-box"
              id="countries"
              placeholder="Norge, USA, Island, osv..."
              required
            />
          </div>
          <div className="field">
            <label htmlFor="price">Pris (kroner)</label>
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
            <label htmlFor="tripDurationDays">Varighet (dager)</label>
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
        </div>
      </div>
    </div>

    /* 

    <form className="form" onSubmit={onSubmit}>
      <div className="left-container-d">
        <div className="title">Generelt</div>
        <div className="field">
          <label htmlFor="startCity">Start By</label>
          <input
            className="input-box"
            id="startCity"
            placeholder="Roma, Stavanger, Cape Town..."
            required
          />
        </div>
        <div className="field">
          <label htmlFor="destinationCity">Slutt By</label>
          <input
            className="input-box"
            id="destinationCity"
            placeholder="Firenze, Oslo, Mubishu..."
            required
          />
        </div>
        <div className="field">
          <label htmlFor="countries">Land</label>
          <input
            className="input-box"
            id="countries"
            placeholder="Norge, USA, Island, osv..."
            required
          />
        </div>
        <div className="field">
          <label htmlFor="price">Pris (kroner)</label>
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
          <label htmlFor="tripDurationDays">Varighet (dager)</label>
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
        <div className="title">Detaljer</div>
        <div className="field">
          <label htmlFor="degreesCelcius">Temperatur (grader)</label>
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
        <div className="field">
          <label htmlFor="tripLengthKm">Lengde (i kilometer)</label>
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
        <div className="field">
          <label htmlFor="attractions">Attraksjoner (i kilometer)</label>
          <input
            className="input-box"
            id="attractions"
            placeholder="Eiffeltårnet, Sfinx, Colosseum..."
            required
          />
        </div>
      </div>
      <div className="right-container-d">
        <div className="title">Beskrivelse</div>
        <div className="large-field">
          <textarea
            className="input-description"
            id="description"
            placeholder="Skriv litt om reisen din her..."
            required
          ></textarea>
        </div>
        <div className="title">Bilder</div>
        <div className="image-upload">
          <ImageUpload {...{ setImageIds, setFiles }} />
        </div>
      </div>
      <button className="submit-button" type="submit">
        Send inn
      </button>
    </form> */
  );
};
