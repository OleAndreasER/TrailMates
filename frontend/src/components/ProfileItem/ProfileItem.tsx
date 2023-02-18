import { useContext, useState } from "react";
import "./ProfileItem.css";
import { UserContext } from "../../authentication/UserProvider";
import { putUserData } from "../../authentication/firestore";

interface Props {
  info: string;
  title: "Navn" | "Alder" | "Bosted" | "Telefon" | "Om meg";
}

const attributeEquivalent = {
  Navn: "name",
  Alder: "age",
  Bosted: "placeOfResidence",
  Telefon: "phoneNumber",
  "Om meg": "aboutUser",
};

// TODO: Add validation?
export const ProfileItem = ({ info, title }: Props) => {
  const [value, setValue] = useState(info);
  const [savedValue, setSavedValue] = useState(value);
  const [edit, setEdit] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
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

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = "auto";
    e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.key === "Enter") {
      handleClick();
    }
    if (e.key === "Escape") {
      setValue(savedValue);
      setEdit(!edit);
    }
  };

  return (
    <>
      {title === "Om meg" ? (
        <>
          {edit ? (
            <textarea
              rows={7}
              placeholder={title}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="aboutme-textarea"
              onInput={handleInput}
            >
              {value}
            </textarea>
          ) : (
            <p onDoubleClick={handleClick}>{value}</p>
          )}
          <a
            className="edit-button"
            style={{ fontSize: "1.2vw", display: "block" }}
            onClick={handleClick}
          >
            {edit ? "Lagre" : "Endre bio"}
          </a>
        </>
      ) : (
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
                <p onDoubleClick={handleClick}>
                  {value + (title === "Alder" && value !== "" ? " år" : "")}
                </p>
                <a className="edit-button" onClick={handleClick}>
                  Rediger
                </a>
              </>
            )}
          </div>
          <div className="seperator"></div>
        </div>
      )}
    </>
  );
};
