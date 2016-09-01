import { Injectable } from "@angular/core"
import { Http, Response } from "@angular/http" 
import { Observable } from "rxjs/Observable"
import { baseUrl } from "./config"

@Injectable()
export class Rest {

    constructor(private http: Http) {}

    public post(endpoint: string, body: any, options: any): Observable<Response> {
        return this.http.post(`${ baseUrl }${ endpoint }`, body, options)    
    }

    public get(endpoint: string) {}
}
