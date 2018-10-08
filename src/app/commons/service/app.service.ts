import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseUrl } from '../../../../base_url';
import { Observable } from 'rxjs/Observable';

const headers = new HttpHeaders().set('content-tye', 'application/json');
@Injectable()
export class ApiService {

    base: BaseUrl = new BaseUrl();

    constructor(private http: HttpClient) {
    }

    getElements(url: string): Observable<any> {
        return this.http.get(this.base.urlBackend + url);
    }

    getPagesSort(url: string, page: number, size: number, sort: string): Observable<any> {
        const Gurl = `${this.base.urlBackend + url}/?page=${page}&size=${size}&sort=${sort}`;
        return this.http.get<any[]>(Gurl);
    }

    addElement(url: string, object: any): Observable<any> {
        return this.http.post<any>(this.base.urlBackend + url, object, { headers });
    }

    deleteElement(url, id: number): Observable<any> {
        return this.http.delete<void>(this.base.urlBackend + url + '/' + id);
    }
}
