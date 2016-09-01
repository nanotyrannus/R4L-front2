import { Injectable } from "@angular/core"
import { Http, Response } from "@angular/http"
import { Observable } from "rxjs/Observable"
import { baseUrl } from "../shared/config"

@Injectable()
export class EventService {

    constructor(private http: Http) {

    }

    public getEvents(): Observable<any> {
        return this.http.post(`${ baseUrl }/ping`, {"hello" : "world"})
    }
}
