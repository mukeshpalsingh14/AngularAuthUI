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
  GetUserList() {
    return this.http.get<any>(`${this.baseUrl}getUser`);
  }
  stroeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue)
  }
  getToken() {
    return localStorage.getItem('token');
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  signout(){
    localStorage.removeItem('token');
  }
}
