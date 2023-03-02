import { useEffect } from "react";
import { TextInput } from "react-native/types";

export const CreateTripForm = () => {
  useEffect(() => {
    document.title = "Opprett reiserute";
  }, []);

  return (
    <div>
      <h1>Opprett reiserute</h1>
      <form method="post" className={"user-form"}>
        <TextInput
          label={"Startdestinasjon"}
          placeholder="Startdestinasjon"
          type="text"
          name="startdestinasjon"
          required
        />
        <TextInput
          label={"Reisemål"}
          placeholder="Reisemål"
          type="text"
          name="reisemål"
          required
        />
        <TextInput
          label={"Land"}
          placeholder="Land"
          type="text"
          name="land"
          required
        />
        <TextInput
          label={"Pris"}
          placeholder="Pris"
          type="text"
          name="pris"
          required
        />
        <TextInput
          label={"Reisetid"}
          placeholder="Reisetid"
          type="text"
          name="reisetid"
          required
        />
        <TextInput
          label={"Vurderinger"}
          placeholder="Vurderinger"
          type="text"
          name="vurderinger"
          required
        />
      </form>
      <h1>Beskrivelse</h1>
      <form method="post" className={"user-form-description"}>
        <TextInput
          label={"Beskrivelse"}
          placeholder="Beskrivelse"
          type="text"
          name="beskrivelse"
          required
        />
      </form>
      <h1>Detaljer</h1>
      <form method="post" className={"user-form-details"}>
        <TextInput
          label={"Klima"}
          placeholder="Klima"
          type="text"
          name="klima"
          required
        />
        <TextInput
          label={"Reiselengde i meter"}
          placeholder="Reiselengde i meter"
          type="text"
          name="reiselengde"
          required
        />
        <TextInput
          label={"Attraksjoner"}
          placeholder="Attraksjoner"
          type="text"
          name="attraksjoner"
          required
        />
        /
      </form>
    </div>
  );

  const TextInput = ({
    className,
    label,
    value,
    type,
    onChangeAction,
    required,
    placeholder,
  }: {


  //     return (
  //         <div>
  //           <h1>Add User</h1>
  //           <form method="post" className={"user-form"}>
  //             <TextInput
  //               label={"Name"}
  //               placeholder="Name"
  //               type="text"
  //               name="name"
  //               required
  //             />
  //             <TextInput
  //               label={"Email"}
  //               placeholder="Email"
  //               type="email"
  //               name="email"
  //               required
  //             />
  //             <TextInput
  //               label={"Country"}
  //               placeholder="Country"
  //               type="text"
  //               name="country"
  //               required
  //             />
  //             <TextInput
  //               label={"Phone"}
  //               placeholder="Phone"
  //               type="text"
  //               name="phone"
  //               required
  //             />
  //           </form>
  //         </div>
  //       );

  // }
  // const TextInput = ({
  //     className,
  //     label,
  //     value,
  //     type,
  //     onChangeAction,
  //     placeholder
  //   }) => {
  //     return (
  //       <div className={`${className} form-field`}>
  //         <label htmlFor={label}>{label}</label>
  //         <input
  //           placeholder={placeholder || "Text"}
  //           type={type || "text"}
  //           value={value}
  //           onChange={onChangeAction}
  //         />
  //       </div>
  //     );
};

//const { currentUser } = useContext(UserContext);
//const navigate = useNavigate();
