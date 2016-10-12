import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { ContainsPipe } from "../shared/contains.pipe"
import { EventService } from "./event.service"
import { Event } from "./event.class"
import { UserService } from "../user/user.service"

@Component({
    selector: 'my-events',
    templateUrl: "app/event/event.html",
    styles: [
        `ul { list-style-type: none; }`,
        `.event-title { font-size: 1.5em; }`    
    ],
    pipes: [ ContainsPipe ]
})

export class EventComponent {
    query: string
    events: Event[]

    public constructor(private eventService: EventService, private userService: UserService, private router: Router) {
        this.events = new Array<Event>()
    }

    ngOnInit () {
        this.eventService.getEvents().subscribe(
            data => {
                let eventResponse = data.json()
                eventResponse.forEach((event) => {
                    console.log(`${event.name} has ${ event.site_count } sites`)
                    this.events.push(new Event(event.name, event.description, event.thumbnail, event.site_count, event.id, [[event.south, event.west], [event.north, event.east]]))
                })
                // console.log(events.forEach)
            },
            error => {
                console.error(error)
            }
        )
    }

    private addEvent(event: Event): void {
        this.events.push(event)
    }

    private deleteEvent(id: number): void {
        this.eventService.deleteEvent(id).subscribe(
            data => {console.log(data.json())}, error => {console.error(error)}
        )
    }

    private isAdmin(): boolean {
        return this.userService.isAdmin
    }

    public setEvent(value: Event) {
        this.eventService.currentEvent = value
        console.log(`boundingbox`, value.boundingBox)
        this.router.navigate(['/map'])
    }
}

