import { Component } from "@angular/core"
import { ContainsPipe } from "../shared/contains.pipe"

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
    events: Event[] = [
        new Event("Tacloban", 20),
        new Event("Nepal", 15),
        new Event("New Guinea", 37),
        new Event("Guangdong", 187),
        new Event("Kashmir", 47),
        new Event("Bali", 17),
        new Event("Jammu", 13),
        new Event("San Fransisco", 17),
        new Event("Fukushima", 43),
        new Event("Pyongyang", 210)
    ]
}

class Event {
    constructor(public name: string, public sites: Number) {
        
    }
}