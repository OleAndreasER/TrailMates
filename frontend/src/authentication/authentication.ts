// Import the functions you need from the SDKs you need
import { FirebaseApp, FirebaseError, initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  UserCredential,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
} from "firebase/auth";
import { putUserData } from "./firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnc1CJVuxFAuNfEgaeGLYy-wXkUyEOKUA",
  authDomain: "backpacking-tdt4140.firebaseapp.com",
  databaseURL:
    "https://backpacking-tdt4140-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "backpacking-tdt4140",
  storageBucket: "backpacking-tdt4140.appspot.com",
  messagingSenderId: "1070204029914",
  appId: "1:1070204029914:web:1fc2f2a8b81bf022c04ee3",
  measurementId: "G-E8V7RV259H",
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export enum AuthError {
  EMAIL_IN_USE = "En bruker med denne e-posten eksisterer allerede.",
  INVALID_EMAIL = "Dette er ikke en gyldig e-post addresse.",
  SHORT_PASSWORD = "Passordet må være minst 6 tegn.",
  WRONG_EMAIL = "Fant ingen bruker med denne e-posten.",
  WRONG_PASSWORD = "Feil passord.",
  OTHER = "Noe gikk galt.",
}

const toAuthError = (error: FirebaseError) =>
  ({
    "auth/email-already-in-use": AuthError.EMAIL_IN_USE,
    "auth/invalid-email": AuthError.INVALID_EMAIL,
    "auth/weak-password": AuthError.SHORT_PASSWORD,
    "auth/user-not-found": AuthError.WRONG_EMAIL,
    "auth/wrong-password": AuthError.WRONG_PASSWORD,
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
          if (res.status == 500) {
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
