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

    public deleteEvent(id: number): Observable<Response> {
        return this.rest.delete(`/event/${ id }`)
    }

    set currentEvent(value: Event) {
        console.log(`currentEvent set to ${ value }`)
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
}
