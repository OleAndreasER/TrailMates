import { useEffect, useState } from "react";
import { Button } from "../Button/Button";
import { InputField } from "../InputField/InputField";
import { logIn, signUp } from "../../authentication/authentication";
import "./LoginPopup.css";
import { ReactComponent as CloseIcon } from "../assets/cross-icon.svg";
import { isValidEmail, isValidPassword } from "../../utils/validatorMethods";
import { FirebaseError } from "@firebase/app";

interface UserInfo {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

enum ERROR {
  INVALID_EMAIL = "Dette er ikke en gyldig e-post",
  INVALID_PASSWORD = "Passordet må være minst 6 tegn",
  NON_MATCHING_PASSWORDS = "Passordene er ikke like",
}

const getErrorMessage = (err: FirebaseError) => {
  switch (err.code) {
    case "auth/email-already-in-use":
      return "En bruker med denne e-posten eksisterer allerede";
    case "auth/invalid-email":
      return "Dette er ikke en gyldig e-post";
    case "auth/weak-password":
      return "Passordet må være minst 6 tegn";
    case "auth/user-not-found":
      return "Fant ingen bruker med denne e-posten";
    case "auth/wrong-password":
      return "Feil passord";
    default:
      console.log(err.code);
      return "Noe gikk galt";
  }
};

interface Props {
  visible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

export const LoginPopup = ({ visible, setIsVisible }: Props) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>();

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
    setErrorMessage(``);
  }, [isLoggingIn]);

  const handleGoToRegisterClick = () => {
    setIsLoggingIn(false);
  };

  const addErrMessage = (err: string) => {
    setErrorMessage((prev) => `${prev}❌ ${err}`);
  };

  const handleRegisterButtonClicked = async () => {
    if (!validateFields()) return;

    const signupResponse = await signUp(
      userInfo.email,
      userInfo.password,
      userInfo.name,
    );
    if (signupResponse === true) {
      logIn(userInfo.email, userInfo.password);
      clearUserInfo();
      setErrorMessage("");
      setIsVisible(false);
    } else if (signupResponse instanceof FirebaseError) {
      addErrMessage(getErrorMessage(signupResponse));
    } else if (signupResponse instanceof Error) {
      addErrMessage(signupResponse.message);
    }
  };

  const validateFields = () => {
    // Has to use a flag because the addErrMessage method is async
    let flag = true;
    setErrorMessage("");
    if (!isValidEmail(userInfo.email)) {
      addErrMessage(ERROR.INVALID_EMAIL);
      flag = false;
    }
    if (!isValidPassword(userInfo.password)) {
      addErrMessage(ERROR.INVALID_PASSWORD);
      flag = false;
    }
    if (!isLoggingIn && userInfo.password !== userInfo.confirmPassword) {
      addErrMessage(ERROR.NON_MATCHING_PASSWORDS);
      flag = false;
    }
    return flag;
  };

  const handleLoginButtonClicked = async () => {
    if (!validateFields()) return;
    const loginResponse = await logIn(userInfo.email, userInfo.password);
    if (!loginResponse) {
      clearUserInfo();
      setErrorMessage("");
      setIsVisible(false);
    } else if (loginResponse instanceof FirebaseError) {
      addErrMessage(getErrorMessage(loginResponse));
    } else {
      addErrMessage(loginResponse.message);
    }
  };

  const handleClickOnCross = () => {
    setIsVisible(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (isLoggingIn) {
        handleLoginButtonClicked();
      } else {
        handleRegisterButtonClicked();
      }
    }

    if (e.key === "Escape") {
      handleClickOnCross();
    }
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
                onKeyDown={handleKeyDown}
              />
              {/* <p className="password-forgot">Glemt passord?</p> */}
              <div className="button-container">
                <p className="error">{errorMessage}</p>
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
                onKeyDown={handleKeyDown}
              />
              <div className="button-container">
                <p className="error">{errorMessage}</p>
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
