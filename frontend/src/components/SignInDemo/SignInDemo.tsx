import { useContext, useState } from "react";
import { AuthContext } from "../../authentication/AuthProvider";
import { logIn, signUp, logOut } from "../../authentication/authentication";

export default () => {
  const user = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <>
      <input
        onChange={(event) => setEmail(event.target.value)}
        name="email"
        type="email"
        placeholder="Email"
      />
      <input
        onChange={(event) => setPassword(event.target.value)}
        name="password"
        type="password"
        placeholder="Password"
      />
      <button onClick={() => logIn(email, password)}>Log in</button>
      <button onClick={() => logOut()}>Log out</button>
      <button onClick={() => signUp(email, password)}>Sign up</button>
      <p>{user ? `Logged in as: ${user.email}` : ""}</p>
    </>
  );
};
