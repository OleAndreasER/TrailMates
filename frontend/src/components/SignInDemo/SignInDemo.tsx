import { useContext, useState } from "react";
import { UserContext } from "../../authentication/UserProvider";
import { logIn, signUp, logOut } from "../../authentication/authentication";

export default () => {
  const user = useContext(UserContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  return (
    <>
      <input
        onChange={(event) => setEmail(event.target.value)}
        type="email"
        placeholder="Email"
      />
      <input
        onChange={(event) => setPassword(event.target.value)}
        type="password"
        placeholder="Password"
      />
      <input
        onChange={(event) => setName(event.target.value)}
        placeholder="Full name"
      />
      <button onClick={() => logIn(email, password)}>Log in</button>
      <button onClick={() => logOut()}>Log out</button>
      <button onClick={() => signUp(email, password, name)}>Sign up</button>
      {user ? (
        <>
          <p>{`Email: ${user.email}`}</p>
          <p>{`Name: ${user.name}`}</p>
          <p>{`Type: ${user.type}`}</p>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
