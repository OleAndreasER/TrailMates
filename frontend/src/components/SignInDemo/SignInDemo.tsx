import { useContext, useState } from "react";
import { UserContext } from "../../authentication/UserProvider";
import { logIn, signUp, logOut } from "../../authentication/authentication";
import "./SignInDemo.css";

export default () => {
  const { currentUser } = useContext(UserContext);
  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [inputName, setInputName] = useState<string>("");

  return (
    <div className="demo-container">
      <div className="input-container">
        <input
          onChange={(event) => setInputEmail(event.target.value)}
          type="email"
          placeholder="Email"
        />
        <input
          onChange={(event) => setInputPassword(event.target.value)}
          type="password"
          placeholder="Password"
        />
        <input
          onChange={(event) => setInputName(event.target.value)}
          placeholder="Full name"
        />
      </div>
      <div className="button-container">
        <button onClick={() => logIn(inputEmail, inputPassword)}>Log in</button>
        <button onClick={() => logOut()}>Log out</button>
        <button onClick={() => signUp(inputEmail, inputPassword, inputName)}>
          Sign up
        </button>
      </div>
      {currentUser ? (
        <>
          <p>{`Email: ${currentUser.email}`}</p>
          <p>{`Name: ${currentUser.name}`}</p>
          <p>{`Type: ${currentUser.userType}`}</p>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
