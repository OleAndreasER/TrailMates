import { User } from "firebase/auth";
import { get, put } from "../utils/fetchMethods";

export interface UserData {
  name: string;
  userType: string;
  nationality?: string;
  aboutUser?: string;
  age?: number;
}

export const getUserData: (userUid: string) => Promise<UserData> = async (
  userUid: string,
) => {
  return await get(userUid);
};

export const addUserData = (userUid: string, userData: UserData) => {
  return put(userUid, userData);
};
