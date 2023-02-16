import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import UserData from "../model/UserData";
import db from "./db";

export const getUserData = async (userUid: string) => {
  const users = await getDocs(
    query(collection(db, "user"), where("userUid", "==", userUid)),
  );
  let userData = null;
  users.forEach((user) => {
    userData = user.data();
  });
  return userData;
};

export const putUserData = (userData: UserData) => {
  addDoc(collection(db, "user"), userData);
};
