import React, { FormEvent } from "react";
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
    };

    console.log(data);
  };

  return (
    <form className="form" onSubmit={onSubmit}>
    <div className="title">Beskrivelse</div>
      <div className="large_field">
        <input id="Beskrivelse" />
      </div>
    <div className="title">Generelt</div>
      <div className="field">
        <label htmlFor="startDestinasjon">Startdestinasjon</label>
        <div className="box"></div>
        <input id="startDestinasjon" />
      </div>
      <div className="field">
        <label htmlFor="Reisemål">Reisemål</label>
        <div className="box"></div>
        <input type="Reisemål" id="Reisemål" />
      </div>
      <div className="field">
        <label htmlFor="Land">Land</label>
        <div className="box"></div>
        <input type="Land" id="Land" />
      </div>
      <div className="field">
        <label htmlFor="Pris">Pris</label>
        <div className="box"></div>
        <input type="Pris" id="Pris" />
      </div>
      <div className="field">
        <label htmlFor="Reisetid">Reisetid</label>
        <div className="box"></div>
        <input type="Reisetid" id="Reisetid" />
      </div>
      <div className="field">
        <label htmlFor="Vurdering">Vurdering (1-5)</label>
        <div className="box"></div>
        <input type="Vurdering" id="Vurdering" />
      </div>
      <div className="title">Detaljer</div>
      <div className="field">
        <label htmlFor="Klima">Klima</label>
        <div className="box"></div>
        <input type="Klima" id="Klima" />
        </div>
        <div className="field">
        <label htmlFor="Lengde">Lengde (i kilometer)</label>
        <div className="box"></div>
        <input type="Lengde" id="Lengde" />
        </div>
      <div className="field checkbox">
        <input type="checkbox" id="conditionsAccepted" />
        <label htmlFor="conditionsAccepted">I agree to the terms and conditions</label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}