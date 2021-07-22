import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { User } from '../_models/user';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PresenceService } from './presence.service';
import { resetUser } from '../_models/resetUser';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  
  constructor(private http: HttpClient, private presence: PresenceService, private toastr: ToastrService) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
        map((response: User) =>
        {
          const user = response;
          if (user) {
            this.setCurrentUser(user);
            this.presence.createHubConnection(user);
            this.toastr.info('logged in');
          }
        }// ,(error)=>{ this.toastr.error(error)}
      )
    )
  }

  register(model: any) {
    
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if (user) {
         this.setCurrentUser(user);
         this.presence.createHubConnection(user);
        }
      })
    )
  }

  setCurrentUser(user: User) {
    user.roles = [];
    // this roles is either single element or an Array
    const roles = this.getDecodedToken(user.token).role;
    // so we add an array of roles if empty or we push
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.presence.stopHubConnection();
  }

  getDecodedToken(token) {
    // token is: Header, Payload, Signiture and 1 is index of payload that we need to get
    return JSON.parse(atob(token.split('.')[1]));
  }

  resetPasswordService(resetObject: resetUser) {
    return this.http.post(this.baseUrl + 'account/reset-password', resetObject).pipe(
      map((response: resetUser) => {
        const user = response;
      })
    )

  }

  updateUserBalance(username: string) {
    return this.http.put(this.baseUrl + 'guests/'+username,{});
  }

}
