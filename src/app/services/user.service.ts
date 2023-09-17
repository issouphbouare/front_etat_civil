import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userNameKey = 'user_name';
  private userNameSubject = new BehaviorSubject<string>('');
  userName$ = this.userNameSubject.asObservable();

  constructor() {
    const storedUserName = localStorage.getItem(this.userNameKey);
    if (storedUserName) {
      this.userNameSubject.next(storedUserName);
    }
  }

  setUserName(userName: string) {
    localStorage.setItem(this.userNameKey, userName);
    this.userNameSubject.next(userName);
  }
}
