// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  UserCredential,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

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
const analytics = getAnalytics(app);

const logUser = (userUid: string) => {
  fetch("http://localhost:3001/user/" + userUid)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
};

export const auth = getAuth(app);

export const signUp = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentials: UserCredential) => {
      const userUid = userCredentials.user.uid;
      logUser(userUid);
      console.log(userUid);
      console.log(`Signed up with email: ${email}`);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const logIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials: UserCredential) => {
      const userUid = userCredentials.user.uid;
      logUser(userUid);
      console.log(`Logged in with email: ${email}`);
      console.log(userUid);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const logOut = () => signOut(auth);
