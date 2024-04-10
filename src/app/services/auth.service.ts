import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = "https://localhost:7292/User/";
  constructor(private http: HttpClient) { }
  signup(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}register`, userObj);
  }
  Login(loginObj: any) {
    return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj);
  }
  GetUserList(loginObj: any) {
    return this.http.get<any>(`${this.baseUrl}getUser`, loginObj);
  }
}
