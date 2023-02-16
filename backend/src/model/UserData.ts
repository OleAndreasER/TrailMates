export default interface UserData {
  userUid: string;
  name: string;
  userType: string;
  nationality?: string;
  aboutUser?: string;
  age?: number;
  phoneNumber?: string;
}

export const isValidUserType = (userType: string) =>
  ["User", "Admin", "Advertiser"].includes(userType);
