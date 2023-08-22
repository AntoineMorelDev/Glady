import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  private static readonly AUTH_TOKEN: string = 'tokenTest123';

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', AuthInterceptorService.AUTH_TOKEN)
    });

    return next.handle(authReq);
  }
}
