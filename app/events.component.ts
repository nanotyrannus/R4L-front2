import { Component } from "@angular/core"
import { ContainsPipe } from "./contains.pipe"

@Component({
    selector: 'my-events',
    template: `
    <input [(ngModel)]="query" placeholder="Search">
    <span *ngIf="query">{{query}}</span>
    <ul>
    <li *ngFor="let event of events" >
    <div class="event-container" *ngIf="event.name | contains:query">
        <div class="event-title">{{ event.name | uppercase }}</div>
        <div class="event-body">The {{ event.name }} event has {{ event.sites }} sites to be evaluated.</div>
    </div>
    </li>
    </ul>
    `,
    styles: [
        `ul { list-style-type: none; }`,
        `.event-title { font-size: 1.5em; }`    
    ],
    pipes: [ ContainsPipe ]
})

export class EventsComponent {
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
    constructor(public name: string, public sites: Number) {}
}