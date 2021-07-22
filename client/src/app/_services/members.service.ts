import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Member } from '../_models/member';
import { of, pipe } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';
import { AccountService } from './account.service';
import { User } from '../_models/user';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';
import { GuestParams } from '../_models/guestParams';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  memberCache = new Map();
  user: User;
  userParams: UserParams;
  guestParams: GuestParams;
  // constructor gets the user authentication and parameters
  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.userParams = new UserParams(user);

    })
  }

  getUserParams() {
    return this.userParams;
  }

  setUserParams(params: UserParams) {
    this.userParams = params;
  }


  setGuestParams(params: GuestParams) {
    this.guestParams = params;
  }

  resetUserParams() {
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }
  resetGuestParams() {
    this.guestParams = new GuestParams();
    return this.guestParams;
  }
  // service to get the members page
  getMembers(userParams: UserParams) {
    var response = this.memberCache.get(Object.values(userParams).join('-'));
    if (response) {
      return of(response);
    }
    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    // params = params.append('minAge', userParams.minAge.toString());
    // params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);
    //
    // if (userParams.country != null)
    params = params.append('country', userParams.country);
    // if (userParams.city != null)
      params = params.append('city', userParams.city);
    // if (userParams.major != null)
    params = params.append('major', userParams.major);
    // params = params.append('isVerified', userParams.isVerified);

    return getPaginatedResult<Member[]>(this.baseUrl + 'users', params, this.http)
      .pipe(map(response => {
        this.memberCache.set(Object.values(userParams).join('-'), response);
        return response;
      }))
  }

  getGuests(guestParams: GuestParams) {
    var response = this.memberCache.get(Object.values(guestParams).join('-'));
    if (response) {
      return of(response);
    }
    let params = getPaginationHeaders(guestParams.pageNumber, guestParams.pageSize);
// THOSE PARAMETERS ARE THE ONES PASSSED IN THE URL TO API
    // params = params.append('minAge', guestParams.minAge.toString());
    // params = params.append('maxAge', guestParams.maxAge.toString());
    params = params.append('gender', guestParams.gender);
    params = params.append('orderBy', guestParams.orderBy);

    params = params.append('country', guestParams.country);
    params = params.append('city', guestParams.city);
    params = params.append('major', guestParams.major);
    // params = params.append('country', guestParams.country);
    // params = params.append('city', guestParams);

    return getPaginatedResult<Member[]>(this.baseUrl + 'guests', params, this.http)
      .pipe(
        map
        (
          response => 
          {
            this.memberCache.set(Object.values(guestParams).join('-'), response);
            return response;
          } 
        )
      )
  }

  getMember(username: string) {
    const member = [...this.memberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((member: Member) => member.username === username);

    if (member) {
      return of(member);
    }
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  // to see member profile as guest
  getGuest(username: string) {
    // const member = [...this.memberCache.values()]
    //   .reduce((arr, elem) => arr.concat(elem.result), [])
    //   .find((member: Member) => member.username === username);

    // if (member) {
    //   return of(member);
    // }
    return this.http.get<Member>(this.baseUrl + 'guests/' + username);
  }


  // member is body element passed in postman
  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    )
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }

  addLike(username: string) {
    return this.http.post(this.baseUrl + 'likes/' + username, {})
  }

  getLikes(predicate: string, pageNumber, pageSize) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('predicate', predicate);
    return getPaginatedResult<Partial<Member[]>>(this.baseUrl + 'likes', params, this.http);
  }

  changeUserPassword(member: Member) {
    return this.http.put(this.baseUrl + 'users/change-password', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    )
    // return this.http.put(this.baseUrl + 'users/change-password' , {});
  }



  forgotPasswordMail(email: string) {
    return this.http.post
      (this.baseUrl + 'account/forgot-password-mail',
        email
      )
      .pipe()
    // this.http.post(this.baseUrl + 'account/forgot-password-mail' + member, {});
    // return this.http.put(this.baseUrl + 'users/change-password' , {});
  }







}
