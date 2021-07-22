import { Photo } from './photo';

export interface Member {
    id: number;
    username: string;
    photoUrl: string;
    age: number;
    knownAs: string;
    created: Date;
    lastActive: Date;
    gender: string;
    introduction: string;
    lookingFor: string;
    interests: string;
    city: string;
    country: string;
    photos: Photo[];
    // to map change password fields from form put request
    passwordO: string;
    passwordN: string;
// for email map
    email: string;
    phoneNumber: string;
    isVerified: boolean;
    verifiedDate: Date;
    balance: number;

    major: string;
    nationality: string;
    accountStatus: number;
    // countryEn:string;
  }
  
