import { get, put } from "../utils/fetchMethods";

export interface UserData {
  name: string;
  type: string;
}

export const getUserData: (userUid: string) => Promise<UserData> = async (
  userUid: string,
) => {
  return await get(userUid);
};

export const addUserData = (userUid: string, name: string, type: string) => {
  return put(userUid, { name: name, type: type });
};
