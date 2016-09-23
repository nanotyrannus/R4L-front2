import { Injectable } from "@angular/core"
import { Http, Response, Headers, RequestOptions } from "@angular/http"
import { Observable } from "rxjs/Observable"
import { baseUrl } from "./config"
import { CookieService } from "angular2-cookie/core"
import { UserService } from "../user/user.service"

/**
 * Wrapper class for Http. Simply listens for application-level
 * status codes.
 */

@Injectable()
export class Rest {

    constructor(private http: Http,
        private cookieService: CookieService) { }

    public post(endpoint: string, body: any = {}, options: any = null): Observable<Response> {
        return Observable.create(observer => {
            options = {}
            let headers: Headers = null
            let requestOptions: RequestOptions = null
            if (this.cookieService.get("token")) {
                headers = new Headers({
                    "Authorization": `Bearer ${this.cookieService.get("token")}`,
                    "x-username": `${this.cookieService.get("username")}`,
                    "Content-Type": "application/json"
                })
            }
            options.headers = headers
            requestOptions = new RequestOptions(options)

            this.http.post(`${baseUrl}${endpoint}`, body, options).subscribe(
                data => {
                    let body = data.json()
                    if (!body.status) {
                        console.warn(`No property 'status' on ${data.url}`)
                    }
                    if (body.status && data.status != 200) {
                        observer.error(new Error(`Status code ${data.status}, ${data.url}`))
                        observer.complete()
                    }
                    observer.next(data)
                    observer.complete()
                },
                error => {
                    observer.error(error)
                    observer.complete()
                }
            )
        })
    }

    public get(endpoint: string): Observable<Response> {
        return Observable.create(observer => {
            let options: any = {}
            let headers: Headers = null
            let requestOptions: RequestOptions = null
            if (this.cookieService.get("token")) {
                headers = new Headers({
                    "Authorization": `Bearer ${this.cookieService.get("token")}`,
                    "x-username": `${this.cookieService.get("username")}`,
                   // "Content-Type": "application/json"
                })
            }
            options.headers = headers
            requestOptions = new RequestOptions(options)
            this.http.get(`${ baseUrl }${ endpoint }`, requestOptions).subscribe(
                data => {
                    let body = data.json()
                    if (!body.status) {
                        console.warn(`No property 'status' on ${data.url}`)
                    }
                    if (body.status && body.status != 200) {
                        observer.error(new Error(`Status code ${data.status}, ${data.url}`))
                        observer.complete()
                    }
                    observer.next(data)
                    observer.complete()
                },
                error => {
                    observer.error(error)
                    observer.complete()
                }
            )
        })
    }

    public delete(endpoint: string): Observable<Response> {
        return Observable.create(observer => {
            let options: any = {}
            let headers: Headers = null
            let requestOptions: RequestOptions = null
            if (this.cookieService.get("token")) {
                headers = new Headers({
                    "Authorization": `Bearer ${this.cookieService.get("token")}`,
                    "x-username": `${this.cookieService.get("username")}`,
                   // "Content-Type": "application/json"
                })
            }
            options.headers = headers
            requestOptions = new RequestOptions(options)
            this.http.delete(`${ baseUrl }${ endpoint }`, requestOptions).subscribe(
                data => {
                    let body = data.json()
                    if (!body.status) {
                        console.warn(`No property 'status' on ${data.url}`)
                    }
                    if (body.status && body.status != 200) {
                        observer.error(new Error(`Status code ${data.status}, ${data.url}`))
                        observer.complete()
                    }
                    observer.next(data)
                    observer.complete()
                },
                error => {
                    observer.error(error)
                    observer.complete()
                }
            )
        })
    }
}
