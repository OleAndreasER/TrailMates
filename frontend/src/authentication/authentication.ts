import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  UserCredential,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
} from "firebase/auth";
import { putUserData } from "./firestore";
import { auth } from "../firebase/config";

export enum AuthError {
  EMAIL_IN_USE = "En bruker med denne e-posten eksisterer allerede.",
  INVALID_EMAIL_OR_PASSWORD = "Feil e-post eller passord.",
  SHORT_PASSWORD = "Passordet må være minst 6 tegn.",
  OTHER = "Noe gikk galt.",
}

const toAuthError = (error: FirebaseError) =>
  ({
    "auth/email-already-in-use": AuthError.EMAIL_IN_USE,
    "auth/invalid-email": AuthError.INVALID_EMAIL_OR_PASSWORD,
    "auth/weak-password": AuthError.SHORT_PASSWORD,
    "auth/user-not-found": AuthError.INVALID_EMAIL_OR_PASSWORD,
    "auth/wrong-password": AuthError.INVALID_EMAIL_OR_PASSWORD,
  }[error.code] || AuthError.OTHER);

export const signUp: (
  email: string,
  password: string,
  name: string,
) => Promise<AuthError | undefined> = (
  email,
  password,
  name,
  userType = "User",
) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentials: UserCredential) => {
      const userUid = userCredentials.user.uid;
      return putUserData(userUid, { name: name, userType: userType })
        .then((res: Response) => {
          if (res.status === 500) {
            return AuthError.OTHER;
          }
          console.log(`Signed up with email: ${email}`);
          return undefined;
        })
        .catch((error) => {
          // Undo creation of Firebase Auth user.
          auth.currentUser?.delete().then(() => {
            return AuthError.OTHER;
          });
          return AuthError.OTHER;
        });
    })
    .catch((error: FirebaseError) => {
      console.log(error.code);
      return toAuthError(error);
    });
};

export const logIn: (
  email: string,
  password: string,
) => Promise<AuthError | undefined> = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials: UserCredential) => {
      console.log(`Logged in with email: ${email}`);
      return undefined;
    })
    .catch((error: FirebaseError) => {
      console.log(error.code);
      return toAuthError(error);
    });
};

export const logOut = () => {
  console.log("Logging out");
  signOut(auth);
};

export const resetPassword = (email: string) => {
  sendPasswordResetEmail(auth, email)
    .then(() => console.log("Password email sent."))
    .catch(console.error);
};

export const setEmail = (newEmail: string) => {
  if (auth.currentUser === null) return;
  updateEmail(auth.currentUser, newEmail)
    .then(() => console.log("Email updated."))
    .catch(console.error);
};
