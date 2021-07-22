export interface User {
    username: string;
    token: string;
    photoUrl: string;
    knownAs: string;
    gender: string;
    roles: string[];

    email: string;
    phoneNumber: number;
    isVerified: string;
    // country: string;
}