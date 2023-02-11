import { collection, getDocs, query, where } from "firebase/firestore";
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
