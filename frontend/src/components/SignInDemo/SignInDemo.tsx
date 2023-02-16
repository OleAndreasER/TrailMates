import { useContext, useState } from "react";
import { UserContext } from "../../authentication/UserProvider";
import { logIn, signUp, logOut } from "../../authentication/authentication";

export default () => {
  const user = useContext(UserContext);
  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [inputName, setInputName] = useState<string>("");

  return (
    <>
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
      <button onClick={() => logIn(inputEmail, inputPassword)}>Log in</button>
      <button onClick={() => logOut()}>Log out</button>
      <button onClick={() => signUp(inputEmail, inputPassword, inputName)}>
        Sign up
      </button>
      {user !== null ? (
        <>
          <p>{`Email: ${user.email}`}</p>
          <p>{`Name: ${user.name}`}</p>
          <p>{`Type: ${user.userType}`}</p>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
