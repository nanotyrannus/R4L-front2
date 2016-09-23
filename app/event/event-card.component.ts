import { Component, Input } from "@angular/core"
import { Event } from "./event.class"

@Component({
    "selector" : "event-card",
    "templateUrl" : "/app/event/event-card.html"
})
export class EventCardComponent {
    @Input('event') public event: Event

    constructor() {}
}