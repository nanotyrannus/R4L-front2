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
    username: string

    public constructor(private eventService: EventService, private userService: UserService, private router: Router) {
        this.events = new Array<Event>()
    }

    ngOnInit () {
        this.eventService.getEvents().subscribe(
            data => {
                let eventResponse = data.json()
                eventResponse.forEach((event) => {
                    if (Date.now() > Date.parse(event.end_date) && !this.userService.isAdmin) {
                        // if NOW > end_date, then the campaign has ended.
                        // Do not render event.
                        return
                    }
                    console.log(`${event.name} has ${ event.site_count } sites`, event)
                    this.events.push(new Event(event.name, event.description, event.thumbnail, event.site_count, event.id, [[event.south, event.west], [event.north, event.east]], event.start_date, event.end_date))
                })
                // console.log(events.forEach)
            },
            error => {
                console.error(error)
            }
        )
        this.username = this.userService.username
    }

    private addEvent(event: Event): void {
        this.events.push(event)
    }

    private deleteEvent(): void {
        this.eventService.deleteEvent().subscribe(
            data => {console.log(data.json())}, error => {console.error(error)}
        )
    }

    private isAdmin(): boolean {
        return this.userService.isAdmin
    }

    public setEvent(value: Event, redirectTo: string = "/map") {
        this.eventService.currentEvent = value
        console.log(`boundingbox`, value.boundingBox)
        this.router.navigate([redirectTo])
    }

    private logout(): void {
        this.userService.logout()
    }
}

