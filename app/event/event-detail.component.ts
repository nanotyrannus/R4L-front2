import { Component } from "@angular/core"
import { EventService } from "./event.service"
import { Event } from "./event.class"
import { Router } from "@angular/router"

@Component({
    "selector" : "event-detail",
    "templateUrl" : "/app/event/event-detail.html"
})

export class EventDetailComponent {
    private _event: Event
    /**
     * TODO: modify EventService to allow mutation/deletion of events
     */

    constructor(private eventService: EventService, private router: Router) {
        try {
            this._event = eventService.currentEvent
        } catch (err) {
            this.router.navigate(['/events'])
        }
    }

    get event(): Event {
        return this._event
    }

    private deleteEvent(): void {
        this.eventService.deleteEvent().subscribe(data => {
            console.log(data.json())
        }, error => {
            console.error(error)
        })
    }

    private test() {
        console.log("test")
    }
}