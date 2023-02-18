import { setDoc, doc, getDoc } from "firebase/firestore";
import UserData from "../model/UserData";
import db from "./db";

export const getUserData = async (userUid: string) => {
  const userData = await getDoc(doc(db, "user", userUid));
  if (!userData.exists()) {
    console.log("No such document exists!");
  }
  return userData;
};

export const putUserData = (userData: UserData) => {
  setDoc(doc(db, "user", userData.userUid), userData, { merge: true });
};
