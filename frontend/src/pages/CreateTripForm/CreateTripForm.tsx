import React, { FormEvent } from "react";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import "./CreateTripForm.css";

interface CustomElements extends HTMLFormControlsCollection {
  startDestinasjon: HTMLInputElement;
  Reisemål: HTMLInputElement;
  Land: HTMLInputElement;
  Pris: HTMLInputElement;
  Reisetid: HTMLInputElement;
  Vurdering: HTMLInputElement;
  Klima: HTMLInputElement;
  Lengde: HTMLInputElement;
  Beskrivelse: HTMLInputElement;
}

interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements;
}

export const CreateTripForm = () => {
  const onSubmit = (event: FormEvent<CustomForm>) => {
    event.preventDefault();
    const target = event.currentTarget.elements;

    const data = {
      startDestinasjon: target.startDestinasjon.value,
      Reisemål: target.Reisemål.value,
      Land: target.Land.value,
      Pris: target.Pris.value,
      Reisetid: target.Reisetid.value,
      Vurdering: target.Vurdering.value,
      Klima: target.Klima.value,
      Lengde: target.Lengde.value,
      Beskrivelse: target.Beskrivelse.value,
    };

    console.log(data);
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="left-container-d">
        <div className="title">Generelt</div>
        <div className="field">
          <label htmlFor="startDestinasjon">Start</label>
          <input
            className="input-box"
            id="startDestinasjon"
            placeholder="By, turistområde, osv..."
            required
          />
        </div>
        <div className="field">
          <label htmlFor="Reisemål">Reisemål</label>
          <input
            className="input-box"
            type="Reisemål"
            id="Reisemål"
            placeholder="By, turistområde, osv..."
            required
          />
        </div>
        <div className="field">
          <label htmlFor="Land">Land</label>
          <input
            className="input-box"
            type="Land"
            id="Land"
            placeholder="Norge, USA, Island, osv..."
            required
          />
        </div>
        <div className="field">
          <label htmlFor="Pris">Pris</label>
          <input
            className="input-box"
            type="Pris"
            id="Pris"
            placeholder="Eks. 10000kr, 30000kr,..."
            required
          />
        </div>
        <div className="field">
          <label htmlFor="Reisetid">Reisetid</label>
          <input
            className="input-box"
            type="Reisetid"
            id="Reisetid"
            placeholder="Eks. 2-3 dager..."
            required
          />
        </div>
        <div className="field">
          <label htmlFor="Vurdering">Vurdering</label>
          <input
            className="input-box"
            type="Vurdering"
            id="Vurdering"
            placeholder="Rangering fra 1-5..."
            required
          />
        </div>
        <div className="title">Detaljer</div>
        <div className="field">
          <label htmlFor="Klima">Klima</label>
          <input
            className="input-box"
            type="Klima"
            id="Klima"
            placeholder="Forventet temperatur..."
            required
          />
        </div>
        <div className="field">
          <label htmlFor="Lengde">Lengde</label>
          <input
            className="input-box"
            type="Lengde"
            id="Lengde"
            placeholder="Distanse i kilometer..."
            required
          />
        </div>
        <div className="field checkbox">
          <input
            className="input-box"
            type="checkbox"
            id="conditionsAccepted"
            required
          />
          <label htmlFor="conditionsAccepted">
            I agree to the terms and conditions
          </label>
        </div>
      </div>
      <div className="right-container-d">
        <div className="title">Beskrivelse</div>
        <div className="large-field">
          <textarea
            className="input-description"
            id="Beskrivelse"
            placeholder="Skriv litt om reisen din her..."
            required
          ></textarea>
        </div>
        <div className="title">Bilder</div>
        <div className="image-upload">
          <ImageUpload />
        </div>
      </div>
      <button className="submit-button" type="submit">
        Send inn
      </button>
    </form>
  );
};
