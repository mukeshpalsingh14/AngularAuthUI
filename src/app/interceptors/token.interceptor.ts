import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const userToken = this.authService.getToken();
    console.log(userToken);
    if (userToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearermukesh ${userToken}`, }
      })
      // return next.handle(request);
    }
    return next.handle(request);
  }
}
