import { User } from './user';

export class GuestParams {
    // this parameter ares passed in request
    //  ttps://localhost:5001/api/guests?pageNumber=1&pageSize=5&minAge=18&maxAge=99&gender=%D8%A7%D9%84%D9%83%D9%84&orderBy=lastActive

    gender: string;
    // minAge = 18;
    // maxAge = 99;
    pageNumber = 1;
    pageSize = 24;
    orderBy = 'lastActive';

    country: string;
    city: string;
    major: string;
    constructor() {
        this.gender =  'الكل';
        this.country = 'جميع البلدان'
        this.city = 'جميع المدن'
        this.major = 'جميع التخصصات'
     
    }
    
}