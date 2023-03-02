import { useEffect } from "react";
import { TextInput } from "react-native/types";


export const CreateTripForm = () => {
    
    useEffect(() => {
      document.title = "Opprett reiserute";
    }, []);


    return (
        <div>
          <h1>Add User</h1>
          <form method="post" className={"user-form"}>
            <TextInput
              label={"Name"}
              placeholder="Name"
              type="text"
              name="name"
              required
            />
            <TextInput
              label={"Email"}
              placeholder="Email"
              type="email"
              name="email"
              required
            />
            <TextInput
              label={"Country"}
              placeholder="Country"
              type="text"
              name="country"
              required
            />
            <TextInput
              label={"Phone"}
              placeholder="Phone"
              type="text"
              name="phone"
              required
            />
          </form>
        </div>
      );
    
}
const TextInput = ({
    className,
    label,
    value,
    type,
    onChangeAction,
    placeholder
  }) => {
    return (
      <div className={`${className} form-field`}>
        <label htmlFor={label}>{label}</label>
        <input
          placeholder={placeholder || "Text"}
          type={type || "text"}
          value={value}
          onChange={onChangeAction}
        />
      </div>
    );
  };




    //const { currentUser } = useContext(UserContext);
    //const navigate = useNavigate();
