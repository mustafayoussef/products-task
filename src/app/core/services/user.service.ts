import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/${userId}`);
  }
}
