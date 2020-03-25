import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, forkJoin } from 'rxjs';

export class UserService {
    public userData = new Subject();

    constructor(private http: HttpClient) {
    }

    logout() {
        return this.http.get(environment.path + '/secured/revokeToken');
    }


    loginUser(data) {
        let body = new URLSearchParams();
        body.set('grant_type', 'password');
        body.set('username', data.user);
        body.set('password', data.password);
        body.set('client_id', 'spring-security-oauth2-read-write-client');

        return this.http.post(environment.path + 'oauth/token', body.toString(),
            { headers: new HttpHeaders().set('Authorization', 'Basic c3ByaW5nLXNlY3VyaXR5LW9hdXRoMi1yZWFkLXdyaXRlLWNsaWVudDpzcHJpbmctc2VjdXJpdHktb2F1dGgyLXJlYWQtd3JpdGUtY2xpZW50LXBhc3N3b3JkMTIzNA==').set('Content-Type', 'application/x-www-form-urlencoded') }
        );
    }
}