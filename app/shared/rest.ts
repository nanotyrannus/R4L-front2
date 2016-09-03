import { Injectable } from "@angular/core"
import { Http, Response } from "@angular/http" 
import { Observable } from "rxjs/Observable"
import { baseUrl } from "./config"

/**
 * Wrapper class for Http. Simply listens for application-level
 * status codes.
 */

@Injectable()
export class Rest {

    constructor(private http: Http) {}

    public post(endpoint: string, body: any, options: any): Observable<Response> {
        return Observable.create(observer => {
            this.http.post(`${ baseUrl }${ endpoint }`, body, options).subscribe(
                data => {
                    let body = data.json()
                    if (!body.status) {
                        console.warn(`No property 'status' on ${ data.url }`)
                    }
                    if (body.status &&body.status != 200) {
                        observer.error(new Error(`Status code ${ data.status }, ${ data.url }`))
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
            this.http.get(endpoint).subscribe(
                data => {
                    let body = data.json()
                    if (!body.status) {
                        console.warn(`No property 'status' on ${ data.url }`)
                    }
                    if (body.status && body.status != 200) {
                        observer.error(new Error(`Status code ${ data.status }, ${ data.url }`))
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
