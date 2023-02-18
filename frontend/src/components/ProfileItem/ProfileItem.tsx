import { useContext, useState } from "react";
import "./ProfileItem.css";
import { UserContext } from "../../authentication/UserProvider";
import { putUserData } from "../../authentication/firestore";

interface Props {
  info: string;
  title: "Navn" | "Alder" | "Bosted" | "Telefon";
}

const attributeEquivalent = {
  Navn: "name",
  Alder: "age",
  Bosted: "placeOfResidence",
  Telefon: "phoneNumber",
};

// TODO: Add validation?
export const ProfileItem = ({ info, title }: Props) => {
  const [value, setValue] = useState(info);
  const [savedValue, setSavedValue] = useState(value);
  const [edit, setEdit] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (title === "Telefon") {
      const re = /^\d{0,8}$/;
      if (e.target.value === "" || re.test(e.target.value)) {
        setValue(e.target.value);
      }
    } else if (title === "Alder") {
      const re = /^\d{0,3}$/;
      if (e.target.value === "" || re.test(e.target.value)) {
        setValue(e.target.value);
      }
    } else {
      setValue(e.target.value);
    }
  };

  const handleClick = () => {
    if (edit && value !== savedValue) {
      setSavedValue(value);
      const updatedUser = {
        ...currentUser!,
        [attributeEquivalent[title]]:
          title === "Alder" || title === "Telefon" ? parseInt(value) : value,
      };
      putUserData(currentUser!.userUid, updatedUser)
        .then(() => setCurrentUser(updatedUser))
        .catch((err) => alert(err));
    }
    setEdit(!edit);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClick();
    }
    if (e.key === "Escape") {
      setValue(savedValue);
      setEdit(!edit);
    }
  };

  return (
    <div className="container-inforow flex-column">
      <h3>{title}</h3>
      <div className="user-context flex-row">
        {edit ? (
          <>
            <input
              type="text"
              placeholder={title}
              onChange={handleChange}
              value={value}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <a className="edit-button" onClick={handleClick}>
              Lagre
            </a>
          </>
        ) : (
          <>
            <p>{value + (title === "Alder" && value !== "" ? " år" : "")}</p>
            <a className="edit-button" onClick={handleClick}>
              Rediger
            </a>
          </>
        )}
      </div>
      <div className="seperator"></div>
    </div>
  );
};
