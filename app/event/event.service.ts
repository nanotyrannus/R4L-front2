import { Injectable } from "@angular/core"
import { Http, Response } from "@angular/http"
import { Observable } from "rxjs/Observable"

@Injectable()
export class EventService {

    constructor(private http: Http) {

    }

    public getEvents(): Observable<any> {
        return this.http.post(`http://${ window.location.hostname }:3000/ping`, {"hello" : "world"})
    }
}
