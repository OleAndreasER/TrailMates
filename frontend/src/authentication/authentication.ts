// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
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

export const signUp = async (
  email: string,
  password: string,
  name: string,
  userType = "User",
) =>
  await createUserWithEmailAndPassword(auth, email, password).then(
    (userCredentials: UserCredential) => {
      const userUid = userCredentials.user.uid;
      putUserData(userUid, { name: name, userType: userType })
        .then((res: Response) => {
          if (res.status == 500) {
            throw new Error("Something went wrong");
          }
          console.log(`Signed up with email: ${email}`);
        })
        .catch((error) => {
          auth.currentUser?.delete().then(() => {
            console.log("Server is down probably..");
          });
        });
    },
  );

export const logIn = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials: UserCredential) => {
      console.log(`Logged in with email: ${email}`);
    })
    .catch(console.error);

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
