export default interface UserData {
    userUid: string;
    name: string;
    userType: string;
    nationality?: string;
    aboutUser?: string;
    age?: number;
    phoneNumber?: string;
}
export declare const isValidUserType: (userType: string) => boolean;
