import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/user';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(
    this.getUserFromLocalStorage()
  );
  public userObservable: Observable<User>;
  constructor(private http: HttpClient, private toastrService: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser(): User {
    return this.userSubject.value;
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to Foodmine ${user.name}!`,
            'Login Successful',
            {
              timeOut: 3000,
              positionClass: 'toast-bottom-right',
              newestOnTop: false,
            }
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login Failed');
        },
      })
    );
  }

  // register(userRegiser:IUserRegister): Observable<User>{
  //   return this.http.post<User>(USER_REGISTER_URL, userRegiser).pipe(
  //     tap({
  //       next: (user) => {
  //         this.setUserToLocalStorage(user);
  //         this.userSubject.next(user);
  //         this.toastrService.success(
  //           `Welcome to the Foodmine ${user.name}`,
  //           'Register Successful'
  //         )
  //       },
  //       error: (errorResponse) => {
  //         this.toastrService.error(errorResponse.error,
  //           'Register Failed')
  //       }
  //     })
  //   )
  // }

  logout() {
    this.userSubject.next(new User());
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(USER_KEY);
    }
    window.location.reload();
  }

  // private setUserToLocalStorage(user: User) {
  //   if (typeof localStorage !== 'undefined') {
  //     localStorage.setItem(USER_KEY, JSON.stringify(user));
  //   }
  // }

  private setUserToLocalStorage(user: User) {
    if (localStorage) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }

  private getUserFromLocalStorage(): User {
    try {
      if (typeof localStorage !== 'undefined') {
        const userJson = localStorage.getItem(USER_KEY);
        if (userJson) {
          return JSON.parse(userJson) as User;
        }
      }
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
    }
    return new User();
  }
}
