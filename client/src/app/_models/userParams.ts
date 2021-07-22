import { User } from './user';

export class UserParams {
    gender: string;
    // minAge = 18;
    // maxAge = 99;
    pageNumber = 1;
    pageSize =24;
    orderBy = 'lastActive';

    country: string;
    city: string;
    major: string;
    // isVerified: boolean;
    constructor(user: User) {
 
        // this.gender = user.gender === 'female' ? 'male' : 'female';
        
        // initial values to be passed in URL to show all since it exclude condition in UserRepository GetMembers filter
        this.gender =  'الكل';
        this.country = 'جميع البلدان'
        this.city = 'جميع المدن'
        this.major = 'جميع التخصصات'
        // this.pageSize =5;
    }
}