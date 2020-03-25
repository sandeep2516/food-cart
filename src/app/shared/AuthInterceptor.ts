import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (req.url.indexOf('oauth') === -1) {
            const modified = req.clone({
                headers: req.headers.set(
                    'Authorization', `Bearer ${localStorage.getItem('userToken')}`)
            });
            return next.handle(modified).pipe(
                tap((event: HttpEvent<any>) => {
                }, (error) => {
                    if (error.status === 401) {
                        localStorage.setItem('userToken', '');
                        this.router.navigate(['/login']);
                    }
                })
            );
        } else {
            return next.handle(req).pipe(
                tap((event: HttpEvent<any>) => {
                }, (error) => {
                    if (error.status === 401) {
                        localStorage.setItem('userToken', '');
                        this.router.navigate(['/login']);
                    }
                })
            );
        }
    }
}
