import { useContext, useEffect, useState } from "react";
import { Button } from "../Button/Button";
import { InputField } from "../InputField/InputField";
import { logIn, signUp, logOut } from "../../authentication/authentication";
import "./LoginPopup.css";
import { UserContext } from "../../authentication/UserProvider";
import { ReactComponent as CloseIcon } from "../assets/cross-icon.svg";

interface UserInfo {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

interface Props {
  visible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

export const LoginPopup = ({ visible, setIsVisible }: Props) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);
  const { currentUser } = useContext(UserContext);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(true);

  const getOnChangeHandler = (
    key: keyof UserInfo,
  ): ((e: React.ChangeEvent<HTMLInputElement>) => void) => {
    return (e) => {
      setUserInfo({
        ...userInfo,
        [key]: e.target.value,
      });
    };
  };

  const clearUserInfo = () => {
    setUserInfo({
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    });
  };

  useEffect(() => {
    clearUserInfo();
  }, [isLoggingIn]);

  const handleGoToRegisterClick = () => {
    setIsLoggingIn(false);
  };

  function delay(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  const handleRegisterButtonClicked = async () => {
    // Add feedback to user
    if (userInfo.password !== userInfo.confirmPassword) {
      alert("Passordene er ikke like");
      return;
    }
    const isSignedUp = await signUp(
      userInfo.email,
      userInfo.password,
      userInfo.name,
    );
    if (isSignedUp) {
      await handleLoginButtonClicked();
    } else {
      alert("Noe gikk galt");
    }
  };

  const handleLoginButtonClicked = async () => {
    const isLoggedIn = await logIn(userInfo.email, userInfo.password);
    if (isLoggedIn) {
      clearUserInfo();
      setIsVisible(false);
    }
  };

  const handleClickOnCross = () => {
    setIsVisible(false);
  };

  return (
    <div
      className="popup-container"
      style={{ display: visible ? "flex" : "none" }}
    >
      <div className="login-container">
        <div className="left-container">
          <h1>Test</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
            <br />
            <br />
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </div>
        <div className="right-container">
          <CloseIcon className="close-button" onClick={handleClickOnCross} />
          {isLoggingIn ? (
            <>
              <h1>Velkommen Tilbake!</h1>
              <InputField
                labelText="EMAIL"
                onChange={getOnChangeHandler("email")}
                value={userInfo.email}
                type="text"
              />
              <InputField
                labelText="PASSORD"
                onChange={getOnChangeHandler("password")}
                value={userInfo.password}
                type="password"
              />
              <p className="password-forgot">
                <p>Glemt passord?</p>
              </p>
              <div className="button-container">
                <Button
                  text="LOGG INN"
                  styling="accent-fill"
                  onClick={handleLoginButtonClicked}
                  className="login-button"
                />
                <p>
                  Har du ikke bruker?{" "}
                  <u onClick={handleGoToRegisterClick}>Registrer deg!</u>
                </p>
              </div>
            </>
          ) : (
            <>
              <h1>Hei på deg!</h1>
              <InputField
                labelText="NAVN"
                onChange={getOnChangeHandler("name")}
                value={userInfo.name}
                type="text"
              />
              <InputField
                labelText="EMAIL"
                onChange={getOnChangeHandler("email")}
                value={userInfo.email}
                type="email"
              />
              <InputField
                labelText="PASSORD"
                onChange={getOnChangeHandler("password")}
                value={userInfo.password}
                type="password"
              />
              <InputField
                labelText="BEKREFT PASSORD"
                onChange={getOnChangeHandler("confirmPassword")}
                value={userInfo.confirmPassword}
                type="password"
              />
              <div className="button-container">
                <Button
                  text="REGISTRER DEG"
                  styling="accent-fill"
                  onClick={handleRegisterButtonClicked}
                  className="register-button"
                />
                <p className="already-user">
                  Har du allerede en bruker?{" "}
                  <u onClick={() => setIsLoggingIn(true)}>Logg inn her!</u>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
