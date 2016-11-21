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
    private startDate: string = null
    private endDate: string = null
    private description: string = null
    private name: string = null
    private rows: any[]
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

    ngOnInit() {
        this.getEventTotals()
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

    private updateEventData(): void {
        let data: any = {}
        if (this.name !== null) data.name = this.name
        if (this.startDate !== null) data.start_date = this.startDate
        if (this.endDate !== null) data.end_date = this.endDate
        if (this.description !== null) data.description = this.description
        this.eventService.updateMetaData(data).subscribe(data => {console.log(data.json())}, error => {console.error(error)})
    }

    private getEventTotals(): void {
        this.eventService.getEventTotals().subscribe(data => {
            this.rows = data.json()
        }, error=> {console.error(error)})
    }

    private test(event: any) {
        console.log(this.startDate)
        event.preventDefault()
        console.log("test", event)
    }
}