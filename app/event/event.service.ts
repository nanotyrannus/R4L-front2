import { Injectable } from "@angular/core"
import { Http, Response } from "@angular/http"
import { Rest } from "../shared/rest"
import { Observable } from "rxjs/Observable"
import { baseUrl } from "../shared/config"
import { Router } from "@angular/router"
import { Event } from "../event/event.class"

@Injectable()
export class EventService {

    private _currentEvent: Event = null

    constructor(private rest: Rest, private router: Router) {

    }

    public getEvents(): Observable<Response> {
        return this.rest.get(`/event`)
    }

    public deleteEvent(): Observable<Response> {
        return this.rest.post(`/event/${ this.currentEvent.id }/delete`)
    }

    set currentEvent(value: Event) {
        console.log(`currentEvent set to ${ value }`)
        let bbox = value.boundingBox
        let margin = 0.01
        bbox[0][0] -= margin
        bbox[0][1] -= margin
        bbox[1][0] += margin
        bbox[1][1] += margin
        this._currentEvent = value
    }

    get currentEvent(): Event {
        if (!this._currentEvent) {
            throw new Error(`Invalid currentEvent value: ${ this._currentEvent.id }`)
        } else {
            console.log(`Not null: ${ this._currentEvent.id }`)
            return this._currentEvent
        }
    }

    public setDescription(value: string): Observable<Response> {
        return this.rest.post(`/event/${ this.currentEvent.id }/description`, {
            "description" : value
        })
    }

    public updateMetaData(values: any): Observable<Response> {
        return this.rest.post(`/event/${ this.currentEvent.id }/meta`, values)
    }

    public getEventTotals(): Observable<Response> {
        return this.rest.get(`/event/${ this.currentEvent.id }/data`)
    }

    public test() {
        console.log("test() called")
    }
}
