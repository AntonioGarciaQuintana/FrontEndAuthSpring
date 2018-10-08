import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { BaseUrl } from '../../../../base_url';
import { User } from '../../model/user';


@Injectable()
export class AuthService {

    base: BaseUrl = new BaseUrl();

    constructor(public http: Http) { }

    public logIn(user: User) {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        const base64Credential: string = btoa(user.username + ':' + user.password);
        headers.append('Authorization', 'Basic ' + base64Credential);

        const options = new RequestOptions();
        options.headers = headers;

        return this.http.get(this.base.urlBackend + '/account/login', options)
            .map((response: Response) => {

                // tslint:disable-next-line:no-shadowed-variable
                const user = response.json().principal;

                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

    logOut() {
        localStorage.removeItem('currentUser');
        return this.http.post(this.base.urlBackend + 'logout', {})
            .map((response: Response) => {
                localStorage.removeItem('currentUser');
            });

    }
}
