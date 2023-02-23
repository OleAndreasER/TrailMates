import { useEffect, useState } from "react";
import { Button } from "../Button/Button";
import { InputField } from "../InputField/InputField";
import { logIn, signUp, AuthError } from "../../authentication/authentication";
import "./LoginPopup.css";
import { ReactComponent as CloseIcon } from "../assets/cross-icon.svg";
import { isValidEmail, isValidPassword } from "../../utils/validatorMethods";

interface InputFields {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

enum InputError {
  NO_NAME = "Du må ha et navn.",
  INVALID_EMAIL = "Dette er ikke en gyldig e-post.",
  INVALID_PASSWORD = "Passordet må være minst 6 tegn.",
  NON_MATCHING_PASSWORDS = "Passordene er ikke like.",
}

interface Props {
  visible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

export const LoginPopup = ({ visible, setIsVisible }: Props) => {
  const [inputFields, setInputFields] = useState<InputFields>(
    {} as InputFields,
  );
  // isLoggingIn = false, means user is signing in.
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>();

  /**
   * Returns a function that updates the state of the inputFields object
   * on change of a input field.
   *
   * @param key The key of the property to update
   * @returns A function that updates the state of the inputFields object
   */
  const getOnChangeHandler = (
    key: keyof InputFields,
  ): ((e: React.ChangeEvent<HTMLInputElement>) => void) => {
    return (e) => {
      setInputFields({
        ...inputFields,
        [key]: e.target.value,
      });
    };
  };

  const clearInputFields = () => {
    setInputFields({
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    });
  };

  useEffect(() => {
    clearInputFields();
    setErrorMessage("");
  }, [isLoggingIn]);

  const handleGoToRegisterClick = () => {
    setIsLoggingIn(false);
  };

  const inputFieldError: () => InputError | undefined = () => {
    if (!isLoggingIn && inputFields.name === "") {
      return InputError.NO_NAME;
    }
    if (!isValidEmail(inputFields.email)) {
      return InputError.INVALID_EMAIL;
    }
    if (!isValidPassword(inputFields.password)) {
      return InputError.INVALID_PASSWORD;
    }
    if (!isLoggingIn && inputFields.password !== inputFields.confirmPassword) {
      return InputError.NON_MATCHING_PASSWORDS;
    }
    return undefined;
  };

  const handleRegisterButtonClicked = async () => {
    const error = inputFieldError();
    if (error) {
      setErrorMessage(error);
      return;
    }

    signUp(inputFields.email, inputFields.password, inputFields.name).then(
      (error?: AuthError) => {
        if (error) {
          setErrorMessage(error);
        } else {
          setIsVisible(false);
          clearInputFields();
          setErrorMessage("");
        }
      },
    );
  };

  const handleLoginButtonClicked = async () => {
    logIn(inputFields.email, inputFields.password).then((error?: AuthError) => {
      if (error) {
        setErrorMessage(error);
      } else {
        clearInputFields();
        setErrorMessage("");
        setIsVisible(false);
      }
    });
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
          {/* TODO: Replace with actual content */}
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
                value={inputFields.email}
                type="text"
              />
              <InputField
                labelText="PASSORD"
                onChange={getOnChangeHandler("password")}
                value={inputFields.password}
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
                value={inputFields.name}
                type="text"
              />
              <InputField
                labelText="EMAIL"
                onChange={getOnChangeHandler("email")}
                value={inputFields.email}
                type="email"
              />
              <InputField
                labelText="PASSORD"
                onChange={getOnChangeHandler("password")}
                value={inputFields.password}
                type="password"
              />
              <InputField
                labelText="BEKREFT PASSORD"
                onChange={getOnChangeHandler("confirmPassword")}
                value={inputFields.confirmPassword}
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
