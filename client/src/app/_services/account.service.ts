import { HttpClient } from '@angular/common/http';
import { inject, Injectable, model, signal } from '@angular/core';

import { map } from 'rxjs';
import { User } from '../_models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  http = inject(HttpClient);
  baseUrl = environment.baseUrl;
  currentUser = signal<User | null>(null);

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map(user => {
        if (user) {
        this.currentUser.set(user);
        localStorage.setItem('user', JSON.stringify(user));
        }
      }));
  }
  register(model:any){
    return this.http.post<User>(this.baseUrl + 'account/register',model).pipe(
      map(user => {
        if(user){
          this.currentUser.set(user);
          localStorage.setItem('user',JSON.stringify(user));
        }
        return user;
      })
    )
  }
  

  logout(){
    this.currentUser.set(null);
    localStorage.removeItem('user');
  }
}
